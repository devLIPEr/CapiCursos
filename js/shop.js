function loadConta(){
    if(readLocalStorage('conta') && document.cookie == "logged=true"){
        var list = JSON.parse(readLocalStorage('conta'));
        var main = document.querySelector("main");

        list['cursos'].forEach(element => {
            var card = document.createElement("div");
            card.setAttribute('class', 'card');
            card.setAttribute('onclick', 'goToAula("'+element+'")');

            var img = document.createElement("img");
            img.setAttribute('src', cursos[element]['img']);
            img.setAttribute('alt', "Capa do "+cursos[element]['name']);

            var p = document.createElement("p");
            p.innerHTML = cursos[element]['name'];

            card.appendChild(img);
            card.appendChild(p);

            main.appendChild(card);
        });
    }
}

function addToConta(curso){
    if(readLocalStorage('conta')){
        var list = JSON.parse(readLocalStorage('conta'));
        list['cursos'].push(curso);
        saveInLocalStorage('conta', JSON.stringify(list));
    }else{
        var list = {'cursos': []};
        list['cursos'].push(curso);
        saveInLocalStorage('conta', JSON.stringify(list));
    }
}

function loadCart(){
    if(readLocalStorage('cart')){
        var list = JSON.parse(readLocalStorage('cart'));
        var aside = document.querySelector("#cursos");
        var i = 0;
        list['cursos'].forEach(element => {
            var divCurso = document.createElement("div");
            divCurso.setAttribute('class', 'curso');

            var divInfo = document.createElement("div");
            divInfo.setAttribute('class', 'info');

            var img = document.createElement('img');
            img.setAttribute('src', cursos[element]['img']);
            img.setAttribute('alt', "Capa do "+cursos[element]['name']);

            var div = document.createElement("div");
            var h2 = document.createElement("h2");
            h2.innerHTML = cursos[element]['name'];
            var h4 = document.createElement("h4");
            h4.innerHTML = "R$ "+(parseFloat(cursos[element]['price'].replace(',', '.'))*list['prices'][list['cursos'].indexOf(element)]).toString().replace('.', ',');
            
            var divInputs = document.createElement("div");
            divInputs.setAttribute('class', 'inputs');
            
            // var input = document.createElement("input");
            // input.setAttribute('type', 'number');
            // input.setAttribute('value', '1');
            // input.setAttribute('min', '1');
            // input.setAttribute('onchange', 'calcPrice("'+i+'", "'+element+'")');
            // input.setAttribute('id', 'number'+i);

            var button = document.createElement("button");
            button.setAttribute('onclick', 'removeFromPage("'+i+'", "'+element+'")');
            button.innerHTML = 'X';
            button.setAttribute('id', 'number'+i);

            // divInputs.appendChild(input);
            divInputs.appendChild(button);

            div.appendChild(h2);
            div.appendChild(h4);

            divInfo.appendChild(img);
            divInfo.appendChild(div);

            divCurso.appendChild(divInfo);
            divCurso.appendChild(divInputs);

            aside.appendChild(divCurso);
            calcPrice(i, element);
            i++;
        });
    }
}

function removeFromCart(curso){
    if(readLocalStorage('cart')){
        var list = JSON.parse(readLocalStorage('cart'));
        var i = list['cursos'].indexOf(curso);
        list['cursos'].splice(i, 1);
        list['prices'].splice(i, 1);
        saveInLocalStorage('cart', JSON.stringify(list));
    }
}

var discounts = [1, 0.472579, 0.472579, 0.479158]
function addToCart(curso, type = 0){
    if(document.querySelector("#price")){
        document.querySelector("#price").style.cursor = 'not-allowed';
        var funcClick = document.querySelector("#price").attributes.onclick.value;
        document.querySelector("#price").setAttribute('onclick', '');
        function setPointer(){
            document.querySelector("#price").style.cursor = 'pointer';
            document.querySelector("#price").setAttribute('onclick', funcClick);
        };
        setTimeout(setPointer, 200);
    }
    if(readLocalStorage('cart')){
        var list = JSON.parse(readLocalStorage('cart'));
        list['cursos'].push(curso);
        list['prices'][list['cursos'].length-1] = discounts[type];
        saveInLocalStorage('cart', JSON.stringify(list));
    }else{
        var list = {'cursos': [], 'prices': []};
        list['cursos'].push(curso);
        list['prices'][list['cursos'].length-1] = discounts[type];
        saveInLocalStorage('cart', JSON.stringify(list));
    }
}

function saveInLocalStorage(key, value){
    localStorage.setItem(key, value);
}

function readLocalStorage(key) {
    return localStorage.getItem(key);
}