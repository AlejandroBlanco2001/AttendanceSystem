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
                r = 1;
              }
              queryTable = req.path.substring(1, req.path.length - r)
            }
          }
        }
      }
      let conn;
      try {
        conn = await db.pool.getConnection();
        if(req.path == routeStr[1]){
          results = await conn.query("SELECT id, name1, name2, lastname1, lastname2, gender, DATE_FORMAT(birthdate,'%d/%m/%Y'), type, id_dept FROM " + queryTable)
        }else{
          results = await conn.query('SELECT * FROM ' + queryTable)
        }
        conn.end();
      } catch (e) {
        res.sendStatus(500)
      }
      res.json(results);
    }
    res.send('You´re not an admin.');
  }
  res.send('Not logged in.');
})

//Insert Posts
router.post('/create/:record', async (req, res) => {
  if (req.user) {
    if (req.user.type == '0') {
      const i = routeStr.indexOf('/' + req.params, 0)
      let response;
      switch (i) {
        case 0:
          const { username, passcode, id_pers } = req.body;

          response = insertData(
            req.params + "(username, passcode, id_pers)",
            [username, passcode, id_pers]
          ).then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            console.error(500);
            res.sendStatus(500);
          });
          break
        case 1:
          const { id, name1, name2, lastname1, lastname2, gender, birthdate, typeP, id_deptP } = req.body;
          console.log(req.body)
          response = insertData(
            req.params + "(id, name1, name2, lastname1, lastname2, gender, birthdate, type, id_dept)",
            [id, name1, name2, lastname1, lastname2, gender, birthdate, typeP, id_deptP]
          ).then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            console.error(500);
            res.sendStatus(500);
          });
          break
        case 2:
          const { codeSub, nameSub, creditsSub, descriptionSub, typeSub, urlimage, id_deptSub } = req.body;

          response = insertData(
            req.params,
            [codeSub, nameSub, creditsSub, descriptionSub, typeSub, urlimage, id_deptSub]
          ).then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            console.error(500);
            res.sendStatus(500);
          });
          break
        case 3:
          const { nameDep } = req.body;

          response = insertData(
            req.params + "(name)",
            [nameDep]
          ).then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            console.error(500);
            res.sendStatus(500);
          });
          break
        case 4:
          const { codeCr, code_subjCr, id_teach } = req.body;

          response = insertData(
            req.params,
            [codeCr, code_subjCr, id_teach]
          ).then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            console.error(500);
            res.sendStatus(500);
          });
          break
        case 5:
          const { code_courSp, weekday_sche, start_time_sche, code_clasR } = req.body;

          response = insertData(
            req.params + "(code_cour, weekday_sche, start_time_sche, code_clasR)",
            [code_courSp, weekday_sche, start_time_sche, code_clasR]
          ).then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            console.error(500);
            res.sendStatus(500);
          });
          break
        case 6:
          const { weekday, start_timeSch, durationSch } = req.body;

          response = insertData(
            req.params + "(weekday, start_time, duration)",
            [weekday, start_timeSch, durationSch]
          ).then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            console.error(500);
            res.sendStatus(500);
          });
          break
        case 7:
          const { codeClr, typeClr } = req.body;

          response = insertData(
            req.params,
            [codeClr, typeClr]
          ).then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            console.error(500);
            res.sendStatus(500);
          });
          break
        case 8:
          const { codeCl, start_timeCl, code_spac } = req.body;

          response = insertData(
            req.params,
            [codeCl, start_timeCl, code_spac]
          ).then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            console.error(500);
            res.sendStatus(500);
          });
          break
        case 9:
          const { id_studEr, year_periEr, term_periEr } = req.body;

          response = insertData(
            req.params + "(id_stud, year_peri, term_peri)",
            [id_studEr, year_periEr, term_periEr]
          ).then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            console.error(500);
            res.sendStatus(500);
          });
          break
        case 10:
          const { year, term, descriptionPd } = req.body;

          response = insertData(
            req.params,
            [year, term, descriptionPd]
          ).then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            console.error(500);
            res.sendStatus(500);
          });
          break
        case 11:
          const { id_studCtr, code_syllCtr, year_periCtr, term_periCtr } = req.body;

          response = insertData(
            req.params + "(id_stud, code_syll, year_peri, term_peri)",
            [id_studCtr, code_syllCtr, year_periCtr, term_periCtr]
          ).then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            console.error(500);
            res.sendStatus(500);
          });
          break
        case 12:
          const { codeSy, snies_prog } = req.body;

          response = insertData(
            req.params + "(code, snies_prog)",
            [codeSy, snies_prog]
          ).then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            console.error(500);
            res.sendStatus(500);
          });
          break
        case (12 + 1):
          const { snies, nameProg, typeProg, title, durationProg, creditsProg, id_deptProg } = req.body;

          response = insertData(
            req.params + "(snies, name, type, title, duration, credits, id_dept)",
            [snies, nameProg, typeProg, title, durationProg, creditsProg, id_deptProg]
          ).then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            console.error(500);
            res.sendStatus(500);
          });
          break
        case 14:
          const { code_courPC, year_periPC, term_periPC } = req.body;

          response = insertData(
            req.params,
            [code_courPC, year_periPC, term_periPC]
          ).then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            console.error(500);
            res.sendStatus(500);
          });
          break
        case 15:
          const { code_courEC, id_enro } = req.body;

          response = insertData(
            req.params + "(code_cour, id_enro)",
            [code_courEC, id_enro]
          ).then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            console.error(500);
            res.sendStatus(500);
          });
          break
        case 16:
          const { code_clas, id_studSC, attendance } = req.body;

          response = insertData(
            req.params,
            [code_clas, id_studSC, attendance]
          ).then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            console.error(500);
            res.sendStatus(500);
          });
          break
        case 17:
          const { code_subjSS, code_syllSS, semester } = req.body;

          response = insertData(
            req.params,
            [code_subjSS, code_syllSS, semester]
          ).then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            console.error(500);
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

//Update Posts
router.post('/update/:record', async (req, res) => {
  if (req.user) {
    if (req.user.type == '0') {
      const rec = req.params;
      let query;
      const i = routeStr.indexOf('/' + rec, 0)
      switch (i) {
        case 0:
          const {
            tarjetaIdentidad, primerNombre, segundoNombre, genero, hijode, fechaNacimiento, updatedUser,
          } = req.body;
          const query = `UPDATE padre SET primerNombre = ?, segundoNombre = ? , apellido = ?, genero = ? , direccion = ?, ciudad = ?, fechaNacimiento = ? WHERE cedula = ${primaryKey.toString()};`;
          updateOne([primerNombre, segundoNombre, genero, fechaNacimiento, hijode], query)
            .then((response) => {
              res.sendStatus(200);
            })
            .catch((err) => {
              console.log(err);
              res.sendStatus(500);
            });
          break
        default:
          res.sendStatus(404)
      }
      //const key = req.params.key.split(':')

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
    const res = await conn.query(
      'INSERT INTO ' + table + ' VALUES (?,?,?,?,?,?,?,?,?)',
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
    conn = await config.getConnection();
    const results = await conn.query(query, data);
    conn.end();
    return results;
  } catch (error) {
    throw error;
  }
}

module.exports = router;