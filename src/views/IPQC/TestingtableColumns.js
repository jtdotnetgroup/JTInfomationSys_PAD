const columns = {
  receive: [
    { id: '派工单号', label: '派工单号', width: 220, sort: false, align: 'center' },
    { id: '产品名称', label: '产品', width: 100, sort: false, align: 'center' },
    { id: '工序', label: '工序', width: 100, sort: false, align: 'center' },
    // { id: '汇报时间', label: '汇报时间', width: 100, sort: false },
    { id: '汇报', label: '汇报数', width: 100, sort: false, align: 'center' },
    { id: '合格数量', label: '合格', width: 100, sort: false, align: 'center' },
    { id: '不合格数量', label: '不合格', width: 100, sort: false, align: 'center' }
  ],
  report: [
    { id: '派工单号', label: '派工单号', width: 200, sort: false, align: 'center' },
    { id: '状态', label: '状态', width: 100, sort: false, align: 'center' },
    { id: '产品名称', label: '产品', sort: false, align: 'center' },
    { id: '工序', label: '工序', width: 100, sort: false, align: 'center' },
    // { id: '汇报时间', label: '汇报时间', width: 100, sort: false },
    { id: '汇报', label: '汇报数', width: 80, sort: false, align: 'center' },
    { id: '合格数量', label: '合格', width: 80, sort: false, align: 'center' },
    { id: '不合格数量', label: '不合格', width: 80, sort: false, align: 'center' }
  ]
}

export default columns
