const { createConnection } = require('mysql');

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'desktopticketapp'
});

//This is a comment

/*connection.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('NICE');
    }
})*/

function generalQuey(quey, params) {
    return new Promise(data => {
        connection.query(quey, params, (err, result, fields) => {
            if (err) {
                return console.log(err);
            }
            try {
                data(result);
            } catch (err) {
                data({});
                console.log(err)
            };
        });
    });
}

module.exports = { generalQuey };