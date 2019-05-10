
<template>
  <div class="fullscreen">
    <tableHeader class="header" :title="title" :items="tabItems" @tabChange="handelTabChange"/>
    <el-table :data="tabledata" border stripe>
      <el-table-column v-for="col in columnHeader" :prop="col.id" :key="col.id" :label="col.label"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="scope">汇报</el-button>
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
// 表格列表
import columns from './tableColumns.js'
// 派工单页面
export default {
  name: 'DispatchedWork',
  data () {
    return {
      title: '派工任务',
      tabItems: [
        { title: '待接收', value: 'receive', count: 123 },
        { title: '待汇报', value: 'report', count: 123 },
        { title: '已汇报', value: 'finished', count: 123 }
      ],
      tabledata: [],
      currentPage: 1,
      pageSize: 20,
      totalNum: 100,
      tabvalue: 'receive',
      tableColumns: columns
    }
  },
  // 组件
  components: {
    tableHeader: () => import('@/components/tablePageHeader.vue')
  },
  // 声明方法
  methods: {
    handelTabChange (value) {
      this.tabvalue = value
    },
    sizeChange (value) {},
    currentChange (value) {},
    GetData () {
      // var formData = JSON.stringify(this.user); // 这里才是你的表单数据
      console.log('response.data')
      this.$http.get('api/services/app/VW_MODispBillList/GetAll', {}).then(
        response => {
          // success callback
          console.log(response.data)
        },
        response => {
          console.log('error')
        }
      )
    }
  },
  created: function () {
    this.GetData()
  },
  //
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
