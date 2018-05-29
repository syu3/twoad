/* global firebase */
<template>
<div id="app">
  <!-- <md-button class="md-raised md-primary">fawfaw</md-button> -->
  <!-- <md-toolbar class="md-raised md-primary" md-elevation="1" style="position:absolute; top:0px; right:0px; width:500px;">
    <h3 class="md-title" style="flex: 1"></h3>
    <md-button href="#/upload">アップロード</md-button>
    <md-button href="#/signup">サインイン</md-button>
  </md-toolbar> -->
  <md-toolbar class="md-raised md-primary" md-elevation="1">
    <a class="md-title" style="cursor:pointer; text-decoration: none; flex: 1" href="/">Twoad</a>

    <h3 class="md-title" style="flex: 1"></h3>
        <md-button href="#/login">ログイン</md-button>
    <!-- <md-button style="position:absolute;  top :10px; z-index: 2;" href="#/upload">アップロード</md-button>
    <md-button style="position:relative; right: 0px; top :10px; z-index: 2;" href="#/upload">サインイン</md-button> -->
    <!-- <md-button href="#/upload">アップロード</md-button> -->
    <!-- <md-button href="#/signup">サインイン</md-button> -->
    <!-- <img style="width:3%;" src="https://firebasestorage.googleapis.com/v0/b/twoad-proj.appspot.com/o/user.png?alt=media&token=da40d43a-1994-40a3-bd3b-6ab0cadab509"> -->

  </md-toolbar>
  <form novalidate class="md-layout" @submit.prevent="validateUser" md-alignment-top-center>
    <md-card class="uploadCard md-layout-item md-size-50 md-small-size-100">
     <md-card-header>
       <div class="md-title">新規登録</div>
     </md-card-header>
     <md-card-content>
             <md-field :class="getValidationClass('userName')">
               <label for="user-name">名前</label>
               <md-input name="user-name" id="user-name" autocomplete="given-name" v-model="form.userName" :disabled="sending" />
               <span class="md-error" v-if="!$v.form.userName.required">名前を入力してください</span>
               <span class="md-error" v-else-if="!$v.form.userName.minlength">２文字以上入力してください</span>
             </md-field>
             <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
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
         <md-button type="submit" class="md-raised md-primary" @click="signup()">新規登録</md-button>
       </md-card-actions>
     </md-card>
     <md-snackbar :md-active.sync="userSaved">登録完了！</md-snackbar>
   </form>
   <p style="margin:0% 48%">または</p>
   <md-button class="md-raised md-accent" style="margin:0% 46.5%" href="#/login">ログイン</md-button>
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
      userSaved: false,
      sending: false,
      lastUser: null
    }
  },
  methods: {
    signup: function() {
      var self = this
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(result => {
          var countup = function() {
            var user = firebase.auth().currentUser
            user
              .updateProfile({
                displayName: self.form.userName
              })
              .then(function() {
                location.href = '#/'
              })
          }
          setTimeout(countup, 1500)
        })
      // .catch(function(error) {
      // var errorCode = error.code
      // var errorMessage = error.message
      // })
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
        this.userSaved = true
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
      userName: {
        required,
        minLength: minLength(2)
      },
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
<style>
.uploadCard{
  margin : 3% 25%
}
.loginCard{
  margin : 1% 25%
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
