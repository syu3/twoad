/* global firebase */
<template>
  <div id="app">
    <md-toolbar class="md-raised md-primary" md-elevation="1">
      <a class="md-title" style="cursor:pointer; text-decoration: none; flex: 1" href="/">Twoad</a>

      <h3 class="md-title" style="flex: 1"></h3>
      <!-- <md-button style="position:absolute;  top :10px; z-index: 2;" href="#/upload">アップロード</md-button>
      <md-button style="position:relative; right: 0px; top :10px; z-index: 2;" href="#/upload">サインイン</md-button> -->
      <!-- <md-button href="#/upload">アップロード</md-button> -->
      <!-- <md-button href="#/signup">サインイン</md-button> -->
      <input type="image" style="width:3%;" onClick="location.href='#/mypage'" src="https://firebasestorage.googleapis.com/v0/b/twoad-proj.appspot.com/o/user1.png?alt=media&token=a03f16d6-718a-4a90-a376-5ad6d1b2679c">

    </md-toolbar>
    <!-- <md-toolbar style="width:500px; position:absolute; right: 20px;"> -->
      <!-- <md-button class="md-raised md-primary" style="position:absolute; right: 0px; top :10px; z-index: 2;" href="#/upload">アップロード</md-button> -->
    <!-- </md-toolbar> -->
    <form novalidate class="md-layout" @submit.prevent="validateUser" md-alignment-top-center>
      <md-card class="uploadCard md-layout-item md-size-50 md-small-size-100">
       <md-card-header>
         <div class="md-title">アップロード</div>
       </md-card-header>
       <!-- <md-button class="md-raised md-primary">Primary</md-button> -->
       <md-card-content>
                 <div class="md-layout md-gutter" style="display:block;">
                   <div class="md-layout-item md-small-size-100">
                     <!-- <md-field :class="getValidationClass('userName')">
                       <label for="user-name">アプリ作成者の名前</label>
                       <md-input name="user-name" id="user-name" autocomplete="given-name" v-model="form.userName" :disabled="sending" />
                       <span class="md-error" v-if="!$v.form.userName.required">作成者名を入力してください</span>
                       <span class="md-error" v-else-if="!$v.form.userName.minlength">２文字以上入力してください</span>
                     </md-field> -->
                     <md-field :class="getValidationClass('appName')">
                       <label for="app-name">アプリ名</label>
                       <md-input name="app-name" id="app-name" autocomplete="given-name" v-model="form.appName" :disabled="sending" />
                       <span class="md-error" v-if="!$v.form.appName.required">アプリ名を入力してくださ</span>
                       <span class="md-error" v-else-if="!$v.form.appName.minlength">３文字以上入力してください</span>
                     </md-field>
                     <md-field :class="getValidationClass('category')">
                       <label for="category">アプリのカテゴリー</label>
                       <md-select v-model="form.category" name="category" id="category">
                         <md-option value='指定しない'>指定しない</md-option>
                         <md-option value='ゲーム'>ゲーム</md-option>
                         <md-option value='ショッピング'>ショッピング</md-option>
                         <md-option value='ステッカー'>ステッカー</md-option>
                         <md-option value='スポーツ'>スポーツ</md-option>
                         <md-option value='ソーシャルネットワーキング'>ソーシャルネットワーキング</md-option>
                         <md-option value='ナビゲーション'>ナビゲーション</md-option>
                         <md-option value='ニュース'>ニュース</md-option>
                         <md-option value='ビジネス'>ビジネス</md-option>
                         <md-option value='ファイナンス'>ファイナンス</md-option>
                         <md-option value='フード／ドリンク'>フード／ドリンク</md-option>
                         <md-option value='ブック'>ブック</md-option>
                         <md-option value='ヘルスケア／フィットネス'>ヘルスケア／フィットネス</md-option>
                         <md-option value='ミュージック'>ミュージック</md-option>
                         <md-option value='メディカル'>メディカル</md-option>
                         <md-option value='ユーティリティ'>ユーティリティ</md-option>
                         <md-option value='ライフスタイル'>ライフスタイル</md-option>
                         <md-option value='仕事効率化'>仕事効率化</md-option>
                         <md-option value='写真／ビデオ'>写真／ビデオ</md-option>
                         <md-option value='天気'>天気</md-option>
                         <md-option value='教育'>教育</md-option>
                         <md-option value='旅行'>旅行</md-option>
                         <md-option value='辞書／辞典／その他'>辞書／辞典／その他</md-option>
                         <md-option value='雑誌／新聞雑誌／新聞'>雑誌／新聞雑誌／新聞</md-option>
                       </md-select>
                       <span class="md-error">カテゴリーを選択してください</span>
                     </md-field>
                   </div>

                   <div class="md-layout-item md-small-size-100">
                     <!-- <md-field :class="getValidationClass('lastName')">
                       <label for="last-name">Last Name</label>
                       <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
                       <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
                       <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid last name</span>
                     </md-field> -->
                     <md-field>
                       <label>アプリの説明・コメントなど</label>
                       <md-textarea v-model="form.information" name="information" id="information"></md-textarea>
                     </md-field>
                   </div>
                 </div>
                 <md-field :class="getValidationClass('email')">
                   <label for="email">メールアドレス</label>
                   <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
                   <span class="md-error" v-if="!$v.form.email.required">メールアドレスを入力してください</span>
                   <span class="md-error" v-else-if="!$v.form.email.email">正しくメールアドレスを入力してください</span>
                 </md-field>
                 <md-field>
                  <label>広告用の画像</label>
                  <md-file @change="imageFunc" accept="image/*" v-model="form.image" />
                  <!-- <span class="md-error" v-if="!$v.form.image.required">カテゴリーを選択してください</span> -->
                </md-field>
                <md-field>
                  <label for="date">希望掲載期間</label>
                  <md-select v-model="date" name="date" id="date">
                    <md-option value="1週間">1週間</md-option>
                    <md-option value="2週間">2週間</md-option>
                    <md-option value="3週間">3週間</md-option>
                    <md-option value="1ヶ月">1ヶ月</md-option>
                    <md-option value="3ヶ月">3ヶ月</md-option>
                    <md-option value="6ヶ月">6ヶ月</md-option>
                    <md-option value="1年">1年間</md-option>
                  </md-select>
                </md-field>
              </md-card-content>
          <md-progress-bar md-mode="indeterminate" v-if="sending" />
          <md-card-actions>
            <md-button type="submit" class="md-raised md-primary" v-on:click="upload()">アップロード</md-button>
          </md-card-actions>
     </md-card>
     <md-snackbar :md-active.sync="userSaved">アップロード完了！</md-snackbar>
   </form>
  </div>
