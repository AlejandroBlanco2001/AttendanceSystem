const { Router } = require("express");
const router = Router();
const path = require('path');
const db = require('./database')

//Possible record paths array
const routeStr = ['/users', '/persons', '/subjects', '/departments', '/courses', '/spaces', '/schedules',
  '/classrooms', '/classes', '/enrollments', '/periods', '/contracts', '/syllabuses',
  '/programs', '/periodCourses', '/enrollmentCourses', '/studentClasses', '/syllabusSubjects']

//Read Get
router.get(routeStr, async (req, res) => {
  if (req.user) {
    if (req.user.type == '0') {
      let queryTable;
      if (req.path == routeStr[14]) {
        queryTable = 'offered_in'
      } else {
        if (req.path == routeStr[15]) {
          queryTable = 'cour_enro'
        } else {
          if (req.path == routeStr[16]) {
            queryTable = 'clas_stud'
          } else {
            if (req.path == routeStr[17]) {
              queryTable = 'in_syllabus'
            } else {
              let r;
              if (req.path == routeStr[8] || req.path == routeStr[12]) {
                r = 2
              } else {
                r = 1
              }
              queryTable = req.path.substring(1, req.path.length - r)
            }
          }
        }
      }
      let conn;
      try {
        conn = await db.pool.getConnection();
        if (req.path == routeStr[1]) {
          results = await conn.query("SELECT id, name1, name2, lastname1, lastname2, gender, DATE_FORMAT(birthdate,'%d/%m/%Y'), type, id_dept FROM " + queryTable)
        } else {
          results = await conn.query('SELECT * FROM ' + queryTable)
        }
        conn.end();
      } catch (e) {
        throw e
        res.sendStatus(500)
      }
      res.json(results);
    }
    res.send('You´re not an admin.')
  }
  res.send('Not logged in.')
})

