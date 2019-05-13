<template>
  <div class="fullscreen">
    <div id="formdiv">
      <div id="title">
        <span>{{title}}</span>
      </div>
      <el-form :model="form" inline ref="form" :rules="formrules" label-width="80px">
        <el-form-item label="工号：" prop="username">
          <el-input clearable v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" clearable v-model="form.password" placeholder></el-input>
        </el-form-item>

        <div id="buttons">
          <el-form-item>
            <el-button type="success" @click="onSubmit" icon="el-icon-success">登录</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="resetForm">重置</el-button>
            <el-button type="danger" icon="el-icon-error" @click="closeApp">退出</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import UserInfo from '@/config/UserInfo.js'
export default {
  name: 'login',
  data () {
    return {
      title: '系统登录',
      form: {
        username: '',
        password: ''
      },
      formrules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' }
        ],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$store
            .dispatch('account/Login', {
              username: this.form.username,
              password: this.form.password
            })
            .then(
              response => {
                // 登录成功
                this.$router.push('/')
              },
              () => {
                // 登录失败
                console.log('登录失败')
              }
            )
        } else {
        }
      })
    },
    resetForm () {
      this.$refs['form'].resetFields()
    },
    closeApp () {
      winForm.ExitApp()
    }
  }
}
</script>

<style scoped>
#formdiv {
  background: #fff;
  padding: 1%;
  border-radius: 5px;
}
.fullscreen {
  display: flex;
  align-items: center;
  background: rgb(55, 162, 233);
  justify-content: center;
}
.el-form {
  flex-grow: 1;
}
#title {
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid #999;
  margin-bottom: 3%;
  padding-bottom: 2%;
}
#buttons {
  border-top: 1px solid #999;
  margin-top: 1%;
  padding-top: 3%;
}
</style>
