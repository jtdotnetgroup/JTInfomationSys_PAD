<template>
  <el-dialog title="异常报告" :visible.sync="AbnormalReport" width="30%" v-loading="loading">
    <el-form ref="from" :model="from">
      <el-form-item label="异常原因：" prop="FRemark">
        <el-radio-group v-model="from.FRemark">
          <el-radio
            v-for="FRemark in FRemarkOptions"
            :label="FRemark"
            :key="FRemark"
            name="FRemark"
          >{{FRemark}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="报告人：" prop="FBiller">
        <el-input v-model="from.FBiller"></el-input>
      </el-form-item>
      <el-form-item label="报告时间：" prop="FTime">
        <el-input v-model="from.FTime"></el-input>
      </el-form-item>
      <el-form-item label="恢复时间：" prop="FRecoverTime">
        <el-input v-model="from.FRecoverTime"></el-input>
      </el-form-item>
      <el-form-item style="text-align:right;">
        <el-button type="danger" @click="onSubmit('YC')">异常</el-button>
        <el-button type="success" @click="onSubmit('HF')">恢复</el-button>
        <el-button @click="AbnormalReport = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
//
import { GetAll, DataPUT, DataAddOrPUT } from '@/api/mission'
export default {
  data () {
    return {
      loading: false,
      AbnormalReport: false,
      from: {
        // 异常
        FID: '',
        FSrcID: '',
        FBiller: '',
        FTime: '',
        FRemark: '',
        FRecoverTime: '',
        FNote: ''
      },
      FRemarkOptions: [
        '人员请假',
        '设备异常',
        '材料异常',
        '人员调用',
        '其他原因'
      ]
    }
  }, // 声明方法
  methods: {
    show (obj) {
      this.AbnormalReport = true
      this.Detailed(obj)
    },
    hide () {
      this.AbnormalReport = false
    },
    // 提交
    onSubmit (type) {
      var _this = this
      switch (type) {
        case 'YC': {
          break
        }
        case 'HF': {
          break
        }
        default: {
          break
        }
      }
      this.loading = true
      DataAddOrPUT('ICException/CreateAndUpdate', this.from)
        .then(res => {
          console.log(res)
          this.$notify({
            title: '系统提示',
            message: '修改成功',
            type: 'success'
          })
          _this.$emit('addSuccess')
          this.hide()
          this.loading = false
        })
        .catch(function () {
          this.loading = false
        })
    },
    // 明细
    Detailed (obj) {
      var _this = this
      this.loading = true
      this.from.FID = obj.FID
      this.from.FSrcID = obj.FSrcID
      // console.log(obj)
      GetAll('ICException/Get', obj)
        .then(res => {
          // console.log(res); // 返回对象
          if (res.status === 200) {
            // console.log(200); // 返回对象
            var result = res.data.result
            // 异常
            if (result != null) {
              this.from.FBiller = result.fBiller
              this.from.FTime = result.fTime
              this.from.FRemark = result.fRemark
              this.from.FRecoverTime = result.fRecoverTime
              this.from.FNote = result.fNote
            } else {
              _this.$refs['from'].resetFields()
            }
          }
          this.loading = false
        })
        .catch(function () {
          this.loading = false
        })
    }
  }
}
</script>
