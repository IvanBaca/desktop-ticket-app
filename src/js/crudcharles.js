const conn = require('./../../db-connection');
const Store = require('electron-store')
const store = new Store();

var formFields = document.getElementsByClassName("form-control");
var addTicketBtn = document.getElementById("addTicket");
var editTicketBtn = document.getElementById("editTicket");
var deleteTicketBtn = document.getElementById("deleteTicket");
var axellDisplay = document.getElementById("Axell");
var axellDelete = document.getElementById("AxellDelete");
var borrar = "";

//Test
//console.log(store.get("upId"));

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
        alert("Meta los datos pinche perro!!!");
        return;
    } else {
        var compid = await conn.generalQuey("SELECT companyid from companies limit 1");
        ticketsInput.push(compid[0].companyid);
        await conn.generalQuey("INSERT INTO coupons (title, info, restrictions, expiration, discountPercentage, companyid) VALUES (?,?,?,?,?,?)", ticketsInput);
        console.log(ticketsInput)
        //Screen clear
        for (let i = 0; i < 5; i++) {
            formFields[i].value = "";
        }
        alert("Registro correcto JOTO!!!");
    }
}

async function editTickets() {
    //Variable declaration
    let emptyFields = false;
    let ticketsEdit = [];
    //Check for empty fields
    for (let i = 5; i < 10; i++) {
        ticketsEdit.push(formFields[i].value);
        if(!!!formFields[i].value){
            emptyFields = true;
            break;
        } 
    }
    if (emptyFields) {
        alert("Pos meta info pendejo!!!");
        return;
    } else {
        var compid = await conn.generalQuey("SELECT companyid from companies limit 1");
        ticketsEdit.push(compid[0].companyid);
        await conn.generalQuey("update coupons set title=?, info=?, restrictions=?, expiration=?, discountPercentage=?, companyid=? where couponid='9'", ticketsEdit);
        console.log(ticketsEdit);
        alert("Modificación correcta!!!");
    }
}

async function deleteTickets() {
    //Variable declaration
    console.log(borrar);
    await conn.generalQuey("delete from coupons where title=?", borrar);
    alert("A chingar su madre el Ticket");
}

async function funcionVer(atsel) {
    let cupon=[];
    var perrito = document.getElementById(atsel);
    console.log(perrito);
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
    console.log(selectedValue);
    console.log("Test");
    cupon=await conn.generalQuey("select * from coupons where title=?",selectedValue);
    document.getElementById("title").placeholder=cupon[0].title;
    document.getElementById("info").placeholder=cupon[0].info;
    document.getElementById("restrictions").placeholder=cupon[0].restrictions;
    document.getElementById("date").placeholder=cupon[0].expiration;
    document.getElementById("percentage").placeholder=cupon[0].discountPercentage;
}

async function funcionXavier1(){
    var selectBox = document.getElementById("AxellDelete");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    borrar = selectedValue;
    console.log(borrar);
}

addTicketBtn.addEventListener("click", addTickets);
editTicketBtn.addEventListener("click", editTickets);
deleteTicketBtn.addEventListener("click", deleteTickets);
axellDisplay.addEventListener("click",nombre);
axellDelete.addEventListener("click",nombre); 