const socket = io('ws://localhost:3000');
const qr = require('qr-code');

module.exports.set = (app) => {

    app.get('/checkList/:id',(req,res) =>{
        let class_id = req.params.id
        // Query for obtaining the assistance of that class;
        // Send to a view the result
    })

    app.post('/createQR', (req,res) => {
        let teacherUsername = req.session.username;
        // Query to get info of the teacher and build a specif code
        qr.toFile('./teacher_code.png',teacherUsername,{
            color: {
                dark: '#FFF',
                light: '#0000'
            }
        }
        ,function(err){
            if(err) throw err
            console.log('Code generated')
        })
        socket.emit('codeCreated','Code activaded')
    })
}