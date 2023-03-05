document.querySelector("#loginform").style.display = 'none';
document.querySelector("#signinform").style.display = 'none';

function showHideLog(){
    if(document.cookie == ""){
        document.cookie = "logged=false";
    }
    if(document.cookie == "logged=true"){
        document.querySelector("#login").parentElement.remove();
        document.querySelector("#sigin").parentElement.remove();
        document.querySelector("#loginn").remove();
        document.querySelector("#siginn").remove();
        document.querySelector("#profile").style.display = 'inline-flex';
        document.querySelector("#profilee").style.display = 'inline-flex';
    }
}
showHideLog();

function loadSignInForm(){
    if(document.querySelector("#paymentform")){
        document.querySelector("#paymentform").style.display = 'none';
    }
    document.querySelector("#loginform").style.display = 'none';
    var form = document.querySelector("#signinform");
    form.style.display = ((form.style.display == 'none') ? 'flex' : 'none');
}

function loadLogInForm(){
    if(document.querySelector("#paymentform")){
        document.querySelector("#paymentform").style.display = 'none';
    }
    document.querySelector("#signinform").style.display = 'none';
    var form = document.querySelector("#loginform");
    form.style.display = ((form.style.display == 'none') ? 'flex' : 'none');
}