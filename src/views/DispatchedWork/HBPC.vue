<template>
  <!-- 模态框 -->
  <el-dialog
    :title="FormStyle.title"
    :visible.sync="FormStyle.dialogVisible"
    :width="FormStyle.width"
    :before-close="handleClose"
    v-loading="loading"
  >
    <!-- 表单提交 -->
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="检验单号：">
        <el-input v-model="form.fBillNo" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="批次号：">
        <el-input v-model="form.BatchNum"></el-input>
      </el-form-item>
      <el-form-item label="汇报数：">
        <div @click="DigitalOpen">
          <el-input v-model="form.num"></el-input>
        </div>
      </el-form-item>
      <el-form-item style="text-align: right;">
        <el-button type="primary" @click="onSubmit">修改汇报</el-button>
        <el-button @click="FormStyle.dialogVisible=false">取消</el-button>
      </el-form-item>
    </el-form>
    <!-- 打开数字键盘 以及接受回调 -->
    <Digital ref="Digital" @DigitalCallback="DigitalCallback"/>
  </el-dialog>
</template>
<script>
// 数据处理
import {
  GetAll,
  DataPUT,
  DataAddOrPUT,
  AddOrPUT,
  DataAdd,
  DataPUT2
} from '@/api/mission'
export default {
  components: {
    Digital: () => import('@/components/Common/Digital.vue')
  },
  data () {
    return {
      loading: false,
      // 页面基本数据
      form: {
        FID: '',
        BatchNum: '',
        num: '',
        fBillNo: '',
        FAuxQty: 0
      },
      FormStyle: {
        dialogVisible: false,
        title: '',
        width: '30%'
      }
    }
  },
  // 声明方法
  methods: {
    ShowLod () {
      this.loading = true
    },
    HideLod () {
      this.loading = false
    },
    handleClose () {},
    // 键盘回调
    DigitalCallback (obj) {
      this.form.num = obj.num
      this.$refs.Digital.hide()
    },
    DigitalOpen () {
      var obj = {
        width: '30%',
        num: this.form.num,
        title: '汇报数',
        placeholder: '当前数量' + this.form.num,
        key: 1
      }
      this.$refs.Digital.show(obj)
    },
    // 清空文本
    Empty () {
      this.form.num = ''
    },
    // 显示页面
    show (obj) {
      if (obj.num === 0) {
        obj.num = ''
      }
      this.FormStyle.dialogVisible = true

      this.form.FID = obj.FID
      this.form.BatchNum = obj.BatchNum
      this.form.num = obj.num
      this.form.fBillNo = obj.fBillNo
    },
    // 父页面处理成功由父页面关闭该窗口
    hide () {
      this.FormStyle.dialogVisible = false
    },
    // 将数据返回父页面
    onSubmit () {
      var _this = this
      this.ShowLod()
      this.form.FAuxQty = this.form.num * 1
      DataPUT2('ICMOInspectBill/UpdateFAuxQty', this.form)
        .then(res => {
          if (res.data.result) {
            this.$notify({
              title: '系统提示',
              message: '修改汇报成功',
              type: 'success'
            })
            _this.hide()
            _this.HideLod()
            _this.$emit('addSuccess', _this.form)
            this.from.num = 0
            _this.from.BatchNum = ''
          } else {
            this.$message.error('操作失败,请稍后重试')
          }
        })
        .catch(function () {
          this.$message.error('操作失败,请稍后重试')
          this.HideLod()
        })
    }
  }
}
</script>
<style>
</style>
