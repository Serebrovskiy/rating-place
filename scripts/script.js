

const cardTemplate = document.querySelector('#card').content;
const cardList = document.querySelectorAll(".card");   // находим все блоки
//const areaCards = document.querySelector('.root');
const button = document.querySelector('.add-card__button');
const addCards = document.querySelector('.add-card');
const numberInput = addCards.querySelector('.add-card__input_number');   //номер который мы ввели
const nameInput = addCards.querySelector('.add-card__input_name');
const imageInput = addCards.querySelector('.add-card__input_image');
const buttonUpPosition = document.querySelector('.card__button-up');
const buttonDownPosition = document.querySelector('.card__button-down');



function createCard() {    //создаем новый блок  add-card__input_name
  const cardElement = cardTemplate.cloneNode(true);
  const card = cardElement.querySelector('.card');
  const cardNumber = cardElement.querySelector('.card__number');
  const cardText = cardElement.querySelector('.card__text');
  const cardImage = cardElement.querySelector('.card__image');

  // numberInput.setAttribute('required', '');
  cardNumber.textContent = numberInput.value;
  card.dataset.indexNumber = numberInput.value;   //второй вариант записи  -> card.setAttribute('id', number.value);
  nameInput.value ? cardText.textContent = nameInput.value : cardText.textContent = 'Жига';  //если поле пустое, то вывводим жигу
  imageInput.value ? cardImage.src = imageInput.value : cardImage.src = "./images/жига.jpg";   //если поле пустое, то вывводим жигу

  return cardElement;
}

function rangingIdAfterInput(cards, text) {     //ранжируем data-атрибуты карточек после ввода номера
  for (let i = numberInput.value; i <= cards.length; i++) {  //прогоняем все сдвинутые блоки и меняем их id в соответсвии с порядковым номером
    cards[i - 1].dataset.indexNumber++;
    text[i - 1].textContent = cards[i - 1].dataset.indexNumber;

    if (i == cards.length && cards[i] != null) {    //для последнего блока
      cards[i].dataset.indexNumber = cards.length + 1;
    }
  }
}

function validButton() {    //валидируем кнопку
  // const isInputValid = !numberInput.checkValidity();
  let isInputValid = false;

  if (!numberInput.checkValidity() || !imageInput.checkValidity()) {   //если поля номера и картинки валидны
    isInputValid = true;
  }
  validInput();

  button.disabled = isInputValid;
  button.classList.toggle('add-card__button_disabled', isInputValid);
}

function validInput() {
  const cardList = document.querySelectorAll(".card");
  numberInput.setAttribute('required', '');
  numberInput.setAttribute('pattern', `^[1-${cardList.length + 1}]`);  //работает корректно только до 9, дальше начинается байда
  // nameInput.setAttribute('required', '');
  if (imageInput.value !== '') {                   //если поле ввода картинки не пустое, тогда оно обязательно для валидности
    imageInput.setAttribute('required', '');
  }
  else {
    imageInput.removeAttribute('required');
  }
}

function resetElement() {
  numberInput.value = '';
  nameInput.value = '';
  imageInput.value = '';
  numberInput.removeAttribute('required');
  imageInput.removeAttribute('required');
}

function resetButton() {
  button.disabled = true;
  button.classList.toggle('add-card__button_disabled');
}

function disableArrow() {        //скарываем верхнии и нижнии стрелки
  const buttonUpPositionList = document.querySelectorAll('.card__button-up');
  const buttonDownPositionList = document.querySelectorAll('.card__button-down');

  buttonUpPositionList.forEach(function (elem, index) {   //самая верхняя кнопка
    if (index === 0) {
      elem.disabled = true;
      elem.classList.add('card__button-up_disabled');
    } else {
      elem.disabled = false;
      elem.classList.remove('card__button-up_disabled');
    }
  });

  buttonDownPositionList.forEach(function (elem, index, array) {    //самая нижняя кнопка
    if (index === array.length - 1) {
      elem.disabled = true;
      elem.classList.add('card__button-down_disabled');
    } else {
      elem.disabled = false;
      elem.classList.remove('card__button-down_disabled');
    }
  });
}

