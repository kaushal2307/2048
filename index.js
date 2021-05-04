document.addEventListener('DOMContentLoaded',() =>{
    const gridArray = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    const gridDisplay = document.querySelector('.grid');
    const buttonDisplay =  document.querySelector('.gridButton');
    const squareValue = [];
    const indexObectOfTheGridArrayWhichDoesNotHaveValue = [];

    function storingIndexValueWhichDoestNotContainValues(){
        indexObectOfTheGridArrayWhichDoesNotHaveValue.splice(0,indexObectOfTheGridArrayWhichDoesNotHaveValue.length);
        for(let i=0;i<gridArray.length;i++){
            for(let j=0;j<gridArray[i].length;j++){
                if(gridArray[i][j] == 0){
                    indexObectOfTheGridArrayWhichDoesNotHaveValue.push({
                        x: i,
                        y: j
                    });
                }
            }
        }
    }
    storingIndexValueWhichDoestNotContainValues()

    function generateTheStartingNumber(){
        for(let i=0;i<2;i++){
            if(indexObectOfTheGridArrayWhichDoesNotHaveValue.length > 0){
                const randomIndex = Math.floor(Math.random()*indexObectOfTheGridArrayWhichDoesNotHaveValue.length);
                const randomNumber = generatingRandomNumberfromTwoAndFour();
                gridArray[indexObectOfTheGridArrayWhichDoesNotHaveValue[randomIndex].x][indexObectOfTheGridArrayWhichDoesNotHaveValue[randomIndex].y] = randomNumber;
                indexObectOfTheGridArrayWhichDoesNotHaveValue.splice(randomIndex,1);
            }
        }
    }
    generateTheStartingNumber();
    
    function generatingRandomNumberfromTwoAndFour(){
        const arrayContainingTwoAndFour = [2,2,2,4];
        const randomIndexNumberFromArrayContainingTwoAndFour = Math.floor(Math.random()*arrayContainingTwoAndFour.length);
        return arrayContainingTwoAndFour[randomIndexNumberFromArrayContainingTwoAndFour];
    }

    function addNewNumberInTheGrid(){
        if(indexObectOfTheGridArrayWhichDoesNotHaveValue.length>0){
        const randomIndex = Math.floor(Math.random()*indexObectOfTheGridArrayWhichDoesNotHaveValue.length);
        gridArray[indexObectOfTheGridArrayWhichDoesNotHaveValue[randomIndex].x][indexObectOfTheGridArrayWhichDoesNotHaveValue[randomIndex].y] = generatingRandomNumberfromTwoAndFour();
        const squareIndexValue = (indexObectOfTheGridArrayWhichDoesNotHaveValue[randomIndex].x)*4 + indexObectOfTheGridArrayWhichDoesNotHaveValue[randomIndex].y;
        squareValue[squareIndexValue].innerHTML = gridArray[indexObectOfTheGridArrayWhichDoesNotHaveValue[randomIndex].x][indexObectOfTheGridArrayWhichDoesNotHaveValue[randomIndex].y] ;
        indexObectOfTheGridArrayWhichDoesNotHaveValue.splice(randomIndex,1);
        console.table(gridArray);
        }else{
            return;
        }
    }

    function displayingTheBoard(){
        for(let i=0;i<gridArray.length;i++){
            for(let j=0;j<gridArray[i].length;j++){
                let square = document.createElement('div');
                if(gridArray[i][j] == 0){
                    square.innerHTML = " ";
                }else{
                    square.innerHTML = gridArray[i][j];
                }
                gridDisplay.appendChild(square);
                squareValue.push(square);
            }
        }
    }
    displayingTheBoard();
    console.table(gridArray);

    function displayTheBoard(){
        let k=0;
        for(let i=0;i<gridArray.length;i++){
           for(let j=0;j<gridArray[i].length;j++){
               if(gridArray[i][j]!=0){
                   squareValue[k].innerHTML = gridArray[i][j];
               }else{
                   squareValue[k].innerHTML = " ";
               }
               k++;
           }
        }
    }

    function updateGridArrayHorizontally(shiftedArray,index){
        for(let i=0;i<gridArray[index].length;i++){
            gridArray[index][i] = shiftedArray[i];
        }
    }

    function updateGridArrayVertically(shiftedArray,index){
        for(let i=0;i<gridArray[index].length;i++){
            gridArray[i][index] = shiftedArray[i];
        }
    }

    function mergeFromUp(arr){
        let pointerBack = 0;
        for(let i=0;i<arr.length-1;i++){
            let pointerFront = pointerBack+1;
            if(arr[i]==0){
                pointerBack++;
                continue;
            }
            while(pointerFront<arr.length && pointerFront>pointerBack){
               if(arr[pointerBack]==arr[pointerFront]){
                arr[pointerBack] = arr[pointerBack]*2;
                arr[pointerFront] = 0;
                break;
               }else if(arr[pointerFront]==0){
                   pointerFront++;
                   continue;
               }else{
                   break;
               }
            }
            pointerBack++;
        }
    }

    function shiftEveryThingToUp(){
        for(let i=0;i<gridArray.length;i++){
            let verticalArray = [];
            for(let j=0;j<gridArray[i].length;j++){
                verticalArray[j] = gridArray[j][i];
            }
            mergeFromUp(verticalArray);
            let shiftedArray = verticalArray.filter(val=> val!=0);
            if(shiftedArray.length != 0){
                let lengthOfTheMissingValues = 4-shiftedArray.length;
                let missingValues = Array(lengthOfTheMissingValues).fill(0);
                shiftedArray = shiftedArray.concat(missingValues);
                updateGridArrayVertically(shiftedArray,i);
            }
        }
    }
    function mergeFromDown(arr){
        let pointerDown = arr.length-1;
        for(let i=arr.length-1;i>0;i--){
            let pointerUp = pointerDown-1;
            if(arr[i]==0){
                pointerDown--;
                continue;
            }
            while(pointerUp>=0 && pointerDown>pointerUp){
                if(arr[pointerDown] == arr[pointerUp]){
                    arr[pointerDown] = arr[pointerDown]*2;
                    arr[pointerUp] = 0;
                    break;
                }else if(arr[pointerUp]==0){
                    pointerUp--;
                    continue;
                }else{
                    break;
                }
            }
            pointerDown--;
        }
    }
    function shiftEveryThingToDown(){
        for(let i=0;i<gridArray.length;i++){
            let verticalArray = [];
            for(let j=0;j<gridArray[i].length;j++){
                verticalArray[j] = gridArray[j][i];
            }
            mergeFromDown(verticalArray);
            let arrayOfValues = verticalArray.filter(val=> val!=0);
            if(arrayOfValues.length != 0){
                let lengthOfTheMissingValues = 4-arrayOfValues.length;
                let shiftedArray = Array(lengthOfTheMissingValues).fill(0);
                shiftedArray = shiftedArray.concat(arrayOfValues);
                updateGridArrayVertically(shiftedArray,i);
            }
        }
    }
    
    function mergeFromLeft(index){
        let pointerBack = 0;
        for(let i=0;i<gridArray[index].length-1;i++){
            let pointerFront = pointerBack+1;
            if(gridArray[index][i]==0){
                pointerBack++;
                continue;
            }
            while(pointerFront<gridArray[index].length && pointerBack<pointerFront){
                if(gridArray[index][pointerBack] == gridArray[index][pointerFront]){
                    gridArray[index][pointerBack] = gridArray[index][pointerBack]*2;
                    gridArray[index][pointerFront] = 0;
                    break;
                }else if(gridArray[index][pointerFront] == 0){
                    pointerFront++;
                    continue;
                }else{
                    break;
                }
            }
            pointerBack++;
        }
    }
    function shiftEveryThingToLeft(){
        for(let i=0;i<gridArray.length;i++){
            mergeFromLeft(i);
            let shiftedArray= gridArray[i].filter(value => value != 0);
            if(shiftedArray.length == 0){
                continue;
            }else{
                let lengthOfTheMissingValues = 4-shiftedArray.length;
                let missingValues = Array(lengthOfTheMissingValues).fill(0);
                shiftedArray = shiftedArray.concat(missingValues);
                updateGridArrayHorizontally(shiftedArray,i);
            }
        }
    }
    function mergeFromRight(index){
        let pointerFront = gridArray[index].length -1;
        for(let i=gridArray[index].length-1;i>0;i--){
            let pointerBack = pointerFront-1;
            if(gridArray[index][i]==0){
                pointerFront--;
                continue;
        }
        while(pointerBack>=0 && pointerBack<pointerFront){
            if(gridArray[index][pointerFront] == gridArray[index][pointerBack]){
                gridArray[index][pointerFront] = gridArray[index][pointerFront]*2;
                gridArray[index][pointerBack] = 0;
                break;
            }else if(gridArray[index][pointerBack] == 0){
                pointerBack--;
                continue;
            }else{
                break;
            }
        }
        pointerFront--;
    }
    }
    //[2,2,2,2]
    //[0,4,0,4]
    //[0,0,4,4]
    function shiftEveryThingToRight(){
        for(let i=0;i<gridArray.length;i++){
            mergeFromRight(i);
            let arrayOfValues = gridArray[i].filter(value => value != 0);
            if(arrayOfValues.length == 0){
                continue;
            }else{
                let lengthOfTheMissingValues = 4-arrayOfValues.length;
                let shiftedArray = Array(lengthOfTheMissingValues).fill(0);
                shiftedArray= shiftedArray.concat(arrayOfValues);
                updateGridArrayHorizontally(shiftedArray,i);
            }
        }
    }

    function moveUp(){
        shiftEveryThingToUp();
        storingIndexValueWhichDoestNotContainValues();
        addNewNumberInTheGrid();
    }

    function moveDown(){
        shiftEveryThingToDown();
        storingIndexValueWhichDoestNotContainValues();
        addNewNumberInTheGrid();
    }

    function moveLeft(){
        shiftEveryThingToLeft();
        storingIndexValueWhichDoestNotContainValues();
        addNewNumberInTheGrid();
    }

    function moveRight(){
        shiftEveryThingToRight();
        storingIndexValueWhichDoestNotContainValues();
        addNewNumberInTheGrid();
    }

    function codeOfTheKeyWhichIsPressed(keyValue){
        if(keyValue.keyCode === 39){
            moveRight();
        }
        if(keyValue.keyCode === 37){
            moveLeft();
        }
        if(keyValue.keyCode === 38){
            moveUp();
        }
        if(keyValue.keyCode === 40){
            moveDown();
        }
        displayTheBoard();
    }
    document.addEventListener('keyup', codeOfTheKeyWhichIsPressed)

    
})