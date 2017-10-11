
var firstGrid = new ax5.ui.grid();
firstGrid.setConfig({
  target: $('[data-ax5grid="first-grid"]'),
  //frozenColumnIndex: 2,
  frozenRowIndex: 0,
  showLineNumber: true,
  showRowSelector: true,
  multipleSelect: true,
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
  },
  columns: [
      {key:"use_place", label:"장소", algin:"center", editor:{type:"text"}},
      {key:"use_date", label:"날짜", algin:"center",editor:{type:"date"}},
      {key:"use_amt", label:"금액", algin:"center", formatter:"money",editor:{type:"text"}},
  ],
  footSum: [
                [
                    {label: "SUMMARY", colspan: 2, align: "center"},
                    {key: "use_amt", collector: "sum", formatter: "money", align: "right"},
                    {key: "use_amt", collector: "avg", formatter: "money", align: "right"},
                  ]
                ]
});

var emptyList = {
  "use_place" : "",
  "use_date" : "",
  "use_amt" :""
}

$('[data-grid-control]').click(function () {
            switch (this.getAttribute("data-grid-control")) {
                case "row-add":
                  firstGrid.addRow($.extend({}, emptyList), "last", {focus: "END"});
                  break;
                case "row-remove":
                  var selected = firstGrid.getList('selected');
                  $.ajax({
                    url:"/use",
                    type:"DELETE",
                    cache:false,
                    timeout:30000,
                    contentType:"application/json; charset=UTF-8",
                    dataType:"json",
                    data: JSON.stringify(selected),
                    success: function(data) {
                      //console.log(data);
                      window.location.reload(true);
                    }
                  });
                  break;
                case "row-get":
                  var modifiedList = firstGrid.getList("modified");
                  $.ajax({
                    url: "/use",
                    type: "PUT",
                    cache:false,
                    timeout : 30000,
                    contentType:"application/json; charset=UTF-8",
                    dataType:"json",
                    data: JSON.stringify(modifiedList),
                    success: function(data) {
                        window.location.reload(true);
                    }
                });
              }
            });
