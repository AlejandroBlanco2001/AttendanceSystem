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
    let result = await conn.query(`SELECT s.name,sp.weekday_sche, sp.start_time_sche FROM course c
    INNER JOIN subject s ON s.code = c.code_subj
    INNER JOIN space sp ON c.code = sp.code_cour
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
    getAllSubjetctsTeacher,
    getSubjectInfo,
    separateSameClass,
    getStudentsClass
}