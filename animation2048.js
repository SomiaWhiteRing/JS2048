function showNumberWithAnimation(i,j,number){
    var theNumberCell = $("#number-cell-" + i + "-" + j);
    theNumberCell.css('background-color',getNumberBackgroundColor(number));
    theNumberCell.css('color',getNumberColor(number));
    theNumberCell.text(number);

    theNumberCell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },100)
}

function showMoveAnimation(fx,fy,tx,ty){
    var theNumberCell = $("#number-cell-" + fx + "-" + fy);
    theNumberCell.animate({
        top:getPosTop(tx,ty),
        left:getPosLeft(tx,ty)
    },200)
}