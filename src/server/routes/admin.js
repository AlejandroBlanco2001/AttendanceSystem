const { Router } = require("express");
const router = Router();
const path = require('path');
const db = require('./database')

//Read Gets 
const routeStr = ['/users','/persons','/subjects']
router.get(routeStr, async (req, res) => {
    if (req.user) {
        if (req.user.type == '0') {
            
            let conn;
            try {
                conn = await db.pool.getConnection();
                results = await conn.query('SELECT * FROM user')
                conn.end();
            } catch (e) {
                res.sendStatus(500)
            }
            res.json(results);
        }
        res.send('You´re not an admin')
    }
    res.send('Not logged in')
})

router.get('/persons', async (req, res) => {
    if (req.user) {
        if (req.user.type == '0') {
            let conn;
            try {
                conn = await db.pool.getConnection();
                results = await conn.query('SELECT * FROM person')
                conn.end();
            } catch (e) {
                res.sendStatus(500)
            }
            res.json(results);
        }
        res.send('You´re not an admin')
    }
    res.send('Not logged in')
})

router.get('/subjects', async (req, res) => {
    if (req.user) {
        if (req.user.type == '0') {
            let conn;
            try {
                conn = await db.pool.getConnection();
                results = await conn.query('SELECT * FROM subject')
                conn.end();
            } catch (e) {
                res.sendStatus(500)
            }
            res.json(results);
        }
        res.send('You´re not an admin')
    }
    res.send('Not logged in')
})

router.get('/departments', async (req, res) => {
    if (req.user) {
        if (req.user.type == '0') {
            let conn;
            try {
                conn = await db.pool.getConnection();
                results = await conn.query('SELECT * FROM department')
                conn.end();
            } catch (e) {
                res.sendStatus(500)
            }
            res.json(results);
        }
        res.send('You´re not an admin')
    }
    res.send('Not logged in')
})

router.get('/courses', async (req, res) => {
    if (req.user) {
        if (req.user.type == '0') {
            let conn;
            try {
                conn = await db.pool.getConnection();
                results = await conn.query('SELECT * FROM course')
                conn.end();
            } catch (e) {
                res.sendStatus(500)
            }
            res.json(results);
        }
        res.send('You´re not an admin')
    }
    res.send('Not logged in')
})

router.get('/periodCourses', async (req, res) => {
    if (req.user) {
        if (req.user.type == '0') {
            let conn;
            try {
                conn = await db.pool.getConnection();
                results = await conn.query('SELECT * FROM offered_in')
                conn.end();
            } catch (e) {
                res.sendStatus(500)
            }
            res.json(results);
        }
        res.send('You´re not an admin')
    }
    res.send('Not logged in')
})

router.get('/spaces', async (req, res) => {
    if (req.user) {
        if (req.user.type == '0') {
            let conn;
            try {
                conn = await db.pool.getConnection();
                results = await conn.query('SELECT * FROM space')
                conn.end();
            } catch (e) {
                res.sendStatus(500)
            }
            res.json(results);
        }
        res.send('You´re not an admin')
    }
    res.send('Not logged in')
})

router.get('/schedules', async (req, res) => {
    if (req.user) {
        if (req.user.type == '0') {
            let conn;
            try {
                conn = await db.pool.getConnection();
                results = await conn.query('SELECT * FROM schedule')
                conn.end();
            } catch (e) {
                res.sendStatus(500)
            }
            res.json(results);
        }
        res.send('You´re not an admin')
    }
    res.send('Not logged in')
})

router.get('/classrooms', async (req, res) => {
    if (req.user) {
        if (req.user.type == '0') {
            let conn;
            try {
                conn = await db.pool.getConnection();
                results = await conn.query('SELECT * FROM classroom')
                conn.end();
            } catch (e) {
                res.sendStatus(500)
            }
            res.json(results);
        }
        res.send('You´re not an admin')
    }
    res.send('Not logged in')
})

