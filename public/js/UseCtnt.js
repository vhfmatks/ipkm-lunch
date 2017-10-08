ax5.ui.grid.formatter["date"] = function()
{
  var date = this.value;
  return date.substr(0,10); // .toLocaleString('ko-KR');
}
ax5.ui.grid.formatter["amt"] = function()
{
  var date = this.value;
  return date.toLocaleString(); // .toLocaleString('ko-KR');
}
var firstGrid = new ax5.ui.grid();
firstGrid.setConfig({
  target: $('[data-ax5grid="first-grid"]'),
  //frozenColumnIndex: 2,
  frozenRowIndex: 0,
  showLineNumber: true,
  //showRowSelector: true,
  multipleSelect: false,
  lineNumberColumnWidth: 40,
  rowSelectorColumnWidth: 22,
  sortable: true,
  multiSort: false,
  header: {
      align: "center",
      columnHeight: 28
  },
  body: {
      align: "center",
      columnHeight: 28,
      onClick: function () {
           console.log(this);
          this.self.select(this.dindex);
      }
  },
  columns: [
      {key:"use_place", label:"장소", algin:"center"},
      {key:"use_date", label:"날짜", algin:"center", formatter:"date"},
      {key:"use_amt", label:"금액", algin:"center", formatter:"amt"},
  ]
});
