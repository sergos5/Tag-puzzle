'use strict'

const field = document.querySelector('.field')
let chips = field.querySelectorAll('.chip')

/* let direction = 'right'
let indexEmptyBlock */

const checkEmptyChip = (index) => {
    if (chips[index+1] && index%4 !=3 && chips[index+1].classList.contains('empty')) {
        moveEmptyBlock(index+1, 'left')      
    }
    if (chips[index-1] && index%4 !=0 && chips[index-1].classList.contains('empty')) {
        moveEmptyBlock(index-1, 'right')      
    }
    if (chips[index+4] && chips[index+4].classList.contains('empty')) {     
        moveEmptyBlock(index+4, 'up')        
    }
    if (chips[index-4] && chips[index-4].classList.contains('empty')) {
        moveEmptyBlock(index-4, 'down')        
    }      
}

const moveEmptyBlock = (indexEmptyBlock, direction) => {
    //console.log(indexEmptyBlock);
    //console.log(direction);   
    if (direction=='left') {
        chips[indexEmptyBlock-1].before(chips[indexEmptyBlock])
        console.log("empty влево")        
    }
    if (direction=='right') {
        chips[indexEmptyBlock].before(chips[indexEmptyBlock+1])
        console.log("empty вправо")        
    }
    if (direction=='up') {
        chips[indexEmptyBlock-4].before(chips[indexEmptyBlock])
        chips[indexEmptyBlock-1].after(chips[indexEmptyBlock-4])
        console.log("empty вверх")        
    }
    if (direction=='down') {
        chips[indexEmptyBlock].before(chips[indexEmptyBlock+4])
        chips[indexEmptyBlock+3].after(chips[indexEmptyBlock])
        console.log("empty вниз")        
    }
    chips = field.querySelectorAll('.chip')
    if (chips[15].classList.contains('empty')) {
        console.log('надо проверить решение');        
    }
}


field.addEventListener('click', (e)=> { 
    if (e.target.classList.contains('chip'))  {    
        chips.forEach((item, index)=> {                      
            if (e.target == item) {
                //console.log(index);                
                checkEmptyChip(index)
            }
        })        
    }
})