//Insert Posts
router.post('/create/:record', async (req, res) => {
  console.log("si pase por aqui -1")
  if (req.user) {
    console.log("si pase por aqui 0")
    if (req.user.type == '0') {
      const i = routeStr.indexOf('/' + req.params.record, 0)
      let response;
      switch (i) {
        case 0:
          {
            let { username, passcode, id_pers } = req.body;
            response = insertData(
              req.params.record.slice(0, -1) + "(username, passcode, id_pers)",
              [username, passcode, id_pers]
            ).then((response) => {
              res.sendStatus(200);
            }).catch((err) => {
              res.sendStatus(500);
            });
            break
          }
        case 1:
          {
            let { id, name1, name2, lastName1, lastName2, gender, birthdate, type, id_dept } = req.body;
            response = insertData(
              req.params.record.slice(0, -1) + "(id, name1, name2, lastname1, lastname2, gender, birthdate, type, id_dept)",
              [id, name1, name2, lastName1, lastName2, gender, birthdate, type, id_dept]
            ).then((response) => {
              res.sendStatus(200);
            }).catch((err) => {
              res.sendStatus(500);
            });
            break
          }
        case 2:
          {
            let { code, name, credits, description, type, urlimage, id_dept } = req.body;
            response = insertData(
              req.params.record.slice(0, -1),
              [code, name, credits, description, type, urlimage, id_dept]
            ).then((response) => {
              res.sendStatus(200);
            }).catch((err) => {
              res.sendStatus(500);
            });
            break
          }
        case 3:
          {
            let { name } = req.body;
            response = insertData(
              req.params.record.slice(0, -1) + "(name)",
              [name]
            ).then((response) => {
              res.sendStatus(200);
            }).catch((err) => {
              res.sendStatus(500);
            });
          }
          break
        case 4:
          {
            let { code, code_subj, id_teach } = req.body;
            response = insertData(
              req.params.record.slice(0, -1),
              [code, code_subj, id_teach]
            ).then((response) => {
              res.sendStatus(200);
            }).catch((err) => {
              res.sendStatus(500);
            });
            break
          }
        case 5:
          {
            let { code_cour, weekday_sche, start_time_sche, code_clasR } = req.body;
            response = insertData(
              req.params.record.slice(0, -1) + "(code_cour, weekday_sche, start_time_sche, code_clasR)",
              [code_cour, weekday_sche, start_time_sche, code_clasR]
            ).then((response) => {
              res.sendStatus(200);
            }).catch((err) => {
              res.sendStatus(500);
            });
            break
          }
        case 6:
          {
            let { weekday, start_time, duration } = req.body;
            response = insertData(
              req.params.record.slice(0, -1) + "(weekday, start_time, duration)",
              [weekday, start_time, duration]
            ).then((response) => {
              res.sendStatus(200);
            }).catch((err) => {
              res.sendStatus(500);
            });
            break
          }
        case 7:
          {
            let { code, type } = req.body;
            response = insertData(
              req.params.record.slice(0, -1),
              [code, type]
            ).then((response) => {
              res.sendStatus(200);
            }).catch((err) => {
              res.sendStatus(500);
            });
            break
          }
        case 8:
          {
            let { code, start_time, code_spac } = req.body;
            response = insertData(
              req.params.record.slice(0, -2),
              [code, start_time, code_spac]
            ).then((response) => {
              res.sendStatus(200);
            }).catch((err) => {
              res.sendStatus(500);
            });
            break
          }
        case 9:
          {
            let { id_stud, year_peri, term_peri } = req.body;
            response = insertData(
              req.params.record.slice(0, -1) + "(id_stud, year_peri, term_peri)",
              [id_stud, year_peri, term_peri]
            ).then((response) => {
              res.sendStatus(200);
            }).catch((err) => {
              res.sendStatus(500);
            });
            break
          }
        case 10:
          {
            let { year, term, description } = req.body;
            response = insertData(
              req.params.record.slice(0, -1),
              [year, term, description]
            ).then((response) => {
              res.sendStatus(200);
            }).catch((err) => {
              res.sendStatus(500);
            });
            break
          }
        case 11:
          {
            let { id_stud, code_syll, year_peri, term_peri } = req.body;
            response = insertData(
              req.params.record.slice(0, -1) + "(id_stud, code_syll, year_peri, term_peri)",
              [id_stud, code_syll, year_peri, term_peri]
            ).then((response) => {
              res.sendStatus(200);
            }).catch((err) => {
              res.sendStatus(500);
            });
            break
          }
        case 12:
          {
            let { code, snies_prog } = req.body;
            response = insertData(
              req.params.record.slice(0, -2) + "(code, snies_prog)",
              [code, snies_prog]
            ).then((response) => {
              res.sendStatus(200);
            }).catch((err) => {
              res.sendStatus(500);
            });
            break
          }
        case (12 + 1):
          {
            let { snies, name, type, title, duration, credits, id_dept } = req.body;
            response = insertData(
              req.params.record.slice(0, -1) + "(snies, name, type, title, duration, credits, id_dept)",
              [snies, name, type, title, duration, credits, id_dept]
            ).then((response) => {
              res.sendStatus(200);
            }).catch((err) => {
              res.sendStatus(500);
            });
            break
          }
        case 14:
          {
            let { code_cour, year_peri, term_peri } = req.body;
            response = insertData(
              'offered_in',
              [code_cour, year_peri, term_peri]
            ).then((response) => {
              res.sendStatus(200);
            }).catch((err) => {
              res.sendStatus(500);
            });
            break
          }
        case 15:
          {
            let { code_cour, id_enro } = req.body;
            response = insertData(
              "cour_enro (code_cour, id_enro)",
              [code_cour, id_enro]
            ).then((response) => {
              res.sendStatus(200);
            }).catch((err) => {
              res.sendStatus(500);
            });
            break
          }
        case 16:
          {
            let { code_clas, id_stud, attendance } = req.body;
            response = insertData(
              'clas_stud',
              [code_clas, id_stud, attendance]
            ).then((response) => {
              res.sendStatus(200);
            }).catch((err) => {
              res.sendStatus(500);
            });
            break
          }
        case 17:
          {
            let { code_subj, code_syll, semester } = req.body;
            response = insertData(
              'in_syllabus',
              [code_subj, code_syll, semester]
            ).then((response) => {
              res.sendStatus(200);
            }).catch((err) => {
              res.sendStatus(500);

            });
            break
          }
        default:
          res.sendStatus(404)
      }
    }
    res.send('You´re not an admin.')
  }
  res.send('Not logged in.')
})

//Update Posts
router.post('/update/:record', async (req, res) => {
  if (req.user) {
    if (req.user.type == '0') {
      const rec = req.params.record;
      let query;
      let results;
      const i = routeStr.indexOf('/' + rec, 0)
      console.log(req.body)
      switch (i) {
        case 0:
          const {
            username, passcode, urlimage, id_pers
          } = req.body;
          query = `UPDATE ${rec.slice(0, -1)} SET username = ?, passcode = ? , urlimage = ?, id_pers = ? WHERE username = '${req.body.username}' AND id_pers = '${req.body.id_pers}';`;
          results = updateOne([username, passcode, urlimage, id_pers], query)
            .then((response) => {
              res.sendStatus(200);
            })
            .catch((err) => {
              console.log(err)
              res.sendStatus(500);
            });
          break
        default:
          res.sendStatus(404)
      }
    }
    res.send('You´re not an admin.')
  }
  res.send('Not logged in.')

})

//Delete Posts


async function insertData(table, values) {
  let conn;
  try {
    conn = await db.pool.getConnection();
    const str = '?,'.repeat(values.length).slice(0, -1)
    const res = await conn.query(
      'INSERT INTO ' + table + ' VALUES (' + str + ')',
      values
    );
    conn.end();
    return res;
  } catch (error) {
    throw error
  }
}

async function updateOne(data, query) {
  let conn;
  try {
    conn = await db.pool.getConnection();
    const results = await conn.query(query, data);
    conn.end();
    return results;
  } catch (error) {
    throw error;
  }
}

module.exports = router;