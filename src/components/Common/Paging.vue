<!-- 页面 -->
<template>
  <div
    style="background-color: rgb(242,247,251);padding: 5px 10px;position: fixed;width: -webkit-fill-available;bottom: 0px;"
  >
    <el-button class="FYIcon" icon="el-icon-arrow-left" circle></el-button>
    <el-button class="FYIcon" icon="el-icon-d-arrow-left" circle></el-button>
    <el-select
      v-model="FY"
      placeholder="1/1"
      style="width:110px;margin:0px 10px;position: relative;top: -7px;"
      size="medium"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-button class="FYIcon" icon="el-icon-d-arrow-right" circle></el-button>
    <el-button class="FYIcon" icon="el-icon-arrow-right" circle></el-button>
  </div>
</template>

<!-- 脚本 -->
<script>
export default {
  data () {
    return {
    }
  },
  //
  props: {
    // 页容量
    PageSize: {
      type: Number,
      default: () => {
        return 10
      }
    },
    // 页大小
    PageIndex: {
      type: Number,
      required: true
    },
    // 总条数
    TotalNum: {
      type: Number,
      default: () => {
        return 0
      }
    },
    // 总页数
    TotalPage: {}
  },
  methods: {
    // 上一页
    Previous () {
      this.PageIndex++
      this.Refresh()
    },
    // 下一页
    Next () {
      this.PageIndex++
      this.Refresh()
    },
    // 首页
    Home () {
      this.PageIndex = 0
      this.Refresh()
    },
    // 尾页
    Last () {
      this.PageIndex = this.TotalPage
      this.Refresh()
    },
    // 刷新
    Refresh () {}
  }
}
</script>

<!-- CSS 样式 -->
<style lang="scss" scoped>
.FYIcon {
  font-size: 35px;
}
.el-input--medium .el-input__inner {
  height: 45px !important;
  line-height: 36px;
}
.el-input__inner {
  font-size: large !important;
}
</style>
