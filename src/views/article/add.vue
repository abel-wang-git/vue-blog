<template>
  <div class="app-container">
    <el-form ref="article" :model="article" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="标题" prop="title">
            <el-input v-model="article.title"/>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="分类" prop="sortid">
            <el-select v-model="article.sortid" placeholder="">
              <el-option label="院内教育" value="1"/>
              <el-option label="科普" value="2"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="wzmsg" label-width="0px">
        <editor v-model="article.wzmsg" :content="article.wzmsg" @getContent="getContent"/>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editor from '@/components/Editor'
import { save, update } from '@/api/article'
import { Message } from 'element-ui'

export default {
  components: { Editor },
  data() {
    return {
      article: {
        title: '',
        wzmsg: '',
        sortid: '',
        id: ''
      },
      rules: {
        title: [{ required: true, message: '请添加标题', trigger: 'blur' }],
        sortid: [{ required: true, message: '请选择分类', trigger: 'blur' }],
        wzmsg: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    getContent: function(data) {
      this.article.wzmsg = data
    },
    onSubmit: function() {
      this.$refs.article.validate(valid => {
        if (valid) {
          if (!this.article.id) {
            save(this.article).then(response => {
              Message({
                message: response.message || 'success',
                type: 'success',
                duration: 2 * 1000
              })
              if (response.code === 200) {
                this.article.id = response.data
              }
            })
          } else {
            update(this.article).then(response => {
              Message({
                message: response.message || 'success',
                type: 'success',
                duration: 2 * 1000
              })
              if (response.code === 200) {
                this.article.id = response.data
              }
            })
          }
        }
      })
    }
  }

}

</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>
<style>
  .ck-content {
    min-height: 300px;
  }
</style>

