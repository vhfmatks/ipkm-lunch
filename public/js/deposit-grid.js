var depositGrid = new ax5.ui.grid();
depositGrid.setConfig({
  target: $('[data-ax5grid="deposit-grid"]'),
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
      columnHeight: 28
  },
  columns: [
      {key:"month", label:"해당월", algin:"center",  editor:{type:"date"}},
      {key:"user", label:"입금자", algin:"center",editor:{type:"text"}},
      {key:"amt", label:"입금액", algin:"center", formatter:"money",editor:{type:"text"}},
      {key:"date", label:"입금일자", algin:"center", editor:{type:"date"}},
  ]
});

var emptyList = {
  "month" : "",
  "user" : "",
  "amt" :"",
  "date" :""
}

$('[data-grid-control]').click(function () {
            switch (this.getAttribute("data-grid-control")) {
                case "row-add2":
                  depositGrid.addRow($.extend({}, emptyList), "last", {focus: "END"});
                  break;
                case "row-remove2":
                  var selected = depositGrid.getList('selected');
                  $.ajax({
                    url:"/deposit",
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
                case "row-get2":
                  var modifiedList = depositGrid.getList("modified");
                  $.ajax({
                    url: "/deposit",
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
