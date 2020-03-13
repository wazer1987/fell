<template>
  <div class="user">
    <nuxt-link :to="url">
      {{ user.nickname }}
    </nuxt-link>
    <slot> </slot>
  </div>
</template>

<script>
export default {
  props: ['user'],
  computed: {
    url() {
      return '/user/' + (this.user._id || this.user.id)
    }
  },
  mounted() {
    console.log(this.user, '----我是ID页面')
  }
}
</script>

<style lang="scss">
.user {
  display: inline-block;
  padding: 5px;
  a {
    color: #67c23a;
  }
  .user-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
  }
}
</style>
