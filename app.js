"use strict";

let input = document.getElementById('input'), //кнопка ввода/ввывода
	number = document.querySelectorAll('.numbers duv'), //номера кнопок
	operator = document.querySelectorAll('.operator div'), //кнопки оператора
	result = document.getElementById('result'), //кнопка равенства
	clear = document.getElementById('clear'), //кнопка очистки
	resultDisplayed = false; //флажок, чтобы следить за тем, какие выходные данные отображаются

// добавление обработчиков щелчков к цифровым кнопкам
for (let i = 0; i < number.length; i++) {
	number[i].addEventListener("click", function (e) {

		// сохранение текущей входной строки и ее последнего символа в переменных - используется позже
		let currentString = input.innerHTML;
		let lastChar = currentString[currentString.length - 1];

		// если результат не отображается, просто продолжайте добавлять
		if (resultDisplayed === false) {
			input.innerHTML += e.target.innerHTML;
		} else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar "*" || lastChar === "/") {

		// если в данный момент отображается результат и пользователь нажал оператор
		// нам нужно продолжать добавлять к строке для следующей операции
		resultDisplayed = false;
		input.innerHTML += e.target.innerHTML;
	} else {
		// если в данный момент отображается результат и пользователь нажал цифру
		// нам нужно очистить строку ввода и добавить новый ввод, чтобы начать новую операцию
		resultDisplayed = false;
		input.innerHTML = "";
		input.innerHTML += e.target.innerHTML;
	}
});
}
// добавление обработчиков щелчков к цифровым кнопкам
for (let i = 0; i < operator.length; i++) {
	operator[i].addEventListener("click", function (e) {
		// сохранение текущей входной строки и ее последнего символа в переменных - используется позже
		let currentString = input.innerHTML;
		let lastChar = currentString[currentString.length - 1];
		// если последний введенный символ является оператором, замените его на текущий введенный символ
		if (lastChar === "+" || lastChar === "-" || lastChar "*" || lastChar === "/") {
		let newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
		input.innerHTML = newString;
	} else if (currentString.length == 0) {
		// если первая нажатая клавиша является оператором, ничего не делайте
		console.log("enter a number first");
	} else {
		// иначе просто добавьте оператор, нажатый на ввод
		input.innerHTML += e.target.innerHTML;
	}
});
}

// при нажатии кнопки "равно"
result.addEventListener("click", function () {
	// это строка, которую мы будем обрабатывать, например. -10+26+33-56*34/23
	let inputString = input.innerHTML;

	// формирование массива чисел. например, для приведенной выше строки это будет: numbers = ["10", "26", "33", "56", "34", "23"]
	let numbers = inputString.split(/\+|\-|\×|\÷/g);
	// формирование массива операторов. для приведенной выше строки это будет: операторы = ["+", "+", "-", "*", "/"]
	// сначала мы заменяем все числа и точки пустой строкой, а затем разделяем
	let operators = inputString.replace(/[0-9]|\./g, "").split("");

	console.log(inputString);
	console.log(operators);
	console.log(numbers);
	console.log("-----------------");

	// теперь мы перебираем массив и выполняем по одной операции за раз.
	// сначала деление, затем умножение, затем вычитание, а затем сложение
	// по мере продвижения мы изменяем исходный массив чисел и операторов
	// последним элементом, оставшимся в массиве, будет вывод

	let divide = operators.indexOf("/");
	while (divide != -1) {
		numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
		operators.splice(divide, 1);
		divide = operators.indexOf("/");
	}

	let multiply = operators.indexOf("*");
	while (multiply != -1) {
		numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
		operators.splice(multiply, 1);
		multiply = operators.indexOf("*");
	}

	let subtract = operators.indexOf("-");
	while (subtract != -1) {
		numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
		operators.splice(subtract, 1);
		subtract = operators.indexOf("-");
	}

	let add = operators.indexOf("+");
	while (add != -1) {
		// необходимо использовать parseFloat, иначе это приведет к конкатенации строк :)
		numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
		operators.splice(add, 1);
		add = operators.indexOf("+");
	}

	input.innerHTML = numbers[0]; // отображение выходных данных

	resultDisplayed = true; // флаг поворота, если отображается результат

});
// очистка ввода при нажатии кнопки очистить
clear.addEventListener("click", function () {
	input.innerHTML = "";
});