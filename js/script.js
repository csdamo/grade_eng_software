window.onload = function () {

  const curso = document.getElementById("nome_curso");
  const duracao = document.getElementById("duracao");
  const horario = document.getElementById("carga_horaria");
  const codigo = document.getElementById("cod_curso");

  curso.innerHTML = jsonData.CURSO;
  duracao.innerHTML = jsonData.DURACAO;
  horario.innerHTML = jsonData.CARGA_HORARIA;
  codigo.innerHTML = jsonData.CODIGO_DO_CURSO;

  let linha = "";
  let tabela = document.getElementById("id_tbody");
  for (var i = 0; i < jsonData.DISCIPLINAS.length; i++) {

    let semestrePar = (parseInt(jsonData.DISCIPLINAS[i].SEMESTRE) % 2 == 0);

    let classe = (semestrePar ? 'semestre-par' : 'semestre-impar');

    linha += "<tr class=\"" + classe + " linha_tabela\" data-toggle='modal' data-target='#modal-disciplina' onclick='abrirModal(" + JSON.stringify(jsonData.DISCIPLINAS[i]) + ")'> \
        <th scope=\"row\">" + jsonData.DISCIPLINAS[i].CODIGO + "</th> \
        <td>" + jsonData.DISCIPLINAS[i].SEMESTRE + "</td> \
        <td>" + jsonData.DISCIPLINAS[i].DISCIPLINA + "</td> \
        <td>" + jsonData.DISCIPLINAS[i].HORAS + "</td> \
      </tr>\n"
  }

  tabela.innerHTML = linha;

};

function abrirModal(disciplina) {

  //console.log(disciplina);

  const titulo = document.getElementById("titulo-disciplina");
  const nome = document.getElementById("nome-disciplina");
  const descricao = document.getElementById("descricao-disciplina");
  const info = document.getElementById("info-disciplina");

  let modalidade = disciplina.NAT == "FBP" || disciplina.NAT == "FEP" ? "presencial" : "à distância";

  titulo.innerHTML = disciplina.CODIGO;
  nome.innerHTML = disciplina.DISCIPLINA;
  descricao.innerHTML = !!disciplina.EMENTA ? disciplina.EMENTA : "";
  info.innerHTML = disciplina.SEMESTRE + "º Semestre - Modalidade " + modalidade + " - Duração " + disciplina.HORAS + " horas";

  if (!!disciplina.PREREQUISITOS) {

    let req = disciplina.PREREQUISITOS.toString();
    let arrReq = req.split(", ");

    arrReq.map((item, index) => {

      adicionaPreRequisitos(jsonData.DISCIPLINAS[item], index);
      removePreRequisitos(index);

    })

  }
}

function adicionaPreRequisitos(requisito, index) {

  let lista = document.getElementById('lista-pre-req');
  let card = document.getElementById("pre-requisito-0");
  let body = document.getElementById("body-pre-req-0");
  let titulo = document.getElementById("titulo-pre-req-0");
  let descricao = document.getElementById("descricao-pre-req-0");

  //Se tiver mais que um Pre requisito, faz uma copia dos elementos do primeiro
  if (index > 0) {

    card = card.cloneNode(false);
    body = body.cloneNode(false);
    titulo = titulo.cloneNode(false);
    descricao = descricao.cloneNode(false);

    lista.appendChild(card); // Elemento pai dos requisitos
    card.appendChild(body);
    body.appendChild(titulo);
    body.appendChild(descricao);

  }

  card.id = "pre-requisito-" + index;
  body.id = "body-pre-req-" + index;
  titulo.id = "titulo-pre-req-" + index;
  descricao.id = "descricao-pre-req-" + index;

  card.classList.remove("d-none");
  titulo.innerHTML = requisito.CODIGO;
  descricao.innerHTML = requisito.DISCIPLINA;

}

function removePreRequisitos(index){

  $("#modal-disciplina").on("hidden.bs.modal", function () {
  
    let card = document.getElementById("pre-requisito-" + index);
    index == 0 ? card.classList.add("d-none") : card.remove();

  });

}