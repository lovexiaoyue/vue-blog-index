<template>
  <main>
    <!-- <header>会员列表</header> -->
    <section class="wrap scroll">
      <div class="main_table">
        <el-button type="primary" size="small" @click="addBtn">添加用户</el-button>
        <br>
        <br>
        <div class="search">
          <el-input
              placeholder="请输入手机号"
              prefix-icon="el-icon-search"
              v-model="phone">
          </el-input>
          <el-button type="primary" size="small" @click="findUser">搜索</el-button>
        </div>
        <br>
        <br>
        <el-table
          v-loading="loading" 
          :data="Users" 
          stripe 
          style="width: 100%" 
          max-height="600" 
          tooltip-effect="dark">
          <el-table-column prop="id" label="用户ID" width="80">
          </el-table-column>
          <el-table-column prop="name" label="用户名" >
          </el-table-column>
          <el-table-column prop="phone" label="手机号" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="age" label="年龄" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="sex" label="性别" show-overflow-tooltip >
            <template slot-scope="scope">
              {{scope.row.sex === 1 ? '男' : '女'}}
            </template>>
          </el-table-column>
          <el-table-column label="是否是会员" width="100">
            <template slot-scope="scope">
              <el-switch
                  v-model="scope.row.vip"
                  :active-value="1"
                  :inactive-value="2"
                  @change="chanVip(scope.row.id, scope.row.vip)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="vip_expire_time" label="会员到期时间" :formatter="formatTime" />
          <el-table-column prop="create_at" label="注册日期" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="update_at" label="最后登录时间" show-overflow-tooltip >
          </el-table-column>
          <el-table-column label="删除" width="100">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.deleted_at" @change="deleteBtn(scope.row.id, scope.row.deleted_at)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="update_at" label="操作" width="100">
            <template scope="scope">
                <el-button type="primary" @click="showEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <page :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></page>
      </div>
    </section>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="30%">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="用户名：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input type="password" show-password v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄：">
          <el-input  v-model.number="form.age"></el-input>
        </el-form-item>
        <el-form-item label="学校：">
          <el-input  v-model="form.school"></el-input>
        </el-form-item>
        <el-form-item label="会员过期时间：">
          <el-date-picker
              v-model="form.vip_expire_time"
              type="datetime"
              value-format="timestamp"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button v-if="add" type="primary" @click="submitAdd()">确 定</el-button>
    <el-button v-if="edit" type="primary" @click="submitEdit()">确定修改</el-button>
    </el-dialog>
  </main>
</template>

