const socket = io('ws://localhost:3000');

module.exports.set = (app) => {
    
    socket.on('codeCreated', (arg) => {
        console.log("The teacher is in class")
    })


    // Watch the class list of that student
    app.get('/classes',(req,res) =>{
        let username = req.session.username;
        // Query for obtaining class of that username
        // Render classes view
    })
}