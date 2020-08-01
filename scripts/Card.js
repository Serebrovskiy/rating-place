import { cardConfig } from './utils.js';

export default class Card {
  constructor(element, cardSelector, handleDisableArrow, rangingCardAfterDelete) {
    this._element = element;
    this._cardSelector = cardSelector;
    this._handleDisableArrow = handleDisableArrow;
    this._rangingCardAfterDelete = rangingCardAfterDelete;

    this._name = element.name;
    this._image = element.image;
    this._number = element.number;
  }

  _getTemplateCard() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);

    return cardElement;
  }

  getCard() {
    this._element = this._getTemplateCard();
    this._cardName = this._element.querySelector('.card__text');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardNumber = this._element.querySelector('.card__number');
    this._arrowUp = this._element.querySelector('.card__button-up');
    this._arrowDown = this._element.querySelector('.card__button-down');
    this._cardDeleteButton = this._element.querySelector('.card__button-delete');
    this._card = this._element.closest('.card');

    this._setEventListeners();

    this._cardName.textContent = this._name;
    this._cardImage.src = this._image;
    this._cardNumber.textContent = this._number;
    this._element.dataset.indexNumber = this._number;

    this._name ? this._cardName.textContent = this._name : this._cardName.textContent = 'Жигули';  //если поле пустое, то вывводим жигу
    this._image ? this._cardImage.src = this._image : this._cardImage.src = "./images/жига.jpg";   //если поле пустое, то вывводим жигу

    return this._element;
  }

  _setEventListeners() {
    this._arrowUp.addEventListener('click', this._cardPositionUp.bind(this));
    this._arrowDown.addEventListener('click', this._cardPositionDown.bind(this));
    this._cardDeleteButton.addEventListener('click', this._cardDelete.bind(this));
  }

  _cardPositionUp() {
    const previousСardNumber = this._card.previousElementSibling.querySelector('.card__number');   //забираем номер предыдущей карточки
    this._element.parentNode.insertBefore(this._element, this._element.previousElementSibling);     // меням местам дом элементы через родителя
    this._card.dataset.indexNumber--;  //уменьшаем на 1 data перемещаемой карточки
    this._cardNumber.textContent = this._card.dataset.indexNumber;   //уменьшаем на 1 номер перемещаемой карточки
    this._card.nextSibling.dataset.indexNumber++;    //nextSibling - соседний(следующий) элемент
    previousСardNumber.textContent = this._card.nextSibling.dataset.indexNumber;  //увеличиваем на 1 номер заменяемой карточки

    this._handleDisableArrow();  //скрываем верхнии и нижнии стрелки
  }

  _cardPositionDown() {
    const nextСardNumber = this._card.nextElementSibling.querySelector('.card__number');   //забираем номер предыдущей карточки
    this._element.parentNode.insertBefore(this._element.nextElementSibling, this._element);     // меням местам дом элементы через родителя
    this._card.dataset.indexNumber++;  //уменьшаем на 1 data перемещаемой карточки
    this._cardNumber.textContent = this._card.dataset.indexNumber;   //уменьшаем на 1 номер перемещаемой карточки
    this._card.previousSibling.dataset.indexNumber--;    //nextSibling - соседний(следующий) элемент
    nextСardNumber.textContent = this._card.previousSibling.dataset.indexNumber;  //увеличиваем на 1 номер заменяемой карточки

    this._handleDisableArrow();  //скрываем верхнии и нижнии стрелки
  }

  _cardDelete() {
    this._rangingCardAfterDelete(this._element.dataset.indexNumber);
    this._element.remove();
    this._element = null;

    this._removeEventListener();
    this._handleDisableArrow();  //скрываем верхнии и нижнии стрелки при удалении
  }

  _removeEventListener() {
    this._arrowUp.removeEventListener('click', this._cardPositionUp.bind(this));
    this._arrowDown.removeEventListener('click', this._cardPositionDown.bind(this));
    this._cardDeleteButton.removeEventListener('click', this._cardDelete.bind(this));
  }

}