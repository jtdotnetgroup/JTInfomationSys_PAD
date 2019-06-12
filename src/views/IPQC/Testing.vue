<template>
  <!-- 页面 -->
  <div class="fullscreen">
    <tableHeader class="header" :title="title" :items="tabItems" @tabChange="handelTabChange"/>
    <!-- 表格 -->
    <el-table :data="tabledata" border stripe v-loading="loading" max-height="80vh">
      <el-table-column
        v-for="col in columnHeader"
        :prop="col.id"
        :key="col.id"
        :label="col.label"
        :width="col.width"
      ></el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button
            style="text-align:center"
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
    <!-- 分页 -->
    <!-- <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="currentPage"
      :page-sizes="[20, 40, 80, 100]"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="totalNum"
      background
    ></el-pagination>-->
    <Paging
      :PageSize="pageSize"
      :PageIndex="currentPage"
      :TotalNum="totalNum"
      @Refresh="GetData"
      @RefreshPage="RefreshPage"
      ref="Paging"
    />
  </div>
</template>
<!-- 脚本 -->
<script>
// 数据处理
import { GetAll, DataAddOrPUT, DataPUT, DataPUT2 } from '@/api/mission'
// 表格的列
import columns from './TestingtableColumns.js'
// 派工单页面
export default {
  name: 'IPQC',
  data () {
    return {
      title: '质量检验',
      tabItems: [
        { title: '待检验', value: 'DHB', count: 0, key: 'ZLJYDJY' },
        { title: '已检验', value: 'YZJ', count: 0, key: 'ZLJYYJY' }
      ],
      tabledata: [],
      loading: false,
      currentPage: 1,
      pageSize: 10,
      totalNum: 0,
      tabvalue: 'DHB',
      tableColumns: columns,
      funmenu: [
        {
          type: '',
          num: 0,
          title: '检验',
          show: true,
          ShowWhe: ['DHB']
        },
        {
          type: 'success',
          num: 1,
          title: '已检验',
          show: true,
          ShowWhe: ['DHB']
        }
      ]
    }
  },
  components: {
    tableHeader: () => import('@/components/tablePageHeader.vue'),
    Paging: () => import('@/components/Common/Paging.vue')
  },
  methods: {
    // 标题数量
    UpdCount () {
      var TaskQty = this.$store.state.TaskQty.TaskQty
      console.log(TaskQty)
      this.tabItems.forEach(tmp => {
        TaskQty.forEach(item => {
          if (tmp.key === item.strKey) {
            tmp.count = item.total
          }
        })
      })
    },
    RefreshPage (value) {
      this.currentPage = value.PageIndex
    },
    handelTabChange (value) {
      this.tabvalue = value
      this.GetData()
      this.showmenu()
    },
    sizeChange (value) {},
    currentChange (value) {},
    handle: function (type, index, row) {
      console.log(row)
      var _this = this
      //
      var obj = {
        FID: row.fid,
        Step: row.工序,
        汇报数: row.汇报,
        FOperID: row.FOperID,
        FBillNo: row.FBillNo,
        FItemID: row.FItemID,
        F_102: row.F_102
      }
      switch (type * 1) {
        case 0:
          _this.$router.push({
            // 核心语句
            name: 'IPQCInspectionDetails',
            // path: "/IPQC/Report", // 跳转的路径
            query: obj
          })
          break
        case 1:
          this.$confirm('确定已检验吗?', '系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              _this.ZJCompleted(obj)
            })
            .catch(() => {})
          break
        default:
          break
      }
    },
    //
    ZJCompleted (obj) {
      var _this = this
      obj.FStates = 2
      _this.loading = true
      DataPUT2('ICMODispBill/UpdateFStatus', obj)
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            _this.GetData()
            _this.$message({
              message: '保存成功',
              type: 'success'
            })
          }
          _this.loading = false
        })
        .catch(function () {
          _this.loading = false
          _this.$message.error('操作失败，请稍后重试！')
        })
    },
    GetData () {
      var Status = this.tabvalue === 'DHB' ? 1 : 2
      var obj = {
        操作者: '1',
        FStatus: Status,
        FClosed: null,
        Sorting: 'FClosed',
        SkipCount: (this.currentPage - 1) * this.pageSize,
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
          // console.log(res) // 返回对象
          // console.log(res.data.result.items) // 集合
          // console.log(res.data.result.totalCount) // 总长度

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
            TabaleObj.合格数量 = item.合格数量
            TabaleObj.不合格数量 = item.不合格数量
            TabaleObj.状态 =
              item.派工数量 <= item.合格数量 ? '已完成' : '未完成'
            TabaleObj.fid = item.fid
            TabaleObj.FOperID = item.fOperID
            TabaleObj.FBillNo = item.派工单号
            TabaleObj.FItemID = item.fItemID
            TabaleObj.F_102 = item.f_102
            TableList.push(TabaleObj)
          })
          // 重新渲染列表
          this.tabledata = TableList
          //
          this.tabItems.forEach(item => {
            item.count =
              item.value === this.tabvalue ? result.totalCount : item.count
          })
          loading.close()
        })
        .catch(function () {
          loading.close()
        })
    },
    // 显示菜单
    showmenu () {
      this.funmenu.forEach(item => {
        item.show = item.ShowWhe.indexOf(this.tabvalue) >= 0
      })
    }
  },
  // 页面渲染前 执行
  created: function () {
    this.showmenu()
  },
  // 页面渲染后 执行
  mounted: function () {
    this.GetData()
    this.UpdCount()
  },
  // 页面渲染后 执行
  computed: {
    columnHeader () {
      switch (this.tabvalue) {
        case 'DHB': {
          return this.tableColumns.report
        }
        case 'YZJ': {
          return this.tableColumns.report
        }
      }
      return ''
    }
  }
}
</script>

<style scoped>
</style>
