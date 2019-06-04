
<template>
  <div class="fullscreen">
    <tableHeader class="header" :title="title" :items="tabItems" @tabChange="handelTabChange"/>
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
    <!--  -->
    <div style="background-color: rgb(242,247,251);padding: 5px 10px;position: fixed;width: -webkit-fill-available;bottom: 0px;" v-show="false">
      <el-button class="FYIcon" icon="el-icon-arrow-left" circle></el-button>
      <el-button class="FYIcon" icon="el-icon-d-arrow-left" circle></el-button>
      <el-select v-model="FY" placeholder="1/1" style="width:110px;margin:0px 10px;position: relative;top: -7px;" size="medium">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button class="FYIcon" icon="el-icon-d-arrow-right" circle></el-button>
      <el-button class="FYIcon" icon="el-icon-arrow-right" circle></el-button>
    </div>
    <!--  -->
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
  { id: '规格型号', label: '规格型号', width: 100, sort: false },
  { id: '单位', label: '单位', width: 100, sort: false },
  { id: '辅助属性', label: '辅助属性', width: 100, sort: false },
  { id: '批号', label: '批号', width: 100, sort: false },
  { id: '库存数量', label: '库存数量', width: 100, sort: false }
]
const options = []
// 派工单页面
export default {
  name: 'Stock',
  data () {
    return {
      FY: '1/1',
      options,
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
    tableHeader: () => import('@/components/tablePageHeader.vue')
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
    GetData () {
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

          _this.totalPage =
            result.totalCount % _this.pageSize !== 0
              ? parseInt(result.totalCount / _this.pageSize) * 1 + 1 * 1
              : parseInt(result.totalCount / _this.pageSize)
          console.log(result.totalCount / _this.pageSize)
          // 生成下拉分页
          _this.options = []
          for (var i = 1; i < _this.totalPage + 1; i++) {
            _this.options.push({
              label: i + ' / ' + _this.totalPage + '页',
              value: i
            })
          }
          var TabaleObj = {} // 对象
          var TableList = [] // 集合

          // 遍历返回集合 选取需要的
          result.items.forEach(item => {
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
/* .el-button+.el-button{
  margin: 0px;
} */
.FYIcon {
  font-size: 35px;
}
.el-input--medium .el-input__inner {
    height: 45px !important;
    line-height: 36px;
}
.el-input__inner{
  font-size: large!important;
}
</style>
