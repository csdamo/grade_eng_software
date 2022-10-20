window.onload = function () {


  var titulo = document.getElementById("nome_curso");
  titulo.innerHTML = jsonData.CURSO;

  var titulo = document.getElementById("duracao");
  titulo.innerHTML = jsonData.DURACAO;

  var titulo = document.getElementById("carga_horaria");
  titulo.innerHTML = jsonData.CARGA_HORARIA;

  var titulo = document.getElementById("cod_curso");
  titulo.innerHTML = jsonData.CODIGO_DO_CURSO;

  var linha = "";
  var tabela = document.getElementById("id_tbody");
  for (var j = 0; j < jsonData.DISCIPLINAS.length; j++) {

    var semestrePar = (parseInt(jsonData.DISCIPLINAS[j].SEMESTRE) % 2 == 0);

    var classe = (semestrePar ? 'semestre-par' : 'semestre-impar');

    linha += "<tr class=\"" + classe + "\" data-toggle='modal' data-target='#modal-disciplina' onclick='abrirModal(" + JSON.stringify(jsonData.DISCIPLINAS[j]) + ")'> \
        <th scope=\"row\">" + jsonData.DISCIPLINAS[j].CODIGO + "</th> \
        <td>" + jsonData.DISCIPLINAS[j].SEMESTRE + "</td> \
        <td>" + jsonData.DISCIPLINAS[j].DISCIPLINA + "</td> \
        <td>" + jsonData.DISCIPLINAS[j].HORAS + "</td> \
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
