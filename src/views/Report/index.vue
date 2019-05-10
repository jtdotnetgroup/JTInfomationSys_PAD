
<template>
    <div class="fullscreen">
        <tableHeader class="header" :title="title" :items="tabItems" @tabChange="handelTabChange" />
    </div>
</template>

<script>
// 派工单页面
export default {
  name: 'Report',
  data () {
    return {
      title: '完工汇报',
      tabItems: [
        { title: '完工汇报', value: 'WGHB', count: 0 }
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
        case 'WGHB': {
          return this.tableColumns.WGHB
        }
      }
      return ''
    }
  }
}
</script>

<style scoped>

</style>
