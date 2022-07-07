let modelo;
let gola;
let tecido;
let linkReferencia;
let pedidos = [];
let nomeUser;


nomeUser = prompt("Seja Bem-vindx! Qual é o seu nome?");



function selecionarModelo (elemento){
    const selecionado = document.querySelector('.opcoes.modelo.selecionada');

    if (selecionado !== null){
        selecionado.classList.remove('selecionada');
    }
    elemento.classList.add('selecionada');
    
    modelo = document.querySelector('.opcoes .titulo.modelo').innerHTML;
    modelo = traduzirModelo(modelo);

    fazerPedido()
}

function selecionarGola(elemento){
    const selecionado = document.querySelector('.opcoes.gola .selecionada');

    if (selecionado !== null){
        selecionado.classList.remove('selecionada');
    }
    elemento.classList.add('selecionada');

    gola = document.querySelector('.opcoes .titulo.gola').innerHTML;
    gola = traduzirGola(gola);

    fazerPedido()
}

function selecionarTecido(elemento){
    const selecionado = document.querySelector('.opcoes.tecido .selecionada');

    if (selecionado !== null){
        selecionado.classList.remove('selecionada');
    }
    elemento.classList.add('selecionada');

    tecido = document.querySelector('.opcoes .titulo.tecido').innerHTML;
    tecido = traduzirTecido(tecido);
    
    fazerPedido()
}

function preencherReferencia(){
    linkReferencia = document.querySelector("input");

    fazerPedido()
}

function fazerPedido(){

    if (modelo !== undefined && gola !== undefined && tecido !== undefined && linkReferencia !== ''){
        console.log("Você pode fazer o pedido!");

        const botao = document.querySelector('.botao');

        botao.classList.add('selecionada');
    } 

}


function traduzirModelo(elemento){
    if (elemento === 'T-shirt'){
        elemento = 't-shirt';
    } else if (elemento === 'Camiseta') {
        elemento = 'top-tank'; 
    } else if (elemento === 'Manga Longa'){
        elemento = 'long';
    } else {
        console.log('Falha na tradução do modelo')
    }

    return elemento;
}

function traduzirGola(elemento){
    if (elemento === 'Gola-V'){
        elemento = 'v-neck';
    } else if (elemento === 'Gola Redonda'){
        elemento = 'round';
    } else if (elemento === 'Gola Polo'){
        elemento = 'polo';
    } else {
        console.log('Falha na tradução da gola')
    }
    return elemento
}

function traduzirTecido(elemento){
    if (elemento === 'Seda'){
        elemento = 'silk';
    } else if (elemento === 'Algodão'){
        elemento = 'cotton';
    } else if (elemento === 'Poliéster'){
        elemento = 'polyester';
    } else {
        console.log('Falha na tradução do tecido')
    }
    return elemento
}
///
buscarPedidos();
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

if (resposta.status === 200){
    console.log('Get deu certo');
    pedidos = resposta.data;
    renderizarPedidos();
}
}
//COLOCA OS PEDIDOS NO DOM - ETAPA 3

function renderizarPedidos() {
    console.log('renderizando pedidos');

    let ulPedidos = document.querySelector('.ultimos-Pedidos');
    ulPedidos.innerHTML = "";

    for (let i = 0; i < pedidos.length; i++){
        console.log("entrou no for")
        ulPedidos.innerHTML += `
        
        <li class="card-Pedidos" onClick="confirmar(this)">
        <img src= ${pedidos[i].image}>
        <p class="escondido"><strong>Criador: </strong><span class="criadorEscondido">${pedidos[i].owner}</span></p>
        <p class="escondido modeloEscondido">${pedidos[i].model}</p>
        <p class="escondido golaEscondido">${pedidos[i].neck}</p>
        <p class="escondido tecidoEscondido">${pedidos[i].material}</p>
        <p class="escondido imagemEscondido">${pedidos[i].image}</p>
       
        </li>

        `
    }

    ulPedidos.innerHTML += `
    </ul>
    </div>
    `
}

// CADASTRAR NOVO PEDIDO 

function cadastrarNovoPedido(){
    const referencia = document.querySelector("input").value;

    let novoPedido = {

        model: modelo,
        neck: gola,
        material: tecido,
        image: referencia,
        owner: nomeUser,
        author: nomeUser
    }


    console.log(novoPedido);
    const promise = axios.post(
        "https://mock-api.driven.com.br/api/v4/shirts-api/shirts", novoPedido
    );

   

    promise.then(confirmarPedido);
    promise.catch(alertarErro);
}

function confirmarPedido(){
    linkReferencia = document.querySelector('input').value;
    linkReferencia = "";
    alert("Pedido confirmado! :)")

    buscarPedidos();
}


// NA HORA DE PEGAR O PEDIDO - FAZER UMA OUTRA FUNÇÃO PARA VER OS PEDIDOS PRONTOS
// modeloGola = resposta1.data[i].neck 

function alertarErro(error){
    console.log(error.response.status);

    if (error.response.status === 422) {
        alert("Ops, não conseguimos processar sua encomenda. Verifique todos os campos do pedido.");
    }
}

function confirmar(elemento){

    console.log(elemento);

 let confirmarPedidoCard = confirm("Deseja pedir esse produto?");
 if (confirmarPedidoCard){
          enviarPedidoCard();
         }
 }

function enviarPedidoCard(){

const modeloCard = document.querySelector(".modeloEscondido").innerHTML;
const golaCard = document.querySelector(".golaEscondido").innerHTML;
const tecidoCard = document.querySelector(".tecidoEscondido").innerHTML;
const imagemCard = document.querySelector(".imagemEscondido").innerHTML;
const ownerCard = document.querySelector(".criadorEscondido").innerHTML;
const authorCard = document.querySelector(".criadorEscondido").innerHTML;

let pedidoCard = {

    model: modeloCard,
    neck: golaCard,
    material: tecidoCard,
    image: imagemCard,
    owner: ownerCard,
    author: authorCard,
}

//     const promise = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", objetoPedidoCard);

//     promise.then(alert("Pedido Confirmado!"))
//     promise.catch(alert("Não foi possível processar o seu pedido :("))


console.log(pedidoCard);
    const promise = axios.post(
        "https://mock-api.driven.com.br/api/v4/shirts-api/shirts", pedidoCard
    );

    promise.then(alert("Pedido confirmado! :)"));
    promise.catch(alertarErro);
 }

