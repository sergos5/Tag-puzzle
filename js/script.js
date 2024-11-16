'use strict'

const field = document.querySelector('.field')
const startBtn = document.querySelector('.start')

let chips = field.querySelectorAll('.chip')

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
    if (direction ==='left') {
        chips[indexEmptyBlock-1].before(chips[indexEmptyBlock])      
    }
    if (direction ==='right') {
        chips[indexEmptyBlock].before(chips[indexEmptyBlock+1])       
    }
    if (direction ==='up') {
        chips[indexEmptyBlock-4].before(chips[indexEmptyBlock])
        chips[indexEmptyBlock-1].after(chips[indexEmptyBlock-4])        
    }
    if (direction ==='down') {
        chips[indexEmptyBlock].before(chips[indexEmptyBlock+4])
        chips[indexEmptyBlock+3].after(chips[indexEmptyBlock])        
    }
    chips = field.querySelectorAll('.chip')
    if (chips[15].classList.contains('empty')) {
        //сделать запуск функции для проверки результата!!!
        console.log('надо проверить решение');        
    }
}

const mixChip = () => {
    let lastEmptyIndex=15
    let way = ''
    let arrDirection = []
    let emptyIndex = 15     
    let count = 0

    let idInterval = setInterval(()=> {
        count++   
        arrDirection = []  
        chips.forEach((item, index) => {          
        if(item.classList.contains('empty'))   
            emptyIndex=index;                      
        })
        if (chips[emptyIndex-4] && emptyIndex-4 !=lastEmptyIndex) arrDirection.push('up')
        if (chips[emptyIndex+1] && emptyIndex%4 !=3 && emptyIndex+1 != lastEmptyIndex) arrDirection.push('right')
        if (chips[emptyIndex+4] && emptyIndex+4 !=lastEmptyIndex) arrDirection.push('down')
        if (chips[emptyIndex-1] && emptyIndex%4 !=0 && emptyIndex-1 != lastEmptyIndex) arrDirection.push('left')
        way = arrDirection[Math.floor(Math.random()*arrDirection.length)]
        lastEmptyIndex = emptyIndex
        moveEmptyBlock(emptyIndex, way)
        if (count===100) {
            clearInterval(idInterval)
            console.log('ДА НАЧНЕТСЯ ИГРА!!');
        }
    }, 10) 
}


field.addEventListener('click', (e)=> { 
    if (e.target.classList.contains('chip') || e.target.closest('.chip'))  {          
        chips.forEach((item, index)=> {                      
            if (e.target === item || e.target.parentElement === item) {                             
                checkEmptyChip(index)
            }
        })        
    }
})

startBtn.addEventListener('click', ()=> {
    mixChip()
})


