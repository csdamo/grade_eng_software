window.onload = function(){


    titulo = document.getElementById("nome_curso");
    titulo.innerHTML = jsonData.CURSO;

    var linha = "";
    var tabela = document.getElementById("id_tbody");
    for (var j = 0; j < jsonData.DISCIPLINAS.length; j++){
      //disciplinas += "<li>" + jsonData.DISCIPLINAS[j].CODIGO + "</li>\n";

      var semestrePar =  (parseInt(jsonData.DISCIPLINAS[j].SEMESTRE) % 2 == 0);

      var classe = (semestrePar ? 'semestre-par' : 'semestre-impar');

      linha += "<tr class=\"" + classe + "\"> \
        <th scope=\"row\">" + jsonData.DISCIPLINAS[j].CODIGO + "</th> \
        <td>" + jsonData.DISCIPLINAS[j].SEMESTRE + "</td> \
        <td>" + jsonData.DISCIPLINAS[j].DISCIPLINA + "</td> \
        <td>" + jsonData.DISCIPLINAS[j].HORAS + "</td> \
      </tr>\n"
    }
    
    tabela.innerHTML = linha;

    //lista = document.getElementById("disciplinas");
    //lista.innerHTML = disciplinas;
    
  };
