<template>
  <div class="fullscreen">
    <!-- 栏目 -->
    <tableHeader class="header" :title="title" :items="tabItems" @tabChange="handelTabChange"/>
    <!-- 输入框 -->
    <el-row style="background-color: white;
    padding: 20px 0px;">
      <el-col :span="2">
        <div class="grid-content">
          <div class="demo-input-suffix" style="line-height:40px;font-size: 20px;">检验单号：</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <div class="demo-input-suffix">
            <el-input v-model=" this.$route.query.fBillNo" disabled="disabled" placeholder="请输检验单号"></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content">
          <div class="demo-input-suffix" style="line-height:40px;font-size: 20px;">工序：</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <div class="demo-input-suffix">
            <el-input v-model="from.Step" disabled="disabled" placeholder="请输入工序"></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <div class="grid-content">
          <div class="demo-input-suffix" style="line-height:40px;font-size: 20px;">批号：</div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <div class="demo-input-suffix">
            <el-input v-model="from.FBillNo" disabled="disabled" placeholder="请输入批号"></el-input>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content" style="text-align: right;padding-right: 15px;">
          <el-button @click="Cancel" plain>取消</el-button>
          <el-button @click="OnSubmit" type="success" plain>提交</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 所有项目列表 -->
    <el-row :gutter="0" class="bbtbt" v-loading="loading">
      <el-col :span="8" class="btbt" v-for="(tmp,index2) in AllCol" :key="index2">
        <!-- 项目名称以及数量 -->
        <div class="grid-content">
          <el-row :gutter="0" class="text-bule">
            <el-col :span="12">
              <div class="grid-content btt btr">{{tmp.title1}}</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content btt">{{tmp.title2}}</div>
            </el-col>
          </el-row>
        </div>
        <!-- 项目明细 -->
        <div class="grid-content" v-for="(item, index) in tmp.Col" :key="index">
          <el-row :gutter="0" :class="(index%2 == 0)? 'text-gray':'text-white'">
            <el-col :span="12">
              <div
                :class="(index%2 == 0)? 'grid-content bt btr':'grid-content bt btrw'"
                :style="'color:'+item.typecolor"
              >{{item.type}}</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bt">
                <i class="el-icon-minus icon" v-show="item.IsAddDel" @click="DelNum(item.key)"></i>
                <span
                  :style="'color:'+item.numcolor"
                  :id="item.key"
                  @click="DigitalOpen(item,item.IsAddDel)"
                >{{item.num}}</span>
                <i class="el-icon-plus icon" v-show="item.IsAddDel" @click="AddNum(item.key)"></i>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <!-- 打开数字键盘 以及接受回调 -->
    <Digital ref="Digital" @DigitalCallback="DigitalCallback"/>
  </div>
