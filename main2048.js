var board = Array();
var score = 0

$(document).ready(function () {
    newgame();
});

function newgame(){
    //初始化格子配置
    init();
    //生成两个数字
    generateNewNumber();
    generateNewNumber();
}

function init(){
    //渲染数字格
    for(var i = 0 ; i <= 3 ; i++){
        for(var j = 0 ; j <= 3 ; j++){
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    }

    //初始化二维数组
    for(var i = 0 ; i <= 3 ; i++){
        board[i] = new Array();
        for(var j = 0 ; j <= 3 ; j++){
            board[i][j] = 0;
        }
    }

    updateBoardView();
}

//更新Board上展示的数据
function updateBoardView(){
    $(".number-cell").remove();
    for(var i = 0 ; i <= 3 ; i++){
        for(var j = 0 ; j <= 3 ; j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $("#number-cell-" + i + "-" + j);
            if (board[i][j] == 0){
                theNumberCell.css('width',"0px");
                theNumberCell.css('height',"0px");
                theNumberCell.css('top',getPosTop(i,j)+50);
                theNumberCell.css('left',getPosLeft(i,j)+50);
            }else{
                theNumberCell.css('width',"100px");
                theNumberCell.css('height',"100px");
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor());
                theNumberCell.css('color',getNumberColor());
                theNumberCell.text(board[i][j]);
            }
        }
    }
}

function generateNewNumber(){
    //检测是否还有空位
    if (noSpace(board)){
        return false;
    }
    //生成数字与
    while(true){
        var randx = parseInt(4*Math.random());
        var randy = parseInt(4*Math.random());
        if (board[randx][randy] == 0){
            break;
        }
    }
    var randNumber = 2*Math.floor(2*Math.random()+1);
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx,randy,randNumber);

}