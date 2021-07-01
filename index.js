const readline = require("readline");
var _ = require('lodash');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var dummyMatrix = [
    ['','',''],
    ['','',''],
    ['','','']
];

const USER_CHAR = "X"
const COMPUTED_CHAR = "0"
let question = () => {
    rl.question("Players next move in format row,column\n", (answer) => {
        let position = {x: parseInt(answer[0]), y: parseInt(answer[2])}
        if(!Number.isInteger(position.x) || !Number.isInteger(position.y)){
            console.log("You must put a valid integer")
            question();
        } else if(position.x > 2 || position.y > 2) {
            console.log("That's not a valid range in matrix")
            question();
        }else if(dummyMatrix[position.x][position.y] === USER_CHAR || dummyMatrix[position.x][position.y] === COMPUTED_CHAR) {
            console.log("That position is already taken in the matrix")
            question();
        } else {
            dummyMatrix[position.x][position.y]= USER_CHAR
            printMatrix(dummyMatrix);
            question();
            validateTicTacToe();
            // let winner = validateTicTacToe();
            // if(winner.length > 0){
            //     console.log(`Our winner is ${winner}`);
            //     rl.close();
            // } else {
            //     question();
            // }

        }
    })
}
question();

function validateTicTacToe() {
    var winner = '';
    dummyMatrix.forEach((x) => {
        let tempVal = []
        x.forEach(y => {
            tempVal = dummyMatrix[x][y];
            if(tempVal ===  dummyMatrix[x][y + 1]) {
                tempVal = dummyMatrix[x][y];
            }
        })
    })
}
function printMatrix() {
    dummyMatrix.forEach((x) => {
        let rowPrint = "| ";
        x.forEach((y, index) => {
            rowPrint += `${_.pad(y, 0)} | `;
            if(index === x.length-1 )
                rowPrint += `\n${_.pad('-', rowPrint.length, '-')}`
        })
        console.log(rowPrint)
    })
}
