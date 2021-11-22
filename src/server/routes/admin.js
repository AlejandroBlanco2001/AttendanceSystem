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
          results = await conn.query("SELECT id, name1, name2, lastname1, lastname2, gender, birthdate, age, type, id_dept FROM " + queryTable)
        } else {
          results = await conn.query('SELECT * FROM ' + queryTable)
        }
        conn.end();
      } catch (e) {
        res.sendStatus(500)
      }
      res.json(results);
    }else{
      res.send('You´re not an admin.');
    }
  }else{
    res.send('Not logged in.');
  }
  
})

//Insert Posts
router.post('/create/:record', async (req, res) => {
  if (req.user) {
    if (req.user.type == '0') {
      let rec = req.params.record
      let update = req.body
      let query, table
      let results
      table = await identifyTable(rec)
      query = `INSERT INTO ${table} `
      let part1 = '(', part2 = '('
      for (var [key, value] of Object.entries(update)) {
        if (table == 'user') {
          if (key != 'type') {
            part2 +=  (value === null || typeof value.type == 'number') ? `${value}, ` : `'${value}', `
            part1 += `${key}, `
          }
        } else {
          part2 +=  (value === null || typeof value.type == 'number') ? `${value}, ` : `'${value}', `
          if (table == 'person' && key == 'aux_id'){
            part1 += `id_dept, `
          }else{
            part1 += `${key}, `
          }
        }
      }
      part1 = part1.slice(0,-2) + ')'
      part2 = part2.slice(0,-2) + ')'
      query += part1 + ` VALUES ` + part2 + ';'
      try {
        let conn = await db.pool.getConnection()
        results = await conn.query(query)
          .then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            throw err
          })
        conn.end()
        return results
      } catch (e) {
        console.log(e)
        res.sendStatus(500)
      }
    }else{
      res.send('You´re not an admin.')
    }
  }else{
    res.send('Not logged in.')
  }
})
// router.post('/create/:record', async (req, res) => {
//   if (req.user) {
//     if (req.user.type == '0') {
//       const i = routeStr.indexOf('/' + req.params.record, 0)
//       let response;
//       switch (i) {
//         case 0:
//           {
//             let { username, passcode, id_pers } = req.body;
//             response = insertData(
//               req.params.record.slice(0, -1) + "(username, passcode, id_pers)",
//               [username, passcode, id_pers]
//             ).then((response) => {
//               res.sendStatus(200);
//             }).catch((err) => {
//               res.sendStatus(500);
//             });
//             break
//           }
//         case 1:
//           {
//             let { id, name1, name2, lastName1, lastName2, gender, birthdate, type, id_dept } = req.body;
//             response = insertData(
//               req.params.record.slice(0, -1) + "(id, name1, name2, lastname1, lastname2, gender, birthdate, type, id_dept)",
//               [id, name1, name2, lastName1, lastName2, gender, birthdate, type, id_dept]
//             ).then((response) => {
//               res.sendStatus(200);
//             }).catch((err) => {
//               console.log(err)
//               res.sendStatus(500);
//             });
//             break
//           }
//         case 2:
//           {
//             let { code, name, credits, description, type, urlimage, id_dept } = req.body;
//             response = insertData(
//               req.params.record.slice(0, -1),
//               [code, name, credits, description, type, urlimage, id_dept]
//             ).then((response) => {
//               res.sendStatus(200);
//             }).catch((err) => {
//               // console.log(err)
//               res.sendStatus(500);
//             });
//             break
//           }
//         case 3:
//           {
//             let { name } = req.body;
//             response = insertData(
//               req.params.record.slice(0, -1) + "(name)",
//               [name]
//             ).then((response) => {
//               res.sendStatus(200);
//             }).catch((err) => {
//               res.sendStatus(500);
//             });
//           }
//           break
//         case 4:
//           {
//             let { code, code_subj, id_teach } = req.body;
//             response = insertData(
//               req.params.record.slice(0, -1),
//               [code, code_subj, id_teach]
//             ).then((response) => {
//               res.sendStatus(200);
//             }).catch((err) => {
//               res.sendStatus(500);

//             });
//             break
//           }
//         case 5:
//           {
//             let { code_cour, weekday_sche, start_time_sche, code_clasR } = req.body;
//             response = insertData(
//               req.params.record.slice(0, -1) + "(code_cour, weekday_sche, start_time_sche, code_clasR)",
//               [code_cour, weekday_sche, start_time_sche, code_clasR]
//             ).then((response) => {
//               res.sendStatus(200);
//             }).catch((err) => {
//               res.sendStatus(500);
             

