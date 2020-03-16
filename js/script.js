

function arrayToTable(tableData) {
    var table = $('<table id="myTable"></table>');
    $(tableData).each(function (i, rowData) {
        var row = $('<tr height="210"></tr>');
        var $placeholder = $(".holder");
        $(rowData).each(function (j, cellData) {
            if(cellData.includes('jpg')){
                row.append($('<td><div class="holder">'
                    +'<img src="../'+cellData+'" width="270" height="200" alt="'
                    +cellData+'"/></div></td>'));
            } else if(cellData.split(",").length == 5){
                // TODO fix so that the colours are in the <td>
                hexcolours = convert_to_array(cellData);
                for (i = 0; i < hexcolours.length; i++) { 
                    row.append($('<div class="colorize" style="background-color:' +hexcolours[i]+'"></div>'));
                    console.log(hexcolours[i])
                }
            } else {
                row.append($('<td><div class="holder">'+cellData+'</div></td>'));
            }
        });
        table.append(row);
    });
    return table;
}



// function displaySwatch(hex) {
//     console.log('display swatch');
//     var $placeholder = $("#placeholder");
//     var $tmp = $("<div class='colorize'></div>");
//     $tmp.css("background-color", hex);
//     // $tmp.append($("<span>").text(hex));
//     $placeholder.add($tmp);
//     // console.log($placeholder);
// }

// $(function() {
//     for (i = 0; i < hexcolor.length; i++) { 
//         displaySwatch(hexcolor[i])
//     }
// });

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

var mytext = getUrlVars()["text"];

$.ajax({
    type: "GET",
    url: "../test_metadata.csv",
    success: function (data) {
        $('body').append(arrayToTable(Papa.parse(data).data));
    }
});

$(function() {
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable > tbody > tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });

$(window).scroll(function(e){ 
    var $el = $('.searchDiv'); 
    var isPositionFixed = ($el.css('position') == 'fixed');
    if ($(this).scrollTop() > 200 && !isPositionFixed){ 
        $el.css({'position': 'fixed', 'top': '20px'}); 
    }
    if ($(this).scrollTop() < 200 && isPositionFixed){
        $el.css({'position': 'static', 'top': '20px'}); 
    } 
});

function convert_to_array(data){
    var arr = data.replace("[", "");
    arr = arr.replace("]", "");
    arr = arr.replace(/'/g, '');
    arr = arr.replace(/ /g, '');
    hexcolours = arr.split(",");
  
    return hexcolours;
}

// function render_colours(colorData){
//     var $placeholder = $("#placeholder");
//     var $tmp;
//     $.each(colorData, function(idx, elem) {
//         $tmp = $("<div class='colorize'></div>");
//         $tmp.css("background-color", "rgb(" + this[0] + "," + this[1] + "," + this[2] + ")");
//         //$tmp.append($("<span>").text($tmp.css('background-color')));
//         $tmp.append($("<span>").text("#" +
//         twoDigitHex(this[0]) +
//         twoDigitHex(this[1]) +
//         twoDigitHex(this[2])));
//         $placeholder.append($tmp);
//   });
// }

// function twoDigitHex(val) {
//     return ("00" + val.toString(16)).substr(-2).toUpperCase();
//   }