const conn = require('./../../db-connection');
const Store = require('electron-store')
const store = new Store();

var formFields = document.getElementsByClassName("form-control");
var addTicketBtn = document.getElementById("addTicket");
var editTicketBtn = document.getElementById("editTicket");
var deleteTicketBtn = document.getElementById("deleteTicket");
var axellDisplay = document.getElementById("Axell");
var axellDelete = document.getElementById("AxellDelete");
var nameEmpty = "";
var name = "";
var infor = "";
var inforEmpty = "";
var restr = "";
var restrEmpty = "";
var fesha = "";
var feshaEmpty = "";
var porcen = "";
var porcenEmpty = "";
var borrar = "";

//Test
<<<<<<< Updated upstream
console.log(store.get("compId"));
=======
<<<<<<< HEAD
console.log(store.get("upId"));
=======
console.log(store.get("compId"));
>>>>>>> f6d5accbaa313b14fa5e86ebb02ba8b83b3e04d7
>>>>>>> Stashed changes

async function addTickets() {
    //Variable declaration
    let emptyFields = false;
    let ticketsInput = [];
    //Check for empty fields
    for (let i = 0; i < 5; i++) {
        ticketsInput.push(formFields[i].value);
        if(!!!formFields[i].value){
            emptyFields = true;
            break;
        } 
    }
    if (emptyFields) {
        alert("Inserte por favor todos los datos...");
    } else {
        //var compid = await conn.generalQuey("SELECT companyid from companies limit 1");
        var compid = store.get("upId");
        ticketsInput.push(compid);
        await conn.generalQuey("INSERT INTO coupons (title, info, restrictions, expiration, discountPercentage, companyid) VALUES (?,?,?,?,?,?)", ticketsInput);
        console.log(ticketsInput)
        //Screen clear
        for (let i = 0; i < 5; i++) {
            formFields[i].value = "";
        }
        alert("Su ticket se ha registrado");
    }
}

async function editTickets() {
    let ticketsEdit = [];
    name = formFields[5].value;
    infor = formFields[6].value;
    restr = formFields[7].value;
    fesha = formFields[8].value;
    porcen = formFields[9].value;

    if(formFields[5].value==""){
        name=nameEmpty;
    } else {
        name=formFields[5].value;
        formFields[5].value="";
    }
    ticketsEdit.push(name);

    if(formFields[6].value==""){
        infor=inforEmpty;
    } else {
        infor=formFields[6].value;
        formFields[6].value="";
    }
    ticketsEdit.push(infor);

    if(formFields[7].value==""){
        restr=restrEmpty;
    } else {
        restr=formFields[7].value;
        formFields[7].value="";
    }
    ticketsEdit.push(restr);

    if(formFields[8].value==""){
        fesha=feshaEmpty;
    } else {
        fesha=formFields[8].value;
        formFields[8].value="";
    }
    ticketsEdit.push(fesha);

    if(formFields[9].value==""){
        porcen=porcenEmpty;
    } else {
        porcen=formFields[9].value;
        formFields[9].value="";
    }
    ticketsEdit.push(porcen);
    ticketsEdit.push(nameEmpty);
    console.log(ticketsEdit);
    await conn.generalQuey("update coupons set title=?, info=?, restrictions=?, expiration=?, discountPercentage=? where title=?", ticketsEdit);
    alert("Su ticket ha sido Actualizado");
}

async function deleteTickets() {
    await conn.generalQuey("delete from coupons where title=?", borrar);
    alert("El ticket "+borrar+" se ha eliminado");
}

async function funcionVer(atsel) {
    let cupon=[];
    var perrito = document.getElementById(atsel);
    cupon=await conn.generalQuey("select * from coupons where title=?", perrito);
    console.log(await conn.generalQuey("select * from coupons"));
    document.getElementById("title").placeholder=cupon[0].title;
    document.getElementById("info").placeholder=cupon[0].info;
    document.getElementById("restrictions").placeholder=cupon[0].restrictions;
    document.getElementById("date").placeholder=cupon[0].expiration;
    document.getElementById("percentage").placeholder=cupon[0].discountPercentage;
}

async function nombre(){
    document.getElementById("Axell").innerHTML = '';
    document.getElementById("AxellDelete").innerHTML = '';
    var values = await conn.generalQuey("select * from coupons");
    values.forEach(function(e){
        insertarCoupones(e);
    });
}

async function insertarCoupones(valus){
    document.getElementById("Axell").innerHTML += '<option>'+valus.title+'</option>';
    document.getElementById("AxellDelete").innerHTML += '<option>'+valus.title+'</option>';
}

async function funcionXavier(){
    var selectBox = document.getElementById("Axell");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    let cupon=[];
    cupon=await conn.generalQuey("select * from coupons where title=?",selectedValue);
    document.getElementById("title").placeholder=cupon[0].title;
    document.getElementById("info").placeholder=cupon[0].info;
    document.getElementById("restrictions").placeholder=cupon[0].restrictions;
    document.getElementById("date").placeholder=cupon[0].expiration;
    document.getElementById("percentage").placeholder=cupon[0].discountPercentage;
    nameEmpty = cupon[0].title;
    console.log(nameEmpty);
    inforEmpty = cupon[0].info;
    restrEmpty = cupon[0].restrictions;
    feshaEmpty = cupon[0].expiration;
    porcenEmpty = cupon[0].discountPercentage;
}

async function funcionXavier1(){
    var selectBox = document.getElementById("AxellDelete");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    borrar = selectedValue;
}

addTicketBtn.addEventListener("click", addTickets);
editTicketBtn.addEventListener("click", editTickets);
deleteTicketBtn.addEventListener("click", deleteTickets);
axellDisplay.addEventListener("click",nombre);
axellDelete.addEventListener("click",nombre); 