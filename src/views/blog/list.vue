<template>
  <div class="app-container">
    <el-header>
      <el-row>
        <el-col :span="2">
          <router-link :to="{path: '/article/add'}"><el-button size="mini" type="success" plain>添加app</el-button></router-link>
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
          <router-link :to="{path:'/article/detail',query:{id: scope.row.articleId}}">
            {{ scope.row.articleId }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="账号">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{row}">
          <router-link :to="{path:'/article/update',query:{id: row.articleId}}">
            <el-button size="mini">
              修改
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
import Pagination from '@/components/Pagination'
import ArticleApi from '@/api/article'

export default {
  name: 'List',
  components: { Pagination },
  data() {
    return {
      list: null,
      dialogVisible: false,
      roles: [],
      listLoading: true,
      page: { total: 0, size: 0, pageNum: 0 },
      editorId: null,

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      ArticleApi.list({ where: '[]' }).then(response => {
        this.list = response.data.list
        this.page = response.data
        this.listLoading = false
      })
    },
    nextPage() {
      this.listLoading = true
      ArticleApi.list(({ where: '[]', page: this.page.pageNum }).then(response => {
        this.list = response.data.list
        this.page.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
      )
    }
  }
}
</script>

<style scoped>

</style>
