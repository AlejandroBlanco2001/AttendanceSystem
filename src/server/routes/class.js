const { Router } = require("express");
const router = Router();

router.get("/join_class/:id", (req, res) => {
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

module.exports = router;
