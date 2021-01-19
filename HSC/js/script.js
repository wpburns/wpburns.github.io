$.ajax({
    type: "GET",
    url: "data/contacts.csv",
    success: function (data) {
        $('.container-fluid').append(arrayToTable(Papa.parse(data).data));
        $('#example').DataTable({
            pageLength: 20,
            filter: false,
            deferRender: false,
            scrollCollapse: true,
            scroller: false,
            responsive: true,
            ordering:  false
        });
    }
});

function arrayToTable(tableData) {
    var table = $('<table id="example" class="display nowrap " style="width:100%"><thead><tr><th>Dept.</th><th>Tel Number</th></tr></thead></table>');

    $(tableData).each(function (i, rowData) {
        var row = $('<tr height="55"></tr>');
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
                // console.log(cellData)
                if(j == 0){
                    row.append($('<td><div class="wordwrap">'+cellData+'</div></td>'));
                } else {
                    row.append($('<td><a href="tel:'+cellData+'">'+cellData+'</a></td>'));
                }
            }
        });
        table.append(row);
    });
    console.log(table);
    return table;
}