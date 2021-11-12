const io = require('socket.io')();
const qr = require('qrcode');

const {Router} = require('express');
const router = Router();

io.on('codeCreated', (arg) => {
    console.log('The teacher is in class')
})

router.get('/me', (req,res) =>{
    console.log(req.user)
    if(req.user){
        res.send('You are in')
    }else{
        res.send('You are not')
    }
})

// Watch the class list of that student
router.get('/classes',(req,res) =>{
    let username = req.session.username;
    // Query for obtaining class of that username
    // Render classes view
})

router.get('/checkList/:id',(req,res) =>{
    let class_id = req.params.id
    // Query for obtaining the assistance of that class;
    // Send to a view the result
})

router.post('/createQR', (req,res) => {
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
    io.emit('codeCreated','Code activaded')
})

module.exports = router;