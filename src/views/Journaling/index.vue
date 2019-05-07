
<template>
    <div class="fullscreen">
        <tableHeader class="header" :title="title" :items="tabItems" @tabChange="handelTabChange" />
    </div>

</template>

<script>
// 派工单页面
export default {
  name: 'Journaling',
  data () {
    return {
      title: '我的报表',
      tabItems: [
        { title: '我的报表', value: 'WDBB', count: 0 }
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
        case 'WDBB': {
          return this.tableColumns.WDBB
        }
      }
      return ''
    }
  }
}
</script>

<style scoped>

</style>
