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
  var turno;
  var turnoDificultad; //Guarda el número de turnos de la dificultad seleccionada para traerlo al tocar "reiniciar"
  var puntos = 0;

/////////////////////////////////FUNCIONES////////////////////////////////////////////

//Función que esconde tablero e instrucciones al entrar a la página 
function hideTodo(){
	$("#hideme").hide();
};

//Función que carga el nombre del/lx jugador
 function cargaDatos() {
   var nombre = $("#nombre").val();
    if(nombre != "") {
      $("#inicio").hide();
      var jugador = "<p>Jugador/x actual: "+nombre+"</p>";    
      $("#jugadorActual").append(jugador);
      $('.hide').removeClass('hide');
      $("#hideme").show();
      $("#error").text("");
    }else{
      $("#error").text("Ingresá tu nombre");
  }
};

//Función que carga la dificultad seleccionada
function selectDificultad(){
	var opcion = $('#dificultad :selected').val();
	switch(opcion){
		case "Principiante": console.log("Uno"); 
 												 turno = 18;			
												 break;

		case "Intermedio": console.log("Dos"); 
											 turno = 12;
											 break;
		case "Experto": console.log("Tres"); 
										turno = 8;
										break;
	};
turnoDificultad = turno;
$("#contador").text(turno);
}

//Función que mezcla las fichas 
function mezclar(){
    for(i=0; i<fichas.length; i++){
      var random= Math.floor(Math.random()*fichas.length);
      var slot=fichas[i]; 
      fichas[i]=fichas[random];
      fichas[random]=slot; 
    }
}

//Función que reparte las fichas creando dinámicamente los figs e img en el tablero

function repartir() {
for(i=0;i<fichas.length;i++){
var img ='<figure class="slotficha"><img id="'+fichas[i].nombre+'" class="reverso" src="'+fichas[i].img+'" data-valor="'+fichas[i].valor+'" draggable="false"/></figure>';
var tile = $("#tile"+i);
tile.append(img);
}
console.log("repartido");
}

//Función que resetea valores y rehace mezcla/reparto al clickear "reiniciar" 
function reiniciar() {
  turno = turnoDificultad;
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
      controlNombre.splice(0,1);
      
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
    $(".lock").removeClass("reverso");
    
    //compara    
    if(par[0]===par[1]) {
    	rebotar();
      setTimeout(win, 1000);
        
    }else{
      setTimeout(lose, 1000);
    } 
}

//Función que se activa si acierto el par
function win(){
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

function rebotar() {
	$("#"+controlNombre[0]).parent().effect('bounce', {distance: -20}, "slow");
 	$("#"+controlNombre[1]).parent().effect('bounce', {distance: -20}, "slow");
 	$(".anverso").addClass("win");
  $(".win").removeClass("anverso"); 
};

function imagenesDificultad() {
var imagenes = [
{
	nombre:"Principiante",
	img: "principiante.jpg",
	alt: "Perro hipster principiante"
},
{
	nombre:"Intermedio",
	img: "intermedio.jpg",
	alt: "Perro hipster intermedio"
},
{
	nombre:"Experto",
	img: "experto.jpg",
	alt: "Perro hipster experto"
},
];

var opcion = $('#dificultad :selected').val();
	$.each(imagenes, function(key,value){
		if(opcion == value.nombre){
			$('#imgdificultad').children().remove();
			var imagenDificultad = `<img src=img/Niveles/${value.img} alt="${value.alt}">`;
			$('#imgdificultad').append(imagenDificultad); 
		}
	}
	)
}


/////////////////////////////LLAMADAS A FUNCIONES////////////////////////////////
hideTodo();
$("#dificultad").on("change", imagenesDificultad);
$("#comenzar").on("click", selectDificultad);
$("#comenzar").on("click", cargaDatos);
mezclar();
repartir();
$(document).on("click", ".reverso", gameplay);
$('#reinicio').on('click', reiniciar);