//             });
//             break
//           }
//         case 6:
//           {
//             let { weekday, start_time, duration } = req.body;
//             response = insertData(
//               req.params.record.slice(0, -1) + "(weekday, start_time, duration)",
//               [weekday, start_time, duration]
//             ).then((response) => {
//               res.sendStatus(200);
//             }).catch((err) => {
//               res.sendStatus(500);
             
//             });
//             break
//           }
//         case 7:
//           {
//             let { code, type } = req.body;
//             response = insertData(
//               req.params.record.slice(0, -1),
//               [code, type]
//             ).then((response) => {
//               res.sendStatus(200);
//             }).catch((err) => {
//               res.sendStatus(500);
//             });
//             break
//           }
//         case 8:
//           {
//             let { code, start_time, code_spac } = req.body;
//             response = insertData(
//               req.params.record.slice(0, -2),
//               [code, start_time, code_spac]
//             ).then((response) => {
//               res.sendStatus(200);
//             }).catch((err) => {
//               res.sendStatus(500);

//             });
//             break
//           }
//         case 9:
//           {
//             let { id_stud, year_peri, term_peri } = req.body;
//             response = insertData(
//               req.params.record.slice(0, -1) + "(id_stud, year_peri, term_peri)",
//               [id_stud, year_peri, term_peri]
//             ).then((response) => {
//               res.sendStatus(200);
//             }).catch((err) => {
//               res.sendStatus(500);

//             });
//             break
//           }
//         case 10:
//           {
//             let { year, term, description } = req.body;
//             response = insertData(
//               req.params.record.slice(0, -1),
//               [year, term, description]
//             ).then((response) => {
//               res.sendStatus(200);
//             }).catch((err) => {
//               res.sendStatus(500);

//             });
//             break
//           }
//         case 11:
//           {
//             let { id_stud, code_syll, year_peri, term_peri } = req.body;
//             response = insertData(
//               req.params.record.slice(0, -1) + "(id_stud, code_syll, year_peri, term_peri)",
//               [id_stud, code_syll, year_peri, term_peri]
//             ).then((response) => {
//               res.sendStatus(200);
//             }).catch((err) => {
//               res.sendStatus(500);
//             });
//             break
//           }
//         case 12:
//           {
//             let { code, snies_prog } = req.body;
//             response = insertData(
//               req.params.record.slice(0, -2) + "(code, snies_prog)",
//               [code, snies_prog]
//             ).then((response) => {
//               res.sendStatus(200);
//             }).catch((err) => {
//               console.log(err);
//             });
//             break
//           }
//         case (12 + 1):
//           {
//             let { snies, name, type, title, duration, credits, id_dept } = req.body;
//             response = insertData(
//               req.params.record.slice(0, -1) + "(snies, name, type, title, duration, credits, id_dept)",
//               [snies, name, type, title, duration, credits, id_dept]
//             ).then((response) => {
//               res.sendStatus(200);
//             }).catch((err) => {
//               res.sendStatus(500);
//             });
//             break
//           }
//         case 14:
//           {
//             let { code_cour, year_peri, term_peri } = req.body;
//             response = insertData(
//               'offered_in',
//               [code_cour, year_peri, term_peri]
//             ).then((response) => {
//               res.sendStatus(200);
//             }).catch((err) => {
//              res.sendStatus(500);
//             });
//             break
//           }
//         case 15:
//           {
//             let { code_cour, id_enro } = req.body;
//             response = insertData(
//               "cour_enro (code_cour, id_enro)",
//               [code_cour, id_enro]
//             ).then((response) => {
//               res.sendStatus(200);
//             }).catch((err) => {
//               // res.sendStatus(500);
//              console.log(err);

//             });
//             break
//           }
//         case 16:
//           {
//             let { code_clas, id_stud, attendance } = req.body;
//             response = insertData(
//               'clas_stud',
//               [code_clas, id_stud, attendance]
//             ).then((response) => {
//               res.sendStatus(200);
//             }).catch((err) => {
//               res.sendStatus(500);
//             });
//             break
//           }
//         case 17:
//           {
//             let { code_subj, code_syll, semester } = req.body;
//             response = insertData(
//               'in_syllabus',
//               [code_subj, code_syll, semester]
//             ).then((response) => {
//               res.sendStatus(200);
//             }).catch((err) => {
//               res.sendStatus(500);

