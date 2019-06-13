<template>
  <!-- 模态框 -->
  <el-dialog
    :title="FromStyle.title"
    :visible.sync="dialogVisible"
    :width="FromStyle.width"
    :before-close="handleClose"
    v-loading="loading"
  >
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
      <el-table-column label="操作" fixed="right">
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
    <!-- 添加异常 -->
    <div style="text-align:right;padding-top: 30px;">
      <el-button type="danger" @click="AddICException()">添加异常</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </div>
    <AbnormalReport ref="AbnormalReport" @addSuccess="GetDataSource"/>
  </el-dialog>
</template>
<!-- 脚本 -->
<script>
// 列
// 数据处理
import {
  GetAll,
  DataPUT,
  DataAddOrPUT,
  AddOrPUT,
  DataAdd
} from '@/api/mission'
const column = [
  { id: 'fRemark', label: '异常原因', width: 200, sort: false },
  { id: 'fBiller', label: '报告人', width: 90, sort: false },
  { id: 'fRecoverTime', label: '报告时间', width: 160, sort: false },
  { id: 'fTime', label: '回复时间', width: 160, sort: false }
]
//
export default {
  components: { AbnormalReport: () => import('./AbnormalReport') },
  data () {
    return {
      from: {
        FID: '',
        FSrcID: ''
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
          title: '修改异常',
          show: true
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
      this.from.FID = obj.FID
      this.from.FSrcID = obj.FSrcID
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
        // 修改异常
        case 0:
          obj = { FID: row.FID, FSrcID: row.FSrcID }
          this.$refs.AbnormalReport.show(obj)
          break
        // 默认提示功能尚未开发
        default:
          break
      }
    },
    // 添加异常
    AddICException () {
      var obj = { FSrcID: this.from.FID }
      this.$refs.AbnormalReport.show(obj)
    },
    // 获取数据源
    GetDataSource (obj) {
      var _this = this
      _this.ShowLod()
      // obj 必须含有 任务单号ID
      GetAll('ICException/GetAll', obj)
        .then(res => {
          if (res.data.success) {
            var DS = []
            res.data.result.forEach(item => {
              var tmp = {}
              tmp.fBiller = item.fBiller
              tmp.fRemark = item.fRemark
              tmp.fRecoverTime =
                item.fRecoverTime === null
                  ? ''
                  : _this.$moment(item.fRecoverTime).format('YYYY-MM-DD hh:mm')
              tmp.fTime =
                item.fTime === null
                  ? ''
                  : _this.$moment(item.fTime).format('YYYY-MM-DD hh:mm')
              tmp.FID = item.fid
              tmp.FSrcID = item.fSrcID
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
