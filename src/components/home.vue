<template lang="html">
  <div class="homediv">
    <md-toolbar class="position:relative; top:0px; md-raised md-primary matchingtoolbar" md-elevation="1">
      <a class="md-title" style="cursor:pointer; text-decoration: none; flex: 1" href="#/matching">Twoad</a>
    </md-toolbar>

    <div class="home" style="top:0px; width:100%;height:100vh">
    </div>
    <center><md-button href="#/matching" class="md-raised md-primary" style="position:relative; top:-30vh; width:200px; height:60px;">今すぐ始める</md-button></center>

    <!-- <p class="mainP">お互いに広告を張り合おう</p> -->
    <div style="width:100%; ">
      <p class="subP" style="width:100%;">自分のアプリをもっと広めたい！そのために広告を作って宣伝したい！<br>
        <br>という人同士をマッチングし、お互いのアプリの広告を張り合うサービスです。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'upload',
  data: function() {
    return {}
  }
}
</script>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-122073897-1"></script>
<script>
window.dataLayer = window.dataLayer || []
function gtag() {
  dataLayer.push(arguments)
}
gtag('js', new Date())

gtag('config', 'UA-122073897-1')
</script>
<style lang="css">

@media only screen and (max-width: 4080px) {
.home{
  background-image: url("home.png");
  width: 100%;
  /* 画像を常に天地左右の中央に配置 */
  background-position: center center;

  /* 画像をタイル状に繰り返し表示しない */
  background-repeat: no-repeat;

  /* コンテンツの高さが画像の高さより大きい時、動かないように固定 */
  background-attachment: fixed;

  /* 表示するコンテナの大きさに基づいて、背景画像を調整 */
  background-size:cover;

  /* 背景画像が読み込まれる前に表示される背景のカラー */
  background-color: #464646;
}
}
@media only screen and (max-width: 1024px) {
  .home{

    background-image: url("sumahohome.png");
    width: 100%;
    /* 画像を常に天地左右の中央に配置 */
    background-position: center center;

    /* 画像をタイル状に繰り返し表示しない */
    background-repeat: no-repeat;

    /* コンテンツの高さが画像の高さより大きい時、動かないように固定 */
    background-attachment: fixed;

    /* 表示するコンテナの大きさに基づいて、背景画像を調整 */
    background-size:cover;

    /* 背景画像が読み込まれる前に表示される背景のカラー */
    background-color: #464646;
  }
}

.mainP{
  position: relative;
  font-size: 3.645vmax;
  top: 20%;
  text-align: center;
  color: black;
}
.subP{
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: 15%;
  /* left: 30%; */
  font-size: 1.198vmax;
  line-height: 100%;

    color: black;
}
.inner{
  width: 100%;
  min-width: 750px;
  transition: opacity .3s linear;
  position: absolute;
  left: 0;
  right: 0;
  top: 32.5%;
}
</style>
