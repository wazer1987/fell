<template>
  <div class="kkb-container">
    <h1>开课吧</h1>
    <div v-for="acticle in article" :key="acticle._aid">
      <nuxt-link :to="'/article/' + acticle._id">
        {{ acticle.title }}
      </nuxt-link>
    </div>
    <div>
      <nuxt-link to="register">注册页面</nuxt-link>
    </div>
  </div>
</template>

<script>
// async asyncdata(){

// }
export default {
  // 这不用mounted是因为我们要用ssr的功能 这样写在asyncData的生命周期里是带着数据过来的
  async asyncData({ app }) {
    const ret = await app.$axios.get('/api/article')
    return {
      article: ret.data.data
    }
  },
  async mounted() {
    const ret = await this.$http.get('/article')
    console.log(ret, '----文章')
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