function CardPosition(evt) {                  //поднимаем или опускаем карточку
  const card = evt.target.closest('.card');
  const cardNumber = card.querySelector('.card__number');   //забираем номер текущей карточки
  const arrowUp = card.querySelector('.card__button-up');
  const arrowDown = card.querySelector('.card__button-down');

  if (evt.currentTarget === arrowUp) {
    const previousСardNumber = card.previousElementSibling.querySelector('.card__number');   //забираем номер предыдущей карточки
    card.parentNode.insertBefore(card, card.previousElementSibling);     // меням местам дом элементы через родителя
    card.dataset.indexNumber--;                  //уменьшаем на 1 data перемещаемой карточки
    cardNumber.textContent = card.dataset.indexNumber;   //уменьшаем на 1 номер перемещаемой карточки
    card.nextSibling.dataset.indexNumber++;    //nextSibling - соседний(следующий) элемент
    previousСardNumber.textContent = card.nextSibling.dataset.indexNumber;  //увеличиваем на 1 номер заменяемой карточки
  }

  if (evt.currentTarget === arrowDown) {
    const nextСardNumber = card.nextElementSibling.querySelector('.card__number');   //забираем номер предыдущей карточки
    card.parentNode.insertBefore(card.nextElementSibling, card);     // меням местам дом элементы через родителя
    card.dataset.indexNumber++;                  //увеличиваем на 1 data перемещаемой карточки
    cardNumber.textContent = card.dataset.indexNumber;   //увеличиваем на 1 номер перемещаемой карточки
    card.previousSibling.dataset.indexNumber--;    //previousSibling - соседний(предыдущий) элемент
    nextСardNumber.textContent = card.previousSibling.dataset.indexNumber;  //уменьшаем на 1 номер заменяемой карточки
  }
  disableArrow();   //скрываем верхнии и нижнии стрелки
}

function listenerPositionButton() {            //слушаем кнопки вверх вниз у всх карточек, кроме тех которые вставляем
  const buttonUpPositionList = document.querySelectorAll('.card__button-up');
  const buttonDownPositionList = document.querySelectorAll('.card__button-down');

  buttonUpPositionList.forEach(element => {
    element.addEventListener('click', CardPosition);
  });
  buttonDownPositionList.forEach(element => {
    element.addEventListener('click', CardPosition);
  });
}


function addCard() {    //добавляем карточку
  // evt.preventDefault();

  const cards = document.querySelectorAll(".card");
  const textInCards = document.querySelectorAll(".card__number");   // находим нумерацию блоков
  const newCard = createCard();

  if (cards.length >= (numberInput.value - 1) || numberInput.value == 1) {    //проверяем возможно ли вставить блок
    if (cards.length == (numberInput.value - 1)) {    //??? надо проверить, походу лишнее условие   //если ставим блок на 1 место
      cards[numberInput.value - 2].after(newCard);
      //  randomColorCard();
    }                                     //вставляем новый блок и окрашиваем его
    else {
      cards[numberInput.value - 1].before(newCard);
      //  randomColorCard();
    }

    rangingIdAfterInput(cards, textInCards);  //ранжируем id блоков
    listenerPositionButton();      //вешаем слушатели на кнопнки вверх вниз
    resetElement();    //сбрасываем все импуты
    resetButton();     //сбрасываем кнопку добавить
    disableArrow();    //скрываем верхнии и нижнии стрелки
  }
  else {
    //alert('Введите корректный номер');
    console.log('Введите корректный номер');
  }
}

button.addEventListener('click', addCard);
addCards.addEventListener('input', validButton);

resetButton();
disableArrow();
listenerPositionButton();





// function randomColorCard() {       //функция окрашивания блока
//   const newCards = document.querySelectorAll(".card");
//   const r = Math.floor(Math.random() * 255);
//   const g = Math.floor(Math.random() * 255);
//   const b = Math.floor(Math.random() * 255);
//   newCards[numberInput.value - 1].style.backgroundColor = `rgba(${r}, ${g}, ${b}, .3)`;  //окрашиваем новый блок в случайный цвет
// }



// const inputList = addCards.querySelectorAll('.add-card__input');
// inputList.forEach(inputElement => {
// });

  //const idCard = document.getElementById(numberInput.value - 1);   // отслеживаем по id, есть ли рядом блок, с тем местом куда хотим вставить новый

  //const dataCard = elem.getAttribute('data-index-number');    // отслеживаем по data-index-number, есть ли рядом блок, с тем местом куда хотим вставить новый

  // blocks[numberInput.value - 2].insertAdjacentHTML('afterend', `<div id="${numberInput.value}" class="block"><p class="block__text">${numberInput.value}</p></div>`);
