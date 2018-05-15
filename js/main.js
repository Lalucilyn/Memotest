console.log("cargado");
/////////////////////////////////VARIABLES//////////////////////////////////////////
var fichas = [{ nombre:0, 
                valor:0, 
                img:'img/fichas/ficha1.jpg'
              },
              {
                nombre:1, 
                valor:0, 
                img:'img/fichas/ficha1.jpg'
              },
              {
                nombre:2, 
                valor:1, 
                img:'img/fichas/ficha2.jpg'
              },
              {
                nombre:3, 
                valor:1, 
                img:'img/fichas/ficha2.jpg'
              },
              { 
                nombre:4, 
                valor:2, 
                img:'img/fichas/ficha3.jpg'
              },
              { 
                nombre:5, 
                valor:2, 
                img:'img/fichas/ficha3.jpg'
              },
              {
                nombre:6, 
                valor:3, 
                img:'img/fichas/ficha4.jpg'
              },
              {
                nombre:7, 
                valor:3, 
                img:'img/fichas/ficha4.jpg'
              },
              {
                nombre:8, 
                valor:4, 
                img:'img/fichas/ficha5.jpg'
              },
              { 
                nombre:9, 
                valor:4, 
                img:'img/fichas/ficha5.jpg'
              },
              { 
                nombre:10, 
                valor:5, 
                img:'img/fichas/ficha6.jpg'
              },
              {
                nombre:11, 
                valor:5, 
                img:'img/fichas/ficha6.jpg'
              },
              ];

  var par = []; //traerá los valores de cada ficha. Las cartas iguales tienen igual valor
  var controlNombre = []; //traerá los nombres de cada ficha. Cada ficha tiene un nombre único
  var turno = 24;
  var puntos = 0;

/////////////////////////////////FUNCIONES////////////////////////////////////////////

//Función para que el jugador ponga su nombre
 function cargaNombre() {
  var nombre = $("#nombre").val();
    if(nombre != "") {
      $("#nombre").hide();
      $("#nombre").prev().hide();
      $(this).hide();
      var jugador = "<p id='player'>Jugador/x actual: "+nombre+"<span id='editar' class='ion-edit icono'></span></p>"    
      $("form").append(jugador);
      $("#error").text("")
    }else{
      $("#error").text("Ingresá tu nombre");
  }
}

//Función para editar o cambiar el nombre
function editaNombre() {
  $("#nombre").show();
  $("#nombre").prev().show();
  $("#ingreso").show();
  $("#player").remove();
  $(this).remove();  
}


//Función que mezcla las fichas 
function mezclar(){
    for(i=0; i<fichas.length; i++){
      var random= Math.floor(Math.random()*fichas.length);
      var slot=fichas[i] 
      fichas[i]=fichas[random]
      fichas[random]=slot 
    }
}

//Función que reparte las fichas creando dinámicamente los figs e img en el tablero

function repartir() {
for(i=0;i<fichas.length;i++){
var img ='<figure class="slotficha"><img id="'+fichas[i].nombre+'" class="reverso" src="'+fichas[i].img+'" data-valor="'+fichas[i].valor+'" draggable="false"/></figure>'
var tile = $("#tile"+i)
tile.append(img);
}
console.log("repartido")
}

//Función que resetea valores y rehace mezcla/reparto al clickear "reiniciar" 
function reiniciar() {
  turno = 24;
  puntos = 0;
  par = [];
  controlNombre = [];
  $("#tablero").children().show();
  $("#contador").text(turno);
  $('.tile').children().remove();
  $(".result").remove()
  mezclar();
  repartir();

}

//Función Gameplay (se activa al clickear una ficha)
 function gameplay() {
  //doy vuelta las fichas y mando sus valores a los arrays
  $(this).addClass("anverso");
  $(this).removeClass("reverso");
  par.push($(this).data("valor"));
  controlNombre.push($(this).attr('id'));

    //Condicional que se dispara cuando hice click en dos fichas
    if(par.length===2) {
    
      //Controlo no haber clickeado dos veces la misma ficha
      if(controlNombre[0]===controlNombre[1]){
      
      par.splice(0,1);
      controlNombre.splice(0,1)
      
      //Entro a la comparación
      }else{
        comparar();
      }
    }
}

//Función que compara las fichas y llama las funciones win/lose según corresponda        
function comparar() {
    //traba las fichas para que no pueda seguir dándolas vuelta durante la comparación
    $(".reverso").addClass("lock");
    $(".lock").removeClass("reverso")
    
    //compara    
    if(par[0]===par[1]) {
      console.log("yay");
      setTimeout(win, 1000)
        
    }else{
      console.log("nay");
      setTimeout(lose, 1000)
    } 
}

//Función que se activa si acierto el par
function win(){
  $(".anverso").addClass("win");
  $(".win").removeClass("anverso"); 
  $("#"+controlNombre[0]).off('click');
  $("#"+controlNombre[1]).off('click');
  $(".lock").addClass("reverso");
  $(".reverso").removeClass("lock");
  par=[];
  controlNombre=[];
  puntos++;

  //Si fue el último par, se muestra pantalla ganadora
  if(puntos===6) {
    $(".tile").children().remove();
    $("#tablero").children().hide();
    var win = `<div class="result"><figure><img src="img/ganador.gif" alt="gato celebratorio"/></figure><h2>¡Felicidades! ¡Has ganado!</h2><h5>¡¡¡¡Presiona "reiniciar" para jugar de nuevo!!!!</h5></div>`;
    $("#tablero").append(win);  
  }
}

//Función que se activa si no acierto el par
function lose() {
  $(".anverso").addClass("reverso");
  $(".reverso").removeClass("anverso");
  $(".lock").addClass("reverso");
  $(".reverso").removeClass("lock");
  par=[];
  controlNombre=[];
  turno--;
  $("#contador").text(turno);

  //Si fue el último turno, se muestra pantalla perdedora 
  if(turno===0) {
    $(".tile").children().remove();
    $("#tablero").children().hide();
    var lost = `<div class="result"><figure><img src="img/losecat.jpg" alt="gato triste"/></figure><h2>¡Lo sentimos! ¡Has perdido!</h2><h5>¡¡¡¡Presiona "reiniciar" para jugar de nuevo!!!!</h5></div>`;
    $("#tablero").append(lost);  
  }
}

/////////////////////////////LLAMADAS A FUNCIONES////////////////////////////////
$("#ingreso").on("click", cargaNombre);
$(document).on("click", "#editar", editaNombre);
mezclar();
repartir();
$(document).on("click", ".reverso", gameplay);
$('#reinicio').on('click', reiniciar);