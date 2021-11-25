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
    queyValues = [userId[0].uploaderId, formFields[1].value];
    let res = await conn.generalQuey(`SELECT loginConfirmation(?,?) as res`, queyValues);
    console.log(res);
    if(res[0].res){
        alert("Successfully logged in");
        //Load corresponding file
        console.log("Success");
    } else {
        alert("Login information is incorrect");
        formFields[1].value = "";
    }
}

//Test
store.set("test", "let's fucking go")

inputButton.addEventListener("click", login);