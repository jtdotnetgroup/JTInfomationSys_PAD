<template>
  <!-- 模态框 -->
  <el-dialog :title="from.title" :visible.sync="Report" :width="from.width">
    <!-- 输入键盘 -->
    <el-form ref="form" :model="from">
      <el-form-item label>
        <!-- 输入框 -->
        <el-input v-model="from.num" :placeholder="from.placeholder"></el-input>
      </el-form-item>
      <!-- 生成键盘 -->
      <div v-for="(tmp, key, index) in Digital" :key="index">
        <el-button
          round
          v-for="(value, index) in tmp.inputNum"
          :key="index"
          @click="AddWZ({value})"
        >{{value}}</el-button>
        <br>
        <br>
      </div>
      <!-- 功能按钮 -->
      <el-button plain round @click="Empty">清空</el-button>
      <el-button type="danger" plain round @click="DELWZ">删除</el-button>
      <el-button type="primary" plain round @click="onSubmit">确认</el-button>
    </el-form>
  </el-dialog>
</template>
<!-- 脚本 -->
<script>
export default {
  data () {
    return {
      // 是否显示页面
      Report: false,
      // 页面基本数据
      from: {
        width: '30%',
        num: '',
        title: '汇报',
        placeholder: ''
      },
      // 数字键盘数据
      Digital: [
        { inputNum: [1, 2, 3, 4] },
        { inputNum: [5, 6, 7, 8] },
        { inputNum: [9, 0, '00', '.'] }
      ]
    }
  },
  // 声明方法
  methods: {
    // 增加数字文本
    AddWZ (obj) {
      this.from.num = this.from.num + '' + obj.value
    },
    // 回退键
    DELWZ () {
      this.from.num = this.from.num + ''
      this.from.num = this.from.num.slice(0, -1)
    },
    // 清空文本
    Empty () {
      this.from.num = ''
    },
    // 显示页面
    show (obj) {
      if (obj.num === 0) {
        obj.num = ''
      }
      this.Report = true
      this.from = obj
    },
    // 父页面处理成功由父页面关闭该窗口
    hide () {
      this.Report = false
    },
    // 将数据返回父页面
    onSubmit () {
      this.$emit('DigitalCallback', this.from)
    }
  }
}
</script>
<style>
</style>
