
<template>
  <div class="fullscreen">
    <!-- 标题栏目 -->
    <tableHeader class="header" :title="title" :items="tabItems" @tabChange="handelTabChange"/>
    <!-- 表格 -->
    <el-table :data="tabledata" border stripe>
      <el-table-column
        v-for="col in columns"
        :prop="col.id"
        :key="col.id"
        :label="col.label"
        :width="col.width"
      ></el-table-column>
      <!-- <el-table-column label="操作">
        <template>
        </template>
      </el-table-column>-->
    </el-table>
    <!-- <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="currentPage"
      :page-sizes="[20, 40, 80, 100]"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="totalNum"
      background
    ></el-pagination> -->
    <!-- 底部分页 -->
    <Paging :PageSize="pageSize" :PageIndex="currentPage" :TotalNum="totalNum" @Refresh="GetData" @RefreshPage="RefreshPage" ref="Paging" />
    <!-- 底部分页 -->
  </div>
</template>

<script>
// 数据处理
import { GetAll } from '@/api/mission'
const columns = [
  { id: '仓库', label: '仓库', width: 120, sort: false },
  { id: '仓位', label: '仓位', width: 60, sort: false },
  { id: '物料编码', label: '物料编码', width: 120, sort: false },
  { id: '物料名称', label: '物料名称', sort: false },
  { id: '规格型号', label: '规格型号', width: 330, sort: false },
  { id: '单位', label: '单位', width: 100, sort: false },
  { id: '辅助属性', label: '辅助属性', width: 100, sort: false },
  { id: '批号', label: '批号', width: 100, sort: false },
  { id: '库存数量', label: '库存数量', width: 100, sort: false }
]
// 派工单页面
export default {
  name: 'Stock',
  data () {
    return {
      tabledata: [],
      currentPage: 1,
      pageSize: 10,
      totalNum: 0,
      totalPage: 0,
      columns,
      title: '库存查询',
      tabvalue: 'KCCX',
      tabItems: [{ title: '库存查询', value: 'KCCX', count: 0 }]
    }
  },
  components: {
    tableHeader: () => import('@/components/tablePageHeader.vue'),
    Paging: () => import('@/components/Common/Paging.vue')
  },
  methods: {
    handelTabChange (value) {
      this.tabvalue = value
    },
    sizeChange (value) {
      this.currentPage = value
      this.GetData()
    },
    currentChange (value) {
      this.currentPage = value
      this.GetData()
    },
    RefreshPage (value) {
      this.currentPage = value.PageIndex
    },
    GetData () {
      // if(obj!=="undefined"){this.currentPage=obj.PageIndex}
      var _this = this
      const loading = this.$loading({
        lock: true,
        text: '数据加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var obj = {
        Sorting: '仓库',
        SkipCount: (this.currentPage - 1) * this.pageSize,
        MaxResultCount: this.pageSize
      }
      GetAll('VM_Inventory/GetAll', obj)
        .then(res => {
          // console.log(res); // 返回对象
          // console.log(res.data.result.items); // 集合
          // console.log(res.data.result.totalCount); // 总长度

          var result = res.data.result // 集合
          _this.totalNum = result.totalCount // 总长度
          var TableList = [] // 集合

          // 遍历返回集合 选取需要的
          result.items.forEach(item => {
            var TabaleObj = {} // 对象
            TabaleObj.仓库 = item.仓库
            TabaleObj.仓位 = item.仓位
            TabaleObj.物料编码 = item.物料编码
            TabaleObj.物料名称 = item.物料名称
            TabaleObj.规格型号 = item.规格型号
            TabaleObj.单位 = item.单位
            TabaleObj.辅助属性 = item.辅助属性
            TabaleObj.批号 = item.批号
            TabaleObj.库存数量 = item.库存数量
            TableList.push(TabaleObj)
          })
          this.tabledata = []
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
    }
  },
  computed: {
    columnHeader () {
      switch (this.tabvalue) {
        case 'KCCX': {
          return this.tableColumns.KCCX
        }
      }
      return ''
    }
  },
  mounted: function () {
    this.GetData()
  }
}
</script>

<style scoped>

</style>
