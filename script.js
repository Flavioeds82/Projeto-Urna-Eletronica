// VARIÁVEIS DE CONTROLE DA INTERFACE //
let seu_voto = document.querySelector('.tela-superior-esquerda-1 span');
let cargo = document.querySelector('.tela-superior-esquerda-2');
let desc = document.querySelector('.tela-superior-esquerda-desc');
let numeros = document.querySelector('.tela-superior-esquerda-numeros');
let lateral = document.querySelector('.tela-superior-direita');
let aviso = document.querySelector('.tela-inferior');
let etapaAtual = 0;
let digitados = '';
let validador = false;
let tamanho = etapas.length;
let votacao = [];

function iniciar(){
   let etapa = etapas[etapaAtual];
   let numeroHtml = organizaNumero(etapa);
   seu_voto.style.display ='none';
   cargo.innerHTML = etapa.titulo;
   desc.innerHTML = '';
   lateral.innerHTML = '';
   aviso.style.display = 'none';
   numeros.innerHTML = numeroHtml;
}

function organizaNumero(e){
   let num_html = '';
   for(let i=0; i < e.numeros; i++){
      if(i === 0){
         num_html += '<div class="numero pisca"></div>'
      }else{
         num_html += '<div class="numero"></div>'
      }
   };
   return num_html;
}

function update(){
   
   let candidato = achaCandidato();
   if(candidato !== null){
      seu_voto.style.display ='block';
      desc.innerHTML = `Nome: ${candidato.nome}<br> Partido: ${candidato.partido}<br> `;
      aviso.style.display = 'block';
      lateral.innerHTML = montaFoto(candidato.fotos);
      validador = true;
      votacao.push({
         etapa: etapas[etapaAtual].titulo,
         voto: candidato.nome

      });
   }else{
      seu_voto.style.display ='block';
      aviso.style.display = 'block';
      desc.innerHTML = '<div class="aviso-tela pisca">VOTO NULO</div>';
      validador = true;
      votacao.push({
         etapa: etapas[etapaAtual].titulo,
         voto: 'Nulo'

      });
   }
}
function montaFoto(c){
   let foto = ''
   for(let i of c){
      if(i.small === true){
         foto += `<div class="tela-superior-direita-img-2"><img src="images/${i.url}" alt="">${i.legenda}</div>`
         
      }else{
         foto += `<div class="tela-superior-direita-img-1"><img src="images/${i.url}" alt="">${i.legenda}</div>`
         
      }
      
   }
   return foto;
}

function achaCandidato(){
   let etapa = etapas[etapaAtual];
   for (let i in etapa.candidatos){
      if (etapa.candidatos[i].numero === digitados){
         return etapa.candidatos[i];
      }
   }
   return null;


}

function clicou(num){
   let n = document.querySelector('.numero.pisca');
   if (n !== null){
      n.innerHTML = num;
      digitados += num;
      n.classList.remove('pisca');
      if(n.nextElementSibling !== null){
         n.nextElementSibling.classList.add('pisca');
      }else{
         update();
      }
      
   }
}

function branco(){
      digitados = ''
      lateral.innerHTML = '';
      seu_voto.style.display ='block';
      aviso.style.display = 'block';
      numeros.innerHTML = '';
      desc.innerHTML = '<div class="aviso-tela pisca">VOTO EM BRANCO</div>';
      validador = true;
      votacao.push({
         etapa: etapas[etapaAtual].titulo,
         voto: 'Branco'

      });
   
}
function corrige(){
   numeros.innerHTML = '';
   digitados = '';
   validador = false;
   iniciar();
}
function confirma(){
   if(validador === true){
      etapaAtual ++;
      digitados = '';
      validador = false;
      if(etapaAtual === tamanho){
         document.querySelector('.tela').innerHTML = '<div class="aviso-fim pisca">FIM</div>';
         console.log(votacao)
         
      }else{
         iniciar();
      }
      
   }
}

iniciar();