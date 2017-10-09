ax5.ui.grid.formatter["date"] = function()
{
  var date = this.value;
  if(date != ""  )
    return date.substring(0,10); // .toLocaleString('ko-KR');
  else {
    return date;
  }
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
      {key:"use_amt", label:"금액", algin:"center", formatter:"money"},
  ]
});

$('[data-grid-control]').click(function () {
            switch (this.getAttribute("data-grid-control")) {
                case "row-add":
                  firstGrid.addRow($.extend({}, firstGrid.list[0]), "last", {focus: "END"});
                  break;
                case "row-remove":
                  firstGrid.removeRow();
                  break;
                case "row-get":
                  console.log(firstGrid.getList("modified"));
                  break;
            }
        });
