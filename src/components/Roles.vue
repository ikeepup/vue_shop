<template>
  <div class="roles-container">
    <bread-crumb :tires="tires"></bread-crumb>
    <el-card>
      <div>
        <el-row>
          <el-button type="primary" @click="addFormVisible=true">添加角色</el-button>
        </el-row>
        <el-table :data="roleData" stripe style="width: 100%" border>
          <el-table-column type="expand">
            <template slot-scope="roles">
              <el-row
                v-for="child in roles.row.childrens"
                :key="child.id"
                class="expand-row-tire1"
                type="flex"
                align="middle"
              >
                <el-col :span="5">
                  <el-tag closable @close="removeRight(roles.row,child.id)">{{child.authName}}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="19">
                  <el-row
                    v-for="grandChild in child.children"
                    :key="grandChild.id"
                    type="flex"
                    align="middle"
                    class="expand-row-tire2"
                  >
                    <el-col :span="6">
                      <el-tag
                        closable
                        type="success"
                        @close="removeRight(roles.row, grandChild.id)"
                      >{{grandChild.authName}}</el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col :span="18">
                      <el-tag
                        closable
                        type="warning"
                        @close="removeRight(roles.row, gGrandChild.id)"
                        v-for="gGrandChild in grandChild.children"
                        :key="gGrandChild.id"
                      >{{gGrandChild.authName}}</el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column label="角色名称" prop="roleName"></el-table-column>
          <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="top"
                :enterable="false"
              >
                <el-button type="primary" size="mini" @click="openEdit(scope.row.id)">
                  <i class="el-icon-edit"></i>编辑
                </el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="top"
                :enterable="false"
              >
                <el-button type="danger" size="mini" @click="delRole(scope.row.id)">
                  <i class="el-icon-delete"></i>删除
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
                  <i class="el-icon-setting"></i>分配权限
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="修改权限" :visible.sync="editFormVisible">
          <el-form :model="chosenUser" ref="editFormRef" :rules="editFormRules">
            <el-form-item label="角色名称" label-width="100px" prop="roleName">
              <el-input v-model="chosenUser.roleName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" label-width="100px" prop="roleDesc">
              <el-input v-model="chosenUser.roleDesc" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editFormVisible=false">取 消</el-button>
            <el-button type="primary" @click="editUserDone">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="roleChangeFormVisible" @opened="handleOpen" title="分配权限">
          <el-row>
            <el-col>{{chosenUser.roleName}}</el-col>
          </el-row>
          <el-tree
            :data="rightsData"
            show-checkbox
            node-key="id"
            default-expand-all
            :props="defaultProps"
            ref="tree"
          ></el-tree>
          <div slot="footer" class="dialog-footer">
            <el-button @click="roleChangeFormVisible=false">取 消</el-button>
            <el-button type="primary" @click="roleChangeDone">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="添加角色"
          :visible.sync="addFormVisible"
          @close="$refs.addFormRef.resetFields()"
        >
          <el-form :model="newRole" ref="addFormRef" :rules="addFormRules">
            <el-form-item label="角色名称" label-width="100px" prop="roleName">
              <el-input v-model="newRole.roleName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" label-width="100px" prop="roleDesc">
              <el-input v-model="newRole.roleDesc" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addFormVisible=false">取 消</el-button>
            <el-button type="primary" @click="addUserDone">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getTableData()
  },
  data() {
    return {
      tires: ['权限管理', '角色列表'],
      roleData: [],
      rightsData: [],
      editFormVisible: false,
      roleChangeFormVisible: false,
      addFormVisible: false,
      chosenUser: {},
      newRole: { roleName: '', roleDesc: '' },
      idArray: [],
      editFormRules: {
        roleName: { required: true, message: '角色名必填', trigger: 'blur' }
      },
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      addFormRules: {
        roleName: { required: true, message: '角色名必填', trigger: 'blur' }
      }
    }
  },
  methods: {
    getTableData() {
      this.$http.get('/roles').then(res => {
        this.roleData = res.data.data
        this.roleData.forEach(item => {
          this.$set(item, 'childrens', item.children)
          delete item.children
        })
      })
    },
    handleOpen() {
      this.$refs.tree.setCheckedKeys(this.idArray, true)
    },
    // handleClose() {
    //   this.$refs.addFormRef.resetFields()
    // },
    addUserDone() {
      this.$http.post('roles', this.newRole).then(res => {
        if (res.data.meta.status !== 201) {
          return this.$message.error(res.data.meta.msg)
        }
        this.$message.success(res.data.meta.msg)
        this.addFormVisible = false
        this.getTableData()
      })
    },
    removeRight(role, rid) {
      this.$confirm('确认删除这个权限么?', '提示').then(() => {
        this.$http
          .delete(`roles/${role.id}/rights/${rid}`)
          .then(res => {
            this.$message.success(res.data.meta.msg)
            role.childrens = res.data.data
          })
          .catch(() => {})
      })
    },
    openEdit(id) {
      this.$http.get(`/roles/${id}`).then(res => {
        this.chosenUser = res.data.data
      })
      this.editFormVisible = true
    },
    editUserDone() {
      this.$refs.editFormRef.validate(valid => {
        if (valid) {
          this.$http
            .put(`/roles/${this.chosenUser.roleId}`, {
              roleName: this.chosenUser.roleName,
              roleDesc: this.chosenUser.roleDesc
            })
            .then(res => {
              if (res.data.meta.status !== 200) {
                return this.$message.error(res.data.meta.msg)
              }
              this.$message.success(res.data.meta.msg)
              this.getTableData()
              this.editFormVisible = false
            })
        }
      })
    },
    delRole(id) {
      this.$confirm('确定删除?', '删除角色')
        .then(() => {
          this.$http.delete(`roles/${id}`).then(res => {
            if (res.data.meta.status !== 200) {
              return this.$message.error(res.data.meta.msg)
            }
            this.$message.success(res.data.meta.msg)
            this.getTableData()
          })
        })
        .catch(() => {})
    },
    openRoleChange(data) {
      this.$http.get('/rights/tree').then(res => {
        this.rightsData = res.data.data
      })
      this.chosenUser = data
      this.idArray = []
      data.childrens.forEach(item => {
        item.children.forEach(item => {
          item.children.forEach(item => {
            this.idArray.push(item.id)
          })
        })
      })
      this.roleChangeFormVisible = true
    },
    roleChangeDone() {
      let rids = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys())
        .join(',')
      this.$http
        .post(`roles/${this.chosenUser.id}/rights`, { rids })
        .then(res => {
          this.$message.success(res.data.meta.msg)
          this.roleChangeFormVisible = false
          this.getTableData()
        })
    }
  }
}
</script>

<style lang="less" scoped>
.el-row.expand-row-tire1 {
  border-bottom: 1px solid rgb(235, 238, 245);
}
.el-row.expand-row-tire1:nth-child(1) {
  border-bottom: 1px solid rgb(235, 238, 245);
  border-top: 1px solid rgb(235, 238, 245);
}
.el-row.expand-row-tire2 {
  border-top: 1px solid rgb(235, 238, 245);
}
.el-row.expand-row-tire2:nth-child(1) {
  border: none;
}

.el-tag {
  margin: 10px 5px;
}
</style>
