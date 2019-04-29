<template>
    <el-button @click="handelClick">
        <el-card :body-style="{ padding: '0px' }">
            <img :src="icon" />
            <div id="title">
                <span>{{title}}</span>
            </div>
            <hr/>
            <div id="secTitle">
                <span>
                    {{secTitle}}：
                </span>
                <span class="number" :style="{color:color}">{{count}}</span>
                </div>
        </el-card>
    </el-button>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    path: { type: String, required: true },
    icon: { type: String, required: true },
    title: { type: String, required: true },
    secTitle: { type: String, required: true },
    count: { type: Number, required: true },
    isNew: { type: Boolean, default: false }
  },
  methods: {
    handelClick () {
      this.$router.push({
        path: this.path
      })
    }
  },
  computed: {
    color () {
      return this.isNew ? 'red' : ''
    }
  }
}
</script>

<style scoped>
    #title,#secTitle{
        font-weight: bold
    }
    .number{
        font-size: 1.2rem;
    }
</style>
