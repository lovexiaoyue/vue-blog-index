<template>
  <div class="common">
    <div class="box">
      <h3>
        <i class="hover">#</i>
        Skills<i class="iconfont lv-icon-biaoqian"></i>
      </h3>
      <div class="line"></div>
      <div class="tagBox">
        <span class="tagli animate03 classify" @click="allArticles">
          全部
        </span>
        <div class="classifyBox" v-for="(item, index) in classifys" :key="index" >
          <span class="tagli animate03 classify" @click="OrderByClassify(item.name)">
            {{item.name}}
          </span>
          <div>
            <span class="tagli animate03" 
              :class="{hot: child=='laravel' || child=='vue' || child=='go' || child=='react' || child=='svelte' || child=='docker'}"
              v-for="(child, index) in item.tags" 
              :key="index" 
              @click="OrderByTag(child)">
              {{child}}
            </span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
  data() {
    return {
      classifys: []
    }
  },
  props: {pageModel: {}},
  created() {
    this.getClassify() 
  },
  computed: {
    ...mapGetters([
        'classify', 'tag'
    ]),
  },
  methods: {
    // 切换分类标签时，页码变为1
    allArticles() {
      this.$router.push('/blog')
      this.pageModel.page = 1
      this.$emit('getArticles');
    },
    OrderByClassify(item) {
      this.$router.push({path:'/blog', query:{classify: item}})
      this.pageModel.page = 1
      this.$emit('ArticlesOrderByClassify');
    },
    OrderByTag(item) {
      this.$router.push({path:'/blog', query:{tag: item}})
      this.pageModel.page = 1
      this.$emit('ArticlesOrderByTag');
    }, 
    // 获取所有分类
    getClassify() {
      this.$get('/api/article/classify').then(res => {
        this.classifys = res.data
      }).catch(err =>{})
    }
  }
}
</script>


<style scoped lang="stylus">
.common
  // margin-left 20px
  // width 255px
  font-family: sans-serif;
  .box
    padding 15px 0
    margin-bottom 20px
    // box-shadow: 2px 2px 14px #c0dbe6
    background #fff
    border-radius 5px
    h3
      position relative
      font-size 16px
      font-weight 100 
      display flex
      justify-content space-between
      font-family: monospace;
      font-size: 2.5em;
      font-weight: bold;
      color: #22292f;
      .hover
        margin: 0 .4rem;
        color: #f72d84;
        font-family: none;
        display none
        position absolute
        left -35px
        top 3px
        opacity .7
      &:hover
        .hover
          display block
    .tagBox
      .classify
        background #f1f5f8
        border none
        border: 1px solid #f1f5f8
        height: 32px
        white-space: nowrap
      .classifyBox
        display flex

    .tagli
      color: #606f7b;
      font-size: 12px;
      cursor: pointer;
      display: inline-block;
      padding: 3px 15px;
      border-radius: 31px;
      margin: 0 10px 12px 0px;
      font-family: sans-serif;
      font-weight: 600;
      font-size: 16px;
      border: 1px solid #dae1e7;
      &.hot
        border 1px solid #ee7752
        background-image: linear-gradient(30deg,#ee7752,#e73c7e);
        color #fff
      &.hot:hover
        background #f1f5f8
    .tagli:hover
      background #f1f5f8
      color: #606f7b;
      border: 1px solid #dae1e7;

.line
  animation: movingGradient 15s linear infinite;
  background-size: 600% 100%;
  background-image: linear-gradient(120deg, #EE7752, #E73C7E, #23A6D5, #23D5AB, #EE7752, #E73C7E);
  width: 100%;
  transition: width .3s linear;
  height 8px
  margin-bottom 25px

@keyframes movingGradient{
  0%{background-position:0 50%}
  to{background-position:100% 50%}
}

@media screen and (max-width: 750px)
  .common .box .tagli
    font-size: 14px
  .common .box .tagBox
    .classify
      height 29px
</style>
