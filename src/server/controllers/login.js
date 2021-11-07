module.exports.set = (app) => { 
    
    app.get('/login',(req,res) =>{
        // Login res.send()
    });

    // Login
    app.post('/auth',(req,res) =>{
        let username = 'isaac';
        let password = '123';
        if(username && password){
            // query para verificar existencia
            req.session.loggedin = true;
            req.session.username = username;
        }else{
            res.send('Please enter Username and password!');
            res.end();
        }
    })
}