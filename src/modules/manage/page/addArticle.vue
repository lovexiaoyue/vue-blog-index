<template>
  <main>
    <!-- <header>基础设置</header> -->
    <section class="wrap scroll">
      <el-form v-model="webinfo" label-width="130px">
        <el-form-item label="兼职标题">
          <el-input size="medium" v-model="webinfo.title"> </el-input>
        </el-form-item>
        <el-form-item label="工资待遇">
          <el-input size="medium" v-model="webinfo.price"> </el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input size="medium" v-model="webinfo.company_name"> </el-input>
        </el-form-item>
        <el-form-item label="工作地点">
          <el-input size="medium" v-model="webinfo.work_address"> </el-input>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
              v-model="webinfo.start_time"
              type="datetime"
              value-format="timestamp"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
              v-model="webinfo.end_time"
              type="datetime"
              value-format="timestamp"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="可取消时间">
          <el-date-picker
              v-model="webinfo.cancel_time"
              type="datetime"
              value-format="timestamp"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="招聘人数">
          <el-input size="medium" v-model.number="webinfo.count"></el-input>
        </el-form-item>
        <el-form-item label="性别要求">
          <el-radio-group v-model="webinfo.sex">
            <el-radio :label="3">不限</el-radio>
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身高要求(cm)">
          <el-input size="medium" v-model.number="webinfo.high"  placeholder="填100以下表示无要求"></el-input>
        </el-form-item>
        <el-form-item label="是否需要面试">
          <el-radio-group v-model="webinfo.interview">
            <el-radio :label="1">需要面试</el-radio>
            <el-radio :label="2">不需要面试</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工资结算">
          <el-input size="medium" v-model="webinfo.pay"></el-input>
        </el-form-item>
        <el-form-item label="集合时间">
          <el-date-picker
              v-model="webinfo.gather_time"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="集合地点">
          <el-input size="medium" v-model="webinfo.gather_addr"></el-input>
        </el-form-item>
        <el-form-item label="工作开始日期">
          <el-date-picker
              v-model="webinfo.work_day"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工作结束日期">
          <el-date-picker
              v-model="webinfo.work_day_end"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工作起始时间">
          <el-time-picker
              v-model="webinfo.work_time"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              value-format="HH:mm:ss"
              placeholder="任意时间点">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="工作结束时间">
          <el-time-picker
              v-model="webinfo.work_time_end"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              value-format="HH:mm:ss"
              placeholder="任意时间点">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="工作内容">
          <el-input size="medium" v-model="webinfo.work_info" type="textarea" :rows="3"></el-input>
        </el-form-item>
      </el-form>
    </section>
    <footer>
      <el-button type="primary" size="small" @click="submit" v-if="!$route.params.id">保　存</el-button>
      <el-button type="info" size="small" @click="editBtn"  v-else>保存修改</el-button>
    </footer>
  </main>
</template>

<script>

export default {
  data() {
    return {
      webinfo: {
        title: '',
        price: '',
        start_time: '',
        end_time: '',
        cancel_time: '',
        company_name: '',
        work_address: '',
        sex: 3,
        count: '',
        high: '',
        pay: '',
        interview: 2,
        gather_time:'',
        gather_addr:'',
        work_day: '',
        work_day_end: '',
        work_time: '',
        work_time_end: '',
        work_info: '',
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getArticles()
    }
  },
  methods: {
    getArticles() {
      this.loading = true
      let params = {
        id : this.$route.params.id
      }
      // 获取软删除的数据 all=1
      this.$post('/api/job/one', params).then(res => {
        this.webinfo = res.data.job
        // 将已经下架的文章设置为true
        this.loading = false
      }).catch(() => {
      })
    },
    submit() {
      this.$post('/api/job/add', this.webinfo).then(res => {
        this.$message.success("编辑兼职成功")
        this.$router.push('/articlelist')
      }).catch(() => {
      })
    },
    editBtn() {
      this.$post('/api/job/edit', this.webinfo).then(res => {
        this.$message.success("编辑兼职成功")
        this.$router.push('/articlelist')
      }).catch(() => {
      })
    }
  }
}
</script>

