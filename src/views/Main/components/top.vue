<template>
  <header class="el-header">
    <el-row>
      <el-col :span="5">&nbsp;</el-col>
      <el-col :span="14" class="title">车间自助工作台</el-col>
      <el-col :span="5">
        <TimeAndLogout/>
      </el-col>
    </el-row>
  </header>
  <!-- <div>
        <el-row>
            <el-col :span="5">&nbsp;</el-col>
            <el-col id="title" :span="14">车间自助工作台</el-col>
            <el-col :span="5">
                <TimeAndLogout />
            </el-col>
        </el-row>
  </div>-->
</template>

<script>
export default {
  components: {
    TimeAndLogout: () => import('@/components/timeAndLogout.vue')
  }
}
</script>

<style  scoped>
#time {
  vertical-align: middle;
}
.title {
  font-size: 2.8rem;
  line-height: 4.5rem;
  font-weight: bold;
  vertical-align: middle;
  color: #fff;
}
#icon {
  float: right;
  margin-right: 2vw;
}
.el-icon-setting {
  font-size: 32px;
}
</style>
