
<template>
    <div class="fullscreen">
        <tableHeader class="header" :title="title" :items="tabItems" @tabChange="handelTabChange" />
    </div>
</template>

<script>
export default {
  name: 'BarCode',
  data () {
    return {
      title: '条码打印',
      tabItems: [
        { title: '条码打印', value: 'TMDY', count: 0 }
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
        case 'TMDY': {
          return this.tableColumns.TMDY
        }
      }
      return ''
    }
  }
}
</script>

<style scoped>

</style>
