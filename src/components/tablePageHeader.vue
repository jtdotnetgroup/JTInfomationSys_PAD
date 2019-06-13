<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-button @click="goback" type="primary" icon="el-icon-arrow-left">{{title}}</el-button>
      </el-col>
      <el-col :span="16">
        <el-radio-group id="tabgroup" v-model="tab" @change="tabChange">
          <el-radio-button
            v-for="(item,index) in items"
            :key="index"
            :label="item.value"
          >{{item.title+'('+item.count+')'}}</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="4">
        <TimeAndLogout/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: this.items[0].value
    }
  },
  components: {
    TimeAndLogout: () => import('@/components/timeAndLogout.vue')
  },
  props: {
    title: {
      type: String,
      default: 'HeaderTitle'
    },
    items: { type: Array }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    tabChange (label) {
      this.$emit('tabChange', label)
    }
  }
}
</script>

<style  scoped>
#tabgroup {
  background: #fff;
  border-radius: 5px;
}
.el-button,
#tabgroup {
  padding: 20px 5px 20px 5px;
}
.el-button {
  font-size: 2rem;
}

</style>
