const columns = {
  receive: [
    { id: '派工单号', label: '派工单号', width: 130, sort: false },
    { id: '设备', label: '设备', width: 60, sort: false },
    { id: '产品', label: '产品', width: 440, sort: false },
    { id: '工序', label: '工序', width: 100, sort: false },
    { id: 'planqty', label: '计划开工/完工', width: 150, sort: false },
    { id: '派工', label: '派工', width: 60, sort: false }
  ],
  receiveObj: { billno: '', device: '', product: '', startendtime: '', planqty: '', planqty1: '' },
  report: [
    { id: '派工单号', label: '派工单号', width: 130, sort: false },
    { id: 'device', label: '设备', width: 60, sort: false },
    { id: 'product', label: '产品', width: 380, sort: false },
    { id: 'startendtime', label: '工序', width: 100, sort: false },
    { id: '派工', label: '派工数量', width: 140, sort: false },
    { id: '汇报', label: '汇报数量', width: 120, sort: false }
  ],
  finished: [
    { id: 'billno', label: '派工单号', width: 100, sort: false },
    { id: 'device', label: '设备生产线', width: 100, sort: false },
    { id: 'startendtime', label: '开工/完工时间', width: 100, sort: false },
    { id: 'product', label: '产品', width: 100, sort: false },
    { id: 'planqty', label: '计划数量', width: 100, sort: false },
    { id: 'planqty2', label: '计划数量2', width: 100, sort: false }
  ]
}

export default columns
