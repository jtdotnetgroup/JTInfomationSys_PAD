<template>
  <el-row id="timeAndLogout">
    <el-col :span="16">
      <span class="time">工号：{{WorkCode}}</span>
      <br>
      <span class="time">{{strdate}}</span>
      <span class="time">{{strtime}}</span>
    </el-col>
    <el-col :span="8">
      <div @click="logoutConfirm">
        <img :src="iconPath">
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { account } from '@/store/module/account'
export default {
  data () {
    return {
      WorkCode: sessionStorage.getItem('name'),
      iconPath: './imgs/icons/L_Shutdown2.png',
      strdate: this.$moment().format('YYYY年MM月DD日'),
      strtime: this.$moment().format('HH:mm')
    }
  },
  methods: {
    logoutConfirm () {
      this.$confirm('确定要退出系统并注销吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.logout()
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消退出"
          // });
        })
    },
    logout () {
      this.$store.dispatch('account/Logout')
      this.$router.replace('/login')
    },
    timer () {
      this.strdate = this.$moment().format('YYYY年MM月DD日')
      this.strtime = this.$moment().format('HH:mm')
    }
  },
  created: function () {
    setInterval(this.timer, 60000)
  }
}
</script>

<style scoped>
#timeAndLogout {
  display: flex;
  align-items: center;
}
.time {
  font-size: 18px;
  color: white;
}
</style>
