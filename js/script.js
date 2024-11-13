'use strict'

const field = document.querySelector('.field')
let chips = field.querySelectorAll('.chip')

const checkEmptyChip = (index) => {
    if (chips[index+1] && index%4 !=3 && chips[index+1].classList.contains('empty')) {
        chips[index].before(chips[index+1])
        chips = field.querySelectorAll('.chip')    
        console.log('справа')
    }
    if (chips[index-1] && index%4 !=0 && chips[index-1].classList.contains('empty')) {
        chips[index-1].before(chips[index])
        chips = field.querySelectorAll('.chip') 
        console.log('слева')
    }
    if (chips[index+4] && chips[index+4].classList.contains('empty')) {        
        chips[index].before(chips[index+4])
        chips[index+3].after(chips[index])
        chips = field.querySelectorAll('.chip')
        console.log('снизу')
    }
    if (chips[index-4] && chips[index-4].classList.contains('empty')) {
        chips[index-4].before(chips[index])
        chips[index-1].after(chips[index-4])

        chips = field.querySelectorAll('.chip')
        console.log('сверху')
    }      
}

field.addEventListener('click', (e)=> { 
    if (e.target.classList.contains('chip'))  {    
        chips.forEach((item, index)=> {                      
            if (e.target == item) {
                console.log(index);                
                checkEmptyChip(index)
            }
        })        
    }
})



