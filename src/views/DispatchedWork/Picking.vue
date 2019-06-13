<template>
  <el-dialog title="领料" :visible.sync="Picking" width="30%">
    <el-form ref="form" :model="form">
      <el-form-item style="text-align:right;">
        <el-button @click="onSubmit('BC')">保存</el-button>
        <el-button @click="Picking = false">取消</el-button>
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
      Picking: false,
      form: {}
    }
  }, // 声明方法
  methods: {
    show (obj) {
      this.Picking = true
      this.Detailed(obj)
    },
    hide () {
      this.Picking = false
    },
    // 提交
    onSubmit (type) {
      switch (type) {
        default: {
          break
        }
      }
    },
    // 明细
    Detailed (obj) {
      GetAll('ICException/Get', obj).then(
        res => {
          console.log(res) // 返回对象
          if (res.status === 200) {
            console.log(200) // 返回对象
            var result = res.data.result
          }
        },
        response => {
          console.log('error')
        }
      )
    }
  }
}
</script>
