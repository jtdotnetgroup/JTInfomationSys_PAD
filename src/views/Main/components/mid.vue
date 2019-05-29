<template>
  <div class="menus">
    <template v-for="(item,index) in this.$store.state.menus.items">
      <mainItem
        class="menuItem"
        :key="index"
        :path="item.path"
        :icon="item.icon"
        :title="item.title"
        :secTitle="item.secTitle"
        :count="index"
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
  computed: {
    username () {
      return this.$store.state.account.username
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
