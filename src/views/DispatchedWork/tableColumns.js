const columns = {
  receive: [
    { id: 'billno', label: '派工单号', width: 100, sort: false },
    { id: 'device', label: '设备', width: 100, sort: false },
    { id: 'product', label: '产品', width: 100, sort: false },
    { id: 'startendtime', label: '工序', width: 100, sort: false },
    { id: 'planqty', label: '计划开工/完工', width: 100, sort: false },
    { id: 'planqty1', label: '派工', width: 100, sort: false }
  ],
  receiveObj: { billno: '', device: '', product: '', startendtime: '', planqty: '', planqty1: '' },
  report: [
    { id: 'billno', label: '派工单号', width: 100, sort: false },
    { id: 'device', label: '设备', width: 100, sort: false },
    { id: 'product', label: '产品', width: 100, sort: false },
    { id: 'startendtime', label: '工序', width: 100, sort: false },
    { id: 'planqty', label: '派工数量', width: 100, sort: false },
    { id: 'planqty1', label: '汇报数量', width: 100, sort: false }
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
