
<template>
  <!--主体-->
  <div class="fullscreen">
    <!--头部-->
    <tableHeader class="header" :title="title" :items="tabItems" @tabChange="handelTabChange"/>
    <!--表格-->
    <el-table :data="tabledata" border stripe>
      <el-table-column
        v-for="col in columnHeader"
        :prop="col.id"
        :key="col.id"
        :label="col.label"
        :width="col.width"
        v-show="false"
      ></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button plain @click="handle(0,scope.$index, scope.row)">汇报</el-button>
          <el-button plain @click="handle(1,scope.$index, scope.row)">领料</el-button>
          <el-button type="primary" plain @click="handle(2,scope.$index, scope.row)">开工</el-button>
          <el-button type="danger" plain @click="handle(3,scope.$index, scope.row)">异常</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="currentPage"
      :page-sizes="[20, 40, 80, 100]"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="totalNum"
      background
    ></el-pagination>
    <!--弹框-->
    <el-dialog title="汇报" :visible.sync="dialoghandle0" width="30%" v-loading="HBloading">
      <el-form ref="form" :model="HBFrom">
        <el-form-item label>
          <el-input v-model="HBFrom.FFinishAuxQty" placeholder="派工数"></el-input>
        </el-form-item>
        <el-button
          round
          v-for="(value, index) in inputNum1"
          :key="index"
          @click="AddWZ({value})"
        >{{value}}</el-button>
        <br>
        <br>
        <el-button
          round
          v-for="(value, index) in inputNum2"
          :key="index"
          @click="AddWZ({value})"
        >{{value}}</el-button>
        <br>
        <br>
        <el-button
          round
          v-for="(value, index) in inputNum3"
          :key="index"
          @click="AddWZ({value})"
        >{{value}}</el-button>
        <br>
        <br>
        <el-button type="danger" plain round @click="DELWZ()">删除</el-button>
        <el-button type="primary" plain round @click="onSubmit('HB')">汇报</el-button>
      </el-form>
    </el-dialog>
    <el-dialog title="领料" :visible.sync="dialoghandle1" width="30%">
      <el-form ref="form" :model="form">
        <el-form-item style="text-align:right;">
          <el-button @click="onSubmit('BC')">保存</el-button>
          <el-button @click="dialoghandle1 = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="开工报告" :visible.sync="dialoghandle2" width="30%">
      <el-form ref="form" :model="form" label-position="top" style="text-align: left;">
        <el-form-item label="材 料 码：">
          <el-input type="textarea" :rows="4" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="材料批次：">
          <el-select v-model="form.region" size="large">
            <el-option label="20180420-001;" value="20180420-001;"></el-option>
            <el-option label="20180420-002;" value="20180420-002;"></el-option>
            <el-option label="20180420-003;" value="20180420-003;"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" rows="4" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item style="text-align:right;">
          <el-button type="primary" @click="BCAnalysis">条码解析</el-button>
          <el-button @click="onSubmit('KG')">保存提交</el-button>
          <el-button @click="dialoghandle2 = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="异常报告" :visible.sync="dialoghandle3" width="30%">
      <el-form ref="YCFrom" :model="YCFrom">
        <el-form-item label="异常原因：" prop="FRemark">
          <el-radio-group v-model="YCFrom.FRemark">
            <el-radio
              v-for="FRemark in FRemarkOptions"
              :label="FRemark"
              :key="FRemark"
              name="FRemark"
            >{{FRemark}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="报告人：" prop="FBiller">
          <el-input v-model="YCFrom.FBiller"></el-input>
        </el-form-item>
        <el-form-item label="报告时间：" prop="FTime">
          <el-input v-model="YCFrom.FTime"></el-input>
        </el-form-item>
        <el-form-item label="恢复时间：" prop="FRecoverTime">
          <el-input v-model="YCFrom.FRecoverTime"></el-input>
        </el-form-item>
        <el-form-item style="text-align:right;">
          <el-button type="danger" @click="onSubmit('YC')">异常</el-button>
          <el-button type="success" @click="onSubmit('HF')">恢复</el-button>
          <el-button @click="dialoghandle3 = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--弹框-->
  </div>
</template>

<script>
// 数据处理
import { GetAll, DataPUT, DataAddOrPUT } from '@/api/mission'
// 表格列
import columns from './tableColumns.js'
// 派工单页面
export default {
  name: 'DispatchedWork',
  // 初始化数据
  data () {
    return {
      title: '派工任务', // 标题
      tabItems: [
        { title: '待开工', value: 'receive', count: 6 },
        { title: '待汇报', value: 'report', count: 3 }
      ],
      tabledata: [], // 数据集合
      currentPage: 0, // 当前页数
      pageSize: 20, // 页容量
      totalNum: 0, // 总条数
      tabvalue: 'receive', // 选中显示卡
      tableColumns: columns, // 表格的列
      dialoghandle0: false, //
      dialoghandle1: false, //
      dialoghandle2: false, //
      dialoghandle3: false, //
      HBFrom: {
        // 汇报
        FID: 0,
        FFinishAuxQty: 0
      },
      YCFrom: {
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
      ],
      HBloading: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      form1: {
        type: [],
        name: '',
        BGtime: '',
        HFtime: ''
      },
      inputNum1: [1, 2, 3, 4],
      inputNum2: [5, 6, 7, 8],
      inputNum3: [9, 0, '00', '.']
    }
  },
  // 组件
  components: {
    tableHeader: () => import('@/components/tablePageHeader.vue')
  },
  // 声明方法
  methods: {
    onSubmit (obj) {
      console.log(obj)
      switch (obj) {
        case 'HB': {
          this.HBloading = true
          DataPUT('ICMODispBill/UpdateFFinishAuxQty', this.HBFrom).then(
            res => {
              console.log(res)
              this.$notify({
                title: '系统提示',
                message: '修改成功',
                type: 'success'
              })
            },
            response => {
              console.log('error')
            }
          )
          this.HBloading = false
          break
        }
        case 'YC': {
          this.HBloading = true
          DataAddOrPUT('ICException/CreateAndUpdate', this.YCFrom).then(
            res => {
              console.log(res)
              this.$notify({
                title: '系统提示',
                message: '修改成功',
                type: 'success'
              })
            },
            response => {
              console.log('error')
            }
          )
          this.HBloading = false
          break
        }
        case 'HF': {
          this.HBloading = true
          DataAddOrPUT('ICException/CreateAndUpdate', this.YCFrom).then(
            res => {
              console.log(res)
              this.$notify({
                title: '系统提示',
                message: '修改成功',
                type: 'success'
              })
            },
            response => {
              console.log('error')
            }
          )
          this.HBloading = false
          break
        }
      }
    },
    Refresh () {
      this.GetData()
    },
    AddWZ (obj) {
      this.HBFrom.FFinishAuxQty = this.HBFrom.FFinishAuxQty + '' + obj.value
    },
    DELWZ () {
      this.HBFrom.FFinishAuxQty = this.HBFrom.FFinishAuxQty.slice(
        0,
        this.HBFrom.FFinishAuxQty.length - 1
      )
    },
    // 点击操作
    handle: function (type, index, row) {
      console.log(index, row)
      switch (type) {
        // 汇报
        case 0: {
          this.HBFrom.FFinishAuxQty = row.汇报
          this.HBFrom.FID = row.FID
          this.dialoghandle0 = true
          break
        }
        // 领料
        case 1: {
          this.dialoghandle1 = true
          break
        }
        // 开工
        case 2: {
          this.dialoghandle2 = true
          break
        }
        // 异常
        case 3: {
          this.YCFrom.FID = row.FID
          this.YCFrom.FSrcID = row.FSrcID
          var obj = { FID: row.FID, FSrcID: row.FSrcID }

          GetAll('ICException/Get', obj).then(
            res => {
              console.log(res) // 返回对象
              if (res.status === 200) {
                console.log(200) // 返回对象
                var result = res.data.result
                // 异常
                this.YCFrom.FBiller = result.fBiller
                this.YCFrom.FTime = result.fTime
                this.YCFrom.FRemark = result.fRemark
                this.YCFrom.FRecoverTime = result.fRecoverTime
                this.YCFrom.FNote = result.fNote
              }
            },
            response => {
              console.log('error')
            }
          )
          this.dialoghandle3 = true
          break
        }
      }
    },
    BCAnalysis () {},
    handelTabChange (value) {
      this.tabvalue = value
    },
    sizeChange (value) {},
    currentChange (value) {},
    GetData () {
      var _this = this
      _this.tabledata = []
      var obj = {
        操作者: '1',
        FStatus: this.tabvalue === 'receive' ? 0 : 1,
        FClosed: null,
        Sorting: 'FClosed',
        SkipCount: this.currentPage,
        MaxResultCount: this.pageSize
      }
      GetAll('VW_MODispBillList/GetAll', obj).then(
        res => {
          if (res.success) {
          }
          console.log(res) // 返回对象
          console.log(res.data.result.items) // 集合
          console.log(res.data.result.totalCount) // 总长度

          var result = res.data.result // 集合
          this.totalNum = result.totalCount // 总长度

          var TableList = [] // 集合

          // 遍历返回集合 选取需要的
          result.items.forEach(item => {
            var TabaleObj = {} // 对象
            TabaleObj.fTranType = item.fTranType
            TabaleObj.派工单号 = item.派工单号
            TabaleObj.设备 = item.设备
            TabaleObj.产品名称 = item.产品名称
            TabaleObj.产品名称 = item.产品名称
            TabaleObj.规格型号 = item.规格型号
            TabaleObj.工序 = item.工序
            TabaleObj.生产日期 = item.生产日期
            TabaleObj.派工 = item.派工数量
            TabaleObj.汇报 = item.汇报数量
            TabaleObj.FID = item.fid
            TabaleObj.FSrcID = item.fsrcID
            TableList.push(TabaleObj)
          })
          // 重新渲染列表
          this.tabledata = TableList
        },
        response => {
          console.log('error')
        }
      )
    }
  },
  // 页面渲染前 执行
  created: function () {},
  // 页面渲染后 执行
  mounted: function () {
    this.GetData()
  },
  // 页面渲染后 执行
  computed: {
    columnHeader () {
      // if (this.tabvalue === 'receive') {
      //   this.tabvalue = 'receive'
      // }
      // if (this.tabvalue === 'report') {
      //   this.tabvalue = 'report'
      // }
      this.GetData()
      switch (this.tabvalue) {
        case 'receive':
          return this.tableColumns.receive
        // break
        case 'report':
          return this.tableColumns.report
        // break
        default:
          return ''
      }
    }
  },
  //
  watch: {}
}
</script>

<style scoped>
.el-select {
  width: 100%;
}
</style>
