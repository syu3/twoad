/* global firebase */
<template>
  <div id="app" style="width:100%;">

    <md-toolbar class="md-raised md-primary matchingtoolbar" md-elevation="1">
      <a class="md-title" style="cursor:pointer; text-decoration: none; flex: 1" href="#/matching">Twoad</a>
      <!-- <h1>マッチング画面</h1> -->
      <h1 style="flex: 0.8;"></h1>
      <!-- <md-button style="position:absolute;  top :10px; z-index: 2;" href="#/upload">アップロード</md-button>
      <md-button style="position:relative; right: 0px; top :10px; z-index: 2;" href="#/upload">サインイン</md-button> -->
      <md-button href="#/upload">アップロード</md-button>
      <!-- <md-button href="#/signup">サインイン</md-button> -->
      <input type="image" style="width:3%;" onClick="location.href='#/mypage'" src="https://firebasestorage.googleapis.com/v0/b/twoad-proj.appspot.com/o/user1.png?alt=media&token=a03f16d6-718a-4a90-a376-5ad6d1b2679c">
        <!-- <img style="width:3%;" src="https://firebasestorage.googleapis.com/v0/b/twoad-proj.appspot.com/o/user.png?alt=media&token=da40d43a-1994-40a3-bd3b-6ab0cadab509"> -->
      <!-- </input> -->

    </md-toolbar>
    <div style="width:100%;">
    <p style="position:absolute; top:10%; color:#999; text-align: center; width:100%;" class="md-title">マッチング画面</p>
    </div>
          <md-dialog  ref="appDialog" class="appDialog" :md-active.sync="appDialogtrue" md-confirm-text="Agree" md-cancel-text="Disagree" @md-cancel="matchingCancel" @md-confirm="matchingOK">
            <p class="md-title">どのアプリにこの広告を貼りますか？</p>
            <md-dialog-actions>

              <md-button class="md-primary" @click="match(appnamefor)" v-for="appnamefor in appnameforarray" v-bind:key="appnamefor.id">{{appnamefor}}</md-button>
            </md-dialog-actions>
          </md-dialog>
    <md-dialog-confirm :md-title='confirmationDialog.title' :md-content='confirmationDialog.content' ref="confirmationDialog" class="confirmationDialog" :md-active.sync="confirmationDialogtrue" md-confirm-text="はい" md-cancel-text="いいえ"
      @md-cancel="matchingCancel"
      @md-confirm="matchingOK">

    </md-dialog-confirm>

    <md-card v-for="informations in informationArray" v-bind:key="informations.id">
      <md-card-content>
        <p class="md-title">{{ informations.appName }}</p>

        {{ informations.date }}
        {{ informations.information }}
        {{ informations.userName }}
        {{ informations.category }}
        <img :src='informations.picture' alt="">
        <!-- <md-button class="md-dense md-raised md-primary">{{ informations.category }}</md-button> -->
        <md-card-actions>
          <md-button class="md-raised md-primary" @click='matchkakunin(informations.userName , informations.appName , informations.date , informations.information , informations.category , informations.mail)'>このアプリの広告を貼る</md-button>
        </md-card-actions>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
