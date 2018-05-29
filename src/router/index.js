import Vue from 'vue'
import Router from 'vue-router'
import matching from '@/components/matching'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import upload from '@/components/upload'
import aaa from '@/components/aaa'
import signup from '@/components/signup'
import login from '@/components/login'
import mypage from '@/components/mypage'

Vue.use(VueMaterial)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'matching',
      component: matching
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },
    {
      path: '/aaa',
      name: 'aaa',
      component: aaa
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: mypage
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
