
<template>
    <div class="fullscreen">
        <tableHeader class="header" :title="title" :items="tabItems" @tabChange="handelTabChange" />
    </div>
</template>

<script>
// 派工单页面
export default {
  name: 'Stock',
  data () {
    return {
      title: '库存查询',
      tabItems: [
        { title: '库存查询', value: 'KCCX', count: 0 }
      ]
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

    },
    currentChange (value) {

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
  }
}
</script>

<style scoped>

</style>
