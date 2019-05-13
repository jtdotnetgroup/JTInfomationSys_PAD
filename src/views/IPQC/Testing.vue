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
      totalNum: 100,
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
    GetData (Status) {
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
          console.log(res)
          var result = res.data.result
          this.totalNum = result.totalCount // 总长度
          console.log(result.items) // 集合
          console.log(result.totalCount) // 总长度
          // this.tabledata =
          this.loading = false
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
  }
}
</script>

<style scoped>
</style>
