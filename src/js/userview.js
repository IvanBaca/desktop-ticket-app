const conn = require('./../../db-connection');

const nameasc = document.getElementById("NombreASC");
const namedes = document.getElementById("NombreDES");
const discountasc = document.getElementById("DescuentoASC");
const discountdes = document.getElementById("DescuentoDES");
const dateasc = document.getElementById("FechaASC");
const datedes = document.getElementById("FechaDES");


async function insertarCoupones(valus){
    document.getElementById("kupon").innerHTML +=
    '<div class="col text-center d-flex justify-content-center pt-3">'+
    '<div class="card" style="width: 18rem;">'+    
      '<div class="card-body">'+
       '<h5 class="card-title">'+ valus.title +'</h5>'+
        '<p class="card-text">'+ valus.discountPercentage +'</p>'+
      '</div>'+
      '<ul class="list-group list-group-flush">'+
        '<li class="list-group-item">'+ valus.info +'</li>'+
        '<li class="list-group-item">'+ valus.restrictions +'</li>'+
        '<li class="list-group-item">'+ valus.expiration +'</li>'+
      '</ul>'+
    '</div>'+
  '</div>';
}


async function bydateasc(){
    document.getElementById("kupon").innerHTML = '';
    var values = await conn.generalQuey("select * from coupons order by expiration asc");
    values.forEach(function(e){
        insertarCoupones(e);
    });
}

async function bydatedes(){
    document.getElementById("kupon").innerHTML = '';
    var values = await conn.generalQuey("select * from coupons order by expiration desc");
    values.forEach(function(e){
        insertarCoupones(e);
    });
}

async function bydiscountasc(){
    document.getElementById("kupon").innerHTML = '';
    var values = await conn.generalQuey("select * from coupons order by discountPercentage asc");
    values.forEach(function(e){
        insertarCoupones(e);
    });
}

async function bydiscountdes(){
    document.getElementById("kupon").innerHTML = '';
    var values = await conn.generalQuey("select * from coupons order by discountPercentage desc");
    values.forEach(function(e){
        insertarCoupones(e);
    });
}

async function bynameasc(){
    document.getElementById("kupon").innerHTML = '';
    var values = await conn.generalQuey("select * from coupons order by title asc");
    values.forEach(function(e){
        insertarCoupones(e);
    });
}

async function bynamedes(){
    document.getElementById("kupon").innerHTML = '';
    var values = await conn.generalQuey("select * from coupons order by title desc");
    values.forEach(function(e){
        insertarCoupones(e);
    });
}



dateasc.addEventListener("click", bydateasc);
datedes.addEventListener("click", bydatedes);
discountasc.addEventListener("click", bydiscountasc);
discountdes.addEventListener("click", bydiscountdes);
nameasc.addEventListener("click", bynameasc);
namedes.addEventListener("click", bynamedes);











