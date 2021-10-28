const app = require('express')();
const port = process.env.PORT || 80; 

app.post('',(req,res) =>{

});

app.get('/',(req,res) =>{
    res.send('Hello World!');
});

app.listen(port, () =>{
    console.log(`Back-End is listening in http://localhost:${port}`)
});