<template>
  <el-dialog title="汇报" :visible.sync="Report" width="30%" v-loading="HBloading">
    <el-form ref="form" :model="from">
      <el-form-item label>
        <el-input v-model="from.FFinishAuxQty" placeholder="派工数"></el-input>
      </el-form-item>
      <el-button
        round
        v-for="(value, index) in inputNum1"
        :key="'1'+index"
        @click="AddWZ({value})"
      >{{value}}</el-button>
      <br>
      <br>
      <el-button
        round
        v-for="(value, index) in inputNum2"
        :key="'2'+index"
        @click="AddWZ({value})"
      >{{value}}</el-button>
      <br>
      <br>
      <el-button
        round
        v-for="(value, index) in inputNum3"
        :key="'3'+index"
        @click="AddWZ({value})"
      >{{value}}</el-button>
      <br>
      <br>
      <el-button type="danger" plain round @click="DELWZ()">删除</el-button>
      <el-button type="primary" plain round @click="onSubmit('HB')">汇报</el-button>
    </el-form>
  </el-dialog>
</template>

<script>
//
import { GetAll, DataPUT, DataAddOrPUT } from '@/api/mission'
export default {
  data () {
    return {
      HBloading: false,
      Report: false,
      from: {
        // 汇报
        FID: 0,
        FFinishAuxQty: 0
      },
      inputNum1: [1, 2, 3, 4],
      inputNum2: [5, 6, 7, 8],
      inputNum3: [9, 0, '00', '.']
    }
  }, // 声明方法
  methods: {
    AddWZ (obj) {
      this.from.FFinishAuxQty = this.from.FFinishAuxQty + '' + obj.value
    },
    DELWZ () {
      this.from.FFinishAuxQty = this.from.FFinishAuxQty.slice(
        0,
        this.from.FFinishAuxQty.length - 1
      )
    },
    show (obj) {
      this.Report = true
      this.Detailed(obj)
    },
    hide () {
      this.Report = false
    },
    // 提交
    onSubmit (type) {
      var _this = this
      //   console.log(obj);
      switch (type) {
        case 'HB': {
          this.HBloading = true
          DataPUT('ICMODispBill/UpdateFFinishAuxQty', this.from).then(
            res => {
              //   console.log(res);
              this.$notify({
                title: '系统提示',
                message: '修改成功',
                type: 'success'
              })
              _this.$emit('addSuccess')
              this.hide()
            },
            response => {
              console.log('error')
            }
          )
          this.HBloading = false
          break
        }
        default: {
          break
        }
      }
    },
    // 明细
    Detailed (obj) {
      this.from.FFinishAuxQty = obj.FFinishAuxQty
      this.from.FID = obj.FID
      //   console.log(obj);
      // GetAll('ICException/Get', obj).then(
      //   res => {
      //     //   console.log(res); // 返回对象
      //     if (res.status === 200) {
      //       var result = res.data.result

      //     }
      //   },
      //   response => {
      //     console.log('error')
      //   }
      // )
    }
  }
}
</script>
