let modelo;
let gola;
let tecido;


function nome() {
    let nome = prompt("Seja Bem-vindx! Qual é o seu nome?");
    alert(`Olá ${nome} !`)

}

nome();
function selecionarModelo (elemento){
    const selecionado = document.querySelector('.opcoes.modelo.selecionada');

    if (selecionado !== null){
        selecionado.classList.remove('selecionada');
    }
    elemento.classList.add('selecionada');
    
    modelo = document.querySelector('.opcoes .titulo.modelo').innerHTML;

    fazerPedido()
}

function selecionarGola(elemento){
    const selecionado = document.querySelector('.opcoes.gola .selecionada');

    if (selecionado !== null){
        selecionado.classList.remove('selecionada');
    }
    elemento.classList.add('selecionada');

    gola = document.querySelector('.opcoes .titulo.gola').innerHTML;

    fazerPedido()
}

function selecionarTecido(elemento){
    const selecionado = document.querySelector('.opcoes.tecido .selecionada');

    if (selecionado !== null){
        selecionado.classList.remove('selecionada');
    }
    elemento.classList.add('selecionada');

    tecido = document.querySelector('.opcoes .titulo.tecido').innerHTML;
    
    fazerPedido()
}


function fazerPedido(){

    if (modelo !== undefined && gola !== undefined && tecido !== undefined){
        console.log("Você pode fazer o pedido!");

        const botao = document.querySelector('.botao');

        botao.classList.add('selecionada');
    }
}