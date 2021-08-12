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
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
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
    //生成数字与对应的位置
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

//随按键更新游戏数据
$(document).keydown( function ( event ) { 
    switch(event.keyCode){
        case 37://左
            if(moveLeft()){
                generateNewNumber();
                isGameOver();
            }
            break;
        case 38://上
            if(moveUp()){
                generateNewNumber();
                isGameOver();
            }
            break;
        case 39://右
            if(moveRight()){
                generateNewNumber();
                isGameOver();
            }
            break;
        case 40://下
            if(moveDown()){
                generateNewNumber();
                isGameOver();
            }
            break;
        default:
            break;
    }
});

function isGameOver(){

}

function moveLeft(){
    //检测是否能够向左移动
    if (!canMoveLeft(board)){
        return false;
    }
    //向左移动
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){
            if(board[i][j]!=0){//判断i,j是否存在数字
                for(var k=0;k<j;k++){//遍历可能成为落脚点的i,k
                    if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0
                        continue;
                    }
                    if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveRight(){
    //检测是否能够向右移动
    if (!canMoveRight(board)){
        return false;
    }
    //向右移动
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(board[i][j]!=0){//判断i,j是否存在数字
                for(var k=3;k>j;k--){//遍历可能成为落脚点的i,k
                    if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0
                        continue;
                    }
                    if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp(){
    //检测是否能够向上移动
    if (!canMoveUp(board)){
        return false;
    }
    //向上移动
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if(board[i][j]!=0){//判断i,j是否存在数字
                for(var k=0;k<i;k++){//遍历可能成为落脚点的k,j
                    if(board[k][j]==0 && noBlockVertical(j,k,i,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0
                        continue;
                    }
                    if(board[k][j]==board[i][j] && noBlockVertical(j,k,i,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown(){
    //检测是否能够向下移动
    if (!canMoveDown(board)){
        return false;
    }
    //向下移动
    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){
            if(board[i][j]!=0){//判断i,j是否存在数字
                for(var k=3;k>i;k--){//遍历可能成为落脚点的k,j
                    if(board[k][j]==0 && noBlockVertical(j,i,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0
                        continue;
                    }
                    if(board[k][j]==board[i][j] && noBlockVertical(j,i,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);
    return true;
}