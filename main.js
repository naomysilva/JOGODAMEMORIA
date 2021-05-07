const tabuleiro = document.getElementById('tabuleiro');
const imagens = [
    'arianagrande.jpg',
    'beyonce.jpg',
    'brtiney.jpg',
    'ladygaga.jpg',
    'rihanna.jpg',
    'liniker.jpg'
];

let codigoHTML = "";

imagens.forEach(img => {
    codigoHTML += `<div  class="memory-card" data-carta="${img}">
    <img  class="frente-carta" src="imagens/${img}"/>
    <img class="fundo-carta" src="imagens/fundo.jpg">
  </div>`;
});

tabuleiro.innerHTML = codigoHTML + codigoHTML;

const cartas = document.querySelectorAll(".memory-card")
let primeira, segunda;
let bloqueio = false;

function checar() {
    let ehIgual = primeira.dataset.carta == segunda.dataset.carta ? true : false;


    if (!ehIgual) {
        remover()
    } else if (ehIgual) {
        placar();
        reset(ehIgual);
    }

}

let i = 1;

function placar() {

    var contador = i++;

    if (contador == 6) {


        Swal.fire({
            title: 'PARABÉNS VOCÊ TEM UMA OTIMA MEMORIA',
            width: 600,
            padding: '3em',
            background: '#fff url(imagens/backgraund.jpg)',
            backdrop: `
                  rgba(0,0,123,0.4)
                  url("imagens/gatinho.gif")
                  left top
                  no-repeat
                `,


        })

    } else {

        Swal.fire(

            'Pontuação:' + contador,


        )
    }


};

function ExibirTelaInicial() {
    Swal.fire({
        title: 'BEM-VINDO AO JOGO DA MEMORIA DAS DIVAS, BOA SORTE',
        width: 600,
        padding: '3em',
        background: '#fff url(imagens/backgraund.jpg)',
        backdrop: `
              rgba(0,0,123,0.4)
              url("imagens/gatinho.gif")
              left top
              no-repeat
            `,


    })

};

Window.onload = ExibirTelaInicial();


function virar() {
    if (bloqueio) return false;
    this.classList.add("virar");

    if (!primeira) {
        primeira = this;
        primeira.removeEventListener('click', virar);
        return false;
    }

    segunda = this;

    checar()
}

(function aleatoria() {
    cartas.forEach(card => {
        let numero = Math.floor(Math.random() * 12)
        card.style.order = numero;
    });
})();

function remover() {
    bloqueio = true;
    setTimeout(() => {
        primeira.classList.remove("virar");
        primeira.addEventListener("click", virar)
        segunda.classList.remove("virar");
        bloqueio = false;
        primeira = null;
        segunda = null;
    }, 1000);
}

function reset(ehIgual) {
    primeira.removeEventListener('click', virar)
    segunda.removeEventListener('click', virar)
    bloqueio = false;
    primeira = null;
    segunda = null;
}


cartas.forEach(c => c.addEventListener('click', virar))