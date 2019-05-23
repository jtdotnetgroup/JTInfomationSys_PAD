<template>
  <div class="fullscreen">
    <tableHeader
      v-loading="loading"
      class="header"
      :title="title"
      :items="tabItems"
      @tabChange="handelTabChange"
    />
    <el-table :data="tabledata" border stripe>
      <el-table-column v-for="col in columnHeader" :prop="col.id" :key="col.id" :label="col.label"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" @click="scope">检验</el-button>
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>
<script>
// 数据处理
import { GetAll } from '@/api/mission'
// 表格的列
import columns from './TestingtableColumns.js'
// 派工单页面
export default {
  name: 'IPQC',
  data () {
    return {
      title: '质量检验',
      tabItems: [
        { title: '待检测', value: 'receive', count: 123 },
        { title: '已检测', value: 'report', count: 123 }
      ],
      tabledata: [],
      loading: true,
      currentPage: 0,
      pageSize: 20,
      totalNum: 0,
      tabvalue: 'receive',
      tableColumns: columns
    }
  },
  components: {
    tableHeader: () => import('@/components/tablePageHeader.vue')
  },
  methods: {
    handelTabChange (value) {
      this.tabvalue = value
    },
    sizeChange (value) {},
    currentChange (value) {},
    scope () {
      this.$router.push({
        // 核心语句
        path: '/IPQC/Report' // 跳转的路径
      })
    },
    GetData () {
      var Status = 0
      if (this.tabvalue === 'receive') {
        Status = 0
      } else {
        Status = 1
      }
      this.loading = true
      var obj = {
        操作者: '1',
        FStatus: Status,
        FClosed: null,
        Sorting: 'FClosed',
        SkipCount: this.currentPage,
        MaxResultCount: this.pageSize
      }
      GetAll('VW_MODispBillList/GetAll', obj).then(
        res => {
          // console.log(res) // 返回对象
          // console.log(res.data.result.items) // 集合
          // console.log(res.data.result.totalCount) // 总长度

          var result = res.data.result // 集合
          this.totalNum = result.totalCount // 总长度
          var TabaleObj = {} // 对象
          var TableList = [] // 集合

          // 遍历返回集合 选取需要的
          result.items.forEach(item => {
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
            TableList.push(TabaleObj)
          })
          // 重新渲染列表
          this.tabledata = TableList
          this.loading = false
        },
        response => {
          this.loading = false
          // console.log('error')
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
      switch (this.tabvalue) {
        case 'receive': {
          this.GetData()
          return this.tableColumns.receive
        }
        case 'report': {
          this.GetData()
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
