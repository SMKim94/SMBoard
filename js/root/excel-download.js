/**
 * Reference : https://redstapler.co/sheetjs-tutorial-create-xlsx/
 */

'use strict';

console.log('excel-download.js');

function downloadExcelAs2DArray() {
    console.log('2차원 배열로 엑셀 파일 다운로드하기');
    var workBook = XLSX.utils.book_new();
    workBook.Props = {
        Title: 'SheetJS Tutorial',
        Subject: 'Test file',
        Author: 'Sungmin Kim',
        CreatedDate: new Date()
    };
    workBook.SheetNames.push('Test Sheet');

    var workSheet_data = [];
    for (var i = 0; i < 40; i++) {
        workSheet_data[i] = [];
        for (var ii = 0; ii < 10; ii++) {
            workSheet_data[i][ii] = 'R_' + i + ', C_' + ii;
        }
    }

    var workSheet = XLSX.utils.aoa_to_sheet(workSheet_data);
    workBook.Sheets['Test Sheet'] = workSheet;

    var workBookOut = XLSX.write(workBook, {book: 'xlsx', type: 'binary'});

    saveAs(new Blob([s2ab(workBookOut)], {type: 'application/octet-stream'}), 'test.xlsx');
}

function downloadExcelAsTable() {
    console.log('HTML 테이블로 엑셀 파일 다운로드하기');

    var table = document.getElementById('server-info');
    var $table = $('#server-info')[0];  // == var table

    var workBook = XLSX.utils.table_to_book($table, {sheet: 'Sheet JS'});
    workBook.Props = {
        Title: 'SheetJS Tutorial',
        Subject: 'Test file',
        Author: 'Sungmin Kim',
        CreatedDate: new Date()
    };

    var workBookOut = XLSX.write(workBook, {bookType: 'xlsx', bookSST: true, type: 'binary'});

    saveAs(new Blob([s2ab(workBookOut)], {type: 'application/octet-stream'}), 'File_name.xlsx');
}

function downloadExcelAsJSON() {
    console.log('JSON으로 엑셀 파일 다운로드하기');

    var json = [
        {"name":"John", "city": "Seattle", "id": "12345"},
        {"name":"Mike", "city": "Los Angeles", "id": "67890"},
        {"name":"Zach", "city": "New York", "id": "abcde"}
    ];

    var workBook = XLSX.utils.book_new();
    workBook.Props = {
        Title: 'SheetJS Tutorial',
        Subject: 'Test file',
        Author: 'Sungmin Kim',
        CreatedDate: new Date()
    };

    var workSheet = XLSX.utils.json_to_sheet(json);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet Name');
    XLSX.writeFile(workBook, 'Json_File_name.xlsx');
}

function s2ab(s) {
    var buffer = new ArrayBuffer(s.length);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }

    return buffer;
}

function get2DArrayWithEmpty(rowCnt, colCnt) {
    var arr = Array();

    if (Math.sign(rowCnt) !== 1 && Math.sign(colCnt) !== 1) {
        arr[0] = Array();
        return arr;
    }

    var rEmptyArr = Array();
    rEmptyArr[0] = {
        rRow: 2,
        rCol: 5
    }

    rEmptyArr[1] = {
        rRow: 7,
        rCol: 5
    }

    for (var i = 0; i < rowCnt; i++) {
        arr[i] = Array();
        for (var ii = 0; ii < colCnt; ii++) {
            for (var r = 0; r < rEmptyArr.length; r++) {
                if (i == rEmptyArr[r].rRow && ii == rEmptyArr[r].rCol) {
                    arr[i][ii] = 'No Data';
                    break;
                } else {
                    arr[i][ii] = 'Data'
                }
            }
        }
    }

    console.log(arr);
    return arr;
}

function extractEmptyValueFrom2DArray(arr) {
    if (!Array.isArray(arr) || !Array.isArray(arr[0])) {
        return false;
    }

    var rowCnt = arr.length;
    var colCnt = arr[0].length;
    for (var i = 0; i < rowCnt; i++) {
        for (var ii = 0; ii < colCnt; ii++) {
            if (Array.isArray(arr[i]) && arr[i][ii] == 'No Data') {                
                arr[i] = null;
                arr.splice(i, 1);
                i--;
                if (i < 0) {
                    return;
                }
                break;
            }
        }
    }

    return arr;
}

$(document).ready(function() {
    var arr = get2DArrayWithEmpty(10, 10);
    console.log(extractEmptyValueFrom2DArray(arr));
    $('#btn-excel-as-2darray').click(function() {
        downloadExcelAs2DArray();
    });

    $('#btn-excel-as-table').click(function() {
        downloadExcelAsTable();
    });

    $('#btn-excel-as-json').click(function() {
        downloadExcelAsJSON();
    });
});

