
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
          <el-button
            plain
            round
            v-for="item in funmenu"
            v-show="item.show"
            :key="item.num"
            @click="handle(item.num,scope.$index, scope.row)"
            :type="item.type"
          >{{item.title}}</el-button>
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
    <!--其他页面模板-->
    <OpenWork ref="OpenWork" @addSuccess="GetData"/>
    <AbnormalReport ref="AbnormalReport" @addSuccess="GetData"/>
    <Picking ref="Picking" @addSuccess="GetData"/>
    <Report ref="Report" @addSuccess="GetData"/>
    <ReportDetailed ref="ReportDetailed" @addSuccess="GetData"/>
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
        { title: '待开工', value: 'receive', count: 0 },
        { title: '待汇报', value: 'report', count: 0 }
      ],
      tabledata: [], // 数据集合
      currentPage: 0, // 当前页数
      pageSize: 20, // 页容量
      totalNum: 0, // 总条数
      tabvalue: 'receive', // 选中显示卡
      tableColumns: columns, // 表格的列
      funmenu: [
        {
          type: '',
          num: 0,
          title: '汇报',
          show: true,
          ShowWhe: ['report']
        },
        {
          type: '',
          num: 1,
          title: '领料',
          show: true,
          ShowWhe: ['receive']
        },
        {
          type: 'primary',
          num: 2,
          title: '开工',
          show: true,
          ShowWhe: ['receive']
        },
        {
          type: 'danger',
          num: 3,
          title: '异常',
          show: false,
          ShowWhe: ['report', 'receive']
        },
        {
          type: '',
          num: 4,
          title: '汇报明细',
          show: true,
          ShowWhe: ['report']
        }
      ]
    }
  },
  // 组件
  components: {
    tableHeader: () => import('@/components/tablePageHeader.vue'),
    OpenWork: () => import('./OpenWork'),
    AbnormalReport: () => import('./AbnormalReport'),
    Picking: () => import('./Picking'),
    Report: () => import('./Report'),
    ReportDetailed: () => import('./ReportDetailed')
  },
  // 声明方法
  methods: {
    Refresh () {
      this.GetData()
    },
    // 点击操作
    handle: function (type, index, row) {
      var _this = this
      var obj = {}
      // console.log(index, row);
      switch (type) {
        // 汇报
        case 0:
          obj = { FFinishAuxQty: row.汇报, FID: row.FID * 1 }
          _this.$refs.Report.show(obj)
          break
        // 领料
        case 1:
          obj = { id: 0 }
          _this.$refs.Picking.show(obj)
          break
        // 开工
        case 2:
          obj = { FID: row.FID, FSrcID: row.FSrcID }
          _this.$refs.OpenWork.show(obj)
          break
        // 异常
        case 3:
          obj = { FID: row.FID, FSrcID: row.FSrcID }
          _this.$refs.AbnormalReport.show(obj)
          break
        // 汇报明细
        case 4:
          obj = { FID: row.FID, FSrcID: row.FSrcID }
          _this.$refs.ReportDetailed.show(obj)
          break
        // 默认提示功能尚未开发
        default:
          break
      }
    },
    handelTabChange (value) {
      this.tabvalue = value
      this.showmenu()
      this.GetData()
      this.$refs.ReportDetailed.Show({ ICMODispBillID: '1' })
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
      const loading = this.$loading({
        lock: true,
        text: '数据加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      GetAll('VW_MODispBillList/GetAll', obj)
        .then(res => {
          if (res.success) {
          }
          // console.log(res); // 返回对象
          // console.log(res.data.result.items); // 集合
          // console.log(res.data.result.totalCount); // 总长度

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
          //
          this.tabItems.forEach(item => {
            item.count =
              item.value === _this.tabvalue ? result.totalCount : item.count
          })
          loading.close()
        })
        .catch(function () {
          loading.close()
        })
    },
    TestData () {
      var TabaleObj = {} // 对象
      TabaleObj.fTranType = 1
      TabaleObj.派工单号 = 3213
      TabaleObj.设备 = 4132431
      TabaleObj.产品名称 = 4321
      TabaleObj.产品名称 = 432
      TabaleObj.规格型号 = 5234
      TabaleObj.工序 = 5364
      TabaleObj.生产日期 = 7654
      TabaleObj.派工 = 7654
      TabaleObj.汇报 = 7654
      TabaleObj.FID = 7654
      TabaleObj.FSrcID = 5634
      this.tabledata.push(TabaleObj)
    },
    // 显示菜单
    showmenu () {
      this.funmenu.forEach(item => {
        item.show = item.ShowWhe.indexOf(this.tabvalue) >= 0
      })
    }
  },
  // 页面渲染前 执行
  created: function () {},
  // 页面渲染后 执行
  mounted: function () {
    this.GetData()
    this.showmenu()
  },
  // 页面渲染后 执行
  computed: {
    columnHeader () {
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
