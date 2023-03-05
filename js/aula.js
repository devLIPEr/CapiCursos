var aulas = {
    "CursoMatematica": {
        "aulas": ["Trigonometria", "Seno, Cosseno e Tangente"],
        "questoes": {
            "Trigonometria": [
                {"questao": "Lorem", "respostas": ["ipsum", "ypsum", "ipsun", "ypsun"], "corretas": [1, 0, 0, 0]},
                {"questao": "Loremm", "respostas": ["ipsum", "ypsum", "ipsun", "ypsun"], "corretas": [0, 1, 0, 0]}
            ],
            "Seno, Cosseno e Tangente": [
                
            ]
        },
        "videos": ["https://www.youtube.com/embed/dQw4w9WgXcQ", "https://www.youtube.com/embed/dQw4w9WgXcQ"]
    }
}

function selectAula(aula, curso){
    var titulo = aulas[curso]['aulas'][aula];
    var questoes = aulas[curso]['questoes'][titulo];
    var video = aulas[curso]['videos'][aula]
    return [titulo, questoes, video];
}

function goToAula(curso){
    window.location.href = window.location.href.split("cursos.html")[0] + "aula.html?c=" + curso;
}

function verify(aula, curso){
    var titulo = aulas[curso]['aulas'][aula];
    var questoes = aulas[curso]['questoes'][titulo];
    corretas = 0;
    total = 0;
    var k = 0;
    questoes.forEach(element => {
        var radios = document.getElementsByName('q'+k);
    
        for(var i = 0, length = radios.length; i < length; i++){
            if(radios[i].checked){
                if(element.corretas[i] == 1){
                    radios[i].parentElement.parentElement.style.backgroundColor = "#b0ffc7";
                    corretas++;
                }else{
                    radios[i].parentElement.parentElement.style.backgroundColor = "#ff8f8f";
                }
                total++;
                break;
            }
        }
        k++;
    });
}

var loaded = false;
function loadAula(aula){
    var curso = window.location.href.split("?c=")[1];
    if(document.cookie == "logged=true" && readLocalStorage('conta') && JSON.parse(readLocalStorage('conta'))['cursos'].includes(curso)){
        document.querySelector("title").innerHTML = "Aula - " + (aula+1) + " - " + cursos[curso]['name'];

        aulaInfo = selectAula(aula, curso);

        document.querySelector('.titulo').innerHTML = aulaInfo[0];

        if(!loaded){
            var divAulas = document.querySelector('.aulas');
            var i = 0;
            aulas[curso]['aulas'].forEach(element => {
                var h3 = document.createElement('h3');
                h3.innerHTML = element;
                h3.setAttribute('onclick', 'loadAula('+i+')')

                divAulas.appendChild(h3);
                i += 1;
            });
            loaded = true;
        }

        var divQuestoes = document.querySelector('.questoes');
        divQuestoes.innerHTML = "";
        var i = 0;
        aulaInfo[1].forEach(element => {
            divQuestoes.innerHTML += '<div class="questao"><h3>'+element['questao']+'</h3><div><input type="radio" id="'+element['questao']+'1" name="q'+i+'"><label for="'+element['questao']+'1">'+element['respostas'][0]+'</label></div><div><input type="radio" id="'+element['questao']+'2" name="q'+i+'"><label for="'+element['questao']+'2">'+element['respostas'][1]+'</label></div><div><input type="radio" id="'+element['questao']+'3" name="q'+i+'"><label for="'+element['questao']+'3">'+element['respostas'][2]+'</label></div><div><input type="radio" id="'+element['questao']+'4" name="q'+i+'"><label for="'+element['questao']+'4">'+element['respostas'][3]+'</label></div></div>';
            i += 1;
        });
        if(aulaInfo[1].length > 0){
            divQuestoes.innerHTML += '<button onclick="verify('+aula+", '"+window.location.href.split("?c=")[1]+"'"+')">Verificar</button>';
        }

        var iframe = document.querySelector('iframe');
        iframe.src = aulaInfo[2];
    }
}