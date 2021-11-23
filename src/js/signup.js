const conn = require('./../../db-connection');

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
    for (let i = 0; i < 5; i++) {
        userQueyValues.push(queyValues[i])
    }
    //Database input
    //conn.generalQuey("INSERT INTO companies (name, service) VALUES (?,?)", companyQueyValues);
    let compId = await conn.generalQuey("SELECT MAX(companyid) FROM companies");
    userQueyValues.push(compId[0].companyid);
    //conn.generalQuey("INSERT INTO uploaders (name, firstLastName, secondLastName, username) VALUES (?,?,?,?)", userQueyValues);

    //*******PENDING HASHING FUNCTION*********

}

inputButton.addEventListener("click", insertUser);