//             });
//             break
//           }
//         default:
//           res.sendStatus(404)
//       }
//     }else{
//       res.send('You´re not an admin.')
//     }
//   }else{
//     res.send('Not logged in.')
//   }
// })

//Update Posts
router.post('/update/:record/:pkey', async (req, res) => {
  if (req.user) {
    if (req.user.type == '0') {
      let pkeysV = req.params.pkey.split(':')
      let rec = req.params.record
      let update = req.body
      let query, table
      let results
      table = await identifyTable(rec)
      query = `UPDATE ${table} SET `
      for (var [key, value] of Object.entries(update)) {
        if (table == 'user') {
          if (key != 'type') {
            query += (value === null || typeof value.type == 'number') ? `${key} = ${value},` : `${key} = '${value}',`
          }
        } else {
          query += ( value === null || typeof value.type == 'number') ? `${key} = ${value},` : `${key} = '${value}',`
        }
      }
      query = query.slice(0, -1)
      query += ` WHERE `
      let pkeys
      try {
        let conn = await db.pool.getConnection()
        pkeys = await conn.query(`SELECT k.COLUMN_NAME
        FROM information_schema.table_constraints t
        LEFT JOIN information_schema.key_column_usage k
        USING(constraint_name,table_schema,table_name)
        WHERE t.constraint_type='PRIMARY KEY'
            AND t.table_schema=DATABASE()
            AND t.table_name='${table}';`)
        await conn.end()
      } catch (e) {
        console.log(e)
      }
      for (let j = 0; j < pkeysV.length; j++) {
        query += `${pkeys[j].COLUMN_NAME} = '${pkeysV[j]}'`
        if (j == pkeys.length - 1) {
          query += ';'
        } else {
          query += ' AND '
        }
      }
      try {
        let conn = await db.pool.getConnection()
        results = await conn.query(query)
          .then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            throw err
          })
        conn.end()
        return results
      } catch (e) {
        console.log(e)
        res.sendStatus(500)
      }
    }else{
      res.send('You´re not an admin.')
    }
  }else{
    res.send('Not logged in.')
  }
})



//Delete Posts
router.post('/delete/:record/:pkey', async (req, res) => {
  console.log(req.user)
  if (req.user) {
    if (req.user.type == '0') {
      let pkeysV = req.params.pkey.split(':')
      let rec = req.params.record
      let query, results, pkeys
      let table = await identifyTable(rec)
      query = `DELETE FROM ${table} WHERE `
      try {
        let conn = await db.pool.getConnection()
        pkeys = await conn.query(`SELECT k.COLUMN_NAME
        FROM information_schema.table_constraints t
        LEFT JOIN information_schema.key_column_usage k
        USING(constraint_name,table_schema,table_name)
        WHERE t.constraint_type='PRIMARY KEY'
            AND t.table_schema=DATABASE()
            AND t.table_name='${table}';`)
        await conn.end()
      } catch (e) {
        console.log(e)
      }
      console.log(pkeys)
      for (let j = 0; j < pkeysV.length; j++) {
        query += `${pkeys[j].COLUMN_NAME} = '${pkeysV[j]}'`
        if (j == pkeysV.length - 1) {
          query += ';'
        } else {
          query += ' AND '
        }
      }
      console.log(query)
      try {
        let conn = await db.pool.getConnection()
        results = await conn.query(query)
          .then((response) => {
            res.sendStatus(200);
          }).catch((err) => {
            throw err
          })
        conn.end()
        return results
      } catch (e) {
        res.sendStatus(500)
      }
    }else{
      res.send('You`re not an admin.')
    }
  }else{
    res.send('Not logged in.')
  }
})

async function identifyTable(record) {
  let table
  if ([8, 12].includes(routeStr.indexOf('/' + record, 0))) {
    table = record.slice(0, -2)
  } else {
    if (routeStr.indexOf('/' + record, 0) >= 14) {
      switch (routeStr.indexOf('/' + record, 0)) {
        case 14:
          {
            table = 'offered_in';
            break
          }
        case 15:
          {
            table = 'cour_enro';
            break
          }
        case 16:
          {
            table = 'clas_stud';
            break
          }
        case 17:
          {
            table = 'in_syllabus';
            break
          }
      }
    } else {
      table = record.slice(0, -1)
    }
  }
  return table
}

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