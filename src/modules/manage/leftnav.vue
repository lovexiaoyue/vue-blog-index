<template>
  <aside class="scroll">
    <div class="logo"><img src="../../assets/logo.png" alt=""></div>
    <router-link :to="item.url" tag="li" v-for="(item, index) in nav" :key="index">
      <i class="animate05 i"></i>
      <i class="el-icon-document"></i><span>{{item.name}}</span>
    </router-link>
  </aside>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      navindex: 0,
      nav: [
        {
          name: '兼职列表',
          url: '/articlelist'
        },
        {
          name: '发布兼职',
          url: '/article/add'
        },
        {
          name: '活动列表',
          url: '/activelist'
        },
        {
          name: '发布活动',
          url: '/setting'
        },
        {
          name: '会员列表',
          url: '/users'
        },
        {
          name: '广告图',
          url: '/ad'
        }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
aside
  background: #273146
  width: 260px
  min-width 260px
  height: 100%
  position: relative
  box-shadow: 2px 2px 10px #b5b4b4
  padding: 10px 0
  box-sizing: border-box
  overflow: auto
  .logo
    width 180px
    margin: 20px auto 20px
    img
      width 100%
  li
    width 100%
    line-height: 55px
    height: 55px
    color: #fff
    font-size: 16px
    display flex
    align-items center
    justify-content center
    position: relative
    cursor: pointer
    .i
      position: absolute
      width: 6px
      height: 0
      left: 0
      top: 50%
    span
      margin-left: 20px
      display: inline-block
      width: 80px
      text-align: left
  li.router-link-active
    background: #2a303c
    .i
      height: 100%
      background: #59abff
      top: 0
</style>
