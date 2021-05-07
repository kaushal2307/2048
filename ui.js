document.addEventListener('DOMContentLoaded',() =>{
    const game = new Game();
    game.init();

    function displayTheBoard(){
        let k=0;
        for(let i=0;i<game.gridArray.length;i++){
           for(let j=0;j<game.gridArray[i].length;j++){
               if(game.gridArray[i][j]!=0){
                   squareValue[k].innerHTML = game.gridArray[i][j];
               }else{
                   squareValue[k].innerHTML = " ";
               }
               k++;
           }
        }
    }

    function codeOfTheKeyWhichIsPressed(keyValue){
        if(keyValue.keyCode === 39){
            game.moveRight();
        }
        if(keyValue.keyCode === 37){
            game.moveLeft();
        }
        if(keyValue.keyCode === 38){
            game.moveUp();
        }
        if(keyValue.keyCode === 40){
            game.moveDown();
        }
        displayTheBoard();
    }
    document.addEventListener('keyup', codeOfTheKeyWhichIsPressed)
});