var appname = []
/* global firebase */
export default {
  name: 'matching',
  data: function() {
    return {
      confirmationDialog: {
        title: '確認',
        content: 'この内容でよろしいですか<br>あい'
      },
      informationArray: [],
      confirmationDialogtrue: false,
      appDialogtrue: false,
      mail: null,
      appnameforarray: [],
      adimageArray: [{}],
      userName: null,
      appName: null,
      date: null,
      information: null,
      category: null,
      email: null,
      appnamefor: null,
      usermail: null,
      userusername: null
    }
  },
  methods: {
    matchingCancel: function() {},
    matchingOK: function() {
      var self = this

      firebase
        .database()
        .ref('situation/' + this.userName + ',' + this.appName)
        .once('value')
        .then(function(snapshot) {
          firebase
            .database()
            .ref('situation/' + self.userusername + ',' + self.appnamefor)
            .set({
              irai: self.userName + ',' + self.appName
            })
          if (snapshot.val() == null) {
            firebase
              .database()
              .ref('situation/' + self.userName + ',' + self.appName)
              .set({
                irai: self.userusername + ',' + self.appnamefor
              })
          } else {
            firebase
              .database()
              .ref('situation/' + self.userName + ',' + self.appName)
              .set({
                irai:
                  snapshot.val().irai +
                  '|' +
                  self.userusername +
                  ',' +
                  self.appnamefor
              })
          }
        })
    },
    writeUserData: function() {
      let self = this

      firebase
        .database()
        .ref('/userInformation')
        .once('value')
        .then(function(snapshot) {
          self.informationArray = snapshot.val()

          for (var date in self.informationArray) {
            self.download(date)
          }
        })
    },
    download: function(date) {
      let self = this
      var date1 = date.replace(',', '')
      var storageRef = firebase.storage().ref()
      storageRef
        .child(date1 + '/adimage')
        .getDownloadURL()
        .then(function(url) {
          self.adimageArray.push(url)
          self.informationArray[date].picture = url
          firebase
            .database()
            .ref('userInformation/' + date)
            .update({
              picture: url
            })
        })
    },
    matchkakunin: function(
      userName,
      appName,
      date,
      information,
      category,
      email
    ) {
      this.userName = userName
      this.appName = appName
      this.date = date
      this.information = information
      this.category = category
      this.email = email
      this.mail = email
      this.appDialogtrue = true
    },
    match: function(appnamefor) {
      this.appnamefor = appnamefor
      this.appDialogtrue = false
      this.confirmationDialog.content =
        'この内容でよろしいでしょうか？<br><br>名前：' +
        this.userName +
        'さん<br>アプリ名：' +
        this.appName +
        '<br>アプリのカテゴリー：' +
        this.category +
        '<br>アプリの説明：' +
        this.information +
        '<br>掲載期間：' +
        this.date +
        '<br>広告を貼るアプリ：' +
        appnamefor +
        '<br><font color="red">この広告を貼るを押すと、この広告作成者に通知が行きます。<br>広告作成者がOKを押すことで交渉が成立します。</font>'

      this.confirmationDialogtrue = true
    },
    doubleCheck: function(i) {
      var self = this
      firebase
        .database()
        .ref('/ContractStatus/' + self.userusername + ',' + appname[i])
        .once('value')
        .then(function(snapshot) {
          if (snapshot.val() == null) {
            console.log(appname[i])
            self.appnameforarray.push(appname[i])
          }
        })
    },
    onOpen: function() {},
    onClose: function(type) {}
  },
  created: function() {
    var self = this

    firebase.auth().onAuthStateChanged(function(user) {
      if (user == null) {
        location.href = '#/signup'
      } else {
        self.usermail = user.email
        self.userusername = user.displayName
        firebase
          .database()
          .ref('/UID/' + user.uid)
          .once('value')
          .then(function(snapshot) {
            appname = snapshot
              .val()
              .appname.replace(/\|/g, ',')
              .split(',')
            for (var i = 0; i < appname.length; i++) {
              self.doubleCheck(i)
            }
          })
      }
    })
    this.writeUserData()
  }
}
</script>
<link rel="stylesheet" type="text/css" href="css/component.css" />
<style>
.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .apptoolbar{
    opacity:0.5;
  }
  .matchingtoolbar{
    top: 0px;
    /* max-width: 100%;, */
    position: fixed;
    /* top: 0;
    right: 0;
    left: 0;
    z-index: 3;
    transition: .3s cubic-bezier(.4,0,.2,1),box-shadow .4s cubic-bezier(.25,.8,.25,1) .1s;
    will-change: box-shadow,max-width,background-color; */
  }
</style>
