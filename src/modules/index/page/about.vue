<template>
  <div class="home" >
    <div class="about-bg">
      <img :src="$staticUrl + banners[0].url">
      <div class="bg bg2"></div>
      <div class="title">
        <h2>写在前面</h2>
        <em>人生是一场永不停息的奔跑</em>
        <em>每一天，期待遇上更好的自己</em>
      </div>
    </div>
    <div class="about">
      <p>一直都有把自己的学习笔记记录下来的习惯，用过很多博客，但是还是希望有一个自己的博客。</p>
      <p>自己写过Python Flask的一个博客，但是由于前端基础较差，写出的页面不够美观，于是从github上找到了作者sweida的这个开源博客。</p>
      <h3>在这个项目的基础上进行修改，作为自己的个人博客。</h3>

      <div class="make">
        <div>
          <img src="../../../assets/laravel.png" alt="">
          <p class="laravel">Laravel
          </p>
          <a href="https://github.com/yueyuluo/laravel-blog-api" target="_blank" class="laravel">
            <Icon type="logo-github" />
          </a>

        </div>
        <i class="iconfont lv-icon-aixin"></i>
        <div>
          <img src="../../../assets/vue.jpg" alt="">
          <p class="vue">Vue</p> 
          <a href="https://github.com/yueyuluo/vue-blog-index" target="_blank" class="vue">
            <Icon type="logo-github" />
          </a>
        </div>
      </div>
      <p>在此感谢@sweida，希望可以给个<em class="star">star</em></p>
    </div>

    <div class="about-bg">
      <img :src="$staticUrl + banners[1].url" >
      <div class="bg"></div>
      <div class="title">
        <h2>关于我</h2>
        <em>——典型的技术宅男，爱好编程与二次元</em>
        <em>坐标 ShenZhen「深圳」</em>
      </div>
    </div>
    <div class="about">
      <p>理想，90后、一名后端程序员。</p>
      <p>对前端也有涉猎。</p>
      <p>16年开始接触编程，从C语言到pyhton、PHP、Go，目标是大数据和人工智能方向发展。</p>
      <div class="skills">
        <p>目前已习得技能</p>
        <img v-for="(item, index) in skills" :key="index" :src="$staticUrl + item.url">
      </div>            
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
export default {
  data () {
    return {
      skills: []
    }
  },
  computed: {
    ...mapGetters([
      'banners'
    ])
  }, 
  created() {
    this.getSkills()
  },
  methods: {
    async getSkills() {
      const res = await this.$post('/api/ad', {type: '技能'})
      this.skills = res.data
    },
  }
}
</script>

<style lang="stylus" scoped>
// .home
//   margin 20px auto
  .banner
    max-width: 800px
    margin 0 auto
    img 
      width 100%

.webbase
  text-align center
  padding 50px 20px
  h2
    font-weight 300
    font-size 28px
  h3
    font-weight 300
    font-size 22px
.make
  padding 40px 0
  display: flex;
  align-items: center;
  justify-content: center;
  text-align center
  font-size 20px
  line-height 30px
  font-family: cursive;
  font-weight: bold;
  img 
    max-width 100px
  a i
    font-size 28px
  .lv-icon-aixin
    margin -30px 40px 0
    color red
    font-size 26px
  .laravel
    font-family: none;
    color: #fa5039;
  .vue
    font-family: none;
    color: #3cb884

.about-bg
  width 100%
  height 600px
  position relative
  img 
    width: 100%;
    position absolute
    top 0
    -o-object-fit: cover;
    object-fit: cover;
    height: 100%;
  .bg
    background: #8a8588
    mix-blend-mode: multiply
    height: 100%
  .bg2
    background #a3b0bf
  .title
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    h2
      position: relative;
      font-size: 34px;
      font-weight: 300;
      padding-bottom: 30px;
      margin-bottom: 30px;
    h2:after
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 80px;
      height: 2px;
      margin-left: -40px;
      content: '';
      background-color: #FF5722
    em
      color: #d0d6da
      font-size 16px
      font-style: oblique;
      line-height: 40px;

.about
  text-align center
  position relative
  line-height 26px
  font-size 18px 
  padding 60px 20px
  max-width 700px
  margin auto
  p
    padding-bottom 10px
  em
    color: #9eabb3;
    font-size 16px
    font-style: oblique;
    line-height: 40px;
  a
    margin 0 10px
  h3
    font-size 20px
    font-weight 400
    padding-top 30px
    color #f7576c
.skills
  max-width 800px
  text-align center
  margin auto
  p
    font-size 20px
    color #f7576c
  img
    max-width 88px
    margin 3px



@media screen and (max-width: 750px)
  .about-bg
    height 300px
  .about 
    padding 40px 20px
    font-size 16px
    em
      font-family: cursive;
      font-size 24px

  .make .laravel, .make .vue
    font-family: cursive;

  .about-bg .title 
    h2
      font-size: 26px;
      padding-bottom: 20px;
      margin-bottom: 20px;
    em
      font-family: cursive;    
  .skills img
    max-width 66px

@media screen and (min-width: 1368px)
  .about-bg:first-child
    height 700px
@media screen and (min-width: 1660px)
  .about-bg:first-child
    height 830px      
</style>
