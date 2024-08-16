const addButton = document.querySelector('.add__btn');
const divAddContainer = document.querySelector('.add__container');
const closeButton = document.querySelector('.close_btn');

addButton.addEventListener('click', () => {
        divAddContainer.style.display = 'flex'
})

closeButton.addEventListener('click', () => {
    divAddContainer.style.display = 'none'
})