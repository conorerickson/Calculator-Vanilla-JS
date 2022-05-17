class Calc{
  constructor(previousOperationText, currentOperationText){
    this.currentOperationText = currentOperationText;
    this.previousOperationText = previousOperationText;
    this.clear()
  }
  clear() {
    this.currentOperation = '';
    this.previousOperation = '';
    this.operation = undefined;
  }

  backspace() {
    this.currentOperation = this.currentOperation.toString().slice(0, -1);
  }

  appendNum(num) {
    if (num === '.' && this.currentOperation.includes('.')) {
      return;
    }
    this.currentOperation = this.currentOperation.toString() + num.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperation === '') {
      return;
    }
    if (this.previousOperation !== '') {
      this.solve();
    }
    this.operation = operation;
    this.previousOperation = this.currentOperation;
    this.currentOperation = '';
    
  }

  solve() {
    let computation;
    const prev = parseFloat(this.previousOperation);
    const current = parseFloat(this.currentOperation);
    if (isNaN(prev) || isNaN(current)) {
      return;
    }
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperation = computation;
    this.operation = undefined;
    this.previousOperation ='';
    
  }

  getUpdatedText(num) {
    const stringNum = num.toString();
    const integerDigit = parseFloat(stringNum.split('.')[0]);
    const decimalDigit = stringNum.split('.')[1];
    let intDisplay;
    if (isNaN(integerDigit)) {
      intDisplay = ''
    } else {
      intDisplay = integerDigit.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigit != null) {
      return `${intDisplay}.${decimalDigit}`;
    } else {
      return intDisplay;
    }
  }

  updateText() {
    this.currentOperationText.innerHTML = this.getUpdatedText(this.currentOperation);
    if (this.operation != null) {
      this.previousOperationText.innerHTML = `${this.getUpdatedText(this.previousOperation)} ${this.operation}`;
    } else {
      this.previousOperationText.innerHTML = '';
    }
  }
}

const numericalBtn = document.querySelectorAll('[data-num]');
const operationBtn = document.querySelectorAll('[data-operator]');
const equalsBtn = document.querySelector('[data-equals]');
const clearBtn = document.querySelector('[data-clear]');
const deleteBtn = document.querySelector('[data-del]');
const previousOperationText = document.querySelector('[data-prev-operation]');
const currentOperationText = document.querySelector('[data-current-operation]');

const calculator = new Calc(previousOperationText, currentOperationText);

numericalBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNum(button.innerHTML);
    calculator.updateText();
  })
})

operationBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerHTML);
    calculator.updateText();
  })
})

equalsBtn.addEventListener('click', button => {
  calculator.solve();
  calculator.updateText();
})

clearBtn.addEventListener('click', button => {
  calculator.clear();
  calculator.updateText();
})
deleteBtn.addEventListener('click', button => {
  calculator.backspace();
  calculator.updateText();
})