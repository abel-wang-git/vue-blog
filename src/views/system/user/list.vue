<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="账号">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{row}">
          <el-button size="mini" @click="openPowerDialog(row)">
            修改角色
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="page.total"
      :page.sync="page.pageNum"
      :limit.sync="page.size"
      @pagination="nextPage"
    />
    <el-dialog title="角色编辑" :visible.sync="dialogVisible" width="30%">
      <el-tree ref="tree" :data="roles" show-checkbox node-key="id" highlight-current :props="props" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import { getList, updateRole, getRole } from '@/api/user'
import RoleApi from '@/api/role'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      dialogVisible: false,
      props: {
        label: 'name',
        children: ''
      },
      roles: [],
      listLoading: true,
      page: { total: 0, size: 0, pageNum: 0 },
      editorId: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList({ where: '[]' }).then(response => {
        this.list = response.data.list
        this.page = response.data
        this.listLoading = false
      })
    },
    nextPage() {
      this.listLoading = true
      getList({ where: '[]', page: this.page.pageNum }).then(response => {
        this.list = response.data.list
        this.page.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    openPowerDialog(row) {
      getRole({ userId: row.id }).then(response => {
        var ids = []
        response.data.forEach(function(role, index) {
          ids.push(role.id)
        })
        this.$refs.tree.setCheckedKeys(ids)
      })
      this.editorId = row.id
      RoleApi.getList({ where: '[]' }).then(respones => {
        this.roles = respones.data.list
      })
      this.dialogVisible = true
    },
    updateRole() {
      var check = this.$refs.tree.getCheckedKeys()
      updateRole({ roles: JSON.stringify(check), userId: this.editorId }).then(respones => {
        if (respones.code === 200) {
          this.dialogVisible = false
        }
      })
    }
  }

}
</script>
