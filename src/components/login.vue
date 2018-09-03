<template lang="html">
  <div id="app">
  <md-toolbar class="md-raised md-primary" md-elevation="1">
    <a class="md-title" style="cursor:pointer; text-decoration: none; flex: 1" href="#/matching">Twoad</a>

    <h3 class="md-title" style="flex: 1"></h3>
        <!-- <md-button href="#/login">ログイン</md-button> -->
  </md-toolbar>
  <form novalidate class="md-layout" @submit.prevent="validateUser" md-alignment-top-center>
    <md-card class="uploadCard md-layout-item md-size-50 md-small-size-100">
     <md-card-header>
       <div class="md-title">ログイン</div>
     </md-card-header>
     <md-card-content>
             <md-field :class="getValidationClass('email')">
            <label for="email">メール</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.email.required">メールアドレスを入力してください</span>
            <span class="md-error" v-else-if="!$v.form.email.email">正しくメールアドレスを入力してください</span>

          </md-field>
          <md-field :class="getValidationClass('password')">
            <label>パスワード</label>
            <md-input v-model="form.password" type="password" id="password" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.password.required">パスワードを入力してください</span>
            <span class="md-error" v-else-if="!$v.form.password.email">４文字を入力してください</span>
          </md-field>
       </md-card-content>
       <md-progress-bar md-mode="indeterminate" v-if="sending" />
       <md-card-actions>
         <md-button type="submit" class="md-raised md-primary" @click="login()">ログイン</md-button>
       </md-card-actions>
     </md-card>
     <md-snackbar :md-active.sync="userSaved">登録完了！</md-snackbar>
   </form>
   <md-dialog-alert
  :md-active.sync="first"
  md-content="メールアドレスかパスワードが違います"
  md-confirm-text="OK" />
 </div>
</template>

<script>
/* global firebase */
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'signup',
  mixins: [validationMixin],
  data: function() {
    return {
      form: {
        userName: null,
        initial: 'Initial Value',
        email: null,
        password: null
      },
      sending: false,
      userSaved: false,
      first: false
    }
  },
  methods: {
    login: function() {
      var self = this
      self.first = false
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(result => {
          location.href = '#/matching'
        })
        .catch(function(error) {
          self.first = true
          console.log(error)
          // var errorCode = error.code
          // var errorMessage = error.message
        })
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    saveUser() {
      this.sending = true
      window.setTimeout(() => {
        this.lastUser = `${this.form.userName} ${this.form.lastName}`
        this.sending = false
      }, 1500)
    },
    validateUser() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.saveUser()
      }
    }
  },
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(4)
      },
      email: {
        required,
        email
      }
    }
  }
}
</script>

<style lang="css">
.uploadCard{
  margin : 3% 25%
}
</style>
