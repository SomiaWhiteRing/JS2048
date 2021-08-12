function getPosTop(i,j){
    return 20+120*i;
}
function getPosLeft(i,j){
    return 20+120*j;
}
function getNumberBackgroundColor(i){
    switch(i){
        case 2:return "#bcd6dd";break;
        case 4:return "#add9d8";break;
        case 8:return "#9fdcd4";break;
        case 16:return "#91e0d0";break;
        case 32:return "#83e3cc";break;
        case 64:return "#75e7c8";break;
        case 128:return "#67eac4";break;
        case 256:return "#58edc0";break;
        case 512:return "#4af1bc";break;
        case 1024:return "#3cf4b8";break;
        case 2048:return "#2ef8b4";break;
        case 4096:return "#20fbb0";break;
        case 8192:return "#12ffac";break;
        return "black";
    }
}
function getNumberColor(i){
    if(i<=512){
        return "#776e65";
    }else{
        return "white"
    }

}
function noSpace(board){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if (board[i][j]==0)
                return false;
        }
    }
    return true;
}