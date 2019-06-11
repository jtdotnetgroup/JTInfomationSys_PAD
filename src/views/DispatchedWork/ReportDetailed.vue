<template>
  <!-- 模态框 -->
  <el-dialog
    :title="FromStyle.title"
    :visible.sync="dialogVisible"
    :width="FromStyle.width"
    :before-close="handleClose"
    v-loading="loading"
  >
    <!-- 输入框 -->
    <el-row style="padding: 20px 0px;">
      <el-col :span="24">
        <div class="grid-content">
          <div class="demo-input-suffix" style="line-height:40px;font-size: 20px;text-align: left;">
            派工单号：
            <span class="color_red">{{from.派工单号}}</span>
            ，设备：{{from.设备}}，产品名称：{{from.产品名称}}，工序：{{from.工序}}，派工数：
            <span
              class="color_red"
            >{{from.派工}}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content" style="text-align: right;padding-right: 15px;">
          <!-- <el-button @click="Cancel" plain>取消</el-button>
          <el-button @click="OnSubmit" type="success" plain>提交</el-button>-->
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="DataSource" border stripe>
      <!-- 列 -->
      <el-table-column
        v-for="col in column"
        :prop="col.id"
        :key="col.id"
        :label="col.label"
        :width="col.width"
        v-show="false"
      ></el-table-column>
      <!-- 操作功能 -->
      <el-table-column label="操作" fixed="right" width="200">
        <!-- 生成操作按钮 -->
        <template slot-scope="scope">
          <el-button
            plain
            round
            v-for="item in funmenu"
            v-show="item.show"
            :key="item.num"
            @click="Handle(item.num,scope.$index, scope.row)"
            :type="item.type"
          >{{item.title}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 继续汇报 -->
    <div style="text-align:right;padding-top: 30px;">
      <el-input placeholder="请输入批次号" v-model="from.BatchNum" style="width:40%">
        <template slot="prepend">批次号</template>
      </el-input>
      <i class="el-icon-minus icon" @click="from.HB--"></i>
      <span class="icon" @click="DigitalOpen()">{{from.HB}}</span>
      <i class="el-icon-plus icon" @click="from.HB++"></i>
      <el-button type="danger" @click="onSubmit()">汇报</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </div>
    <!-- 打开数字键盘 以及接受回调 -->
    <Digital ref="Digital" @DigitalCallback="DigitalCallback"/>
    <HBPC ref="HBPC" @addSuccess="GetDataSource"/>
  </el-dialog>
</template>
<!-- 脚本 -->
<script>

// 数据处理
import {
  GetAll,
  DataPUT,
  DataAddOrPUT,
  AddOrPUT,
  DataAdd
} from '@/api/mission'
// 列
const column = [
  { id: 'fBillNo', label: '检验单号', width: 200, sort: false },
  { id: 'FStatus', label: '状态', width: 90, sort: false },
  { id: 'BatchNum', label: '批次号', width: 200, sort: false },
  { id: 'FAuxQty', label: '汇报数', width: 90, sort: false },
  { id: 'FCheckAuxQty', label: '检验数', width: 90, sort: false },
  { id: 'FPassAuxQty', label: '合格数', width: 90, sort: false },
  { id: 'FFailAuxQty', label: '不合格', width: 90, sort: false },
  { id: 'FBillTime', label: '汇报日期', width: 160, sort: false },
  { id: 'FInspector', label: '检验员', width: 100, sort: false },
  { id: 'FInspectTime', label: '检验时间', width: 160, sort: false },
  { id: 'FNote', label: '说明', sort: false }
]
//
export default {
  components: {
    Digital: () => import('@/components/Common/Digital.vue'),
    HBPC: () => import('@/views/DispatchedWork/HBPC.vue')
  },
  data () {
    return {
      from: {
        FID: '',
        HB: 0,
        工序: '',
        设备: '',
        产品名称: '',
        派工: 0,
        派工单号: '',
        BatchNum: ''
      },
      // 加载框
      loading: false,
      // 列
      column,
      // 模态框样式
      FromStyle: {
        width: '80%',
        title: '汇报明细'
      },
      // 是否显示当前窗体
      dialogVisible: false,
      // 操作功能
      funmenu: [
        {
          type: '',
          num: 0,
          title: '修改',
          show: true
        },
        {
          type: '',
          num: 1,
          title: '删除',
          show: true
        }
      ],
      // 数据源
      DataSource: []
    }
  },
  // 所有方法
  methods: {
    // 键盘回调
    DigitalCallback (obj) {
      this.from.HB = obj.num
      this.$refs.Digital.hide()
    },
    //
    DigitalOpen () {
      var obj = {
        width: '30%',
        num: this.from.HB,
        title: '汇报数',
        placeholder: '当前数量' + this.from.HB,
        key: 1
      }
      this.$refs.Digital.show(obj)
    },
    handleClose () {
      this.Hide()
    },
    // 显示窗体
    Show (obj) {
      this.dialogVisible = true
      // console.log("show" + obj);
      this.from.FID = obj.FID
      this.from.工序 = obj.工序
      this.from.设备 = obj.设备
      this.from.派工单号 = obj.派工单号
      this.from.派工 = obj.派工
      this.from.产品名称 = obj.产品名称
      this.GetDataSource()
    },
    // 隐藏窗体
    Hide () {
      this.dialogVisible = false
    },
    // 显示加载框
    ShowLod () {
      this.loading = true
    },
    // 隐藏加载框
    HideLod () {
      this.loading = false
    },
    // 显示菜单
    ShowMenu () {
      this.funmenu.forEach(item => {
        item.show = item.ShowWhe.indexOf('1') >= 0
      })
    },
    // 点击操作
    Handle: function (type, index, row) {
      var _this = this
      var obj = {}
      console.log(index, row)
      switch (type) {
        // 修改
        case 0:
          obj = {
            FID: row.Fid,
            num: row.FAuxQty,
            BatchNum: row.BatchNum,
            fBillNo: row.fBillNo
          }
          console.log(obj)
          _this.$refs.HBPC.show(obj)
          break
        // 删除
        case 1:
          this.$confirm('确定要删除该汇报记录吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              _this.ShowLod()
              DataDel('ICMOInspectBill/Delete', { FID: row.FID })
                .then(res => {
                  if (res.success) {
                    _this.GetDataSource(this.from)
                    this.$message('删除成功')
                  } else {
                    this.$message.error('删除失败，请稍后重试')
                  }
                  _this.HideLod()
                })
                .catch(function () {
                  _this.HideLod()
                })
            })
            .catch(() => {})
          break
        // 默认提示功能尚未开发
        default:
          break
      }
    },
    // 汇报
    onSubmit () {
      var _this = this
      if (_this.from.BatchNum.length === 0) {
        this.$message.error('批次号不能为空！')
        return
      }
      this.$confirm('确认汇报该数量吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var obj = {
            ICMODispBillID: _this.from.FID,
            FAuxQty: _this.from.HB,
            BatchNum: _this.from.BatchNum
          }
          _this.ShowLod()
          DataAdd('ICMOInspectBill/Create', obj)
            .then(res => {
              if (res.data.success) {
                this.$notify({
                  title: '系统提示',
                  message: '添加汇报成功',
                  type: 'success'
                })
                _this.from.HB = 0
                _this.from.BatchNum = ''
                _this.Hide()
                _this.$emit('addSuccess')
              }
            })
            .catch(function () {})
        })
        .catch(() => {})
    },
    // 获取数据源
    GetDataSource () {
      var _this = this
      var obj = { ICMODispBillID: this.from.FID }
      _this.ShowLod()
      // obj 必须含有 任务单号ID
      var url = 'ICMOInspectBill/GetList'
      GetAll(url, obj)
        .then(res => {
          if (res.data.success) {
            var DS = []
            res.data.result.forEach(item => {
              var tmp = {}
              tmp.fBillNo = item.fBillNo
              tmp.FStatus = item.fStatus === 0 ? '未完成' : '已完成'
              tmp.FAuxQty = item.fAuxQty
              tmp.FCheckAuxQty = item.fCheckAuxQty
              tmp.FPassAuxQty = item.fPassAuxQty
              tmp.FFailAuxQty = item.fFailAuxQty
              tmp.FBillTime = _this
                .$moment(item.fBillTime)
                .format('YYYY-MM-DD hh:mm')
              tmp.FInspector = item.fInspector
              tmp.FInspectTime =
                item.fInspectTime === null
                  ? ''
                  : _this.$moment(item.fInspectTime).format('YYYY-MM-DD hh:mm')
              tmp.FNote = item.fNote
              tmp.Fid = item.fid
              tmp.BatchNum = item.batchNum
              DS.push(tmp)
            })
            _this.DataSource = DS
          }
          _this.HideLod()
        })
        .catch(function () {
          _this.HideLod()
        })
    }
  },
  // 页面渲染后 执行
  mounted: function () {}
}
</script>
<style>
.icon {
  cursor: pointer;
  position: relative;
  padding: 0px 20px;
  font-size: 25px;
}
.color_red {
  color: red;
}
</style>
