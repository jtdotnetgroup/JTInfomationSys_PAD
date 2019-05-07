<template>
  <el-row id="timeAndLogout">
    <el-col id="time" :span="14">
      <span>{{date}}</span>
      <br>
      <span>{{time}}</span>
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
      iconPath: './imgs/icons/L_Shutdown2.png'
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
    }
  },
  computed: {
    time () {
      return this.$moment().format('HH:mm:ss')
    },
    date () {
      return this.$moment().format('YYYY年MM月DD日')
    }
  }
}
</script>

<style scoped>
#timeAndLogout {
  display: flex;
  align-items: center;
}
</style>
