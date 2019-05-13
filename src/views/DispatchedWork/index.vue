
<template>
  <div class="fullscreen">
    <!--头部-->
    <tableHeader class="header" :title="title" :items="tabItems" @tabChange="handelTabChange"/>
    <!--表格-->
    <el-table :data="tabledata" border stripe>
      <el-table-column v-for="col in columnHeader" :prop="col.id" :key="col.id" :label="col.label"></el-table-column>
      <el-table-column label="操作">
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
    <el-dialog title="汇报" :visible.sync="dialoghandle0">
      <el-form ref="form" :model="form">
        <el-form-item label placeholder="派工数">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-button round v-for="(value, index) in inputNum1" :key="index">{{value}}</el-button>
        <br>
        <br>
        <el-button round v-for="(value, index) in inputNum2" :key="index">{{value}}</el-button>
        <br>
        <br>
        <el-button round v-for="(value, index) in inputNum3" :key="index">{{value}}</el-button>
      </el-form>
    </el-dialog>
    <el-dialog title="开工报告" :visible.sync="dialoghandle2">
      <el-form ref="form" :model="form">
        <el-form-item label="材 料 码：">
          <el-input type="textarea" :rows="4" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="材料批次：">
          <el-select v-model="form.region" size="large" placeholder>
            <el-option label="20180420-001;" value="20180420-001;"></el-option>
            <el-option label="20180420-002;" value="20180420-002;"></el-option>
            <el-option label="20180420-003;" value="20180420-003;"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：">
          <el-input type="textarea" rows="4" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="BCAnalysis">条码解析</el-button>
          <el-button @click="onSubmit">保存提交</el-button>
          <el-button @click="dialoghandle2 = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="异常报告" :visible.sync="dialoghandle3">
      <el-form ref="form1" :model="form1">
        <el-form-item label="异常原因：" prop="type">
          <el-checkbox-group v-model="form1.type">
            <el-checkbox label="人员请假" name="type"></el-checkbox>
            <el-checkbox label="设备异常" name="type"></el-checkbox>
            <el-checkbox label="材料异常" name="type"></el-checkbox>
            <el-checkbox label="人员调用" name="type"></el-checkbox>
            <el-checkbox label="其他原因" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="报告人：" prop="name">
          <el-input v-model="form1.name"></el-input>
        </el-form-item>
        <el-form-item label="报告时间：" prop="BGtime">
          <el-input v-model="form1.BGtime"></el-input>
        </el-form-item>
        <el-form-item label="恢复时间：" prop="HFtime">
          <el-input v-model="form1.HFtime"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger">异常</el-button>
          <el-button type="success">恢复</el-button>
          <el-button @click="dialoghandle3 = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--弹框-->
  </div>
</template>

<script>
import { GetAll } from '@/api/mission'

// 表格列
import columns from './tableColumns.js'
// 派工单页面
export default {
  name: 'DispatchedWork',
  // 初始化数据
  data () {
    return {
      title: '派工任务',
      tabItems: [
        { title: '待开工', value: 'receive', count: 6 },
        { title: '待汇报', value: 'report', count: 3 }
      ],
      tabledata: [
        {
          billno: '20180718-01',
          device: '1#',
          product: '名称:XXXXXXX 规格型号:XXXXXX',
          startendtime: '加硫',
          planqty: '9:30-10:30',
          planqty1: '500'
        },
        {
          billno: '20180718-01',
          device: '1#',
          product: '名称:XXXXXXX 规格型号:XXXXXX',
          startendtime: '加硫',
          planqty: '9:30-10:30',
          planqty1: '500'
        },
        {
          billno: '20180718-01',
          device: '1#',
          product: '名称:XXXXXXX 规格型号:XXXXXX',
          startendtime: '加硫',
          planqty: '9:30-10:30',
          planqty1: '500'
        },
        {
          billno: '20180718-01',
          device: '1#',
          product: '名称:XXXXXXX 规格型号:XXXXXX',
          startendtime: '加硫',
          planqty: '9:30-10:30',
          planqty1: '500'
        },
        {
          billno: '20180718-01',
          device: '1#',
          product: '名称:XXXXXXX 规格型号:XXXXXX',
          startendtime: '加硫',
          planqty: '9:30-10:30',
          planqty1: '500'
        }
      ],
      currentPage: 0,
      pageSize: 20,
      totalNum: 0,
      tabvalue: 'receive',
      tableColumns: columns,
      dialoghandle0: false,
      dialoghandle1: false,
      dialoghandle2: false,
      dialoghandle3: false,
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
    // 点击操作
    handle: function (type, index, row) {
      console.log(index, row.billno)
      switch (type) {
        // 汇报
        case 0: {
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
    GetData (Status) {
      var obj = {
        操作者: '1',
        FStatus: 1,
        FClosed: null,
        Sorting: 'FClosed',
        SkipCount: this.currentPage,
        MaxResultCount: this.pageSize
      }
      GetAll('VW_MODispBillList/GetAll', obj).then(
        res => {
          console.log(res) // 返回对象
          console.log(res.data.result.items) // 集合
          console.log(res.data.result.totalCount) // 总长度

          var result = res.data.result // 集合
          this.totalNum = result.totalCount // 总长度
          var TabaleObj = {} // 对象
          var TableList = [] // 集合
          console.log(TabaleObj.派工单号) // 总长度
          // 遍历返回集合 选取需要的
          result.items.forEach(item => {
            TabaleObj.派工单号 = item.派工单号
            TabaleObj.设备 = item.设备
            TabaleObj.产品名称 = item.产品名称
            TabaleObj.产品名称 = item.产品名称
            TabaleObj.规格型号 = item.规格型号
            TabaleObj.工序 = item.工序
            TabaleObj.生产日期 = item.生产日期
            TabaleObj.派工数量 = item.派工数量
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
    this.GetData(0)
  },
  // 页面渲染后 执行
  computed: {
    columnHeader () {
      switch (this.tabvalue) {
        case 'receive': {
          this.GetData(0)
          return this.tableColumns.receive
        }
        case 'report': {
          this.GetData(1)
          return this.tableColumns.report
        }
      }
      return ''
    }
  },
  //
  watch: {}
}
</script>

<style scoped>
</style>
