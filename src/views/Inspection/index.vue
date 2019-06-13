
<template>
    <div class="fullscreen">
        <tableHeader class="header" :title="title" :items="tabItems" @tabChange="handelTabChange" />
    </div>
</template>

<script>
// 派工单页面
export default {
  name: 'Inspection',
  data () {
    return {
      title: '完工报检',
      tabItems: [
        { title: '完工报检', value: 'WGBJ', count: 0 }
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
        case 'WGBJ': {
          return this.tableColumns.receive
        }
      }
      return ''
    }
  }
}
</script>

<style scoped>

</style>
