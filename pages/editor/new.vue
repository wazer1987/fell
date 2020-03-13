<template>
  <div>
    <div class="write-btn">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
    <el-row>
      <el-col :span="12">
        <textarea :value="content" class="md-editor" @input="update"></textarea>
      </el-col>
      <el-col :span="12">
        <div class="markdown-body" v-html="compiledMarkdown"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import marked from 'marked'
import debounce from 'lodash/debounce'
export default {
  layout: 'login',
  data() {
    return {
      content: '# node.js基础实战'
    }
  },
  computed: {
    compiledMarkdown() {
      const data = marked(this.content, { sanitize: true })
      console.log(data)
      return data
    }
  },
  head() {
    return {
      link: [
        {
          href:
            'https://cdn.bootcss.com/github-markdown-css/3.0.1/github-markdown.min.css',
          rel: 'stylesheet'
        }
      ]
    }
  },
  methods: {
    update: debounce(function(e) {
      this.content = e.target.value
    }, 150),
    async submit() {
      const ret = await this.$http.post('/article/create', {
        content: this.content
      })
      if (ret.code === 0) {
        this.$notify({
          title: '创建成功',
          type: 'success',
          message: `文章《${ret.data.title}》创建成功`
        })
        setTimeout(() => {
          this.$router.push({ path: '/article/' + ret.data.id })
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.md-editor {
  width: 100%;
  height: 100vh;
  outline: none;
}
.write-btn {
  position: fixed;
  z-index: 100;
  right: 30px;
  top: 10px;
}
</style>
