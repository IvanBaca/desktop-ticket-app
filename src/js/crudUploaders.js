const conn = require('./../../db-connection');
const Store = require('electron-store')
const store = new Store();

var formFields = document.getElementsByClassName("form-control");

//Test
console.log(store.get("compId"));

