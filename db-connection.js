const { createConnection } = require('mysql');

const connection = createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'desktopticketapp'
});

//This is a comment

/*connection.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('NICE');
    }
})*/

function generalQuey(quey){
    connection.query(quey, (err, result, fields)=>{
        if(err){
            return console.log(err);
        }
        return console.log(result);
    });
}

module.exports = { generalQuey };