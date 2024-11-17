'use strict'

const field = document.querySelector('.field')
const startBtn = document.querySelector('.start')

let chips = field.querySelectorAll('.chip')

chips[1].style.backgroundPosition = '-125px 0'
chips[2].style.backgroundPosition = '-250px 0'
chips[3].style.backgroundPosition = '-375px 0'
chips[4].style.backgroundPosition = '0 -125px '
chips[5].style.backgroundPosition = '-125px -125px'
chips[6].style.backgroundPosition = '-250px -125px'
chips[7].style.backgroundPosition = '-375px -125px'
chips[8].style.backgroundPosition = '0 -250px'
chips[9].style.backgroundPosition = '-125px -250px'
chips[10].style.backgroundPosition = '-250px -250px'
chips[11].style.backgroundPosition = '-250px -375px'
chips[12].style.backgroundPosition = '0 -375px'
chips[13].style.backgroundPosition = '-125px -375px'
chips[14].style.backgroundPosition = '-250px -375px'






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
        if (count===150) {
            clearInterval(idInterval)
            console.log('ДА НАЧНЕТСЯ ИГРА!!');
        }
    }, 5) 
}


field.addEventListener('click', (e)=> { 
    if (e.target.closest('.chip'))  {          
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


