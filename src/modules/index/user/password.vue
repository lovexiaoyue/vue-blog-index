<template>
  <div class="main">
    <div class="regiter-box">
      <div class="title">修改密码</div>
      <el-form ref="formCustom" :model="formCustom" label-position="top" :rules="ruleCustom">
        <Alert :type="alert.type" show-icon v-if="alert.msg">{{alert.msg}}</Alert>

        <el-form-item label="当前密码" prop="old_password">
          <el-input type="password" size="large" v-model="formCustom.old_password">
            <Icon type="md-lock" slot="prefix" />
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password">
          <el-input type="password" size="large" v-model="formCustom.new_password">
            <Icon type="md-lock" slot="prefix" />
          </el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="rep_password">
          <el-input type="password" size="large" v-model="formCustom.rep_password">
            <Icon type="md-lock" slot="prefix" />
          </el-input>
        </el-form-item>
        <el-form-item>
          <Button type="primary" @click="handleSubmit('formCustom')" long size="large" :loading="loading">修改密码</Button>
          <!-- <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>


<script>

export default {
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认新密码不能为空'));
      } else if (value !== this.formCustom.new_password) {
        callback(new Error('两次输入的密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      alert: {
        type: 'error',
        msg: ''
      },
      formCustom: {
        old_password: '',
        new_password: '',
        rep_password: '',
      },
      ruleCustom: {
        old_password: [
          { required: true, message: '密码不能为空', trigger: 'change' }
        ],
        new_password: [
          { required: true, message: '新密码不能为空', trigger: 'change'}
        ],
        rep_password: [
          { required: true, validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 修改密码按钮
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.changePasswd()
        }
      })
    },
    // 修改密码接口
    changePasswd() {
      this.loading = true
      this.$post('/api/user/resetpassword', this.formCustom).then(res => {
        this.alert = {
          type: 'success',
          msg: res.message
        }
        this.loading = false
        // this.formCustom = {
        //   old_password: '',
        //   new_password: '',
        //   rep_password: '',
        // }
        setTimeout(() => {
          this.$router.push('/person')
        }, 1500)
      }).catch(err => {
        this.loading = false
      })
    }
  }
}
</script>



<style scoped lang="stylus">
.title
  border-bottom: 1px solid #e8eaec
  padding: 14px 15px
  line-height: 1
  font-size: 14px
  color: #17233d
  font-weight: bold
.regiter-box
  max-width: 370px
  margin: 30px auto
  padding: 15px
  background: #fff
  font-size: 14px
  box-shadow: 1px 1px 5px #cddde2
  .ivu-el-form
    padding: 15px 15px 0

</style>
