<template>
  <div class="user-container">
    <bread-crumb :tires="tires"></bread-crumb>
    <el-card>
      <div>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input
              placeholder="请输入搜索内容"
              type="text"
              :clearable="true"
              @clear="refresh"
              @keyup.enter.native="refresh"
              v-model="query"
            >
              <el-button slot="append" icon="el-icon-search" @click="refresh"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="addFormVisible = true">添加用户</el-button>
          </el-col>
        </el-row>
        <el-table :data="userData" stripe style="width: 100%" border highlight-current-row>
          <el-table-column type="index" label="序号" width="70"></el-table-column>
          <el-table-column prop="username" label="用户名" width="300"></el-table-column>
          <el-table-column prop="mobile" label="手机号码"></el-table-column>
          <el-table-column prop="role_name" label="角色"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="mg_state" label="状态" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#409eff"
                inactive-color="#dcdfe6"
                @change="onOff(scope.row.id,scope.row.mg_state)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop label="操作" width="200">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="top"
                :enterable="false"
              >
                <el-button type="primary" size="mini" @click="openEdit(scope.row)">
                  <i class="el-icon-edit"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="top"
                :enterable="false"
              >
                <el-button type="danger" size="mini" @click="delUser(scope.row.id)">
                  <i class="el-icon-delete"></i>
                </el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="权限设置"
                placement="top"
                :enterable="false"
              >
                <el-button type="warning" size="mini" @click="openRoleChange(scope.row)">
                  <i class="el-icon-setting"></i>
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :getTableData="getTableData"
          @passData="getDataFromPagination"
          ref="pagiRef"
          :query="query"
        ></pagination>
        <el-dialog title="添加用户" :visible.sync="addFormVisible" :before-close="handleClose">
          <el-form :model="newUserFormData" ref="addFormRef" :rules="addNewRules">
            <el-form-item
              v-for="(info,key,index) in newUserFormData"
              :key="key"
              :label="formLables[index]"
              :label-width="'100px'"
              :prop="key"
            >
              <el-input v-model="newUserFormData[key]" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addNewUser">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="编辑用户" :visible.sync="editFormVisible" :before-close="handleClose">
          <el-form :model="chosenUser" ref="editFormRef" :rules="editFormRules">
            <el-form-item label="用户名" label-width="100px" prop="username">
              <el-input v-model="chosenUser.username" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="100px" prop="email">
              <el-input v-model="chosenUser.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机" label-width="100px" prop="mobile">
              <el-input v-model.number="chosenUser.mobile" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="editUserDone">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="分配用户角色" :visible.sync="roleChangeFormVisible" :before-close="handleClose">
          <el-form :model="chosenUser" ref="roleChangeFormRef" :rules="roleChangeRules">
            <el-form-item label="当前用户" label-width="100px" prop="username">{{chosenUser.username}}</el-form-item>
            <el-form-item label="当前角色" label-width="100px">{{chosenUser.role_name}}</el-form-item>
            <el-form-item label="分配新角色" label-width="100px" prop="rid">
              <el-select v-model="chosenUser.rid" placeholder="请选择">
                <el-option
                  v-for="item in roleData"
                  :key="item.id"
                  :label="item.roleName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="roleChangeDone">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tires: ['用户管理', '用户列表'],
      userData: [],
      chosenUser: {},
      addFormVisible: false,
      editFormVisible: false,
      query: '',
      roleChangeFormVisible: false,
      newUserFormData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editFormData: {
        username: '',
        email: '',
        mobile: ''
      },
      formLables: ['用户名', '密码', '邮箱', '手机号码'],
      roleData: [],
      addNewRules: {
        username: {
          required: true,
          min: 3,
          max: 6,
          trigger: 'blur',
          message: '用户名必填'
        },
        password: {
          required: true,
          min: 3,
          max: 12,
          trigger: 'blur',
          message: '密码必填'
        },
        email: [
          { required: true, trigger: 'blur', message: '邮箱必填' },
          { type: 'email', trigger: 'blur', message: '邮箱格式错误' }
        ]
      },
      editFormRules: {
        email: [
          { required: true, trigger: 'blur', message: '邮箱必填' },
          { type: 'email', trigger: 'blur', message: '邮箱格式错误' }
        ],
        mobile: [
          { type: 'number', trigger: 'blur', message: '手机号码必须是数字' }
        ]
      },
      roleChangeRules: {
        rid: { required: true, trigger: 'change', message: '此项必填' }
      }
    }
  },

  methods: {
    onOff(uid, type) {
      this.$http.put(`users/${uid}/state/${type}`).then(res => {
        if (res.data.meta.status !== 200) {
          return this.$message.error(res.data.meta.msg)
        }
        this.$message.success(res.data.meta.msg)
      })
    },
    refresh() {
      this.$refs.pagiRef.pagenum = 1
      this.$refs.pagiRef.refresh()
    },
    handleClose() {
      ;(
        this.$refs.editFormRef ||
        this.$refs.addFormRef ||
        this.$refs.roleChangeFormRef
      ).resetFields()
      this.addFormVisible = this.editFormVisible = this.roleChangeFormVisible = false
    },
    addNewUser() {
      this.$refs.addFormRef.validate(valid => {
        if (valid) {
          this.$http.post('/users', this.newUserFormData).then(res => {
            if (res.data.meta.status !== 201) {
              return this.$message.error(res.data.meta.msg)
            }
            this.$message.success(res.data.meta.msg)
            this.$refs.pagiRef.refresh()
            this.handleClose()
          })
        }
      })
    },
    openEdit(data) {
      this.chosenUser = data
      console.log(this.chosenUser)
      this.editFormVisible = true
    },
    openRoleChange(data) {
      this.chosenUser = data
      this.$http.get('/roles').then(res => {
        this.roleData = res.data.data
      })
      this.roleChangeFormVisible = true
    },
    editUserDone() {
      this.$refs.editFormRef.validate(valid => {
        if (valid) {
          this.$http
            .put(`users/${this.chosenUser.id}`, {
              email: this.chosenUser.email,
              mobile: this.chosenUser.mobile
            })
            .then(res => {
              if (res.data.meta.status !== 200) {
                return this.$message.error(res.data.meta.msg)
              }
              this.$message.success(res.data.meta.msg)
              this.$refs.pagiRef.refresh()
              this.handleClose()
            })
        }
      })
    },
    delUser(id) {
      this.$confirm('确定删除?', '删除用户').then(() => {
        this.$http.delete(`users/${id}`).then(res => {
          if (res.data.meta.status !== 200) {
            return this.$message.error(res.data.meta.msg)
          }
          this.$message.success(res.data.meta.msg)
          this.$refs.pagiRef.refresh()
        })
      })
    },
    roleChangeDone() {
      this.$refs.roleChangeFormRef.validate(valid => {
        if (valid) {
          this.$http
            .put(`users/${this.chosenUser.id}/role`, {
              rid: this.chosenUser.rid
            })
            .then(res => {
              this.$message.success(res.data.meta.msg)
              this.$refs.pagiRef.refresh()
              this.handleClose()
            })
        }
      })
    },
    async getTableData(query, pagenum, pagesize) {
      return this.$http.get('/users', {
        params: { query, pagenum, pagesize }
      })
    },
    getDataFromPagination(dt) {
      this.userData = dt.data.users
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  .el-card__body {
    padding: 20px;
    .el-table {
      margin-top: 15px;
    }
  }
}
</style>
