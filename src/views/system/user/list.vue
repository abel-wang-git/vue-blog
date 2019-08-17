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
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!--<el-button type="primary" @click="">确 定</el-button>-->
      </span>
    </el-dialog>
  </div>

</template>

<script>
import { getList } from '@/api/user'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      dialogVisible: false,
      props: {
        label: 'name',
        children: 'zones'
      },
      roles: null,
      listLoading: true,
      page: { total: 0, size: 0, pageNum: 0 }
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
      this.dialogVisible = true
    }
  }

}
</script>