</template>
<script>
// 数据处理
import { GetMx, DataAddOrPUT, GetAll } from '@/api/mission'
//
import columns from './TestingtableColumns.js'
// 派工单页面
export default {
  name: 'IPQC',
  data () {
    return {
      loading: false,
      title: '质检汇报',
      tabItems: [{ title: '质检汇报', value: 'ZJHB', count: 0 }],
      tabvalue: 'ZJHB',
      from: {
        FID: 0,
        FItemID: 0,
        Step: '',
        FBillNo: '',
        汇报数: 0,
        FOperID: 0
      },
      AllCol: [
        {
          ColKey: 'col1',
          title1: '项目',
          title2: '数量',
          Col: [
            {
              key: 'FAuxQty',
              type: '汇报数',
              num: 0,
              typecolor: 'back',
              numcolor: 'back',
              IsAddDel: false
            },
            {
              key: 'FCheckAuxQty',
              type: '检验数',
              num: 0,
              typecolor: 'back',
              numcolor: 'back',
              IsAddDel: true
            },
            {
              key: 'FPassAuxQty',
              type: '合格数',
              num: 0,
              typecolor: 'back',
              numcolor: 'back',
              IsAddDel: false
            },
            {
              key: 'FFailAuxQty',
              type: '不合格',
              num: 0,
              typecolor: 'red',
              numcolor: 'red',
              IsAddDel: true
            },
            {
              key: 'BZS',
              type: '单位包装数',
              num: this.$route.query.F_102,
              typecolor: 'red',
              numcolor: 'red',
              IsAddDel: false
            },
            {
              key: 'FYSQty',
              type: '余数',
              num: 0,
              typecolor: 'red',
              numcolor: 'red',
              IsAddDel: false
            }
          ]
        },
        {
          ColKey: 'col2',
          title1: '不良判断',
          title2: '数量',
          Col: [
            {
              key: 'FFailAuxQtyP',
              type: '工废',
              num: 0,
              typecolor: 'back',
              numcolor: 'back',
              IsAddDel: true
            },
            {
              key: 'FFailAuxQtyM',
              type: '料废',
              num: 0,
              typecolor: 'back',
              numcolor: 'back',
              IsAddDel: true
            },
            {
              key: 'FPassAuxQtyP',
              type: '工回',
              num: 0,
              typecolor: 'red',
              numcolor: 'red',
              IsAddDel: true
            },
            {
              key: 'FPassAuxQtyM',
              type: '料回',
              num: 0,
              typecolor: 'red',
              numcolor: 'red',
              IsAddDel: true
            }
          ]
        }
      ],
      TB_BadItemRelation: []
    }
  },
  watch: {},
  components: {
    tableHeader: () => import('@/components/tablePageHeader.vue'),
    Digital: () => import('@/components/Common/Digital.vue')
  },
  // 所有方法
  methods: {
    // 增加
    AddNum (key) {
      this.AllCol.forEach(tmp => {
        tmp.Col.forEach(item => {
          if (item.key === key) {
            item.num++
          }
        })
      })
      this.IsTD(key)
    },
    // 删除
    DelNum (key) {
      this.AllCol.forEach(tmp => {
        tmp.Col.forEach(item => {
          if (item.key === key) {
            item.num--
          }
        })
      })
      this.IsTD(key)
    },
    SetNum (key, num) {
      this.AllCol.forEach(tmp => {
        tmp.Col.forEach(item => {
          if (item.key === key) {
            item.num = num
          }
        })
      })
    },
    IsTD (key) {
      if (
        key === 'FCheckAuxQty' ||
        key === 'FPassAuxQty' ||
        key === 'FFailAuxQty'
      ) {
        // 检验数
        var FCheckAuxQty = this.AllCol[0].Col.filter(t => {
          return t.key === 'FCheckAuxQty'
        })[0].num
        // 合格数
        var FPassAuxQty = this.AllCol[0].Col.filter(t => {
          return t.key === 'FPassAuxQty'
        })[0].num
        // 不合格数
        var FFailAuxQty = this.AllCol[0].Col.filter(t => {
          return t.key === 'FFailAuxQty'
        })[0].num
        // 单位包装数
        var BZS = this.AllCol[0].Col.filter(t => {
          return t.key === 'BZS'
        })[0].num

        this.SetNum('FYSQty', (FCheckAuxQty * 1 - FFailAuxQty * 1) % BZS)
        this.SetNum('FPassAuxQty', FCheckAuxQty * 1 - FFailAuxQty * 1)
      }
    },
    // 打开键盘
    DigitalOpen (value, IsAddDel) {
      if (IsAddDel) {
        var obj = {
          width: '30%',
          num: value.num,
          title: value.type,
          placeholder: '当前数量' + value.num,
          key: value.key
        }
        this.$refs.Digital.show(obj)
      }
    },
    // 键盘回调
    DigitalCallback (obj) {
      this.AllCol.forEach(item => {
        item.Col.forEach(tmp => {
          if (tmp.key === obj.key) {
            tmp.num = obj.num * 1
          }
        })
      })
      this.$refs.Digital.hide()
      this.IsTD(obj.key)
    },
    // 获取不良项目列表
    GetTB_BadItemRelation () {
      var _this = this
      _this.loading = true
      // 0 false ,1 true
      GetAll('TB_BadItemRelation/GetAll', {})
        .then(res => {
          var result = res.data.result
          // console.log(result)
          _this.TB_BadItemRelation = result
          _this.AllCol[2].Col.push()
        })
        .catch(function () {
          _this.loading = false
        })
    },
    // 返回上一层
    Cancel () {
      this.$router.go(-1) // 返回上一层
    },
    // 提交
    OnSubmit () {
      var _this = this

      if (_this.from.FBillNo.length === 0) {
        _this.$message({
          showClose: true,
          message: '批号不能为空！',
          type: 'warning'
        })
      }
      // _this.loading = true;
      var obj = {
        icmoInspectBill: {
          fid: _this.from.FID,
          fOperID: _this.from.FOperID,
          fBillNo: _this.from.FBillNo,
          fAuxQty: _this.AllCol[0].Col[0].num,
          fCheckAuxQty: _this.AllCol[0].Col[1].num,
          fPassAuxQty: _this.AllCol[0].Col[2].num,
          fFailAuxQty: _this.AllCol[0].Col[3].num,
          fFailAuxQtyP: _this.AllCol[1].Col[0].num,
          fFailAuxQtyM: _this.AllCol[1].Col[1].num,
          fPassAuxQtyP: _this.AllCol[1].Col[2].num,
          fPassAuxQtyM: _this.AllCol[1].Col[3].num,
          fNote: '',
          fYSQty: this.$route.query.F_102 // 后台特殊处理
        },
        icQualityRptsList: []
      }
      if (_this.AllCol.length > 2) {
        _this.AllCol[2].Col.forEach(item => {
          obj.icQualityRptsList.push({
            FID: 0,
            FItemID: item.key,
            FAuxQty: item.num,
            FRemark: '',
            FNote: ''
          })
        })
      }
      // console.log(obj)
      // return;
      DataAddOrPUT('ICMOInspectBill/ICMODispBillSave', obj)
        .then(res => {
          _this.$message({
            message: '提交成功',
            type: 'success'
          })
          if (res.data.success) {
            _this.Cancel()
          }
          _this.loading = false
        })
        .catch(function () {
          _this.loading = false
        })
    },
    // 获取明细
    Detailed () {
      var _this = this
      _this.loading = true
      var obj = {
        fid: this.from.FID,
        fItemID: this.from.FItemID,
        fBillNo: this.from.FBillNo,
        fOperID: this.from.FOperID
      }
      GetMx('ICMOInspectBill/ICMOInspectBillDetailed', obj)
        .then(res => {
          // console.log(res);
          if (res.data.success) {
            var result = res.data.result
            var Bill = result.icmoInspectBill
            var icQualityRptsList = result.icQualityRptsList
            if (Bill.fAuxQty * 1 === 0) {
              Bill.fAuxQty = _this.from.汇报数 * 1
            }
            var obj1 = {
              ColKey: 'col1',
              title1: '项目',
              title2: '数量',
              Col: [
                {
                  key: 'FAuxQty',
                  type: '汇报数',
                  num: Bill.fAuxQty * 1,
                  typecolor: 'back',
                  numcolor: 'back',
                  IsAddDel: false
                },
                {
                  key: 'FCheckAuxQty',
                  type: '检验数',
                  num: Bill.fCheckAuxQty * 1,
                  typecolor: 'back',
                  numcolor: 'back',
                  IsAddDel: true
                },
                {
                  key: 'FPassAuxQty',
                  type: '合格数',
                  num: Bill.fPassAuxQty * 1,
                  typecolor: 'back',
                  numcolor: 'back',
                  IsAddDel: false
                },
                {
                  key: 'FFailAuxQty',
                  type: '不合格',
                  num: Bill.fFailAuxQty * 1,
                  typecolor: 'red',
                  numcolor: 'red',
                  IsAddDel: true
                },
                {
                  key: 'BZS',
                  type: '单位包装数',
                  num: this.$route.query.F_102,
                  typecolor: 'red',
                  numcolor: 'red',
                  IsAddDel: false
                },
                {
                  key: 'FYSQty',
                  type: '余数',
                  num: 0,
                  typecolor: 'red',
                  numcolor: 'red',
                  IsAddDel: false
                }
              ]
            }
            //
            var obj2 = {
              ColKey: 'col2',
              title1: '不良判断',
              title2: '数量',
              Col: [
                {
                  key: 'FFailAuxQtyP',
                  type: '工废',
                  num: Bill.fFailAuxQtyP * 1,
                  typecolor: 'back',
                  numcolor: 'back',
                  IsAddDel: true
                },
                {
                  key: 'FFailAuxQtyM',
                  type: '料废',
                  num: Bill.fFailAuxQtyM * 1,
                  typecolor: 'back',
                  numcolor: 'back',
                  IsAddDel: true
                },
                {
                  key: 'FPassAuxQtyP',
                  type: '工回',
                  num: Bill.fPassAuxQtyP * 1,
                  typecolor: 'red',
                  numcolor: 'red',
                  IsAddDel: true
                },
                {
                  key: 'FPassAuxQtyM',
                  type: '料回',
                  num: Bill.fPassAuxQtyM * 1,
                  typecolor: 'red',
                  numcolor: 'red',
                  IsAddDel: true
                }
              ]
            }
            //
            var obj3 = {
              ColKey: 'col3',
              title1: '项目',
              title2: '数量',
              Col: []
            }
            // 后台一起返回
            // icQualityRptsList.forEach(tmp => {
            //   if(_this.TB_BadItemRelation tmp.fItemID)
            //   obj3.Col.push({
            //     key: tmp.fItemID,
            //     type: tmp.fName,
            //     num: tmp.fAuxQty,
            //     typecolor: "back",
            //     numcolor: "back",
            //     IsAddDel: true
            //   });
            // });
            if (_this.TB_BadItemRelation.length === 0) {
              this.GetTB_BadItemRelation_SeticQualityRptsList(
                icQualityRptsList,
                obj3
              )
            } else {
              _this.TB_BadItemRelation.forEach(tmp => {
                console.log(tmp.fDeleted)
                var IsShow = !tmp.fDeleted
                var FItemID = tmp.fid
                var FName = tmp.fName
                var FAuxQty = 0
                icQualityRptsList.forEach(item => {
                  if (item.fItemID === tmp.fid) {
                    IsShow = true
                    FAuxQty = item.fAuxQty
                  }
                })
                if (IsShow) {
                  obj3.Col.push({
                    key: FItemID,
                    type: FName,
                    num: FAuxQty,
                    typecolor: 'back',
                    numcolor: 'back',
                    IsAddDel: true
                  })
                }
              })
            }
            // console.log(_this.TB_BadItemRelation)
            _this.AllCol = []
            _this.AllCol = [obj1, obj2, obj3]
            var nums = 0
            _this.AllCol.forEach(e => {
              e.Col.forEach(tmp => {
                nums++
              })
            })
            _this.tabItems.forEach(item => {
              item.count = item.value === _this.tabvalue ? nums : item.count
            })
          }
          _this.loading = false
        })
        .catch(function () {
          _this.loading = false
        })
    },
    // 遍历不良项目
    GetTB_BadItemRelation_SeticQualityRptsList (icQualityRptsList, obj3) {
      var _this = this
      if (_this.AllCol.length > 2) {
        return
      }
      _this.loading = true
      // 0 false ,1 true
      GetAll('TB_BadItemRelation/GetAll', {})
        .then(res => {
          var result = res.data.result
          _this.TB_BadItemRelation = result
          _this.TB_BadItemRelation.forEach(tmp => {
            console.log(
              'GetTB_BadItemRelation_SeticQualityRptsList' + tmp.fDeleted
            )
            var IsShow = tmp.fDeleted
            var FItemID = tmp.fid
            var FName = tmp.fName
            var FAuxQty = 0
            icQualityRptsList.forEach(item => {
              if (item.fItemID === tmp.fid) {
                IsShow = true
                FAuxQty = item.fAuxQty
              }
            })
            if (IsShow) {
              obj3.Col.push({
                key: FItemID,
                type: FName,
                num: FAuxQty,
                typecolor: 'back',
                numcolor: 'back',
                IsAddDel: true
              })
            }
          })
          if (_this.AllCol.indexof(obj3) >= 0) {
          } else {
            _this.AllCol.push(obj3)
          }
          var nums = 0
          _this.AllCol.forEach(e => {
            e.Col.forEach(tmp => {
              nums++
            })
          })
          _this.tabItems.forEach(item => {
            item.count = item.value === _this.tabvalue ? nums : item.count
          })
        })
        .catch(function () {
          _this.loading = false
        })
    },
    //
    handelTabChange (value) {},
    sizeChange (value) {},
    currentChange (value) {}
  },
  // 页面渲染前 执行
  created: function () {
    this.from.FID = this.$route.query.FID
    this.from.FItemID = this.$route.query.FItemID
    this.from.Step = this.$route.query.Step
    this.from.汇报数 = this.$route.query.FAuxQty
    this.from.FOperID = this.$route.query.FOperID
    this.from.FBillNo = this.$route.query.FBillNo
    this.GetTB_BadItemRelation()
    this.Detailed()
  },
  //
  computed: {
    columnHeader () {
      switch (this.tabvalue) {
        case 'ZJHB': {
          return this.tableColumns.ZJHB
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
