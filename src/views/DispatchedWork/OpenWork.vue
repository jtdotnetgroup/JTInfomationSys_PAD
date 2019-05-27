<template>
  <el-dialog title="开工报告" :visible.sync="OpenWork" width="30%" v-loading="loading">
    <el-form ref="form" :model="form" label-position="top" style="text-align: left;">
      <el-form-item label="材 料 码：">
        <el-input type="textarea" :rows="4" v-model="form.MaterialCode"></el-input>
      </el-form-item>
      <el-form-item label="材料批次：">
        <el-button
          v-for="item in CLPC"
          round
          :key="item.val"
          @click="delCLPC(item.val)"
        >{{item.title}}</el-button>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input type="textarea" rows="4" v-model="form.BZ"></el-input>
      </el-form-item>
      <el-form-item style="text-align:right;">
        <el-button type="primary" @click="BCAnalysis">条码解析</el-button>
        <el-button @click="onSubmit">保存提交</el-button>
        <el-button @click="OpenWork = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// 数据处理
import { GetMx, AddOrPUT, DataAdd } from '@/api/mission'
export default {
  // 所有数据
  data () {
    return {
      loading: false,
      OpenWork: false,
      form: {
        FID: 0,
        FSrcID: 0,
        MaterialCode: '',
        BZ: '',
        region: []
      },
      CLPC: []
    }
  },
  // 声明方法
  methods: {
    show (obj) {
      this.OpenWork = true
      this.form.FID = obj.FID
      this.form.FSrcID = obj.FSrcID
      this.Detailed(obj)
    },
    onSubmit () {
      var obj = {}
      var tmjx = []
      this.CLPC.forEach(item => {
        tmjx.push(item.val)
      })
      obj.tmjx = tmjx
      this.loading = true
      DataAdd('ICMaterialPicking/CreateOrUpdate', obj)
        .then(res => {
          if (res.status === 200) {

          }
          this.loading = false
        })
        .catch(function () {
          this.loading = false
        })
      _this.$emit('addSuccess')
    },
    BCAnalysis () {
      var CLPC = []
      this.form.MaterialCode.split(';').forEach(item => {
        var obj = { val: item, title: item.split(',')[0] }
        CLPC.push(obj)
      })
      this.CLPC = CLPC
    },
    delCLPC (val) {
      var _this = this
      this.CLPC.forEach(item => {
        var index = item.val.indexOf(val)
        if (index > -1) {
          _this.CLPC.splice(index, 1)
        }
      })
    },
    Detailed (obj) {
      var _this = this
      GetMx('ICMaterialPicking/Get', obj)
        .then(res => {
          // console.log(res); // 返回对象
          if (res.status === 200) {
            // console.log(200); // 返回对象
            var result = res.data.result
            // 异常
            if (result != null) {
            } else {
              _this.$refs['from'].resetFields()
            }
          }
          _this.loading = false
        })
        .catch(function () {
          _this.loading = false
        })
    }
  }
}
</script>
<style scoped>
.el-select {
  width: 100%;
}
</style>
