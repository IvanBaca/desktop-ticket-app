const conn = require('./../../db-connection');

var formFields = document.getElementsByClassName("form-control");
var addTicketBtn = document.getElementById("addTicket");
var editTicketBtn = document.getElementById("editTicket");
var deleteTicketBtn = document.getElementById("deleteTicket");

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
    let emptyFields = true;
    let ticketsDelete = [];
    if (emptyFields==false) {
        alert("Qué borro pendejo???");
        return;
    } else {
        //var compid = await conn.generalQuey("SELECT companyid from companies limit 1");
        ticketsDelete.push(4);
        //await conn.generalQuey("delete from coupons where couponid='?'", ticketsDelete);
        //console.log(ticketsDelete);
        console.log(await conn.generalQuey("select title from coupons where couponid='?'", ticketsDelete));
        alert("A chingar su madre el Ticket");
    }
}

async function funcionVer() {
    let cupon=[];
    cupon=await conn.generalQuey("select * from coupons where couponid='9'");
    console.log(await conn.generalQuey("select * from coupons where couponid='8'"));
    document.getElementById("Test").innerHTML=cupon[0].title;
    document.getElementById("title").placeholder=cupon[0].title;
    document.getElementById("info").placeholder=cupon[0].info;
    document.getElementById("restrictions").placeholder=cupon[0].restrictions;
    document.getElementById("date").placeholder=cupon[0].expiration;
    document.getElementById("percentage").placeholder=cupon[0].discountPercentage;
}

addTicketBtn.addEventListener("click", addTickets);
editTicketBtn.addEventListener("click", editTickets);
deleteTicketBtn.addEventListener("click", deleteTickets);