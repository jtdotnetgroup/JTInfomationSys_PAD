<template>
    <div>
        <el-row>
            <el-col :span="5">&nbsp;</el-col>
            <el-col id="title" :span="14">车间自助工作台</el-col>
            <el-col :span="5">
                <TimeAndLogout />
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  components: {
    TimeAndLogout: () => import('@/components/timeAndLogout.vue')
  }
}
</script>

<style  scoped>
    #time{
        vertical-align: middle;
    }
    #title{
        font-size: 2em;
        font-weight: bold;
        color: #fff;
        padding-top: 2%;
    }
    #icon{
        float: right;
        margin-right: 2vw;
    }
    .el-icon-setting{
        font-size: 32px;
    }

</style>
