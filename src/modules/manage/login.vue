<template>
  <div class="login">
    <div class="el-form">
      <div class="title">
         后台管理系统
      </div>
      <div class="formbox">
        <div>
          <label for="name">账号</label>
          <input v-model="formCustom.username" type="text" id="name" placeholder="请输入账号" auto-complete="off">
        </div>
        <div>
          <label for="password">密码</label>
          <input v-model="formCustom.password" type="password" id="password" placeholder="请输入密码" auto-complete="off">
        </div>
      </div>
      <el-checkbox v-model="checked" checked class="remember" >记住密码</el-checkbox>
      <button class="submit animate03" @click="loginSubmit">登 录</button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {
  data() {
    return {
      show: true,
      checked: true,
      formCustom: {
        username: '',
        password: '',
        type: 'name'
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created() {
  },
  methods: {
    ...mapActions([
      'Token', 'UserInfo'
    ]),
    loginSubmit() {
      this.$post('/api/login', this.formCustom).then(res => {
        // 因为接口请求用户信息需要时间，路由会先拦截，所以先设置 admin=true
        if(res.data.admin !== 1){
          this.$message.error('权限不足！');
          return;
        }
        let user = {
          admin: true
        }
        this.$store.commit('USERINFO', user)

        this.$message.success('登录成功！');
        this.Token(res.data.token)
        this.UserInfo()

        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect)
        } else {
          this.$router.push('/articlelist')
        }
      }).catch(() => {
      })
    }
  }
}
</script>
<style scoped lang="stylus">
.animate03{
  -webkit-transition-duration:0.3s;
   -moz-transition-duration:0.3s;
    -ms-transition-duration:0.3s;
    transition-duration:0.3s;
}
.login{
  width: 100%;
  height: 100%;
  background: url(../../assets/background1.jpeg) no-repeat center top;
  background-size: cover;
  .el-form {
    position: absolute;
    right: 12%;
    top:15%;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 300px;
    padding: 20px 30px;
    background: #fff;
    .remember {
      margin: 0px 0px 35px 0px;
    }
    .formbox{
      background: #fff;
      width: 100%;
      height: 80px;
      box-shadow: 0px 5px 15px #9db7f1;
      border-radius: 3px;
      margin-bottom: 20px;
      line-height: 40px;
      font-size: 16px;
      color: #555555;
      div{
        margin:0 20px;
        position: relative;
        label{
          width: 45px;
          display: inline-block;
          border-right: 1px solid #ddd;
          line-height: 20px;
        }
      }
      div:first-child{
        border-bottom: 1px solid #ddd;
      }
      input{
        outline: none;
        border:0;
        padding:0 10px;
        letter-spacing: 1px;
        font-size: 16px;
        width: 140px;
        color: #555;
        line-height: 30px;
      }
    }
    .submit{
      width:88%;
      margin:auto;
      background: #83b5ff;
      margin:0 0 30px 6%;
      border:0;
      color: #fff;
      padding: 8px;
      border-radius: 30px;
      outline: none;
      cursor: pointer;
    }
    .submit:hover{
      box-shadow: 0px 5px 15px #9db7f1;
      transition: all 0.2;
    }
    .title{
      font-size: 20px;
      color: rgb(131 181 255);
      margin-top: 10px;
      margin-bottom: 30px;
      margin-left: 60px;
      font-weight: bold;
    }
  }
}


</style>
