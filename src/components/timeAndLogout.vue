<template>
  <el-row id="timeAndLogout">
    <el-col :span="14">
      <span class="time">工号：{{WorkCode}}</span>
       <br>
      <span class="time">{{strdate}}</span>
      <span class="time">{{strtime}}</span>
    </el-col>
    <el-col :span="10">
      <div @click="logoutConfirm">
        <img :src="iconPath">
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      WorkCode: '1001',
      iconPath: './imgs/icons/L_Shutdown2.png',
      strdate: this.$moment().format('YYYY年MM月DD日'),
      strtime: this.$moment().format('HH:mm:ss')
    }
  },
  methods: {
    logoutConfirm () {
      this.$confirm('确定要退出系统并注销吗？', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'question',
        callback: action => {
          this.logout()
        }
      })
    },
    logout () {
      this.$store.dispatch('account/Logout')
      this.$router.replace('/login')
    },
    timer () {
      this.strdate = this.$moment().format('YYYY年MM月DD日')
      this.strtime = this.$moment().format('HH:mm:ss')
    }
  },
  created: function () {
    setInterval(this.timer, 1000)
  }
}
</script>

<style scoped>
#timeAndLogout {
  display: flex;
  align-items: center;
}
.time{
  font-size: 18px;
  color: white;
}
</style>
