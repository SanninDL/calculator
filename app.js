var inputNumbers = document.querySelectorAll('.number .btn')
var inputOperators = document.querySelectorAll('.operators .btn')
var display = document.querySelector('.result-display')
var equal = document.querySelector('.equal')
var curent =''
var curent2 = ''
var result
var operator

// console.log(inputOperators)

Array.from(inputNumbers).map(function(input) {
input.onclick = function(e){

    var isClear = this.id == 'reset'
    // console.log()
    if (isClear) {
        curent = ''
        result = 0
    } else {
            curent += e.target.textContent
    }
    display.textContent = curent
    console.log(curent)
}
})


Array.from(inputOperators).map(function(input) {
    input.onclick = function(e){
        if (!result) {
            result = Number(curent)
        }
        
        curent = ''
        operator = e.target.textContent
        
       
    }
})
equal.onclick = function(){
    if (operator == '+'){
        result = result + Number(curent)
    }
    else if (operator == '-'){
        result = result - Number(curent)
    }
    else if (operator == 'x'){
        result = result * Number(curent)
    }
    else {
        result = result / Number(curent)
    }
    display.textContent = result
}

