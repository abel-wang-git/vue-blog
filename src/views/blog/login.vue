<template>
  <div>
    <el-form v-if="type===1" ref="loginForm" :rules="rules" :model="loginForm" auto-complete="on">
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          prefix-icon="el-icon-s-custom"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="loginForm.password"
          type="password"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          prefix-icon="el-icon-key"
        />
      </el-form-item>
      <a @click="type=2">注册</a>
      <div style="text-align: center">
        <el-button size="mini" type="primary" @click="loginUser()">登录</el-button>
        <el-button size="mini" @click="cancelLogin()">取消</el-button>
      </div>
    </el-form>
    <el-form v-if="type===2" ref="registeredForm" :rules="rules" :model="loginForm" auto-complete="on">
      <el-row :gutter="5">
        <el-col v-for="(avatar, index) in avatars" :key="index" :span="3">
          <img :class="[index===avatarIndex? 'detail-avatar-chose': 'detail-avatar']" :src="avatar" @click="choseAvatar(avatar,index)">
        </el-col>
      </el-row>
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="登录邮箱"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          prefix-icon="el-icon-s-custom"
        />
      </el-form-item>

      <el-form-item prop="nickname">
        <el-input
          ref="username"
          v-model="loginForm.nickname"
          placeholder="昵称"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          prefix-icon="el-icon-user"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="loginForm.password"
          type="password"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          prefix-icon="el-icon-key"
        />
      </el-form-item>
      <el-form-item prop="repassword">
        <el-input
          ref="password"
          v-model="loginForm.repassword"
          type="password"
          placeholder="重复密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          prefix-icon="el-icon-key"
        />
      </el-form-item>
      <a @click="type=1">登录</a>
      <div style="text-align: center">
        <el-button size="mini" type="primary" @click="registered()">注册</el-button>
        <el-button size="mini" @click="cancelLogin()">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { checkEmail } from '../../utils/validate'
export default {
  name: 'Login',
  props: {
    visible: Boolean
  },
  data() {
    const validPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.loginForm.repassword !== '') {
          this.$refs.registeredForm.validateField('repassword')
        }
        callback()
      }
    }
    const validRePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.loginForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      type: 1,
      avatarIndex: 0,
      loginForm: {
        username: '',
        password: '',
        nickname: '',
        repassword: '',
        avatar: ''
      },
      avatars: [
        require('@/assets/blog/avatar1.png'),
        require('@/assets/blog/avatar2.png'),
        require('@/assets/blog/avatar3.png'),
        require('@/assets/blog/avatar4.png'),
        require('@/assets/blog/avatar5.png'),
        require('@/assets/blog/avatar6.png'),
        require('@/assets/blog/avatar7.png'),
        require('@/assets/blog/avatar8.png')
      ],
      rules: {
        username: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          { validator: validPassword, trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请输再次入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          { validator: validRePassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginUser() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$emit('setVisible', false)
          })
        }
      })
    },
    registered() {
      this.$refs.registeredForm.validate(valid => {
        if (valid) {
          this.loginForm.avatar = this.avatars[this.avatarIndex]
          this.$store.dispatch('user/registered', this.loginForm).then(() => {
            this.$emit('setVisible', false)
          })
        }
      })
    },
    choseAvatar(avatar, index) {
      this.avatarIndex = index
    },
    cancelLogin() {
      this.$emit('setVisible', false)
    }
  }
}
</script>

<style scoped>
  .detail-avatar{
    width: 100%;
    border: dashed 1px #5d9d45 ;
  }
  .detail-avatar-chose{
    width: 100%;
    border: solid 2px #5d9d45 ;
  }
</style>
