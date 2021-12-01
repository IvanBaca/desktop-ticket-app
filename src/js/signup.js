const conn = require('./../../db-connection');
const Store = require('electron-store')
const store = new Store();

var formFields = document.getElementsByClassName("form-control");
var inputButton = document.getElementById("inputButton");

//console.log(formFields);

async function insertUser() {
    //Variable declaration
    let emptyFields = false;
    let queyValues = [];
    let companyQueyValues = [];
    let userQueyValues = [];
    //Check for empty fields
    for (let i = 0; i < formFields.length; i++) {
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
        alert("Passwords do not coincide")
        return;
    }
    //Value splitting
    for (let i = 6; i < 8; i++) {
        companyQueyValues.push(queyValues[i])

    }
    for (let i = 0; i < 4; i++) {
        userQueyValues.push(queyValues[i])
    }
    //Database input
    await conn.generalQuey("INSERT INTO companies (name, service) VALUES (?,?)", companyQueyValues);
    let compId = await conn.generalQuey("SELECT MAX(companyId) AS id FROM companies ORDER BY companyId desc LIMIT 1");
    userQueyValues.push(compId[0].id);
    await conn.generalQuey("INSERT INTO uploaders (name, firstLastName, secondLastName, username, companyId) VALUES (?,?,?,?,?)", userQueyValues);
    let uplId = await conn.generalQuey("SELECT uploaderId FROM uploaders ORDER BY uploaderId desc LIMIT 1");
    console.log(uplId);
    let uplQueyArr = [uplId[0].uploaderId, queyValues[4]];
    await conn.generalQuey(`call generateHash(?,?)`, uplQueyArr);
    alert("Successful operation");
    //Screen clear
    for (let i = 0; i < formFields.length; i++) {
        formFields[i].value = "";
    }
    //Redirection
    window.location.assign(__dirname + "/login.html");
}

console.log(store.get('test'));

inputButton.addEventListener("click", insertUser);