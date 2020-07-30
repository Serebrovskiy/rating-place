export const initialCards = [
  {
    name: 'Мерседес',
    image: './images/mers.jpg',
    number: 1
  },
  {
    name: 'БМВ',
    image: './images/bmw.jpg',
    number: 2
  },
  {
    name: 'Ауди',
    image: './images/Audi.jpg',
    number: 3
  },
  {
    name: 'Тойота',
    image: 'https://avatars.mds.yandex.net/get-autoru-vos/2172317/326aeb07177cb782de2357237fae08a5/1200x900n',
    number: 4
  }
];

export const cardConfig = {
  cards: document.querySelector(".cards"),
  cardTemplate: document.querySelector('#card').content,
  cardList: document.querySelectorAll(".card"),
  button: document.querySelector('.add-card__button'),
  addCards: document.querySelector('.add-card'),
  numberInput: document.querySelector('.add-card__input_number'),  //номер который мы ввели
  nameInput: document.querySelector('.add-card__input_name'),
  imageInput: document.querySelector('.add-card__input_image'),
  buttonUpPositionList: document.querySelectorAll('.card__button-up'),
  buttonDownPositionList: document.querySelectorAll('.card__button-down')
}

export const formValidatorOptions = {
  formAddCard: '.add-card',
  buttonAddCard: '.add-card__button',
  buttonAddCardDisable: 'add-card__button_disabled',
  inputAddCard: '.add-card__input',
  inputAddCardNumber: '.add-card__input_number'
}