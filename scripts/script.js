
const button = document.querySelector('.add-card__button');
const cardTemplate = document.querySelector('#card').content;
const areaCards = document.querySelector('.root');
const addCards = document.querySelector('.add-card');
const numberInput = addCards.querySelector('.add-card__input_number');   //номер который мы ввели
const nameInput = addCards.querySelector('.add-card__input_name');
const imageInput = addCards.querySelector('.add-card__input_image');


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

function randomColorCard() {       //функция окрашивания блока
  const newCards = document.querySelectorAll(".card");
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  newCards[numberInput.value - 1].style.backgroundColor = `rgba(${r}, ${g}, ${b}, .3)`;  //окрашиваем новый блок в случайный цвет
}

function rangingId(cards, text) {     //ранжируем id блоков
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


function addCard() {
  // evt.preventDefault();

  const cards = document.querySelectorAll(".card");   // находим все блоки
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

    rangingId(cards, textInCards);  //ранжируем id блоков
    resetElement();              //сбрасываем все импуты
    resetButton();
  }
  else {
    //alert('Введите корректный номер');
    console.log('Введите корректный номер');
  }

}

button.addEventListener('click', addCard);
addCards.addEventListener('input', validButton);

resetButton();


// const inputList = addCards.querySelectorAll('.add-card__input');
// inputList.forEach(inputElement => {
// });

  //const idCard = document.getElementById(numberInput.value - 1);   // отслеживаем по id, есть ли рядом блок, с тем местом куда хотим вставить новый

  //const dataCard = elem.getAttribute('data-index-number');    // отслеживаем по data-index-number, есть ли рядом блок, с тем местом куда хотим вставить новый

  // blocks[numberInput.value - 2].insertAdjacentHTML('afterend', `<div id="${numberInput.value}" class="block"><p class="block__text">${numberInput.value}</p></div>`);
