export default class FormValidator {
  constructor(element, formSelector) {
    this._element = element;
    this._formSelector = formSelector;
  }

  enableValidation() {
    this._formElement = document.querySelector(this._formSelector);
    this._buttonElement = this._formElement.querySelector(this._element.buttonAddCard);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._element.inputAddCard));

    this._handleButton();
    this._setEventListener();
  }

  _setEventListener() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        if (inputElement.name === 'inputCardName') {
          this._handleInputName(inputElement)
        }
        if (inputElement.name === 'inputCardImage') {
          this._handleInputImage(inputElement)
        }
        if (inputElement.name === 'inputCardNumber') {
          this._handleInputNumber(inputElement)
        }
      });
    });
  }
  // _handleInputName(input){   //пока не нужно
  //   console.log(input.name)
  // }
  // _handleInputImage(input){   //пока не нужно
  //   console.log(input.name)
  // }

  _handleInputNumber(input) {
    const cardList = document.querySelectorAll(".card");
    // input.setAttribute('required', '');
    if ((input.value > cardList.length + 1) || input.value == 0) {
      this.resetButton();
    }
    else {
      this._handleButton();
    }
  }

  _handleButton() {
    const hasError = !this._formElement.checkValidity();
    this._buttonElement.disabled = hasError;
    this._buttonElement.classList.toggle(this._element.buttonAddCardDisable, hasError);
  }

  resetElement() {
    this._inputList.forEach(inputElement => {
      inputElement.value = '';
      inputElement.removeAttribute('required');
    });
  }

  resetButton() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._element.buttonAddCardDisable);
  }

}

// сложная форма высчитывания паттерна
    // if (cardList.length < 9) {
    //   input.setAttribute('pattern', `[1-${cardList.length + 1}]`);  //работает корректно только до 9, дальше начинается байда
    // }
    // else {
    //   input.setAttribute('pattern', `[1-9]|[1][0-${cardList.length - 9}]`);  //1-${cardList.length + 1} //-${countList}  let countList = Math.floor((cardList.length+1)/10);
    // }

        // this._inputNumber = this._formElement.querySelector(this._element.inputAddCardNumber);

        // _handleInputName(input){
        //   input.setAttribute('required', '');
        // }

        // _handleInputImage(input){
        //   if (input.value !== '') {                   //если поле ввода картинки не пустое, тогда оно обязательно для валидности
        //     input.setAttribute('required', '');
        //   }
        //   else {
        //     input.removeAttribute('required');
        //   }
        // }


            //слушаем ввод каждого символа и проверяем вадидность
  //  this._formElement.addEventListener('input', () => this._handleButton(this._element.buttonAddCardDisable));