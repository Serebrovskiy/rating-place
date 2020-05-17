
const button = document.querySelector('.button');
let numberInput = document.querySelector('.input-number');   //номер который мы ввели

function addBlock() {

    let idBlock = document.getElementById(numberInput.value - 1);   // отслеживаем по id, есть ли рядом блок, с тем местом куда хотим вставить новый
    let blocks = document.querySelectorAll(".block");               // находим все блоки 
    let textInBlocks = document.querySelectorAll(".block__text");   // находим нумерацию блоков 

    if (idBlock || numberInput.value == 1) {    //проверяем возможно ли вставить блок
        if (blocks.length == (numberInput.value - 1)) {    //если ставим блок на 1 место
            blocks[numberInput.value - 2].insertAdjacentHTML('afterend', `<div id="${numberInput.value}" class="block"><p class="block__text">${numberInput.value}</p></div>`);
            randomColorBlock();  
        }                                     //вставляем новый блок и окрашиваем его
        else {  
            blocks[numberInput.value - 1].insertAdjacentHTML('beforebegin', `<div id="${numberInput.value}" class="block"><p class="block__text">${numberInput.value}</p></div>`);
            randomColorBlock();    
        }

        for (let i = numberInput.value; i <= blocks.length; i++) {  //прогоняем все сдвинутые блоки и меняем их id в соответсвии с порядковым номером
            blocks[i - 1].id++;
            textInBlocks[i - 1].textContent = blocks[i - 1].id;

            if (i == blocks.length && blocks[i] != null) {    //для последнего блока
                blocks[i].id = blocks.length + 1;
            }
        }
        numberInput.value = '';
    }
    else {
        alert('Введите корректный номер');
    }
}

function randomColorBlock() {       //функция окрашивания блока
    let newBlocks = document.querySelectorAll(".block");
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    newBlocks[numberInput.value - 1].style.backgroundColor = `rgba(${r}, ${g}, ${b}, .7)`;  //окрашиваем новый блок в случайный цвет
}

button.addEventListener('click', addBlock);



        //let blocks = [{ id: 1 }, { id: 2 }];

        // blocks.push({ id: numberInput.value });     // добавляем id в массив объектов


        // for (let i = 0; i < blocks.length; i++) {       // выводим массив до сортировки
        //     console.log(blocks[i].id);
        // }

        // console.log("---------------------------------");
        // blocks.sort((prev, next) => prev.id - next.id);

        // for (let i = 0; i < blocks.length; i++) {       // выводим массив после сортировки
        //     console.log(blocks[i].id);
        // }


        // let highlightedItems = document.querySelectorAll(".block");

        //    highlightedItems.forEach(function(userItem) {
        //      deleteUser(userItem);
        //    });


        //    for( let i = 0; i < blocks_html.length; i++){ 
        //    console.log('i = ' + i + '. id блока - ' + blocks_html[i].id); 
        //    }	


        // for(let i = numberInput.value; i <= blocks.length; i++){

        //     blocks[i-1].id++;
        //     // blocks_html[i-1].innerHTML = `<p class="block__text">${blocks_html[i-1].id}</p>`;
        //     // blocks_html[i-1].textContent = blocks_html[i-1].id;
        //     textInBlocks[i-1].textContent = blocks[i-1].id;
        //     // blocks[i-1].style.backgroundColor = "blue";

        //     if(i == blocks.length){
        //         blocks[i].id = blocks.length + 1;
        //         break;
        //     }
        //     console.log('i= ' + i);

        // }