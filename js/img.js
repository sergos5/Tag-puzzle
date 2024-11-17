'use strict'

const imgField = document.querySelector('.field-img')

let imgChip = imgField.querySelectorAll('.chip-img')


imgChip[1].style.backgroundPosition = '-125px 0'
imgChip[2].style.backgroundPosition = '-250px 0'
imgChip[3].style.backgroundPosition = '-375px 0'
imgChip[4].style.backgroundPosition = '0 -125px '
imgChip[5].style.backgroundPosition = '-125px -125px'
imgChip[6].style.backgroundPosition = '-250px -125px'
imgChip[7].style.backgroundPosition = '-375px -125px'
imgChip[8].style.backgroundPosition = '0 -250px'
imgChip[9].style.backgroundPosition = '-125px -250px'
imgChip[10].style.backgroundPosition = '-250px -250px'
imgChip[11].style.backgroundPosition = '-250px -375px'
imgChip[12].style.backgroundPosition = '0 -375px'
imgChip[13].style.backgroundPosition = '-125px -375px'
imgChip[14].style.backgroundPosition = '-250px -375px'

/* imgChip.forEach((item, index) => {
    item[1].style.backgroundPosition = '-125px'
}) */
