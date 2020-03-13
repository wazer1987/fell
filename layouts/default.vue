<template>
  <el-container>
    <div>
      {{ userInfo }}
    </div>
    <el-header>
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="0">
          <img class="logo" src="/logo.png" alt="" />
        </el-menu-item>
        <el-menu-item index="1">
          <nuxt-link to="/">首页</nuxt-link>
        </el-menu-item>
        <el-menu-item v-if="userInfo.id" index="3" class="pull-right">
          <nuxt-link to="/login">退出</nuxt-link>
        </el-menu-item>
        <el-menu-item v-if="userInfo.id" index="4" class="pull-right">
          <UserDisplay :user="userInfo"></UserDisplay>
        </el-menu-item>
        <el-menu-item v-if="userInfo.id" index="4" class="pull-right">
          <nuxt-link to="/editor/new">
            <el-button type="primary">写文章</el-button>
          </nuxt-link>
        </el-menu-item>
        <el-menu-item v-if="!userInfo.id" index="2" class="pull-right">
          <nuxt-link to="/register">注册</nuxt-link>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>
<script>
import UserDisplay from '~/components/UserDisplay'
export default {
  components: {
    UserDisplay
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    }
  },
  mounted() {
    console.log(this.$store.state.user, '------default')
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      console.log('getUserInfo', '------')
      const token = localStorage.getItem('waze')
      console.log(token, '-----我是token')
      if (token) {
        this.$store.dispatch('user/detail')
      }
    }
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #eee;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.pull-right {
  float: right !important;
}
.logo {
  height: 37px;
}
a {
  text-decoration: none;
}
.kkb-container {
  width: 980px;
  margin: 0 auto;
}
</style>
