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

    linha += "<tr class=\"" + classe + "\" data-toggle='modal' data-target='#modal-disciplina' onclick='abrirModal(" + JSON.stringify(jsonData.DISCIPLINAS[i]) + ")'> \
        <th scope=\"row\">" + jsonData.DISCIPLINAS[i].CODIGO + "</th> \
        <td>" + jsonData.DISCIPLINAS[i].SEMESTRE + "</td> \
        <td>" + jsonData.DISCIPLINAS[i].DISCIPLINA + "</td> \
        <td>" + jsonData.DISCIPLINAS[i].HORAS + "</td> \
      </tr>\n"
  }

  tabela.innerHTML = linha;

};

function abrirModal(disciplina){

  console.log(disciplina);
  
  const modal = document.getElementById("modal-disciplina");
  const titulo = document.getElementById("titulo-disciplina");
  const nome = document.getElementById("nome-disciplina");
  const descricao = document.getElementById("descricao-disciplina");
  const info = document.getElementById("info-disciplina");

  let modalidade = disciplina.NAT == "FBP" || disciplina.NAT == "FEP" ? "presencial" : "à distância";

  titulo.innerHTML = disciplina.CODIGO;
  nome.innerHTML = disciplina.DISCIPLINA;
  descricao.innerHTML = disciplina.EMENTA;
  info.innerHTML = disciplina.SEMESTRE + "º Semestre - Modalidade " + modalidade + " - Duração " + disciplina.HORAS + " horas";

  console.log('Abriu disciplina >.<', disciplina);
}
