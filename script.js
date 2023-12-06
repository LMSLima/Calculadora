const display = document.getElementById('display');
const history = document.getElementById('history');

let operadorAtual = '';
let operador = '';

function limpar() {
    operadorAtual = '';
    operador = '';
    display.value = '0';
    history.textContent = '';
}

function add_numero(numero) {
    operadorAtual += numero;
    display.value = operadorAtual;
}

function add_operador(op) {
    if (operadorAtual) {
        executarOperação();
        operador = op;
        history.textContent += operadorAtual + ' ' + op + ' ';
    } else {
        operador = op;
    }
    operadorAtual = '';
}

function executarOperação() {
    if (operador && operadorAtual) {
      const operadorAnterior = parseFloat(history.textContent.slice(0, -3));
      const numeroAtual = parseFloat(operadorAtual);
      let result;
  
      switch (operador) {
        case '+':
          result = operadorAnterior + numeroAtual;
          break;
        case '-':
          result = operadorAnterior - numeroAtual;
          break;
        case '*':
          result = operadorAnterior * numeroAtual;
          break;
        case '/':
          result = operadorAnterior / numeroAtual;
          break;
        default:
          result = numeroAtual;
      }

      history.textContent += operadorAtual + ' = ';
      operadorAtual = result.toString();
      display.value = operadorAtual;
    }
  }
  
  function total() {
    executarOperação();
    operador = '';
    history.textContent += operadorAtual;
  }

  document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
      add_numero(parseInt(event.key));
    } else if (event.key === '.') {
      add_numero('.');
    } else if (event.key === 'Enter' || event.key === '=') {
      total();
    } else if (event.key === 'Delete') {
      limpar();
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
      add_operador(event.key);
    }
  });