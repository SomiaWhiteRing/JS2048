var board = Array();
var score = 0

$(document).ready(function () {
    newgame();
});

function newgame(){
    //初始化格子配置
    init();
    //生成两个数字

}

function init(){
    for(var i = 0 ; i <= 3 ; i++){
        for(var j = 0 ; j <= 3 ; j++){
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    }
}