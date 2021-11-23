const { Router } = require("express");
const router = Router();

const util = require("../../utils");
const db = require("./database");
const { DateTime } = require("luxon");

const io = require("../controllers/socket").getio();

router.get("/subject/:id", async (req, res) => {
  let id = req.params.id;
  let conn = await db.pool.getConnection();
  let result = await util.getSubjectInfo(conn, id);
  if (result == -1) res.sendStatus(500);
  else res.json(result);
});

router.post("/getAttendance", async (req, res) => {
  if (req.user) {
    if (req.user.type == "1") {
      let { code } = req.body;
      let conn = await db.pool.getConnection();
      let result = await util.getAttendanceClass(conn, code);
      conn.end();
      if (result == 0) res.sendStatus(500);
      else {
        result[0].logAttendance = DateTime.fromJSDate(
          result[0].logAttendance
        ).toLocaleString(DateTime.DATETIME_SHORT);
        res.json(result);
      }
    }
  }
});

router.post("/takeAttendance", async (req, res) => {
  if (req.user) {
    if (req.user.type == "2") {
      let { id_class, id_teacher } = req.body;
      id_class = id_class.split("/")[1];
      let conn = await db.pool.getConnection();
      let result = await util.getHourClass(conn, {
        code: id_class,
        teach: id_teacher,
      });
      let resClass = await util.checkCodesClass(conn, id_class);
      let resTeach = await util.checkCodesTeacher(conn, id_teacher);
      conn.end();
      let hour = DateTime.fromJSDate(result);
      let curr = DateTime.now();
      let limit_assist = hour.plus({ minutes: 10 });
      let limit_late = hour.plus({ minutes: 20 });
      if (resClass != -1 && resTeach != -1) {
        if (curr > hour) {
          let conn = await db.pool.getConnection();
          let clas = await util.getClassSession(conn, {
            code: id_class,
            teach: id_teacher,
          });
          if (curr < limit_assist) {
            await conn.query("INSERT INTO clas_stud VALUES(?,?,?,?)", [
              clas,
              req.user.id_pers,
              " ",
              curr.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
            ]);
            asiss = " ";
          } else if (curr < limit_late) {
            await conn.query("INSERT INTO clas_stud VALUES(?,?,?,?)", [
              clas,
              req.user.id_pers,
              "-",
              curr.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
            ]);
            asiss = "-";
          } else {
            await conn.query("INSERT INTO clas_stud VALUES(?,?,?,?)", [
              clas,
              req.user.id_pers,
              "+",
              curr.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
            ]);
            asiss = "+";
          }
          conn.end();
          res.sendStatus(200);
        } else {
          res.send("To early");
        }
      }
    }
  }
});

module.exports = router;