router.get('/classes', async (req, res) => {
    if (req.user) {
        if (req.user.type == '0') {
            let conn;
            try {
                conn = await db.pool.getConnection();
                results = await conn.query('SELECT * FROM class')
                conn.end();
            } catch (e) {
                res.sendStatus(500)
            }
            res.json(results);
        }
        res.send('You´re not an admin')
    }
    res.send('Not logged in')
})

router.get('/enrollmentCourses', async (req, res) => {
    if (req.user) {
        if (req.user.type == '0') {
            let conn;
            try {
                conn = await db.pool.getConnection();
                results = await conn.query('SELECT * FROM cour_enro')
                conn.end();
            } catch (e) {
                res.sendStatus(500)
            }
            res.json(results);
        }
        res.send('You´re not an admin')
    }
    res.send('Not logged in')
})

router.get('/studentClasses', async (req, res) => {
    if (req.user) {
        if (req.user.type == '0') {
            let conn;
            try {
                conn = await db.pool.getConnection();
                results = await conn.query('SELECT * FROM class_stud')
                conn.end();
            } catch (e) {
                res.sendStatus(500)
            }
            res.json(results);
        }
        res.send('You´re not an admin')
    }
    res.send('Not logged in')
})

router.get('/enrollments', async (req, res) => {
    if (req.user) {
        if (req.user.type == '0') {
            let conn;
            try {
                conn = await db.pool.getConnection();
                results = await conn.query('SELECT * FROM enrollment')
                conn.end();
            } catch (e) {
                res.sendStatus(500)
            }
            res.json(results);
        }
        res.send('You´re not an admin')
    }
    res.send('Not logged in')
})

router.get('/periods', async (req, res) => {
    if (req.user) {
        if (req.user.type == '0') {
            let conn;
            try {
                conn = await db.pool.getConnection();
                results = await conn.query('SELECT * FROM period')
                conn.end();
            } catch (e) {
                res.sendStatus(500)
            }
            res.json(results);
        }
        res.send('You´re not an admin')
    }
    res.send('Not logged in')
})

router.get('/contracts', async (req, res) => {
    if (req.user) {
        if (req.user.type == '0') {
            let conn;
            try {
                conn = await db.pool.getConnection();
                results = await conn.query('SELECT * FROM contract')
                conn.end();
            } catch (e) {
                res.sendStatus(500)
            }
            res.json(results);
        }
        res.send('You´re not an admin')
    }
    res.send('Not logged in')
})

router.get('/syllabuses', async (req, res) => {
    if (req.user) {
        if (req.user.type == '0') {
            let conn;
            try {
                conn = await db.pool.getConnection();
                results = await conn.query('SELECT * FROM syllabus')
                conn.end();
            } catch (e) {
                res.sendStatus(500)
            }
            res.json(results);
        }
        res.send('You´re not an admin')
    }
    res.send('Not logged in')
})

router.get('/syllabusSubjects', async (req, res) => {
    if (req.user) {
        if (req.user.type == '0') {
            let conn;
            try {
                conn = await db.pool.getConnection();
                results = await conn.query('SELECT * FROM in_syllabus')
                conn.end();
            } catch (e) {
                res.sendStatus(500)
            }
            res.json(results);
        }
        res.send('You´re not an admin')
    }
    res.send('Not logged in')
})

router.get('/programs', async (req, res) => {
    if (req.user) {
        if (req.user.type == '0') {
            let conn;
            try {
                conn = await db.pool.getConnection();
                results = await conn.query('SELECT * FROM program')
                conn.end();
            } catch (e) {
                res.sendStatus(500)
            }
            res.json(results);
        }
        res.send('You´re not an admin')
    }
    res.send('Not logged in')
})

//Insert Posts


//Update Posts


//Delete Posts


async function insertData(table, values) {
    let conn;
    try {
      conn = await db.pool.getConnection();
      const res = await conn.query(
        `INSERT INTO ${table} VALUES (?,?,?,?,?,?,?,?)`,
        values
      );
      conn.end();
      return res;
    } catch (error) {
      throw error
    }
  }

module.exports = router;