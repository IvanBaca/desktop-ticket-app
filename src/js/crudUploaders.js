const conn = require('./../../db-connection');
const Store = require('electron-store')
const store = new Store();

var formFields = document.getElementsByClassName("form-control");
var addTicketBtn = document.getElementById("addTicket");
var editTicketBtn = document.getElementById("editTicket");
var deleteTicketBtn = document.getElementById("deleteTicket");
var nameUpdateSelect = document.getElementById("nameUpdateSelect");
var nameUpdateSelect2 = document.getElementById("nameUpdateSelect2");
var logOut = document.getElementById("signout1");

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
    fillSelect1();
    updateNames2();
}

async function editTickets() {
    //Variable declaration
    let emptyFields = false;
    let queyValues = [];
    let uploaderQueyValues = [];
    let userQueyValues = [];
    //Check for empty fields
    for (let i = 6; i < 12; i++) {
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
    let uplId = await conn.generalQuey(`SELECT uploaderId FROM uploaders WHERE username = ?`, [uploaderQueyValues[3]]);
    uploaderQueyValues.push(uplId[0].uploaderId);
    //Database input
    await conn.generalQuey("UPDATE uploaders SET name=?, firstLastName=?, secondLastName=?, username=? WHERE uploaderId = ?", uploaderQueyValues);
    console.log(uplId);
    let uplQueyArr = [uplId[0].uploaderId, queyValues[4]];
    await conn.generalQuey(`call generateHash(?,?)`, uplQueyArr);
    alert("Successful operation");
    //Screen clear
    for (let i = 0; i < formFields.length; i++) {
        formFields[i].value = "";
    }
    fillSelect1();
    updateNames2();
}

async function fillSelect1() {
    let info = await conn.generalQuey(`SELECT * FROM uploaders WHERE companyId = ?`, [store.get("compId")]);
    nameUpdateSelect.innerHTML = "";
    for (let i = 0; i < info.length; i++) {
        nameUpdateSelect.innerHTML += `
        <option value="${info[i].uploaderId}">${info[i].username}</option>
        `
    }
}

async function updateNames() {
    let fields = [];
    let selectedOption = nameUpdateSelect.value;
    let infoForFields = await conn.generalQuey(`SELECT * FROM uploaders WHERE uploaderId = ?`, [selectedOption]);
    for (let i = 6; i < 10; i++) {
        fields.push(formFields[i]);
    }
    fields[0].value = infoForFields[0].name;
    fields[1].value = infoForFields[0].firstLastName;
    fields[2].value = infoForFields[0].secondLastName;
    fields[3].value = infoForFields[0].username;
    fillSelect1();
    updateNames2();
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
    fillSelect1();
    updateNames2();
    alert("Successful operation");
}

async function deleteStore(){
    store.delete("compid");
}

fillSelect1();
updateNames2();

addTicketBtn.addEventListener("click", addTickets);
editTicketBtn.addEventListener("click", editTickets);
deleteTicketBtn.addEventListener("click", deleteTickets);
nameUpdateSelect.addEventListener("click", updateNames);
logOut.addEventListener("click", deleteStore);
