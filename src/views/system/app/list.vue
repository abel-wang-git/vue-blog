<template>
  <div class="app-container">
    <el-header>
      <el-row>
        <el-col :span="2">
          <router-link to="../sys/app/add"><el-button size="mini" type="success" plain>添加app</el-button></router-link>
        </el-col>
      </el-row>
    </el-header>
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
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="下载页">
        <template slot-scope="scope">
          <a :href="scope.row.indexUrl">{{ scope.row.indexUrl }}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <router-link :to="{path:'/app/history/add',query: {appId: scope.row.id, appName: scope.row.name }}">
            <el-button size="mini">
              发布
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="page.total"
      :page.sync="page.pageNum"
      :limit.sync="page.size"
      @pagination="nextPage"
    />
  </div>

</template>

<script>
import AppApi from '@/api/app'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
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
      AppApi.getList().then(response => {
        this.list = response.data.list
        this.page = response.data
        this.listLoading = false
      })
    },
    nextPage() {
      this.listLoading = true
      this.param.page = this.page.pageNum
      AppApi.getList().then(response => {
        this.list = response.data.list
        this.page.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }
  }
}
</script>
