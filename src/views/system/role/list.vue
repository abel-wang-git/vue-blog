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
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="desc">
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="update(row)">
            修改
          </el-button>
          <el-button size="mini" @click="openPowerDialog(row)">
            编辑
          </el-button>
          <el-button v-if="checkPermission(['admin'])" type="danger" size="mini" @click="update(row)">
            删除
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
    <el-dialog title="添加权限" :visible.sync="dialogVisible" width="30%">
      <el-tree ref="tree" :data="powers" show-checkbox node-key="id" highlight-current :props="etreeProps" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPower">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import RoleApi from '@/api/role'
import Pagination from '@/components/Pagination'
import checkPermission from '@/utils/permission'

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      powers: null,
      listLoading: true,
      dialogVisible: false,
      dialogId: null,
      page: { total: 0, size: 0, pageNum: 0 },
      etreeProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    checkPermission,
    fetchData() {
      this.listLoading = true
      RoleApi.getList({ where: '[]' }).then(response => {
        this.list = response.data.list
        this.page = response.data
        this.listLoading = false
      })
    },
    nextPage() {
      this.listLoading = true
      RoleApi.getList({ where: '[]', page: this.page.pageNum }).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    update(row) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
    },
    delete(row) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
    },
    openPowerDialog(row) {
      RoleApi.powerList().then(response => {
        this.powers = response.data
        RoleApi.rolePowerList({ roleId: row.id }).then(
          response => {
            var ids = []
            response.data.forEach(function(power, index) {
              ids.push(power.id)
            })
            this.$refs.tree.setCheckedKeys(ids)
          }
        )
      })
      this.dialogId = row.id
      this.dialogVisible = true
    },
    addPower() {
      var check = this.$refs.tree.getCheckedKeys()
      RoleApi.addPower({ powers: JSON.stringify(check), roleId: this.dialogId }).then(response => {
        this.$message({
          message: response.message,
          type: 'success'
        })
      })
    }
  }

}
</script>
