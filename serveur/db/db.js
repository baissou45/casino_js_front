const mysq = require('mysql2');
const con = mysq.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cours_js_casino'
});

// con.connect(function(err) {
//     if (err) throw err;
//     console.log('Connected!');
// });

module.exports = {
    con
};