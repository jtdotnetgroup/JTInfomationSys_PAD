<template>
  <div class="fullscreen">
    <tableHeader class="header" :title="title" @tabChange="handelTabChange"/>
    <el-row style="background-color: white;
    padding: 20px 0px;">
      <el-col :span="2">
        <div class="grid-content">
          <div class="demo-input-suffix"  style="line-height:40px;">流转卡号：</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <div class="demo-input-suffix">
            <el-input v-model="CodeNum" placeholder="请输入流转卡号"></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content">
          <div class="demo-input-suffix" style="line-height:40px;">工序：</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <div class="demo-input-suffix">
            <el-input v-model="Step" placeholder="请输入工序"></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content" style="text-align: right;padding-right: 15px;">
          <el-button plain>取消</el-button>
          <el-button type="success" plain>提交</el-button>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="0" class="bbtbt">
      <el-col :span="8" class="btbt">
        <div class="grid-content">
          <el-row :gutter="0" class="text-bule">
            <el-col :span="12">
              <div class="grid-content btt btr">不良项目</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content btt">次数</div>
            </el-col>
          </el-row>
        </div>
        <div class="grid-content" v-for="(item, index) in BadItem" :key="index">
          <el-row :gutter="0" :class="(index%2 == 0)? 'text-gray':'text-white'">
            <el-col :span="12">
              <div :class="(index%2 == 0)? 'grid-content bt btr':'grid-content bt btrw'" :style="'color:'+item.typecolor">{{item.type}}</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bt">
                <i class="el-icon-minus icon"></i>
                <span :style="'color:'+item.numcolor">{{item.num}}</span>
                <i class="el-icon-plus icon"></i>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="8" class="btbt">
        <div class="grid-content">
          <el-row :gutter="0" class="text-bule">
            <el-col :span="12">
              <div class="grid-content btt btr">不良判断</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content btt">数量</div>
            </el-col>
          </el-row>
        </div>
        <div class="grid-content" v-for="(item, index) in Badjudgement" :key="index">
          <el-row :gutter="0" :class="(index%2 == 0)? 'text-gray':'text-white'">
            <el-col :span="12">
              <div :class="(index%2 == 0)? 'grid-content bt btr':'grid-content bt btrw'" :style="'color:'+item.typecolor">{{item.type}}</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bt">
                <span :style="'color:'+item.numcolor">{{item.num}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="8" class="btbt">
        <div class="grid-content">
          <el-row :gutter="0" class="text-bule">
            <el-col :span="12">
              <div class="grid-content btt btr">项目</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content btt">数量</div>
            </el-col>
          </el-row>
        </div>
        <div class="grid-content" v-for="(item, index) in BadProject" :key="index">
          <el-row :gutter="0" :class="(index%2 == 0)? 'text-gray':'text-white'">
            <el-col :span="12">
              <div :class="(index%2 == 0)? 'grid-content bt btr':'grid-content bt btrw'"  :style="'color:'+item.typecolor">{{item.type}}</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bt">
                <span :style="'color:'+item.numcolor">{{item.num}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import columns from './TestingtableColumns.js'
// 派工单页面
export default {
  name: 'IPQC',
  data () {
    return {
      CodeNum: '',
      Step: '',
      BadItem: [
        { type: '毛刺', num: 5, typecolor: 'back', numcolor: 'back' },
        { type: '斜面', num: 5, typecolor: 'back', numcolor: 'back' },
        { type: '裂纹', num: 4, typecolor: 'back', numcolor: 'back' },
        { type: '………', num: 1, typecolor: 'back', numcolor: 'red' }
      ],
      Badjudgement: [
        { type: '工回', num: 0, typecolor: 'back', numcolor: 'back' },
        { type: '料回', num: 0, typecolor: 'back', numcolor: 'back' },
        { type: '工废', num: 1, typecolor: 'red', numcolor: 'red' },
        { type: '料废', num: 0, typecolor: 'red', numcolor: 'red' }
      ],
      BadProject: [
        { type: '汇报数', num: 5, typecolor: 'back', numcolor: 'back' },
        { type: '检验数', num: 5, typecolor: 'back', numcolor: 'back' },
        { type: '合格数', num: 4, typecolor: 'back', numcolor: 'back' },
        { type: '不合格', num: 1, typecolor: 'red', numcolor: 'red' }
      ],
      title: '质检汇报',
      tabItems: [],
      tabledata: [],
      currentPage: 1,
      pageSize: 20,
      totalNum: 100,
      tabvalue: 'receive',
      tableColumns: columns
    }
  },
  components: {
    tableHeader: () => import('@/components/tablePageHeader.vue')
  },
  methods: {
    handelTabChange (value) {},
    sizeChange (value) {},
    currentChange (value) {},
    scopes () {
      console.log('sss')
      this.$router.push({ path: '../views/IPQC/Testing.vue' })
    }
  },
  computed: {
    columnHeader () {
      switch (this.tabvalue) {
        case 'receive': {
          return this.tableColumns.receive
        }
        case 'report': {
          return this.tableColumns.report
        }
        case 'finished': {
          return this.tableColumns.finished
        }
      }
      return ''
    }
  }
}
</script>

<style >
.el-row {
  margin-bottom: 20px;
}
.el-row :last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-button {
  padding: 12px 60px;
}
.demo-input-suffix {
  text-align: right;
}
.el-radio-group {
  display: none;
}
.btt {
  color: white;
  border-radius: 0px;
  padding: 15px 20px;
  font-size: 25px;
}
.bt {
  border-radius: 0px;
  padding: 15px 20px;
  font-size: 25px;
  line-height: 35px;
}
.btg {
  background-color: rgb(228, 228, 228);
  border-radius: 0px;
  padding: 15px 20px;
  font-size: 25px;
}
.btr {
  border-right: 1px solid white;
}
.btrw {
  border-right: 1px solid rgb(242, 242, 242);
}
.btbt {
  padding: 0px 10px;
}
.bbtbt {
  padding: 15px;
  background-color: rgb(242, 242, 242);
}
.text-bule {
  background-color: rgb(51, 153, 204);
}
.text-gray {
  background-color: rgb(228, 228, 228);
}
.text-white {
  background-color: white;
}
.fullscreen {
  background-color: rgb(242, 242, 242);
}
.icon {
  cursor: pointer;
  position: relative;
  top: 5px;
}
.el-icon-minus {
  float: left;
}
.el-icon-plus {
  float: right;
}
</style>
