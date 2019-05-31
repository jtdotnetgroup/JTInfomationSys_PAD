const columns = {
  receive: [
    { id: '派工单号', label: '派工单号', width: 100, sort: false },
    { id: '产品名称', label: '产品', width: 100, sort: false },
    { id: '工序', label: '工序', width: 100, sort: false },
    // { id: '汇报时间', label: '汇报时间', width: 100, sort: false },
    { id: '汇报', label: '汇报数', width: 100, sort: false },
    { id: '合格数量', label: '合格', width: 100, sort: false },
    { id: '不合格数量', label: '不合格', width: 100, sort: false }
  ],
  report: [
    { id: '派工单号', label: '派工单号', width: 100, sort: false },
    { id: '产品名称', label: '产品', width: 100, sort: false },
    { id: '工序', label: '工序', width: 100, sort: false },
    // { id: '汇报时间', label: '汇报时间', width: 100, sort: false },
    { id: '汇报', label: '汇报数', width: 100, sort: false },
    { id: '合格数量', label: '合格', width: 100, sort: false },
    { id: '不合格数量', label: '不合格', width: 100, sort: false }
  ],
  finished: [
    { id: 'TCNum', label: '流转卡号', width: 100, sort: false },
    { id: 'product', label: '产品', width: 100, sort: false },
    { id: 'process', label: '工序', width: 100, sort: false },
    { id: 'reportTime', label: '汇报时间', width: 100, sort: false },
    { id: 'reportNum', label: '汇报数', width: 100, sort: false },
    { id: 'qualified', label: '合格', width: 100, sort: false },
    { id: 'Noqualified', label: '不合格', width: 100, sort: false }
  ]
}

export default columns
