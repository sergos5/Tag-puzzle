'use strict'

const field = document.querySelector('.field')
const startBtn = document.querySelector('.start')
const newGameBtn = document.querySelector('.new-game')

let chips = field.querySelectorAll('.chip')

const fieldWidth = field.clientWidth
const fieldeHight = field.clientHeight

const gePicture = (source) => {
    
    chips.forEach((chip, index)=> {
        if (index !== chips.length){
            chip.style.backgroundImage = `url(${source})`
            chip.style.backgroundSize = `${fieldWidth}px ${fieldeHight}px`      
            let x = (index%4)*fieldWidth/4
            let y = (parseInt(index/4)%4)*fieldeHight/4             
            chip.style.backgroundPosition = `-${x}px -${y}px`            
        }       
    })    
}

gePicture('./img/2.jpg')

const animate = ({timing, draw, duration}) => {

    let start = performance.now();
  
    requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;
    
        // вычисление текущего состояния анимации
        let progress = timing(timeFraction);
    
        draw(progress); // отрисовать её
    
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }  
    });
  }

const checkEmptyChip = (index) => {
    if (chips[index+1] && index%4 !=3 && chips[index+1].classList.contains('empty')) {        
        animate({
            duration: 80,
            timing(timeFraction) {
              return timeFraction;
            },
            draw(progress) {
                chips[index].style.transform = 'translateX(' + progress*100 + '%)' 
            }
        });

        setTimeout(()=>{
            chips[index].style.transform = ''               
            moveEmptyBlock(index+1, 'left')                
        },100)    
    }

    if (chips[index-1] && index%4 !=0 && chips[index-1].classList.contains('empty')) {
        animate({
            duration: 80,
            timing(timeFraction) {
              return timeFraction;
            },
            draw(progress) {
                chips[index].style.transform = 'translateX(' + progress*(-100) + '%)'
            }
        });

        setTimeout(()=>{
            chips[index].style.transform = ''               
            moveEmptyBlock(index-1, 'right')               
        },100)               
    }

    if (chips[index+4] && chips[index+4].classList.contains('empty')) {     
        animate({
            duration: 80,
            timing(timeFraction) {
              return timeFraction;
            },
            draw(progress) {
                chips[index].style.transform = 'translateY(' + progress*100 + '%)' 
            }
        });

        setTimeout(()=>{
            chips[index].style.transform = ''               
            moveEmptyBlock(index+4, 'up')               
        },100)                
    }
    
    if (chips[index-4] && chips[index-4].classList.contains('empty')) {
        animate({
            duration: 80,
            timing(timeFraction) {
              return timeFraction;
            },
            draw(progress) {
                chips[index].style.transform = 'translateY(' + progress*(-100) + '%)'
            }
        });

        setTimeout(()=>{
            chips[index].style.transform = ''               
            moveEmptyBlock(index-4, 'down')              
        },100)              
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
        let counter = 0
        chips.forEach((item, index)=> {
            if (item.id == index) counter++ 
        })        
        if (counter==16) {
            field.removeEventListener('click', getIndex)
            field.style.backgroundImage = 'url("./img/2.jpg")'; 
            field.style.backgroundSize = `${fieldWidth}px ${fieldeHight}px`
            newGameBtn.style.display = 'block'
            startBtn.style.display = 'none'
            chips.forEach(item=> item.style.cursor = 'default')
            animate({
                duration: 500,
                timing(timeFraction) {
                return timeFraction;
                },
                draw(progress) {
                    chips.forEach(item => item.style.opacity = (1-progress))                
                }
            })
        }             
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
    }, 3) 
}

const getIndex = (e)=> {
    if (e.target.closest('.chip'))  {          
        chips.forEach((item, index)=> {                      
            if (e.target === item || e.target.parentElement === item) {                             
                checkEmptyChip(index)
            }
        })        
    }
}

//field.addEventListener('click', getIndex)

startBtn.addEventListener('click', ()=> {
    mixChip()
    field.addEventListener('click', getIndex)
})

newGameBtn.addEventListener('click', ()=> {    
    field.style.backgroundImage = ''
    newGameBtn.style.display = 'none'
    startBtn.style.display = 'block'
    chips.forEach(item=> {        
        item.style.opacity = 1     
        if (item.id == 15) {
            item.style.cursor = 'default'
        } else {
            item.style.cursor = 'pointer'
        }
    })  
})


