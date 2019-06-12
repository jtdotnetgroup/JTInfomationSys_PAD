<!-- 页面 -->
<template>
  <div
    style="background-color: rgb(242,247,251);padding: 5px 10px;position: fixed;width: -webkit-fill-available;bottom: 0px;"
  >
    <el-button @click="Prev" class="FYIcon" icon="el-icon-arrow-left" circle></el-button>
    <el-button @click="Home" class="FYIcon" icon="el-icon-d-arrow-left" circle></el-button>
    <el-select
      placeholder="1/1页"
      style="width:140px;margin:0px 10px;position: relative;top: -7px;"
      size="medium"
      @change="changePageIndex"
      v-model="optionsSel"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-button @click="Last" class="FYIcon" icon="el-icon-d-arrow-right" circle></el-button>
    <el-button @click="Next" class="FYIcon" icon="el-icon-arrow-right" circle></el-button>
  </div>
</template>

<!-- 脚本 -->
<script>
//
export default {
  data () {
    return {
      // 下拉分页
      // options: [],
      optionsSel: '1/1页',
      Page: { PageIndex: this.PageIndex, TotalPage: 0 }
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
    // 页索引
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
    }
    // // 总页数
    // TotalPage: {
    //   type: Number,
    //   default: () => {
    //     return 0
    //   }
    // }
  },
  methods: {
    // 上一页
    Prev () {
      if (this.Page.PageIndex === 1) return
      this.Page.PageIndex--
      this.Refresh()
    },
    // 下一页
    Next () {
      if (this.Page.PageIndex >= this.Page.TotalPage) return
      this.Page.PageIndex++
      this.Refresh()
    },
    // 首页
    Home () {
      this.Page.PageIndex = 1
      this.Refresh()
    },
    // 尾页
    Last () {
      this.Page.PageIndex = this.Page.TotalPage
      this.Refresh()
    },
    // 切换页数
    changePageIndex (val) {
      this.Page.PageIndex = val
      this.Refresh()
    },
    // 计算总页数生成下拉分页
    CountTotalPage () {
      // var _this = this
      // // 计算总页数
      // this.TotalPage = Math.ceil(this.TotalNum / this.PageSize) // Math.ceil 为向上取整,有小数就整数部分加1 Math.ceil(5/2)  结果= 3
      // this.TotalPage = this.TotalPage === 0 ? 1 : this.TotalPage
      // // 生成下拉分页并且清空之前的分页
      // this.options = []
      // for (var i = 1; i < _this.TotalPage + 1; i++) {
      //   this.options.push({
      //     label: i + ' / ' + _this.TotalPage + '页',
      //     value: i
      //   })
      // }
    },
    // 刷新
    Refresh () {
      this.optionsSel = this.Page.PageIndex
      var obj = { PageIndex: this.Page.PageIndex }
      this.$emit('RefreshPage', obj)
      this.$emit('Refresh', obj)
    }
  },
  computed: {
    options () {
      var _this = this
      // 计算总页数
      if (_this.TotalNum === 0) {
        _this.Page.TotalPage = 1
      } else {
        _this.Page.TotalPage = Math.ceil(_this.TotalNum / _this.PageSize) * 1 // Math.ceil 为向上取整,有小数就整数部分加1 Math.ceil(5/2)  结果= 3
      }
      _this.Page.TotalPage = _this.Page.TotalPage === 0 ? 1 : _this.Page.TotalPage
      // 生成下拉分页并且清空之前的分页
      const option = []
      for (var i = 1; i < _this.Page.TotalPage + 1; i++) {
        option.push({
          label: i + ' / ' + _this.Page.TotalPage + '页',
          value: i
        })
      }
      return option
    }
  },
  // 创建前
  beforeCreate () {
    // this.CountTotalPage();
  },
  created () {
    this.optionsSel = 1
  }
}
</script>

<!-- CSS 样式 -->
<style>
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
