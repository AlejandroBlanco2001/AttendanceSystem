var users = require('./users');
var admin = require('./admin');

module.exports.set = (app) => {
    
    app.get('/',(req,res) =>{
        if(req.session.loggedin){
            response.send('Welcome back, ' + req.session.username + '!');
        }else{
            res.send('Server is working!');
        }
        res.end();
    });
    
    
    app.get('/join_class/:id',(req,res) => {
        let class_id = req.params.id;
        // Query para verificar existencia de la clase
        // QR profesor
        // QR clase
        // QR profesor + Qr clase = Asistencia
        /*
        qr.toFile('./class.png',class_id,{
            color: {
                dark: '#FFF',
                light: '#0000'
            }
        }
        ,function(err){
            if(err) throw err
            console.log('Code generated')
        })
        */
    });

    users.set(app);
    admin.set(app);
}