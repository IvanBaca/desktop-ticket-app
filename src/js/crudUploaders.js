const conn = require('./../../db-connection');
const Store = require('electron-store')
const store = new Store();

var formFields = document.getElementsByClassName("form-control");
var addTicketBtn = document.getElementById("addTicket");
var deleteTicketBtn = document.getElementById("deleteTicket");
var nameUpdateSelect = document.getElementById("nameUpdateSelect");
var nameUpdateSelect2 = document.getElementById("nameUpdateSelect2");

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

//OTHER FUNCS
async function updateNames() {
    let info = await conn.generalQuey(`SELECT * FROM uploaders WHERE companyId = ?`, [store.get("compId")]);
    nameUpdateSelect.innerHTML = "";
    for (let i = 0; i < info.length; i++) {
        nameUpdateSelect.innerHTML += `
        <option value="${info[i].uploaderId}">${info[i].username}</option>
        `
    }
}

async function updateNames2() {
    let info = await conn.generalQuey(`SELECT uploaderId, username FROM uploaders WHERE companyId = ?`, [store.get("compId")]);
    nameUpdateSelect2.innerHTML = "";
    for (let i = 0; i < info.length; i++) {
        nameUpdateSelect2.innerHTML += `
        <option value="${info[i].uploaderId}">${info[i].username}</option>
        `
    }
}

async function deleteTickets() {
    //Variable declaration
    let delId = nameUpdateSelect2.value;
    await conn.generalQuey(`DELETE FROM uploaders WHERE uploaderId = ?`, [delId]);
    alert("Successful operation");
}

addTicketBtn.addEventListener("click", addTickets);
deleteTicketBtn.addEventListener("click", deleteTickets);
nameUpdateSelect.addEventListener("click", updateNames);
nameUpdateSelect2.addEventListener("click", updateNames2);