<script>
import page from '@/components/page'
export default {
  components: {
    page
  },
  data() {
    return {
      loading: true,
      dialogVisible: false,
      Users: [],
      pageModel: {
        page: 1,
        sumCount: 10
      },
      phone: '',
      title: "",
      form:{
        phone:"",
        name:"",
        age:"",
        sex:1,
        password:"",
        vip_expire_time:"",
        school: "",
      },
      add: 0,
      edit: 0,
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      this.loading = true
      this.$post('/api/user/listpage', this.pageModel).then(res => {
        this.Users = res.data.list
        this.pageModel.sumCount = res.data.page
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    findUser(){
      let params = {
        phone: this.phone
      }
      this.loading = true
      this.$post('/api/user/find', params).then(res => {
        this.Users = res.data.list
        this.pageModel.sumCount = res.data.page
        this.loading = false
      }).catch(() =>{
        this.loading = false
      })
    },
    formatTime(row, column, cellValue)
    {
      // 创建一个新的Date对象，使用给定的时间戳（毫秒）
      var date = new Date(cellValue);

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
    },
    selectRoleList() {
      this.getUsers()
    },
    deleteBtn(id){
      let params = {
        ids: id.toString(),
      }
      this.$post('/api/user/remove', params).then(res => {
        this.$message.success(`用户删除成功`)
        this.getUsers()
      }).catch(() =>{})
    },
    // 更改权限
    chanVip(id, vip) {
      let params = {
        id: id,
        vip: vip
      }
      this.$post('/api/user/edit', params).then(res => {
        this.$message.success(`权限修改成功`)
      }).catch(() =>{})
    },
    addBtn(){
      this.dialogVisible = true
      this.title = "添加用户"
      this.add = 1
      this.edit = 0
      this.form = {
        phone:"",
        name:"",
        age:"",
        sex:1,
        password:"",
        vip_expire_time:"",
        school: "",
      }
    },
    submitAdd(){
      this.$post('/api/user/add', this.form).then(res => {
        this.$message.success(`添加用户成功`)
        this.dialogVisible = false
        this.getUsers()
      }).catch(() =>{})
    },
    submitEdit(){
      this.$post('/api/user/edit', this.form).then(res => {
        this.$message.success(`修改信息成功`)
        this.dialogVisible = false
        this.getUsers()
      }).catch(() =>{})
    },
    showEdit(row){
      this.dialogVisible = true
      this.title = "编辑用户"
      this.form = row
      this.add = 0
      this.edit = 1
    },
    // // 获取项目产品菜单
    // getmixMenu() {
    //   mixppMenu().then(res => {
    //     // this.menuList = res.data.data
    //   })
    // },
    // // 新增菜单
    // plusNav(item) {
    //   event.stopPropagation()
    //   this.$prompt('请输入新增的类目名称', '提示', {}).then(({ value }) => {
    //     let param = {
    //       icon: '',
    //       name: value,
    //       parentId: item.id
    //     }
    //     if (value == null || !Trim(value)) {
    //       this.$message.error('不能为空')
    //     } else {
    //       addMenu(param).then(res => {
    //         if (res.data.code == 200) {
    //           this.getmixMenu()
    //           this.$message.success('新增菜单成功!')
    //         } else {
    //           this.$message.error('新增菜单失败!')
    //         }
    //       })
    //     }
    //   }).catch(() => {})
    // },
    // // 删除菜单
    // minusNav(item) {
    //   event.stopPropagation()
    //   this.$confirm('是否删除该类目?', '提示', {
    //     type: 'warning'
    //   }).then(() => {
    //     delMenu(item.id).then(res => {
    //       if (res.data.code == 200) {
    //         this.getmixMenu()
    //         this.$message.success(res.data.msg)
    //       } else {
    //         this.$message.error(res.data.msg)
    //       }
    //     })
    //   }).catch(() => {})
    // },
    // // 修改菜单
    // editNav(item, name) {
    //   event.stopPropagation()
    //   this.$prompt('请输入修改的类目名称', '提示', {
    //     inputValue: name
    //   }).then(({ value }) => {
    //     if (value == null || !Trim(value)) {
    //       this.$message.error('不能为空')
    //     } else {
    //       editMenu(item.id, value).then(res => {
    //         if (res.data.code == 200) {
    //           this.getmixMenu()
    //           this.$message.success('修改菜单成功!')
    //         } else {
    //           this.$message.error('修改菜单失败!')
    //         }
    //       })
    //     }
    //   }).catch(() => {})
    // },
    // handleSelect(key, keyPath) {
    //   this.openindex = key
    // },
    // handleOpen(key, keyPath) {
    //   this.openindex = key
    // },
    // handleClose(key, keyPath) {
    //   this.openindex = ''
    // },
    // navtitle(index) {
    //   this.openindex = this.menuList[index].url
    // },
    // // 改变菜单时得到列表数据
    // changeMenu(child) {
    //   console.log(child);
    //   this.MenuParam = {
    //     parentId: child.id
    //   }
    //   this.getprojectList()
    // },
    // // 获取项目列表
    // getprojectList() {
    //   getproject(this.pageModel, this.MenuParam).then(res => {
    //     this.pageModel.sumCount = res.data.data.total
    //     this.projectList = res.data.data.rows
    //   })
    // },
    // //搜素客户
    // searchBtn() {
    // },
    // addBtn() {
    //   this.$router.push('project/addProject')
    // },


    // // 编辑项目
    // editBtn(index, row) {
    //   this.$router.push('project/edit/' + row.id)
    // },
    // selectRoleList() {
    //   this.getprojectList()
    // }
  }
}
</script>

<style scoped lang="stylus">
.search{
  width: 250px;
  display: flex;
  flex-direction: row;

}
</style>