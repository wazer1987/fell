<template>
  <div class="kkb-container">
    <UserDisplay :user="article.author">
      <el-button v-if="isFollow" type="success" @click="unfollow"
        >已关注</el-button
      >
      <el-button v-else @click="follow">关注</el-button>
    </UserDisplay>
    <el-divider></el-divider>
    <div class="article" v-html="article.article_html"></div>
    <el-divider></el-divider>

    <div>
      <el-button :type="likeStatus ? 'success' : 'info'" @click="likeAction">
        <i class="el-icon-thumb">{{ article.like }}</i>
      </el-button>

      <el-button>
        <i class="el-icon-thumb rotate"></i>
        0
      </el-button>
    </div>
  </div>
</template>

<script>
import UserDisplay from '~/components/UserDisplay'
export default {
  components: {
    UserDisplay
  },
  data() {
    return {
      isFollow: false,
      article: {
        title: '',
        views: 0,
        like: 0,
        dislike: 0,
        author: {}
      },
      likeStatus: false,
      dislikeStatus: false
    }
  },
  mounted() {
    console.log(this.$route.params, '----查询ID')
    const { id } = this.$route.params
    this.id = id
    this.getArticle()
  },
  methods: {
    // 点赞
    async likeAction() {
      const type = this.likeStatus ? 'delete' : 'put'
      const ret = await this.$http[type]('/user/likeArticle/' + this.id)
      if (ret.code === 0) {
        this.getArticle()
        this.$notify({
          title: ret.message,
          type: 'success'
        })
      }
    },
    // 获取了有ID的文章 然后渲染到页面上 返回的数据有文章的作者 和昵称 和作者账号的ID
    async getArticle() {
      const ret = await this.$http.get('/article/' + this.id)
      // 这就是带着文章的ID去查询了指定文章 然后会给我们返回该片文章的作者和他的ID
      this.article = ret.data
      // 获取关注状态
      console.log(this.article, '-----文章')
      this.checkFollowStatus()
    },
    async checkFollowStatus() {
      // 然后我们带这改片作者的文章ID 去我们自己的表里查询又没有关注 根据后端返回的数据来显示关注按钮的状态
      const isFollow = await this.$http.get(
        '/user/isfollow/' + this.article.author._id
      )
      if (isFollow.code === 0) {
        this.isFollow = isFollow.data.isFollow
      }
    },
    // 点击关注
    async follow() {
      // 把要关注的作者的ID传送过
      await this.$http.put('/user/follow/' + this.article.author._id)
      this.checkFollowStatus()
    },
    // 点击取消关注
    async unfollow() {
      await this.$http.delete('/user/follow/' + this.article.author._id)
      this.checkFollowStatus()
    }
  }
}
</script>

<style>
.rotate {
  transform: rotate(180deg);
}
</style>
