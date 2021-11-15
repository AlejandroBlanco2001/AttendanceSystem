const io = require('socket.io')();
const qr = require('qrcode');

const {Router} = require('express');
const router = Router();

const path = require('path');


io.on('codeCreated', (arg) => {
    console.log('The teacher is in class')
})

router.get('/me',async (req,res) =>{
    if(req.user){

        res.json()
    }else{
    
    }
})

// Watch the class list of that student
router.get('/classes',(req,res) =>{
    let username = req.user['userName'];
    // Query for obtaining class of that username
    // Render classes view
})

router.get('/checkList/:id',(req,res) =>{
    let class_id = req.params.id
    // Query for obtaining the assistance of that class;
    // Send to a view the result
})

router.get('/createQR', (req,res) => {
    //if(req.user['type'] == 1){
        //let teacherUsername = req.user['userName'];
    
        // Query to get info of the teacher and build a specif code
        qr.toFile('./teacher_code.png','123',{
            color: {
                dark: '#FFF',
                light: '#0000'
            }
        }
        ,function(err){
            if(err) throw err
            console.log('Code generated')
        })
        res.sendFile(path.resolve('teacher_code.png'));
        //io.emit('codeCreated','Code activaded')
    //}
})

module.exports = router;