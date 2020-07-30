export default class FormCard {
  constructor(formSelector, handleSubmitForm) {
    this._formSelector = formSelector;
    this._handleSubmitForm = handleSubmitForm;
  }

  setEventListener() {
    //this._submitFormCard = this._formSelector.querySelector('.add-card__button');
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm();
    });
  }
}