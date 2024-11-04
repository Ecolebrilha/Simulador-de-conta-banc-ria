class Agencia {
    constructor(id, nome, endereco) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
    }

    atualizarNome(novoNome) {
        this.nome = novoNome;
    }
}

class Usuario {
    constructor(id, nome, saldo, agencia) {
        this.id = id;
        this.nome = nome;
        this.saldo = saldo;
        this.agencia = agencia;
    }

    atualizarAgencia(novaAgencia) {
        this.agencia = novaAgencia;
    }

    atualizarId(novoId) {
        this.id = novoId;
    }

    atualizarSaldo(novoSaldo) {
        this.saldo = novoSaldo;
    }

    depositarConta(valor) {
        if (valor > 0) {
            this.saldo += valor;
            console.log(`Depósito de R$ ${valor} realizado com sucesso na conta de ${this.nome}.`);
            this.exibirSaldo();
        } else {
            console.log("Valor de depósito inválido! O valor do depósito deve ser maior do que zero.")
        }
    }

    sacarConta(valor) {
        if (valor > 0 && valor <= this.saldo) {
            this.saldo -= valor;
            console.log(`Saque de R$ ${valor} realizado com sucesso na conta de ${this.nome}.`)
            this.exibirSaldo();
        } else if (valor > 0) {
            console.log("Saldo insuficiente para a realização do saque!")
        } else {
            console.log("Valor de saque inválido! O valor do saque deve ser maior do que zero.")
        }
    }

    transferirPara(usuarioDestino, valor) {
        if (valor > 0 && this.saldo >= valor) {
            this.saldo -= valor;
            usuarioDestino.saldo +=valor;
            console.log(`Transferência no valor de R$ ${valor} realizada de ${this.nome} para ${usuarioDestino.nome} efetuada com sucesso!`);
            this.exibirSaldo();
            usuarioDestino.exibirSaldo();
        } else {
            console.log('Valor de transferência inválido ou saldo insuficiente!')
        }
    }

    exibirSaldo() {
        console.log(`O saldo atual da conta de ${this.nome} é de R$ ${this.saldo}.`)
    }
}

var dbUser = [];

function insertDB(usuario) {
    dbUser.push(usuario)
}

function cadastrarUsuario(nome, agencia) {
    var id = dbUser.length + 1;
    var saldo = 0;
    var usuario = new Usuario(id, nome, saldo, agencia)
    insertDB(usuario)
}

function encontrarUsuario(nome) {
    return dbUser.find(usuario => usuario.nome === nome);
}

function fazerDeposito(nome, valor) {
    const usuario = encontrarUsuario(nome);
        if (usuario) {
            usuario.depositarConta(valor);
        } else {
            console.log(`Conta com o nome ${nome} não foi encontrada!`)
        }
}

function fazerSaque(nome, valor) {
    const usuario = encontrarUsuario(nome);
        if (usuario) {
            usuario.sacarConta(valor);
        } else {
            console.log(`Conta com o nome ${nome} não foi encontrada!`)
        }
}   

function realizarTransferencia(nomeOrigem, nomeDestino, valor) {
    const usuarioOrigem = encontrarUsuario(nomeOrigem);
    const usuarioDestino = encontrarUsuario(nomeDestino);
        if (usuarioOrigem && usuarioDestino) {
            usuarioOrigem.transferirPara(usuarioDestino, valor);
        } else {
            console.log('Uma das contas informadas não foi encontrada!')
        }
}

let agencia1 = new Agencia(1, "Bradesco", "Encruzilhada");
let agencia2 = new Agencia(2, "Caixa", "Boa Vista");
let agencia3 = new Agencia(3, "Itaú", "Afogados");
cadastrarUsuario("Fernando", agencia1);
cadastrarUsuario("Maria", agencia2);
cadastrarUsuario("João", agencia3);

fazerDeposito("Fernando", 150);   
fazerSaque("Maria", 50);           
fazerDeposito("Maria", 200);     
fazerSaque("Maria", 50);          
realizarTransferencia("Maria", "João", 100);
