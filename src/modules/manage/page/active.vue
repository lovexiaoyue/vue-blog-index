<template>
  <main>
    <!-- <header>博客列表</header> -->
    <section class="wrap scroll">
      <div class="main_table">
        <el-table 
          :data="articles"
          v-loading="loading" 
          stripe 
          style="width: 100%" 
          max-height="600" 
          tooltip-effect="dark">
          <el-table-column prop="id" label="ID"  width="80" >
          </el-table-column>
          <el-table-column prop="title" label="兼职标题" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="company_name" label="发布公司" width="100">
          </el-table-column>
          <el-table-column prop="price" label="工资待遇" width="80">
          </el-table-column>
          <el-table-column prop="count" label="招聘人数" width="80">
          </el-table-column>
          <el-table-column prop="user_count" label="已报名人数" width="100">
          </el-table-column>
          <el-table-column prop="start_time" label="开始时间" width="150" :formatter="formatTime">
          </el-table-column>
          <el-table-column prop="end_time" label="结束时间" width="150" :formatter="formatTime">
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
                <el-tag size="mini"  v-if="scope.row.status === 0"> 未开始 </el-tag>
                <el-tag size="mini" type="success" v-if="scope.row.status === 1"> 进行中 </el-tag>
                <el-tag size="mini" type="info" v-if="scope.row.status === 2"> 已结束 </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="删除" width="100">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.deleted_at" @change="deleteBtn(scope.row.id, scope.row.deleted_at)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="detail(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>

        </el-table>
        <MyPage :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></MyPage>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      articles: [],
      pageModel: {
        page: 1,
        all: 1,
        sumCount: 10
      }
    }
  },
  created() {
    this.getArticles()
  },
  methods: {
    getArticles() {
      this.loading = true
      // 获取软删除的数据 all=1
      this.$post('/api/job/info', this.pageModel).then(res => {
          this.articles = res.data.list
          this.pageModel.sumCount = res.data.page
          // 将已经下架的文章设置为true
          this.articles.forEach(item => {
            if (item.deleted_at) {
              item.deleted_at = true
            }
          })

        this.loading = false
      }).catch(() => {
      })
    },
    selectRoleList() {
      this.getArticles()
    },
    detail(id) {
      this.$router.push(`/article/edit/${id}`)
    },
    // 下架文章
    deleteBtn(id, value) {
      // 当value == true时操作下架，反之恢复文章
      if (value == true) {
        const param = {
           ids : id.toString()
        }
        this.$post('/api/job/delete', param).then(res => {
          this.$message.success(`兼职删除成功`)
          this.getArticles()
        }).catch(() => {
        })
      } else {
        this.$post('/api/article/restored', {id}).then(res => {
          console.log(res.data, 'restored')
          this.$message.success(`兼职${id}恢复成功`)
        }).catch(() => {
        })
      }
    },
    formatTime(row, column, cellValue)
    {
        // 创建一个新的Date对象，使用给定的时间戳（毫秒）
        var date = new Date(cellValue * 1000);

        // 使用Date对象的方法来获取年、月、日、时、分、秒
        var year = date.getFullYear();
        var month = date.getMonth() + 1; // 注意月份是从0开始的，所以需要+1
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        // 为了确保月份、日期、小时、分钟和秒始终是两位数，我们使用padStart方法
        month = month.toString().padStart(2, '0');
        day = day.toString().padStart(2, '0');
        hours = hours.toString().padStart(2, '0');
        minutes = minutes.toString().padStart(2, '0');
        seconds = seconds.toString().padStart(2, '0');

        // 拼接成日期时间字符串
        var dateTimeString = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

        return dateTimeString;
    }
  }
}
</script>

<style scoped lang="stylus">

</style>