const { Router } = require("express");
const router = Router();
const path = require('path');

router.get('', (req,res) => {
    res.render(path.resolve('src/','client/','pages/','Login.jsx'))
})

module.exports = router;