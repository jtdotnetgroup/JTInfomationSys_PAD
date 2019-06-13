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
        <el-input type="textarea" rows="4" v-model="form.FNote"></el-input>
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
import { GetMx, AddOrPUT, DataAdd, DataAddOrPUT } from '@/api/mission'
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
        FNote: '',
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
    hide () {
      this.OpenWork = false
    },
    onSubmit () {
      var _this = this
      var obj = {
        FID: _this.form.FID,
        FSrcID: _this.form.FSrcID,
        FNote: _this.form.FNote
      }
      var tmjx = []
      // {FItemID:0,FUnitID:0,FBatchNo:''}  此处解析
      _this.CLPC.forEach(item => {
        // item.val //{FItemID:0,FUnitID:0,:''}
        tmjx.push({ FItemID: 0, FUnitID: 0, FBatchNo: item.title })
      })
      obj.tmjx = tmjx
      _this.loading = true
      DataAddOrPUT('ICMaterialPicking/CreateOrUpdate', obj)
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            _this.$emit('addSuccess')
            _this.hide()
            _this.$message({
              message: '提交成功',
              type: 'success'
            })
          }
          _this.loading = false
        })
        .catch(function () {
          _this.loading = false
          _this.$message.error('操作失败，请稍后重试！')
        })
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
      var result = this.CLPC.filter((e) => {
        return e.val !== val
      })

      this.CLPC = result
    },
    Detailed (obj) {
      var _this = this
      _this.CLPC = []
      GetMx('ICMaterialPicking/Get', obj)
        .then(res => {
          console.log(res) // 返回对象
          if (res.status === 200) {
            // console.log(200); // 返回对象
            var result = res.data.result
            result.forEach(item => {
              _this.form.FNote = item.fNote
              _this.CLPC.push({ val: item.fBatchNo, title: item.fBatchNo })
            })
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
