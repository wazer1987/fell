<template>
  <div class="login-container">
    <el-form ref="form" :model="form" :rules="rules" class="login-form">
      <div class="title-container">
        <img src="/logo.png" />
      </div>
      <el-form-item prop="email">
        <span class="svg-container">
          <i class="el-icon-mobile"> </i>
        </span>
        <el-input
          ref="email"
          v-model="form.email"
          placeholder="邮箱"
          name="email"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="el-icon-lock"> </i>
        </span>
        <el-input
          ref="password"
          v-model="form.password"
          placeholder="重复密码"
          name="password"
          type="password"
        />
      </el-form-item>
      <el-button
        type="primary"
        style="width:100%;margin-bottom:30px"
        @click.native.prevent="handlelogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import md5 from 'md5'
export default {
  data() {
    return {
      form: {
        email: '1052101962@qq.com',
        password: '123456789012'
      },
      rules: {
        email: [{ required: true, message: '请输出邮箱' }],
        password: [{ required: true, message: '请输出密码' }]
      }
    }
  },
  methods: {
    handlelogin() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const obj = {
            email: this.form.email,
            password: md5(this.form.password)
          }
          const ret = await this.$store.dispatch('user/login', obj)
          if (ret.code === 0) {
            this.$notify({
              title: '登录成功',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push({ path: '/' })
            }, 1000)
          }
        }
      })
    }
  }
}
</script>

<style scoped></style>
