<template>
  <main>
    <!-- <header>修改密码</header> -->
    <section class="wrap scroll">
      <el-form ref="form" v-model="form" label-width="70px" label-position='left'>
        <el-form-item label="原密码">
          <el-input size="medium" v-model="form.old_password" type="password" required="required"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input size="medium" v-model="form.new_password" type="password" required="required"></el-input>
        </el-form-item>
        <el-form-item label="重复密码">
          <el-input size="medium" v-model="form.re_password" type="password" required="required"></el-input>
        </el-form-item>
        <el-button type="primary" size="small" @click="submit" >保　存</el-button>
      </el-form>
    </section>
  </main>
</template>

<script>
export default {

  data() {
    return {
      form: {
        old_password: '',
        new_password: '',
        re_password: ''
      }
    }
  },
  created() {

  },
  methods: {
    submit() {
      for (let item of Object.values(this.form)) {
        if (!item) {
          this.$message.error('密码不能为空')
          return false
        } 
      } 
      if (this.form.new_password != this.form.re_password) {
        this.$message.error('2次输入的密码不一致！')
        return
      }
      this.$post('/api/user/resetpassword', this.form).then(res => {
        this.$message.success("修改密码成功")
        this.form = {
          old_password: '',
          new_password: '',
          re_password: ''
        }
      }).catch(() => {})
    }
  }
}
</script>

<style scoped lang="stylus">
.el-form .el-input
  width 220px
</style>