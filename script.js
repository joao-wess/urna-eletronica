//manipulaçao elementos da tela
let seuVotoPara = document.querySelector(".divisao-superior-esquerda-1 p")
let cargo = document.querySelector(".divisao-superior-esquerda-2 p")
let descricao = document.querySelector(".divisao-superior-esquerda-descricao")
let aviso = document.querySelector(".divisao-inferior")
let lateral = document.querySelector(".divisao-superior-direita")
let numerosRecebidos = document.querySelector(".divisao-superior-esquerda-numeros")

//variáveis ambiente
let etapaAtual = 0
let numerosCaixa = ""
let votoBranco = false

//começo da votação
function comecarEtapa(){
  let etapaEmProcesso = etapas[etapaAtual]

  numerosCaixa = ""
  let numeroHtml = ""

  for(let i=0; i<etapaEmProcesso.numeros; i++){
    if(i === 0){
      numeroHtml+=`<div class="numero pisca">
      </div>`
    } else {
      numeroHtml+= `<div class="numero">
      </div>`
    }
  }

  seuVotoPara.style.display = "none"
  cargo.innerHTML = etapaEmProcesso.titulo;
  descricao.innerHTML = "";
  aviso.style.display = "none"
  lateral.innerHTML = ""
  numerosRecebidos.innerHTML = numeroHtml
};



//atualizaçao
function atualizarInterface(){
  let etapaEmProcesso = etapas[etapaAtual]

  let candidato = etapaEmProcesso.candidatos.filter((item)=>{
    if(item.numero === numerosCaixa){
      return true
    } else{
      return false
    }
  })

  if(candidato.length > 0){
    candidato = candidato[0]
    seuVotoPara.style.display = "block"
    aviso.style.display = "block"
    descricao.innerHTML = `Nome: ${candidato.nome} <br/> Partido: ${candidato.partido}`

    let fotosCandidato = "";
    for(let i in candidato.fotos){
      if(candidato.fotos[i].small){
        fotosCandidato += `<div class="divisao-superior-direita"> <img name="vice-prefeito" class="divisao-superior-direita-img small" src="img/${candidato.fotos[i].url}">
        <label for="vice-prefeito">${candidato.fotos[i].legenda}</label>
      </div>`
      } else {
      fotosCandidato+=`<div class="divisao-superior-direita"> <img class="divisao-superior-direita-img" src="img/${candidato.fotos[i].url}"> <label for="vereador1">${candidato.fotos[i].legenda}</label>`
      }
    }
    lateral.innerHTML = fotosCandidato

  } else {
    seuVotoPara.style.display = "block"
    aviso.style.display = "block"
    descricao.innerHTML = `<div class="voto-grande pisca"> VOTO NULO </div>`
  }

};





//funçoes de clique nos botões
function clicou(numeroDigitado){
  let elementoNumeroDigitado = document.querySelector(".numero.pisca")
  console.log(elementoNumeroDigitado)

  if(elementoNumeroDigitado !== null){
    elementoNumeroDigitado.innerHTML = numeroDigitado
    numerosCaixa += numeroDigitado
  }

  elementoNumeroDigitado.classList.remove("pisca")
  if(elementoNumeroDigitado.nextElementSibling !== null){
    elementoNumeroDigitado.nextElementSibling.classList.add("pisca")
  } else {
    atualizarInterface()
  }

};

function branco(){
  votoBranco = true
  etapaEmProcesso = etapas[etapaAtual]
  seuVotoPara.style.display = "block";
  cargo.innerHTML = etapaEmProcesso.titulo
  numerosRecebidos.innerHTML = ""
  descricao.innerHTML = `<div class="voto-grande pisca">VOTO EM BRANCO</div>` 
  aviso.style.display = "block"
  lateral.innerHTML = ""
};

function corrige(){
  comecarEtapa()
};

function confirma(){
  etapaEmProcesso = etapas[etapaAtual]

  let votoConfirmado = false

  if(votoBranco === true){
    votoConfirmado = true
  } else if(numerosCaixa.length === etapaEmProcesso.numeros){
    votoConfirmado = true
  }

  if(votoConfirmado){
    etapaAtual++
    if(etapas[etapaAtual] !== undefined){
      comecarEtapa()
    } else {
      document.querySelector(".tela").innerHTML = `<div class="voto-gigante pisca">FIM</div>`
    }
  }

};

comecarEtapa()