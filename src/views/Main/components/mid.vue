<template>
    <div class="menus">
        <template  v-for="(item,index) in menus" >
            <mainItem class="menuItem" :key="index" v-if="item.meta"
         :path="item.path" :icon="item.meta.icon" :title="item.meta.title"
         :secTitle="item.meta.secTitle" :count="index"/>
         <br :key="'br'+ index" v-if="index===3"/>
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
    return {

    }
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
    },
    menus () {
      return this.$store.getters.addRouters.filter(e => {
        return !!e.meta
      })
    }
  }
}
</script>

<style scoped>
    @media screen  {

    }

    .menuItem{
        /* display: inline-block; */

        margin:3vw;
        padding: 5px;
    }
    #mid{

    }
</style>
