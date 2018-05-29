<template lang="html">
  <div id="app">
    <md-toolbar class="md-raised md-primary" md-elevation="1">
      <a class="md-title" style="cursor:pointer; text-decoration: none; flex: 1" href="/">Twoad</a>
      <h3 class="md-title" style="flex: 1"></h3>
      <md-button href="#/upload">アップロード</md-button>
        <input type="image" style="width:3%;" onClick="location.href='#/mypage'" src="https://firebasestorage.googleapis.com/v0/b/twoad-proj.appspot.com/o/user1.png?alt=media&token=a03f16d6-718a-4a90-a376-5ad6d1b2679c">
    </md-toolbar>
    <md-card class="userCard">
      <md-card-header>
        <div class="md-title">ユーザー情報</div>
      </md-card-header>
      <md-card-content>
        <p>名前：{{displayName}}</p>
        <p>メールアドレス：{{email}}</p>
        <p>アップロードしたアプリ：{{userapp}}</p>
        <md-divider></md-divider>
        <br>
        <div class="md-title">あなたの広告を貼りたいアプリ</div>
        <div>＊以下の中からあなたが貼りたい広告を一つだけ選んでください</div>
        <md-card v-for="informations in informationArray" class="iraicard" v-bind:key="informations.id">
          <md-card-content>
            <p class="md-title">{{ informations.appName }}</p>

            {{ informations.date }}
            {{ informations.information }}
            {{ informations.userName }}
            {{ informations.category }}
            <img :src='informations.picture' alt="">
            <!-- <md-button class="md-dense md-raised md-primary">{{ informations.category }}</md-button> -->
            <md-card-actions>
              <md-button class="md-raised md-primary" @click='koushouseiritu(informations.userName , informations.appName)'>この広告を貼る</md-button>
            </md-card-actions>
          </md-card-content>
        </md-card><br>
        <md-divider></md-divider>
        <br>
        <div class="md-title">交渉成立した広告</div>
        <md-card v-for="contractStatus in contractStatusArray" class="iraicard" v-bind:key="contractStatus.id">
          <md-card-content>
            <p class="md-title">{{ contractStatus.appName }}</p>

            {{ contractStatus.date }}
            {{ contractStatus.information }}
            {{ contractStatus.userName }}
            {{ contractStatus.category }}
            <h2>このコードを<font color='red'>{{iraiuke}}</font>のviewDidLoadに貼り付けてください</h2>
              <pre class="CodeHighlighter"><code class="html">
 let url = NSURL(string: "{{contractStatus.picture}}");<br>
 let imageData = NSData(contentsOf : url! as URL)<br>
 var myImageView = UIImageView()<br>
 myImageView.image = UIImage(data:imageData! as Data)<br>
 let posX: CGFloat = self.view.bounds.height<br>
 let imageView = UIImageView(frame: CGRect(x: 0, y: posX-100, width: 450, height: 100))<br>
 imageView.image = UIImage(data:imageData! as Data)<br>
 self.view.addSubview(imageView)
                </code></pre>

            <img :src='contractStatus.picture' alt="">
            <!-- <md-button class="md-dense md-raised md-primary">{{ informations.category }}</md-button> -->
            <!-- <md-card-actions>
              <md-button class="md-raised md-primary">この広告を貼る</md-button>
            </md-card-actions> -->
          </md-card-content>
        </md-card>
      </md-card-content>
    </md-card>
</div>
</template>

<script>
/* global firebase */
var userapp
export default {
  name: 'upload',
  data: function() {
    return {
      userInformation: null,
      userapp: null,
      displayName: null,
      email: null,
      iraiArray: [],
      informationArray: [],
      contractStatusArray: [],
      numArray: [],
      iraiuke: null
    }
  },
  methods: {
    koushouseiritu: function(partnerName, partnerAppName) {
      var self = this
      firebase
        .database()
        .ref('ContractStatus/' + self.displayName + ',' + userapp)
        .set({
          partner: partnerName + ',' + partnerAppName
        })
      firebase
        .database()
        .ref('ContractStatus/' + partnerName + ',' + partnerAppName)
        .set({
          partner: self.displayName + ',' + userapp
        })

      firebase
        .database()
        .ref('situation/' + self.displayName + ',' + userapp)
        .remove()
      var countup = function() {
        location.href = '#/mypage'
      }
      setTimeout(countup, 1000)
    },
    iraiFunc: function(userappname) {
      var self = this

      firebase
        .database()
        .ref('situation/' + self.displayName + ',' + userappname)
        .once('value')
        .then(function(snapshot) {
          console.log('faw', snapshot.val())
          if (snapshot.val() != null) {
            for (var i = 0; i < snapshot.val().irai.split('|').length; i++) {
              // self.numArray.push(i)
              firebase
                .database()
                .ref('/userInformation/' + snapshot.val().irai.split('|')[i])
                .once('value')
                .then(function(snapshot) {
                  // self.iraiuke = snapshot.val().irai.split('|')[i]
                  self.informationArray.push(snapshot.val())
                })
            }
          }
        })
    },
    contractStatusFunc: function(userappname) {
      var self = this
      firebase
        .database()
        .ref('ContractStatus/' + self.displayName + ',' + userappname)
        .once('value')
        .then(function(snapshot) {
          if (snapshot.val() != null) {
            for (var i = 0; i < snapshot.val().partner.split('|').length; i++) {
              console.log(snapshot.val().partner.split('|')[i])
              // self.numArray.push(i)
              firebase
                .database()
                .ref('/userInformation/' + snapshot.val().partner.split('|')[i])
                .once('value')
                .then(function(snapshot) {
                  console.log(snapshot.val())
                  console.log(self.displayName + ',' + userappname)
                  self.iraiuke = userappname
                  self.contractStatusArray.push(snapshot.val())
                })
            }
          }
        })
    }
  },
  created: function() {
    var self = this

    firebase.auth().onAuthStateChanged(function(user) {
      self.userInformation = user
      self.email = user.email
      self.displayName = user.displayName
      firebase
        .database()
        .ref('/UID/' + user.uid)
        .once('value')
        .then(function(snapshot) {
          var userappname = snapshot.val().appname
          for (var i = 0; i < userappname.split('|').length; i++) {
            userapp = userappname.split('|')[i]
            self.iraiFunc(userappname.split('|')[i])
          }

          self.userapp = userappname.replace(/\|/g, '　　')
        })

      firebase
        .database()
        .ref('/UID/' + user.uid)
        .once('value')
        .then(function(snapshot) {
          if (snapshot.val() != null) {
            var userappname = snapshot.val().appname
            for (var i = 0; i < userappname.split('|').length; i++) {
              self.contractStatusFunc(userappname.split('|')[i])
            }
          }
        })
    })
  }
}
</script>

<style lang="css">

.userCard{

  margin : 3% 25%;
  width:50%;
}
pre.CodeHighlighter {
  overflow-wrap:break-word;
    white-space: pre-wrap ;
    font-size: 0.9rem;
    line-height: 100%;
    font-weight: 400;
    border-left: solid 1px #d3d6db;
    border-right: solid 1px #d3d6db;
    border-top: solid 1px #d3d6db;
    border-bottom: solid 1px #d3d6db;
    background-color: #f9f9f9;
    margin-top: 16px;
    margin-bottom: 16px;
  }
</style>