</template>

<script>
/* global firebase */
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
var file
var uid

export default {
  name: 'upload',
  mixins: [validationMixin],
  data: function() {
    return {
      form: {
        userName: null,
        appName: null,
        lastName: null,
        email: null,
        category: null,
        information: null,
        image: null
      },
      userSaved: false,
      sending: false,
      lastUser: null,
      date: null,
      userusername: null
    }
  },

  methods: {
    imageFunc: function(e) {
      file = e.target.files[0]
      console.log(e.target.files[0].width)
    },
    upload: function() {
      var storageRef = firebase
        .storage()
        .ref(this.userusername + this.form.appName + '/adimage')
      storageRef.put(file)
      this.writeUserData()
    },

    writeUserData: function() {
      var self = this
      firebase
        .database()
        .ref('/UID/' + uid)
        .once('value')
        .then(function(snapshot) {
          if (snapshot.val() != null) {
            firebase
              .database()
              .ref('UID/' + uid)
              .set({
                app:
                  snapshot.val().app +
                  '|' +
                  self.userusername +
                  ',' +
                  self.form.appName,
                appname: snapshot.val().appname + '|' + self.form.appName
              })
          } else {
            firebase
              .database()
              .ref('UID/' + uid)
              .set({
                app: self.userusername + ',' + self.form.appName,
                appname: self.form.appName
              })
          }
        })
      // var self = this
      firebase
        .database()
        .ref('userInformation/' + this.userusername + ',' + this.form.appName)
        .set({
          appName: this.form.appName,
          userName: this.userusername,
          category: this.form.category,
          information: this.form.information,
          mail: this.form.email,
          date: this.date,
          picture: ''
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
    clearForm() {},
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
      appName: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      category: {
        required
      },
      information: {
        required,
        minLength: minLength(3)
      }
    }
  },

  created: function() {
    var self = this
    firebase.auth().onAuthStateChanged(function(user) {
      self.userusername = user.displayName
      if (user) {
        uid = user.uid
      } else {
      }
    })
  }
}
</script>

<style>
.uploadCard{
  margin : 5% 25%
}
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.apptoolbar{
  opacity:1.0;
}
</style>
