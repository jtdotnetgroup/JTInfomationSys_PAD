<template>
  <div class="fullscreen">
    <top class="header"/>
    <mid class="mid"/>
    <bot class="bottom"/>
  </div>
</template>

<script>
export default {
  components: {
    top: () => import('./components/top.vue'),
    mid: () => import('./components/mid.vue'),
    bot: () => import('./components/bottom.vue')
  }
}
</script>

<style  scoped>
.mid {
  height: 85vh;
}
.header{
   height: 10vh;
}

</style>
