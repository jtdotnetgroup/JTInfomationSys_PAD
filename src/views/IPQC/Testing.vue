<template>
  <div class="fullscreen">
    <tableHeader class="header" :title="title" :items="tabItems" @tabChange="handelTabChange"/>
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
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
      background
    ></el-pagination>
  </div>
</template>
<script>
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
      tabledata: [
        {
          TCNum: '20180718-01',
          product: '名称:XXXXXXX规格型号:XXXXXX',
          process: '锯',
          reportTime: '2018-10-24 17:23',
          reportNum: 5,
          qualified: '',
          Noqualified: ''
        },
        {
          TCNum: '20180718-01',
          product: '名称:XXXXXXX规格型号:XXXXXX',
          process: '锯',
          reportTime: '2018-10-24 17:23',
          reportNum: 5,
          qualified: '',
          Noqualified: ''
        },
        {
          TCNum: '20180718-01',
          product: '名称:XXXXXXX规格型号:XXXXXX',
          process: '锯',
          reportTime: '2018-10-24 17:23',
          reportNum: 5,
          qualified: '',
          Noqualified: ''
        }
      ],
      currentPage: 1,
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
      this.$router.push({ // 核心语句
        path: '/IPQC/Report' // 跳转的路径
      })
    }
  },
  computed: {
    columnHeader () {
      switch (this.tabvalue) {
        case 'receive': {
          return this.tableColumns.receive
        }
        case 'report': {
          return this.tableColumns.report
        }
        case 'finished': {
          return this.tableColumns.finished
        }
      }
      return ''
    }
  }
}
</script>

<style scoped>
</style>
