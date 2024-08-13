<template>
  <main>
    <section class="wrap scroll" v-loading="articleLoading">

      <el-form ref="form" v-model="form" label-width="70px" label-position='left'>

        <div class="leftbox">
          <el-form-item label="活动标题">
            <el-input size="medium" v-model="form.title"> </el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
                v-model="form.start_time"
                type="datetime"
                value-format="timestamp"
                placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
                v-model="form.end_time"
                type="datetime"
                value-format="timestamp"
                placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="可取消时间">
            <el-date-picker
                v-model="form.cancel_time"
                type="datetime"
                value-format="timestamp"
                placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="活动人数">
            <el-input size="medium" v-model.number="form.count"></el-input>
          </el-form-item>
          <el-form-item label="集合时间">
            <el-date-picker
                v-model="form.gather_time"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="集合地点">
            <el-input size="medium" v-model="form.gather_addr"></el-input>
          </el-form-item>
          <el-form-item label="活动内容">
            <el-input size="medium" v-model="form.description" type="textarea" :rows="3"></el-input>
          </el-form-item>
        </div>
        <div class="rightbox">
          <el-form-item label="活动封面" >
            <el-upload
              class="avatar-uploader"
              action="/api/user/upload"
              name="image"
              :headers='headers'
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="blogBanner" :src="blogBanner" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </div>
      </el-form>
      <!-- @imgAdd="$imgAdd" @imgDel="$imgDel" -->
    </section>
    <footer>
      <el-button type="primary" size="small" @click="addBtn" :loading="loading" v-if="!$route.params.id">保　存</el-button>
      <el-button type="info" size="small" @click="editBtn" :loading="loading" v-else>保存修改</el-button>
    </footer>
  </main>
</template>

<script>
import Axios from 'axios'
import {mapActions, mapGetters} from "vuex"

export default {
  data() {
    return {
      title: '发布活动',
      blogBanner: '',
      loading: false,
      articleLoading: false,
      form: {
        title: '',
        start_time: '',
        end_time: '',
        cancel_time: '',
        count: '',
        gather_time:'',
        gather_addr:'',
        image: '',
        description: '',
      }
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ]),
    headers() {
      return {
        'Authorization': this.token,
        'X-Requested-With': 'XMLHttpRequest'
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getArticle()
    }
  },
  watch:{
    $route(to,from){
      this.blogBanner = '',
      this.form =  {
        title: '',
        start_time: '',
        end_time: '',
        cancel_time: '',
        count: '',
        gather_time:'',
        gather_addr:'',
        image: '',
        description: '',
      }
    },
  },
  methods: {
    addBtn() {
      // this.loading = true
      this.$post('/api/active/add', this.form).then(res => {
        this.$message.success("发布活动成功")
        this.$router.push('/activelist')
      })
    },
    getArticle() {
      this.articleLoading = true
      let params = {
        id: this.$route.params.id,
        all: 1
      }
      this.$post('/api/article/one', params).then(res => {
        console.log(res.data)
        this.articleLoading = false
        this.form = res.data
        this.form.tags = res.data.tags.join(',')
        if (this.form.image) {
          this.blogBanner = this.$staticUrl+this.form.image
        }
      })
    },
    editBtn() {
      // this.loading = true
      this.$post('/api/article/edit', this.form).then(res => {
        this.$message.success(res.message)
        this.$router.push('/articlelist')
      })
    },
    // 上传图片，获取图片地址
    handleAvatarSuccess(res, file) {
      // 如果已经有图片则先删除图片
      if (this.form.image) {
        this.handleRemove()
      }

      this.blogBanner = URL.createObjectURL(file.raw);
      this.$message.success('图片上传成功')
      this.form.image = res.data
    },
    // 删除图片
    handleRemove() {
      let param = {image: this.form.image}
      this.$post('/api/image/delete', param).then(res => {
        this.$message.success(res.message)
      })
    },
    // 限制图片大小和格式
    beforeAvatarUpload(file) {
      const isJPG = file.type == 'image/jpeg' || 'image/png'
      const isLt3M = file.size / 1024 / 1024 < 3

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG和png 格式!')
      }
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!')
      }
      return isJPG && isLt3M
    },

    // 绑定@imgAdd event 上传图片
    $imgAdd(pos, $file){
        let formdata = new FormData()
        formdata.append('image', $file)
        Axios({
            url: '/api/user/upload',
            method: 'post',
            data: formdata,
            headers:{
              // 'Content-Type':'multipart/form-data',
              'Authorization': this.token,
              'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((url) => {
          console.log(111, url, url.data.data.url, $file)
            // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          this.$refs.md.$img2Url(pos, this.$staticUrl+url.data.data.url)
        })
    },
    // 因为拿不到图片名称，所以无法删除图片
    $imgDel(pos) {
        console.log(pos, '图片名')
        Axios({
            url: '/api/image/delete',
            method: 'post',
            data: {
              image: pos
            },
            headers:{
              'Authorization': this.token,
              'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((url) => {
          console.log(111, url, url.data.data.url, $file)
          this.$refs.md.$img2Url(pos, this.$staticUrl+url.data.data.url)
        })
    }
  }
}
</script>



<style scoped lang="stylus">
.el-form
  display flex
  .el-input
    width 220px


.input_title
  width 380px !important
.el-form-item
  margin-bottom: 12px
  margin-right: 50px;
.el-input-number--small
  width 80px
.makedown
  min-height: 400px;
</style>