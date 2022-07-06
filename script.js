let modelo;
let gola;
let tecido;
let linkReferencia;
let pedidos;
let nomeUser;

function nome() {
    nomeUser = prompt("Seja Bem-vindx! Qual é o seu nome?");
    alert(`Olá ${nomeUser} !`)

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

   

    // function isURL(string) {

    //     linkReferencia = document.querySelector('input').value;

    //     try {
    //         let url = new URL(string)
    //         return true;
    //     } catch (err) {
    //         return false;
    //     }

        
    // }

    // isURL(linkReferencia);
    // console.log("chegou no link de referencia")
    // console.log(isURL);


function fazerPedido(){

    if (modelo !== undefined && gola !== undefined && tecido !== undefined){
        console.log("Você pode fazer o pedido!");

        const botao = document.querySelector('.botao');

        botao.classList.add('selecionada');
    } 

}

///

//BUSCAR OS PEDIDOS DO SERVIDOR - ETAPA 1

function buscarPedidos(){
    console.log('Buscando pedido')

    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");

    promessa.then(popularPedidos);
}

//PEGAR TODOS OS PEDIDOS E JOGÁ NA VARIÁVEL PEDIDOS - ETAPA 2



function popularPedidos(resposta){
    console.log('jogando pedidos na variável pedidos')
    console.log(resposta)
}

if (resposta.status === 200){
    console.log('Get deu certo');
    pedidos = resposta.data;
    renderizarPedidos();
}

//COLOCA OS PEDIDOS NO DOM - ETAPA 3

function renderizarPedidos() {
    console.log('renderizando pedidos');

    const ulPedidos = document.querySelector('.ultimos-Pedidos');
    ulPedidos = "";

    for (let i = 0; i < pedidos.length; i++){
        
        ulPedidos.innerHTML += `
        
        <li class="card-Pedidos">
        <img src="${pedidos[i].image}">
        <p><strong>Criador: </strong>${pedidos[i].author}</p>
        </li>

        `
    }
}

// CADASTRAR NOVO PEDIDO 

function cadastrarNovoPedido(){
    const modelo =  document.querySelector(".titulo.modelo").innerHTML;
    const gola = document.querySelector(".titulo.gola").innerHTML;
    const tecido = document.querySelector(".titulo.tecido").innerHTML;
    const referencia = document.querySelector("input").value;
    const dono = "Owner";
    const criador = nomeUser;


    const novoPedido = {
        model: modelo,
        neck: gola,
        material: tecido,
        image: referencia,
        owner: dono,
        author: criador
    };

    const promise = axios.post(
        "https://mock-api.driven.com.br/api/v4/shirts-api/shirts", novoPedido
    );

    promise.then(buscarPedidos);
    promise.catch(alertarErro);
}

