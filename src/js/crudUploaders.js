const conn = require('./../../db-connection');
const Store = require('electron-store')
const store = new Store();

var formFields = document.getElementsByClassName("form-control");
var addTicketBtn = document.getElementById("addTicket");

//Test
console.log(store.get("compId"));

async function addTickets() {
    //Variable declaration
    let emptyFields = false;
    let queyValues = [];
    let uploaderQueyValues = [];
    let userQueyValues = [];
    //Check for empty fields
    for (let i = 0; i < 6; i++) {
        console.log(formFields[i].value)
        queyValues.push(formFields[i].value);
        if (!!!formFields[i].value) {
            emptyFields = true;
            break;
        }
    }
    if (emptyFields) {
        alert("Please fill in every blank");
        return;
    }
    //Check for passwords that do not coincide
    if (queyValues[4]!=queyValues[5]) {
        alert("Passwords do not coincide");
        return;
    }
    for (let i = 0; i < 4; i++) {
        uploaderQueyValues.push(queyValues[i]);
    }
    uploaderQueyValues.push(store.get("compId"));
    //Database input
    await conn.generalQuey("INSERT INTO uploaders (name, firstLastName, secondLastName, username, companyId) VALUES (?,?,?,?,?)", uploaderQueyValues);

    let uplId = await conn.generalQuey("SELECT uploaderId FROM uploaders ORDER BY uploaderId desc LIMIT 1"); 
    console.log(uplId);
    let uplQueyArr = [uplId[0].uploaderId, queyValues[4]];
    await conn.generalQuey(`call generateHash(?,?)`, uplQueyArr);
    alert("Successful operation");
    //Screen clear
    for (let i = 0; i < formFields.length; i++) {
        formFields[i].value = "";
    }
}

async function editTickets() {

}

async function deleteTickets() {

}

addTicketBtn.addEventListener("click", addTickets);