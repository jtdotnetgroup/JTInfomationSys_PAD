<template>
  <!-- 模态框 -->
  <el-dialog :title="FromStyle.title" :visible.sync="dialogVisible" :width="FromStyle.width" :before-close="handleClose" v-loading="loading">
    <!-- 表格 -->
    <el-table :data="DataSource" border stripe >
      <!-- 列 -->
      <el-table-column v-for="col in column" :prop="col.id" :key="col.id" :label="col.label" :width="col.width" v-show="false"></el-table-column>
      <!-- 操作功能 -->
      <el-table-column label="操作" fixed="right" >
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
      <el-button type="danger" @click="onSubmit()">汇报</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </div>
  </el-dialog>
</template>
<!-- 脚本 -->
<script>
// 列
// 数据处理
import { GetAll, DataPUT, DataAddOrPUT } from '@/api/mission'
const column = [
  { id: 'fBillNo', label: '检验单号', width: 100, sort: false },
  { id: 'FStatus', label: '状态', width: 90, sort: false },
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
  data () {
    return {
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
          title: '修改汇报',
          show: true,
          ShowWhe: ['report']
        }
      ],
      // 数据源
      DataSource: []
    }
  },
  // 所有方法
  methods: {
    handleClose () {
      this.Hide()
    },
    // 显示窗体
    Show (obj) {
      this.dialogVisible = true
      //   var obj = {ICMODispBillID:'1'};
      this.GetDataSource(obj)
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
      // console.log(index, row);
      switch (type) {
        // 修改汇报
        case 0:
          break
        // 默认提示功能尚未开发
        default:
          break
      }
    },
    // 获取数据源
    GetDataSource (obj) {
      var _this = this
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
              tmp.FStatus = item.fStatus
              tmp.FAuxQty = item.fAuxQty
              tmp.FCheckAuxQty = item.fCheckAuxQty
              tmp.FPassAuxQty = item.fPassAuxQty
              tmp.FFailAuxQty = item.fFailAuxQty
              tmp.FBillTime = _this
                .$moment(item.fBillTime)
                .format('YYYY-MM-DD hh:mm')
              tmp.FInspector = item.fInspector
              tmp.FInspectTime = _this
                .$moment(item.fInspectTime)
                .format('YYYY-MM-DD hh:mm')
              tmp.FNote = item.fNote
              tmp.Fid = item.fid
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
