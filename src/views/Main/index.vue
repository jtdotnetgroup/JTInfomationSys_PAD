<template>
    <div class="fullscreen">
        <top class="header" />
        <mid  id="mid"/>
        <bottom id="bottom" />
    </div>

</template>

<script>
export default {
  components: {
    top: () => import('./components/top.vue'),
    mid: () => import('./components/mid.vue'),
    bottom: () => import('./components/bottom.vue')
  }
}
</script>

<style  scoped>
    #bottom{
        margin-bottom: 0;
    }
    #mid{
        height: 80vh;
    }
</style>
