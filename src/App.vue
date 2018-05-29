<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <md-toolbar style="margin-top:0%;"  class="">  -->
      <!-- <md-toolbar class="md-toolbar md-raised md-primary apptoolbar" style="margin-top:0%;" md-elevation="1">
        <a class="md-title" style="cursor:pointer; text-decoration: none; flex: 1" href="/">Twoad</a>
        <img style="width:3%;" src="https://firebasestorage.googleapis.com/v0/b/twoad-proj.appspot.com/o/user.png?alt=media&token=da40d43a-1994-40a3-bd3b-6ab0cadab509">

        <md-menu md-direction="bottom-start">
          <md-button md-menu-trigger>Bottom Start</md-button>
          <md-menu-content>
            <md-menu-item>My Item 1</md-menu-item>
            <md-menu-item>My Item 2</md-menu-item>
            <md-menu-item>My Item 3</md-menu-item>
          </md-menu-content>
        </md-menu>
      </md-toolbar> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
}

</style>
