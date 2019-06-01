const columns = {
  receive: [
    { id: '派工单号', label: '派工单号', width: 130, sort: false },
    { id: '设备', label: '设备', width: 60, sort: false },
    { id: '产品名称', label: '产品', width: 440, sort: false },
    { id: '工序', label: '工序', width: 100, sort: false },
    { id: 'planqty', label: '计划开工/完工', width: 150, sort: false },
    { id: '派工', label: '派工', width: 60, sort: false }
  ],
  report: [
    { id: '派工单号', label: '派工单号', width: 130, sort: false },
    { id: 'device', label: '设备', width: 60, sort: false },
    { id: 'product', label: '产品', width: 380, sort: false },
    { id: 'startendtime', label: '工序', width: 100, sort: false },
    { id: '派工', label: '派工数', width: 140, sort: false },
    { id: '汇报', label: '汇报数', width: 120, sort: false },
    { id: '合格', label: '合格', width: 120, sort: false },
    { id: '不合格', label: '不合格', width: 120, sort: false }
  ]
}

export default columns
