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
    constructor(id, nome, senha, perfil, saldo, agencia) {
        this.id = id;
        this.nome = nome;
        this.senha = senha;
        this.perfil = perfil;
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
        } else {
            console.log("Valor de depósito inválido! O valor do depósito deve ser maior do que zero.");
        }
    }

    sacarConta(valor) {
        if (valor > 0 && valor <= this.saldo) {
            this.saldo -= valor;
            console.log(`Saque de R$ ${valor} realizado com sucesso na conta de ${this.nome}.`);
        } else if (valor > 0) {
            console.log("Saldo insuficiente para a realização do saque!");
        } else {
            console.log("Valor de saque inválido! O valor do saque deve ser maior do que zero.");
        }
    }

    transferirPara(usuarioDestino, valor) {
        if (valor > 0 && this.saldo >= valor) {
            this.saldo -= valor;
            usuarioDestino.saldo += valor;
            console.log(`Transferência de R$ ${valor} realizada com sucesso de ${this.nome} para ${usuarioDestino.nome}.`);
        } else {
            console.log("Valor de transferência inválido ou saldo insuficiente!");
        }
    }

    exibirSaldo() {
        console.log(`O saldo atual da conta de ${this.nome} é de R$ ${this.saldo}.`);
    }
}

var dbUser = [];

function insertDB(usuario) {
    dbUser.push(usuario);
}

function cadastrarUsuario(nome, agencia) {
    var id = dbUser.length + 1;
    var saldo = 0;
    var usuario = new Usuario(id, nome, senha, perfil, saldo, agencia);
    insertDB(usuario);
}

function encontrarUsuario(nome) {
    return dbUser.find(usuario => usuario.nome === nome);
}

function realizarLogin(nome, senha) {
    const nome = document.getElementById("nome").value
    const senha = document.getElementById("password").value
    const usuario = encontrarUsuario(nome);

    if (nome.usuario && senha.usuario == perfil.admin) {
        location.href = "admin.html"
    } else if (nome.usuario && senha.usuario == perfil.user) {
        location.href = "user.html"
    } else {
        alert("Nome ou senha de usuário não encontrados!")
    }
}

function senhaValida(senha) {
    var retorno = false;
    var letrasMaiusculas = /[A-Z]/;
    var letrasMinusculas = /[a-z]/;
    var numeros = /[0-9]/;
    var caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    if (senha.length > 8) {
        return retorno;
    }
    if (senha.length < 8) {
        return retorno;
    }
    var auxMaiuscula = 0;
    var auxMinuscula = 0;
    var auxNumero = 0;
    var auxEspecial = 0;
    for (var i = 0; i < p.length; i++) {
        if (letrasMaiusculas.test(senha[i]))
            auxMaiuscula++;
        else if (letrasMinusculas.test(senha[i]))
            auxMinuscula++;
        else if (numeros.test(senha[i]))
            auxNumero++;
        else if (caracteresEspeciais.test(senha[i]))
            auxEspecial++;
    }
    if (auxMaiuscula > 0) {
        if (auxMinuscula > 0) {
            if (auxNumero > 0) {
                if (auxEspecial) {
                    retorno = true;
                }
            }
        }
    }
}

    function realizarDeposito() {
        const nome = document.getElementById("deposito-nome").value;
        const valor = parseFloat(document.getElementById("deposito-valor").value);
        const usuario = encontrarUsuario(nome);

        if (usuario && valor > 0) {
            usuario.depositarConta(valor);
            alert(`Depósito de R$ ${valor} realizado com sucesso na conta de ${nome}.`);
        } else if (!usuario) {
            alert(`Conta com o nome ${nome} não foi encontrada!`);
        } else {
            alert("Valor de depósito inválido!");
        }
    }

    function realizarSaque() {
        const nome = document.getElementById("saque-nome").value;
        const valor = parseFloat(document.getElementById("saque-valor").value);
        const usuario = encontrarUsuario(nome);

        if (usuario) {
            if (valor > 0 && valor <= usuario.saldo) {
                usuario.sacarConta(valor);
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
        const usuarioOrigem = encontrarUsuario(nomeOrigem);
        const usuarioDestino = encontrarUsuario(nomeDestino);

        if (usuarioOrigem && usuarioDestino) {
            if (valor > 0 && usuarioOrigem.saldo >= valor) {
                usuarioOrigem.transferirPara(usuarioDestino, valor);
                alert(`Transferência de R$ ${valor} realizada com sucesso de ${nomeOrigem} para ${nomeDestino}.`);
            } else {
                alert("Valor de transferência inválido ou saldo insuficiente!");
            }
        } else {
            alert("Uma das contas informadas não foi encontrada!");
        }
    }

    function exibirSaldo() {
        const nome = document.getElementById("saldo-nome").value;
        const usuario = encontrarUsuario(nome);
        const resultado = document.getElementById("resultado-saldo");

        if (usuario) {
            resultado.innerText = `O saldo atual da conta de ${nome} é de R$ ${usuario.saldo}.`;
        } else {
            resultado.innerText = `Conta com o nome ${nome} não foi encontrada!`;
        }
    }

    let agencia1 = new Agencia(1, "Bradesco", "Encruzilhada");
    let agencia2 = new Agencia(2, "Caixa", "Boa Vista");
    let agencia3 = new Agencia(3, "Itaú", "Afogados");
    cadastrarUsuario("Fernando", agencia1);
    cadastrarUsuario("Maria", agencia2);
    cadastrarUsuario("João", agencia3);
