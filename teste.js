function realizarDeposito() {
    const nome = document.getElementById("deposito-nome").value;
    const valor = parseFloat(document.getElementById("deposito-valor").value);
    if (valor > 0) {
        const conta = encontrarConta(nome);
        if (conta) {
            conta.saldo += valor;
            alert(`Depósito de R$ ${valor} realizado com sucesso na conta de ${nome}.`);
        } else {
            alert(`Conta com o nome ${nome} não foi encontrada!`);
        }
    } else {
        alert("Valor de depósito inválido!");
    }
}

function realizarSaque() {
    const nome = document.getElementById("saque-nome").value;
    const valor = parseFloat(document.getElementById("saque-valor").value);
    const conta = encontrarConta(nome);
    if (conta) {
        if (valor > 0 && valor <= conta.saldo) {
            conta.saldo -= valor;
            alert(`Saque de R$ ${valor} realizado com sucesso na conta de ${nome}.`);
        } else {
            alert("Valor de saque inválido ou saldo insuficiente!");
        }
    } else {
        alert(`Conta com o nome ${nome} não foi encontrada!`);
    }
}

function realizarTransferencia() {
    const nomeOrigem = document.getElementById("transferencia-nome-origem").value;
    const nomeDestino = document.getElementById("transferencia-nome-destino").value;
    const valor = parseFloat(document.getElementById("transferencia-valor").value);
    const contaOrigem = encontrarConta(nomeOrigem);
    const contaDestino = encontrarConta(nomeDestino);

    if (contaOrigem && contaDestino) {
        if (valor > 0 && contaOrigem.saldo >= valor) {
            contaOrigem.saldo -= valor;
            contaDestino.saldo += valor;
            alert(`Transferência no valor de R$ ${valor} de ${nomeOrigem} para ${nomeDestino} realizada com sucesso!`);
        } else {
            alert("Valor de transferência inválido ou saldo insuficiente!");
        }
    } else {
        alert("Uma das contas informadas não foi encontrada!");
    }
}

function exibirSaldo() {
    const nome = document.getElementById("saldo-nome").value;
    const conta = encontrarConta(nome);
    const resultado = document.getElementById("resultado-saldo");

    if (conta) {
        resultado.innerText = `O saldo atual da conta de ${nome} é de R$ ${conta.saldo}.`;
    } else {
        resultado.innerText = `Conta com o nome ${nome} não foi encontrada!`;
    }
}
