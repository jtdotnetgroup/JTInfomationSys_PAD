<template>
  <div class="menus">
    <template v-for="(item,index) in menus">
      <mainItem
        class="menuItem"
        :key="index"
        v-if="item.meta"
        :path="item.path"
        :icon="item.meta.icon"
        :title="item.meta.title"
        :secTitle="item.meta.secTitle"
        :count="item.meta.count"
      />
      <br :key="'br'+ index" v-if="index===3">
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {
    mainItem: () => import('@/components/mainItem.vue')
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions({
      getList: 'menus/getList'
    })
  },
  mounted () {
    this.getList()
  },
  beforeCreate () {
    this.$store.dispatch('GetAllTaskQty', { StrKey: '*' })
  },
  created () {
    var TaskQty = this.$store.state.TaskQty.TaskQty
    console.log(TaskQty)
  },
  computed: {
    username () {
      return this.$store.state.account.username
    },
    menus () {
      var TaskQty = this.$store.state.TaskQty.TaskQty
      var ListRouters = this.$store.getters.addRouters.filter(e => {
        return !!e.meta
      })
      ListRouters.forEach(tmp => {
        TaskQty.forEach(item => {
          var obj = tmp.meta
          if (obj.key === item.strKey) {
            tmp.meta.count = item.total
          }
        })
      })
      return ListRouters
    }
  }
}
</script>

<style scoped>
@media screen {
}

.menuItem {
  margin: 3vw;
  padding: 5px;
}
</style>
