const { Router } = require("express");
const router = Router();
const path = require('path');
const db = require('./database')

//Possible get-request paths array
const routeStr = ['/users','/persons','/subjects','/departments','/courses','/spaces','/schedules',
                    '/classrooms','/classes','/enrollments','/periods','/contracts','/syllabuses',
                    '/programs','/periodCourses','/enrollmentCourses','/studentClasses','/syllabusSubjects']

//Read Get
router.get(routeStr, async (req, res) => {
    if (req.user) {
        if (req.user.type == '0') {
            let queryTable;
            if(req.path == routeStr[14]){
                queryTable = 'offered_in'
            }else{
                if(req.path == routeStr[15]){
                    queryTable = 'cour_enro'       
                }else{
                    if(req.path == routeStr[16]){
                        queryTable = 'clas_stud'
                    }else{
                        if(req.path == routeStr[17]){
                            queryTable = 'in_syllabus'
                        }else{
                            let r;
                            if (req.path == routeStr[8] || req.path == routeStr[12]){
                                r = 2
                            }else{
                                r = 1;
                            }
                            queryTable = req.path.substring(1,req.path.length-r)
                        }
                    }
                }
            }
            let conn;
            try {
                conn = await db.pool.getConnection();
                results = await conn.query('SELECT * FROM '+queryTable)
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