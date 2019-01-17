<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">    
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="keywords" content="SMBoard SMB smboard sungmin board">
    <meta name="description" content="PHP연습을 위한 게시판 사이트입니다.">
    <meta name="author" content="Sungmin Kim">
    <meta property="og:type" content="website">
    <meta property="og:title" content="SMBoard">
    <meta property="og:description" content="PHP연습을 위한 게시판 사이트입니다.">
    <meta property="og:url" content="http://floor5th.iptime.org/SMBoard">

    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">

    <script src="lib/js/jquery-3.3.1-uncompressed.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>

    <script src="lib/js/xlsx.full.min.js"></script>
    <script src="lib/js/FileSaver.min.js"></script>
    <script src="js/root/excel-download.js" charset="utf-8"></script>

    <title>Welcome to SMBoard</title>
</head>
<body>
    <h1>PHP $_SERVER에는 뭐가 있을까?</h1>    
    <table id="server-info" class="table table-dark table-striped table-bordered table-hover">
        <thead>
            <tr>
                <th>인덱스</th>
                <th>값</th>
            </tr>
        </thead>
        <tbody>
        <?php
            $serverKeyArr = array_keys($_SERVER);
            $serverValArr = array_values($_SERVER);
            for ($i = 0; $i < count($serverValArr); $i++) {
        ?>
            <tr>
                <td><b><?=$serverKeyArr[$i]?></b></td>
                <td><?=$serverValArr[$i]?></td>
            </tr>
        <?php
            }
        ?>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="2"></td>
            </tr>
        </tfoot>
    </table>
    <h1>엑셀파일 만들기</h1>
    <button id="btn-excel-as-2darray">2차원 배열로 엑셀파일 만들기</button>
    <button id="btn-excel-as-table">HTML 테이블로 엑셀파일 만들기</button>
    <button id="btn-excel-as-json">JSON으로 엑셀파일 만들기</button>
</body>
</html>