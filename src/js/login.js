const conn = require('./../../db-connection');
const Store = require('electron-store')
const store = new Store();

var formFields = document.getElementsByClassName("form-control");
var inputButton = document.getElementById("inputButton");

async function login() {
    //Variable declaration
    let emptyFields = false;
    //Check for empty fields
    for (let i = 0; i < formFields.length; i++) {
        if(!!!formFields[i].value){
            emptyFields = true;
            break;
        } 
    }
    if (emptyFields) {
        alert("Please fill in every blank");
        return;
    }
    //Check if user is allowed
    let queyValues = [formFields[0].value];
    let userId = await conn.generalQuey(`SELECT uploaderId FROM uploaders WHERE username = ?`, queyValues);
    console.log(userId[0].uploaderId);
    queyValues = [userId[0].uploaderId, formFields[1].value];
    let res = await conn.generalQuey(`SELECT loginConfirmation(?,?) as res`, queyValues);
    console.log(res);
    if(res[0].res){
        let compId = await conn.generalQuey(`SELECT c.companyId FROM companies c INNER JOIN uploaders u ON c.companyId = u.companyId WHERE u.uploaderId = ?`,[userId[0].uploaderId])
        store.set("compId", compId[0].companyId);
        alert("Successfully logged in");
        window.location.assign(__dirname+"/crudCharles.html");
    } else {
        alert("Login information is incorrect");
        formFields[1].value = "";
    }
}

console.log(__dirname)

inputButton.addEventListener("click", login);