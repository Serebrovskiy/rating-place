import Card from '../scripts/Card.js';
import { initialCards } from '../scripts/utils.js';
import { cardConfig } from '../scripts/utils.js';
import { formValidatorOptions } from '../scripts/utils.js';
import Section from '../scripts/Section.js';
import FormCard from '../scripts/FormCard.js';
import FormValidator from '../scripts/FormValidator.js';

let cards = document.querySelectorAll(".card");

const formValidator = new FormValidator(formValidatorOptions, formValidatorOptions.formAddCard);
formValidator.enableValidation();

function rangingIdAfterInput(cards, text) {     //ранжируем data-атрибуты карточек после ввода номера
  for (let i = cardConfig.numberInput.value; i <= cards.length; i++) {  //прогоняем все сдвинутые блоки и меняем их id в соответсвии с порядковым номером
    cards[i - 1].dataset.indexNumber++;
    text[i - 1].textContent = cards[i - 1].dataset.indexNumber;

    if (i == cards.length && cards[i] != null) {    //для последнего блока
      cards[i].dataset.indexNumber = cards.length + 1;
    }
  }
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

const rangingCardAfterDelete = (dataNumber) => {
  cards = document.querySelectorAll(".card");
  const text = document.querySelectorAll(".card__number");

  for (let i = dataNumber; i < cards.length; i++) {
    cards[i].dataset.indexNumber--;
    text[i].textContent = cards[i].dataset.indexNumber;
  }
}

function primaryLoadingCards() {    //загружаем первичные карточки
  console.log(initialCards)
  const cardList = new Section(initialCards,
    {
      renderer: (item) => {
        const newCard = new Card(item, '#card', disableArrow, rangingCardAfterDelete);
        const cardElement = newCard.getCard()

        return cardElement;
      }
    },
    cardConfig.cards);
  cardList.rendererPrimaryCards();
}

function addCard(newCard) {    //добавляем карточку
  cards = document.querySelectorAll(".card");
  const textInCards = document.querySelectorAll(".card__number");   // находим нумерацию блоков

  if (cards.length) {
    if (cards.length === (cardConfig.numberInput.value - 1)) {    //ставим блок на 1 место
      cards[cardConfig.numberInput.value - 2].after(newCard);
    }                                     //вставляем новый блок и окрашиваем его
    else {
      cards[cardConfig.numberInput.value - 1].before(newCard);
    }
  }
  else   //если карточек совсем нет
  {
    cardConfig.cards.append(newCard);
  }

  rangingIdAfterInput(cards, textInCards);  //ранжируем id блоков
  formValidator.resetElement();   //сбрасываем все импуты
  formValidator.resetButton();
  disableArrow();    //скрываем верхнии и нижнии стрелки
}

const rendererFormCard = () => {
  const input = { name: cardConfig.nameInput.value, image: cardConfig.imageInput.value, number: cardConfig.numberInput.value };

  const newCard = new Card(input, '#card', disableArrow, rangingCardAfterDelete);
  const cardElement = newCard.getCard()

  addCard(cardElement);
}

const formCard = new FormCard(cardConfig.addCards, rendererFormCard);
formCard.setEventListener();

primaryLoadingCards();    //первичные карточки
formValidator.resetButton();
disableArrow();


//cardConfig.addCards.addEventListener('input', validButton);

// function validButton() {    //валидируем кнопку
//   // const isInputValid = !cardConfig.numberInput.checkValidity();
//   let isInputValid = false;

//   if (!cardConfig.numberInput.checkValidity() || !cardConfig.imageInput.checkValidity()) {   //если поля номера и картинки валидны
//     isInputValid = true;
//   }
//   validInput();

//   cardConfig.button.disabled = isInputValid;
//   cardConfig.button.classList.toggle(formValidatorOptions.buttonAddCardDisable, isInputValid);
// }