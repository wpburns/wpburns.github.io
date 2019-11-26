var myHilitor = new Hilitor(".cards-table"); // id of the element to parse

$(function() {
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".cards-table > tbody > tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            myHilitor.apply(value);
        });
    });
});

$.ajax({
    type: "GET",
    url: "test_metadata.csv",
    success: function (data) {
        $('.cards-table').append(tableHeaders(Papa.parse(data).data));
        $('.cards-table').append(tableContents(Papa.parse(data).data));
    }
});

function tableContents(tableData) {
    var table = $('<tbody></tbody>');

    $(tableData).slice(1).each(function (i, rowData) {
        var row = $('<tr></tr>');

        $(rowData).each(function (j, cellData) {
            if(cellData.includes('jpg')){
                row.append($('<td>'
                    +'<img class= "image" src="../'+cellData+'" alt="'
                    +cellData+'"/></div></td>'));
            } else if(cellData.split(",").length == 5){
                hexcolours = convert_to_array(cellData);
                var colourDiv = $('<td></td>');
                for (i = 0; i < hexcolours.length; i++) { 
                    colourDiv.append($('<div class="colorize" style="background-color:' +hexcolours[i]+'"></div>'));
                }
                row.append(colourDiv);
            } else {
                row.append($('<td>'+cellData+'</td>'));
            }
        });
        table.append(row);
    });
    return table;
}

function tableHeaders(tableData) {
    var table = $('<thead></thead>');

    $(tableData).each(function (i, rowData) {
        if(i == 0){
            var row = $('<tr></tr>');

            $(rowData).each(function (j, cellData) {
                row.append($('<th>'+cellData+'</th>'));
            });
            table.append(row);
        }
    });
    return table;
}

function convert_to_array(data){
    var arr = data.replace("[", "");
    arr = arr.replace("]", "");
    arr = arr.replace(/'/g, '');
    arr = arr.replace(/ /g, '');
    hexcolours = arr.split(",");
  
    return hexcolours;
}



$(window).load(function(){
    // Card View
    var tables = $('.cards-table');
    // Create an array containing all table headers
    var table_headers = [];

    tables.each(function () {
        var th = [];
        $(this).find('thead th').each(function () {
            th.push($(this).text());
        });
        table_headers.push(th);
    });
    
    // Add a data-label attribute to each cell with the value of the corresponding column header
    // Iterate through each table
    tables.each(function (table) {
        var table_index = table;
        // Iterate through each row
        $(this).find('tbody tr').each(function () {
            // Finally iterate through each column/cell
            $(this).find('td').each(function (column) {
                $(this).attr('data-label', table_headers[table_index][column]);
            });
        });
    });
})


