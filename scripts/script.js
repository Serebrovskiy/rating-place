import { initialCards } from './utils.js';
import { cardConfig } from './utils.js';

function createCard(input) {    //создаем новый блок  add-card__input_name
  const cardElement = cardConfig.cardTemplate.cloneNode(true);
  const card = cardElement.querySelector('.card');
  const cardNumber = cardElement.querySelector('.card__number');
  const cardText = cardElement.querySelector('.card__text');
  const cardImage = cardElement.querySelector('.card__image');

  cardNumber.textContent = input.number;
  card.dataset.indexNumber = input.number;   //второй вариант записи  -> card.setAttribute('id', number.value);  //присваиваем карточке data-атрибут по его номеру
  input.name ? cardText.textContent = input.name : cardText.textContent = 'Жигули';  //если поле пустое, то вывводим жигу
  input.image ? cardImage.src = input.image : cardImage.src = "./images/жига.jpg";   //если поле пустое, то вывводим жигу

  return cardElement;
}

function rangingIdAfterInput(cards, text) {     //ранжируем data-атрибуты карточек после ввода номера
  for (let i = cardConfig.numberInput.value; i <= cards.length; i++) {  //прогоняем все сдвинутые блоки и меняем их id в соответсвии с порядковым номером
    cards[i - 1].dataset.indexNumber++;
    text[i - 1].textContent = cards[i - 1].dataset.indexNumber;

    if (i == cards.length && cards[i] != null) {    //для последнего блока
      cards[i].dataset.indexNumber = cards.length + 1;
    }
  }
}

function validButton() {    //валидируем кнопку
  // const isInputValid = !cardConfig.numberInput.checkValidity();
  let isInputValid = false;

  if (!cardConfig.numberInput.checkValidity() || !cardConfig.imageInput.checkValidity()) {   //если поля номера и картинки валидны
    isInputValid = true;
  }
  validInput();

  cardConfig.button.disabled = isInputValid;
  cardConfig.button.classList.toggle('add-card__button_disabled', isInputValid);
}

function validInput() {
  const cardList = document.querySelectorAll(".card");
  cardConfig.numberInput.setAttribute('required', '');
  cardConfig.numberInput.setAttribute('pattern', `^[1-${cardList.length + 1}]`);  //работает корректно только до 9, дальше начинается байда
  // nameInput.setAttribute('required', '');
  if (cardConfig.imageInput.value !== '') {                   //если поле ввода картинки не пустое, тогда оно обязательно для валидности
    cardConfig.imageInput.setAttribute('required', '');
  }
  else {
    cardConfig.imageInput.removeAttribute('required');
  }
}

function resetElement() {
  cardConfig.numberInput.value = '';
  cardConfig.nameInput.value = '';
  cardConfig.imageInput.value = '';
  cardConfig.numberInput.removeAttribute('required');
  cardConfig.imageInput.removeAttribute('required');
}

function resetButton() {
  cardConfig.button.disabled = true;
  cardConfig.button.classList.toggle('add-card__button_disabled');
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

function addCardByInput() {        //вставляем новые карточки
  const input = { name: cardConfig.nameInput.value, image: cardConfig.imageInput.value, number: cardConfig.numberInput.value };
  const newCard = createCard(input);
  addCard(newCard);
}

function primaryLoadingCards() {    //загружаем первичные карточки
  initialCards.forEach((item) => {
    const newCard = createCard(item);
    cardConfig.cards.append(newCard);
  });
}

function addCard(newCard) {    //добавляем карточку
  // evt.preventDefault();

  const cards = document.querySelectorAll(".card");
  const textInCards = document.querySelectorAll(".card__number");   // находим нумерацию блоков

  if (cards.length === (cardConfig.numberInput.value - 1)) {    //ставим блок на 1 место
    cards[cardConfig.numberInput.value - 2].after(newCard);
  }                                     //вставляем новый блок и окрашиваем его
  else {
    cards[cardConfig.numberInput.value - 1].before(newCard);
  }

  rangingIdAfterInput(cards, textInCards);  //ранжируем id блоков
  listenerPositionButton();      //вешаем слушатели на кнопнки вверх вниз
  resetElement();    //сбрасываем все импуты
  resetButton();     //сбрасываем кнопку добавить
  disableArrow();    //скрываем верхнии и нижнии стрелки
}

cardConfig.button.addEventListener('click', addCardByInput);
cardConfig.addCards.addEventListener('input', validButton);

primaryLoadingCards();    //первичные карточки
resetButton();
disableArrow();
listenerPositionButton();


