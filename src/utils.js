const randomstring = require("randomstring");

async function getAllSubjetctsStudent(conn, id){
    let result = await conn.query(`SELECT DT.*, CONCAT(p.name1,' ',p.lastName1) "Nombre" FROM person p
    INNER JOIN
    (
        SELECT s.name, c.id_teach, s.credits ,s.urlimage, sp.weekday_sche, sp.start_time_sche
        FROM person AS p INNER JOIN enrollment AS e ON p.id = e.id_stud INNER JOIN cour_enro AS ce
        ON ce.id_enro = e.id INNER JOIN course AS c ON c.code = ce.code_cour INNER JOIN subject AS s 
        ON s.code = c.code_subj INNER JOIN space AS sp ON sp.code_cour = c.code WHERE p.id = "${id}"
    ) DT 
    ON p.id = DT.id_teach`);
    if(result) return result;
    else return -1;
}

async function getAllSubjetctsTeacher(conn, id){
    console.log(id);
    let result = await conn.query(`
    SELECT DISTINCT s.name, s.credits, c.code, s.urlimage, sp.weekday_sche, sp.start_time_sche
    FROM person AS p INNER JOIN enrollment AS e ON p.id = e.id_stud INNER JOIN cour_enro AS ce
    ON ce.id_enro = e.id INNER JOIN course AS c ON c.code = ce.code_cour INNER JOIN subject AS s 
    ON s.code = c.code_subj INNER JOIN space AS sp ON sp.code_cour = c.code WHERE c.id_teach = "${id}";`);
    if(result) return result;
    else return -1;
}

async function getStudentsClass(conn,args){
    let {code,id_pers} = args;
    let result = await conn.query(`
    SELECT s.name,sp.weekday_sche, sp.start_time_sche, cl.qr_teach "teacherCode" FROM course c
    INNER JOIN subject s ON s.code = c.code_subj
    INNER JOIN space sp ON c.code = sp.code_cour
    INNER JOIN class cl ON cl.code_spac = sp.code
    INNER JOIN schedule sc ON sp.weekday_sche = sc.weekday AND sp.start_time_sche = sc.start_time 
    INNER JOIN cour_enro ce ON c.code = ce.code_cour
    INNER JOIN enrollment e ON ce.id_enro = e.id
    INNER JOIN person p ON p.id = e.id_stud
    WHERE c.code = '${code}' AND p.id='${id_pers}';`);
    if(result) return result;
    else return -1;
}

async function getSubjectInfo(conn, id){
    let result = await conn.query(`SELECT s.*, s.urlimage, d.name AS department
    FROM subject AS s INNER JOIN department AS d
    ON d.id = s.id_dept
    WHERE s.code = '${id}';`)
    if(result) return result;
    else return -1;
}

async function getClassHours(conn,id){
    let result = await conn.query(`
    SELECT se.name, sp.start_time_sche "schedule", CONCAT(c.code_subj,"/",c.code) "codigo" FROM course c
    INNER JOIN cour_enro ce ON c.code = ce.code_cour
    INNER JOIN enrollment e ON ce.id_enro = e.id 
    INNER JOIN space sp ON sp.code_cour = c.code
    INNER JOIN subject se ON se.code = c.code_subj 
    INNER JOIN schedule sc ON sc.weekday = sp.weekday_sche AND sc.start_time = sp.start_time_sche 
    WHERE DAYNAME(CURRENT_DATE()) = sp.weekday_sche AND NOW() BETWEEN sp.start_time_sche AND ADDTIME(sp.start_time_sche, sc.duration * 10000) AND e.id_stud = '${id}'; 
    `)
    if(result) return result;
    else return -1;
}

async function getHourClass(conn,id){
    let result = await conn.query(`
    SELECT sp.start_time_sche 'time' FROM Course c
    INNER JOIN Space sp ON c.code = sp.code_cour
    WHERE c.code = '${id}';
    `)
    if(result) return result;
    else return -1;
}

async function checkCodesClass(conn,id){
    let result = await conn.query(`
    SELECT * FROM course c
    WHERE CONCAT(c.code_subj,'/',c.code) = '${id}';
    `)
    if(result) return result;
    else return -1;
}

async function checkCodesTeacher(conn,id){
    let result = await conn.query(`
    SELECT * FROM class c
    WHERE c.qr_teach = '${id}';
    `)
    if(result) return result;
    else return -1;
}

async function getClassSession(conn,id){
    let result = await conn.query(`
    SELECT cl.code FROM course c
    INNER JOIN space sp ON sp.code_cour = c.code;
    INNER JOIN class cl ON sp.code = cl.code_spac
    WHERE c.code = '${id}';
    `)
    if(result) return result;
    else return -1;
}

async function getCodeClassCreated(conn,id){
    let result = await conn.query(`
    SELECT cl.code, cl.qr_teach FROM course c 
    INNER JOIN space sp ON c.code = sp.code_cour 
    INNER JOIN class cl ON cl.code_spac = sp.code 
    INNER JOIN schedule AS sc ON sp.weekday_sche = sc.weekday AND sp.start_time_sche = sc.start_time
    WHERE c.code = '${id}' AND NOW() BETWEEN sp.start_time_sche AND ADDTIME(sp.start_time_sche, sc.duration * 10000);
    `);
    if(result) return result[0];
    else return -1;
}

async function addTeacherCode(conn,id){
    let code_class = await getCodeClassCreated(conn,id)
    let randomCode = randomstring.generate({
        length: 10,
        charset: 'alphanumerical'
    });
    await conn.query(`UPDATE Class c SET qr_teach = '${randomCode}' WHERE c.code = ${code_class.code}`);
    return randomCode;
}

async function getAttendanceClass(conn,id){
    let result = await conn.query(`
    SELECT CONCAT(p.name1,' ', p.lastName1,) 'name', CONCAT(s.code,'/',c.code) 'codigo', cs.logAttendace FROM course c 
    INNER JOIN space sp ON c.code = sp.code_cour 
    INNER JOIN subject s ON s.code = c.code_subj
    INNER JOIN class cl ON cl.code_spac = sp.code 
    INNER JOIN clas_stud cs ON cs.code_clas = cl.code
    INNER JOIN person p ON p.id = cs.id_stud 
    INNER JOIN schedule AS sc ON sp.weekday_sche = sc.weekday AND sp.start_time_sche = sc.start_time
    WHERE c.code = '${id}' AND NOW() BETWEEN sp.start_time_sche AND ADDTIME(sp.start_time_sche, sc.duration * 10000);
    `)
    if(result) return result;
    else return -1;
}

function separateSameClass(classes){
    let seen = {};
    let res = [];
    Array.from(classes).forEach((item)=>{
        if(seen[item.name]){
            seen[item.name].schedule += '|' + item.weekday_sche + ' at ' + item.start_time_sche;
        }else{
            item['schedule'] = item.weekday_sche + ' at ' + item.start_time_sche;
            delete item.weekday_sche;
            delete item.start_time_sche;
            seen[item.name] = item;
        }
    })
    for (var [key, value] of Object.entries(seen)) {
        res.push(value);
    }
    return res;
}


module.exports = {
    getAllSubjetctsStudent,
    getCodeClassCreated,
    getAllSubjetctsTeacher,
    getSubjectInfo,
    getStudentsClass,
    getClassHours,
    getHourClass,
    addTeacherCode,
    getAttendanceClass,
    getClassSession,
    checkCodesClass,
    checkCodesTeacher,
    separateSameClass,
}