const screen = document.getElementById('screen')
const starter = document.getElementById('block-starter')
let blocks = document.querySelectorAll('.block')
let latestBlock = document.querySelector('.block');
const score = document.querySelector('#score');



// НАЧАЛО ИГРЫ
alert('Приветствую вас в игре TowerBloxx!');



// РАНДОМНЫЙ ЦВЕТ БЛОКА
function randColor() {
    var r = Math.floor(Math.random() * (256)),
        g = Math.floor(Math.random() * (256)),
        b = Math.floor(Math.random() * (256));
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}



// ДОБАВИТЬ БЛОК
function addBlock() {
	let block = document.createElement('div'); // СОЗДАНИЕ ЭЛЕМЕНТА
	block.className = 'block'; // ПРИСВОЕНИЕ КЛАССА
	block.style.marginLeft = Math.floor(Math.random() * 400) + 'px'; // РАНДОМНЫЙ ОТСТУП СЛЕВА
	block.style.backgroundColor = randColor(); // РАНДОМНЫЙ ЦВЕТ

	screen.insertBefore(block, latestBlock) // ВСТАВКА БЛОКА

	blocks = document.querySelectorAll('.block'); // ОБНОВЛЕНИЕ МАССИВА СО ВСЕМИ БЛОКАМИ (НУЖНО В СЛЕДУЮЩИХ ФУНКЦИЯХ)

	animate(block); // НАЧАЛО АНИМАЦИИ
}



// АНИМАЦИЯ БЛОКА
let animateInterval;
function animate(block) { // АНИМАЦИЯ
	isRight = true; // ДВИЖЕНИЕ ВПРАВО - ПРАВДА/ЛОЖЬ

	function marginAdd() {
		if (parseInt(block.style.marginLeft) >= 400) {
			isRight = false;							 // ПРОВЕРКА НА КАСАНИЕ РАМОК СПРАВА
		}

		if (parseInt(block.style.marginLeft) <= 0) {
			isRight = true;							 // ПРОВЕРКА НА КАСАНИЕ РАМОК СЛЕВА
		}

		if (isRight == true) {
			block.style.marginLeft = (parseInt(block.style.marginLeft) + 1) + 'px';
		} else {
			block.style.marginLeft = (parseInt(block.style.marginLeft) - 1) + 'px';
		}
	}


	animateInterval = setInterval(marginAdd, 10)
}

function stopAnimate(block) { // ОСТАНОВКА АНИМАЦИИ
	clearInterval(animateInterval)
}



// ОКОНЧАНИЕ ИГРЫ
function gameOver() {
	alert('Игра окончена! ' + score.innerText);
	location = location;
}



// main() - навешивание листенеров
function main() {
	screen.addEventListener('click', function() {
		stopAnimate(latestBlock); // ОСТАНОВКА АНИМАЦИИ ПРЕДЫДУЩЕГО БЛОКА

		blocks = document.querySelectorAll('.block'); // ОБНОВЛЕНИЕ МАССИВА СО ВСЕМИ БЛОКАМИ

		latestBlock = document.querySelector('.block'); // ИНИЦИАЛИЗАЦИЯ ПОСЛЕДНЕГО БЛОКА
		let preLastBlock; // ОБЪЯВЛЕНИЕ ПЕРЕМЕННОЙ ПРЕД-ПОСЛЕДНЕГО БЛОКА

		function getScore() { // ПОЛУЧЕНИЕ ОЧКОВ ИГРЫ
			let myScore = +score.innerText; // ПОЛУЧЕНИЕ СУММЫ ОЧКОВ

			let lBML = parseInt(latestBlock.style.marginLeft); // ОТСТУП СЛЕВА ДЛЯ БЛОКА
			let pLBML = parseInt(preLastBlock.style.marginLeft); // ОТСТУП СЛЕВА ДЛЯ ПРЕД-ПОСЛЕДНЕГО БЛОКА

			if (pLBML == 0 || isNaN(pLBML) || pLBML == '') { // ПОДСТРАХОВАЛСЯ
				pLBML = 200;
			}

			if (pLBML > lBML) {
				lBML = 200 - (pLBML - lBML) // ЕСЛИ ОТСТУП СЛЕВА ДЛЯ preLastBlock БОЛЬШЕ ОТСТУПА preLastBlock
			} else {
				lBML = 200 - (lBML - pLBML)
			}

			if (lBML < 100) { // ЕСЛИ ОТСТУП БОЛЬШЕ ПОЛОВИНЫ ШИРИНЫ БЛОКА - ОКОНЧАНИЕ ИГРЫ
				gameOver();
			}

			if (myScore == 0 || isNaN(myScore) || myScore == 'Нажмите на экран, что-бы начать!') { // ПРОВЕРКА НА 1Й ХОД
				return 0 + (lBML)
			} else {
				console.log(lBML)
				return myScore + (lBML);
			}

		}
		if (blocks.length > 1) { // ПРОВЕРКА НА ВТОРОЙ ИЛИ ПОСЛЕДУЮЩИЕ ХОДЫ
			preLastBlock = blocks[1];
			score.innerText = getScore();
		}

		if (blocks.length > 4) { // УДАЛЕНИЕ САМОГО НИЖНЕГО БЛОКА
			blocks[blocks.length - 1].remove(this)
		}


		addBlock(); // СОЗДАНИЕ БЛОКА
	})
}



main();
