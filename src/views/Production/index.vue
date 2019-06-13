
<template>
    <div class="fullscreen">
        <tableHeader class="header" :title="title" :items="tabItems" @tabChange="handelTabChange" />
    </div>
</template>
<script>
// 派工单页面
export default {
  name: 'Production',
  data () {
    return {
      title: '生产领料',
      tabItems: [
        { title: '生产领料', value: 'SCLL', count: 0 }
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
        case 'SCLL': {
          return this.tableColumns.SCLL
        }
      }
      return ''
    }
  }
}
</script>

<style scoped>

</style>
