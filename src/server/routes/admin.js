const { Router } = require("express");
const router = Router();
const path = require("path");
const db = require("./database");

//Possible record paths array
const routeStr = [
  "/users",
  "/persons",
  "/subjects",
  "/departments",
  "/courses",
  "/spaces",
  "/schedules",
  "/classrooms",
  "/classes",
  "/enrollments",
  "/periods",
  "/contracts",
  "/syllabuses",
  "/programs",
  "/periodCourses",
  "/enrollmentCourses",
  "/studentClasses",
  "/syllabusSubjects",
];

//Read Get
router.get(routeStr, async (req, res) => {
  if (req.user) {
    if (req.user.type == "0") {
      let queryTable;
      if (req.path == routeStr[14]) {
        queryTable = "offered_in";
      } else {
        if (req.path == routeStr[15]) {
          queryTable = "cour_enro";
        } else {
          if (req.path == routeStr[16]) {
            queryTable = "clas_stud";
          } else {
            if (req.path == routeStr[17]) {
              queryTable = "in_syllabus";
            } else {
              let r;
              if (req.path == routeStr[8] || req.path == routeStr[12]) {
                r = 2;
              } else {
                r = 1;
              }
              queryTable = req.path.substring(1, req.path.length - r);
            }
          }
        }
      }
      let conn;
      try {
        conn = await db.pool.getConnection();
        if (req.path == routeStr[1]) {
          results = await conn.query(
            "SELECT id, name1, name2, lastname1, lastname2, gender, birthdate, age, type, id_dept FROM " +
              queryTable
          );
        } else {
          results = await conn.query("SELECT * FROM " + queryTable);
        }
        conn.end();
      } catch (e) {
        res.sendStatus(500);
      }
      res.json(results);
    } else {
      res.send("You´re not an admin.");
    }
  } else {
    res.send("Not logged in.");
  }
});

//Insert Posts
router.post("/create/:record", async (req, res) => {
  if (req.user) {
    if (req.user.type == "0") {
      let rec = req.params.record;
      let update = req.body;
      let query, table;
      let results;
      table = await identifyTable(rec);
      query = `INSERT INTO ${table} `;
      let part1 = "(",
        part2 = "(";
      for (var [key, value] of Object.entries(update)) {
        if (table == "user") {
          if (key != "type") {
            part2 +=
              value === null || typeof value.type == "number"
                ? `${value}, `
                : `'${value}', `;
            part1 += `${key}, `;
          }
        } else {
          part2 +=
            value === null || typeof value.type == "number"
              ? `${value}, `
              : `'${value}', `;
          part1 += `${key}, `;
        }
      }
      part1 = part1.slice(0, -2) + ")";
      part2 = part2.slice(0, -2) + ")";
      query += part1 + ` VALUES ` + part2 + ";";
      try {
        let conn = await db.pool.getConnection();
        results = await conn
          .query(query)
          .then((response) => {
            res.sendStatus(200);
          })
          .catch((err) => {
            throw err;
          });
        conn.end();
        return results;
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    } else {
      res.send("You´re not an admin.");
    }
  } else {
    res.send("Not logged in.");
  }
});

//Update Posts
router.post("/update/:record/:pkey", async (req, res) => {
  if (req.user) {
    if (req.user.type == "0") {
      let pkeysV = req.params.pkey.split("|");
      let rec = req.params.record;
      let update = req.body;
      let query, table;
      let results;
      table = await identifyTable(rec);
      query = `UPDATE ${table} SET `;
      for (var [key, value] of Object.entries(update)) {
        if (table == "user") {
          if (key != "type") {
            query +=
              value === null || typeof value.type == "number"
                ? `${key} = ${value},`
                : `${key} = '${value}',`;
          }
        } else {
          query +=
            value === null || typeof value.type == "number"
              ? `${key} = ${value},`
              : `${key} = '${value}',`;
        }
      }
      query = query.slice(0, -1);
      query += ` WHERE `;
      let pkeys;
      try {
        let conn = await db.pool.getConnection();
        pkeys = await conn.query(`SELECT k.COLUMN_NAME
        FROM information_schema.table_constraints t
        LEFT JOIN information_schema.key_column_usage k
        USING(constraint_name,table_schema,table_name)
        WHERE t.constraint_type='PRIMARY KEY'
            AND t.table_schema=DATABASE()
            AND t.table_name='${table}';`);
        await conn.end();
      } catch (e) {
        console.log(e);
      }
      console.log(pkeysV);
      for (let j = 0; j < pkeysV.length; j++) {
        query += `${pkeys[j].COLUMN_NAME} = '${pkeysV[j]}'`;
        if (j == pkeys.length - 1) {
          query += ";";
        } else {
          query += " AND ";
        }
      }
      try {
        let conn = await db.pool.getConnection();
        results = await conn
          .query(query)
          .then((response) => {
            console.log(response);
            res.sendStatus(200);
          })
          .catch((err) => {
            throw err;
          });
        conn.end();
        return results;
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    } else {
      res.send("You´re not an admin.");
    }
  } else {
    res.send("Not logged in.");
  }
});

//Delete Posts
router.post("/delete/:record/:pkey", async (req, res) => {
  if (req.user) {
    if (req.user.type == "0") {
      let pkeysV = req.params.pkey.split("|");
      let rec = req.params.record;
      let query, results, pkeys;
      let table = await identifyTable(rec);
      query = `DELETE FROM ${table} WHERE `;
      try {
        let conn = await db.pool.getConnection();
        pkeys = await conn.query(`SELECT k.COLUMN_NAME
        FROM information_schema.table_constraints t
        LEFT JOIN information_schema.key_column_usage k
        USING(constraint_name,table_schema,table_name)
        WHERE t.constraint_type='PRIMARY KEY'
            AND t.table_schema=DATABASE()
            AND t.table_name='${table}';`);
        await conn.end();
      } catch (e) {
        console.log(e);
      }
      for (let j = 0; j < pkeysV.length; j++) {
        query += `${pkeys[j].COLUMN_NAME} = '${pkeysV[j]}'`;
        if (j == pkeysV.length - 1) {
          query += ";";
        } else {
          query += " AND ";
        }
      }
      try {
        let conn = await db.pool.getConnection();
        results = await conn
          .query(query)
          .then((response) => {
            res.sendStatus(200);
          })
          .catch((err) => {
            throw err;
          });
        conn.end();
        return results;
      } catch (e) {
        console.log(e);
        res.sendStatus(500);
      }
    } else {
      res.send("You`re not an admin.");
    }
  } else {
    res.send("Not logged in.");
  }
});

async function identifyTable(record) {
  let table;
  if ([8, 12].includes(routeStr.indexOf("/" + record, 0))) {
    table = record.slice(0, -2);
  } else {
    if (routeStr.indexOf("/" + record, 0) >= 14) {
      switch (routeStr.indexOf("/" + record, 0)) {
        case 14: {
          table = "offered_in";
          break;
        }
        case 15: {
          table = "cour_enro";
          break;
        }
        case 16: {
          table = "clas_stud";
          break;
        }
        case 17: {
          table = "in_syllabus";
          break;
        }
      }
    } else {
      table = record.slice(0, -1);
    }
  }
  return table;
}

async function insertData(table, values) {
  let conn;
  try {
    conn = await db.pool.getConnection();
    const str = "?,".repeat(values.length).slice(0, -1);
    const res = await conn.query(
      "INSERT INTO " + table + " VALUES (" + str + ")",
      values
    );
    conn.end();
    return res;
  } catch (error) {
    throw error;
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
/*
En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lantejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda. El resto della concluían sayo de velarte, calzas de velludo para las fiestas, con sus pantuflos de lo mesmo, y los días de entresemana se honraba con su vellorí de lo más fino. Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza, que así ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro hidalgo con los cincuenta años; era de complexión recia, seco de carnes, enjuto de rostro, gran madrugador y amigo de la caza. Quieren decir que tenía el sobrenombre de Quijada, o Quesada, que en esto hay alguna diferencia en los autores que deste caso escriben; aunque por conjeturas verosímiles se deja entender que se llamaba Quijana. Pero esto importa poco a nuestro cuento: basta que en la narración dél no se salga un punto de la verdad.
Es, pues, de saber que este sobredicho hidalgo, los ratos que estaba ocioso, que eran los más del año, se daba a leer libros de caballerías, con tanta afición y gusto, que olvidó casi de todo punto el ejercicio de la caza, y aun la administración de su hacienda; y llegó a tanto su curiosidad y desatino en esto, que vendió muchas hanegas de tierra de sembradura para comprar libros de caballerías en que leer, y así, llevó a su casa todos cuantos pudo haber dellos; y de todos, ningunos le parecían tan bien como los que compuso el famoso Feliciano de Silva; porque la claridad de su prosa y aquellas entricadas razones suyas le parecían de perlas, y más cuando llegaba a leer aquellos requiebros y cartas de desafíos, donde en muchas partes hallaba escrito: «La razón de la sinrazón que a mi razón se hace, de tal manera mi razón enflaquece, que con razón me quejo de la vuestra fermosura». Y también cuando leía: «... los altos cielos que de vuestra divinidad divinamente con las estrellas os fortifican, y os hacen merecedora del merecimiento que merece la vuestra grandeza».
Con estas razones perdía el pobre caballero el juicio, y desvelábase por entenderlas y desentrañarles el sentido, que no se lo sacara ni las entendiera el mesmo Aristóteles, si resucitara para sólo ello. No estaba muy bien con las heridas que don Belianís daba y recebía, porque se imaginaba que, por grandes maestros que le hubiesen curado, no dejaría de tener el rostro y todo el cuerpo lleno de cicatrices y señales. Pero, con todo, alababa en su autor aquel acabar su libro con la promesa de aquella inacabable aventura, y muchas veces le vino deseo de tomar la pluma y dalle fin al pie de la letra, como allí se promete; y sin duda alguna lo hiciera, y aun saliera con ello, si otros mayores y continuos pensamientos no se lo estorbaran. Tuvo muchas veces competencia con el cura de su lugar (que era hombre docto, graduado en Sigüenza), sobre cuál había sido mejor caballero: Palmerín de Ingalaterra, o Amadís de Gaula; mas maese Nicolás, barbero del mismo pueblo, decía que ninguno llegaba al Caballero del Febo, y que si alguno se le podía comparar, era don Galaor, hermano de Amadís de Gaula, porque tenía muy acomodada condición para todo; que no era caballero melindroso, ni tan llorón como su hermano, y que en lo de la valentía no le iba en zaga.
En resolución, él se enfrascó tanto en su lectura, que se le pasaban las noches leyendo de claro en claro, y los días de turbio en turbio; y así, del poco dormir y del mucho leer se le secó el celebro de manera, que vino a perder el juicio. Llenósele la fantasía de todo aquello que leía en los libros, así de encantamentos como de pendencias, batallas, desafíos, heridas, requiebros, amores, tormentas y disparates imposibles; y asentósele de tal modo en la imaginación que era verdad toda aquella máquina de aquellas soñadas invenciones que leía, que para él no había otra historia más cierta en el mundo. Decía él que el Cid Ruy Díaz había sido muy buen caballero; pero que no tenía que ver con el Caballero de la Ardiente Espada, que de sólo un revés había partido por medio dos fieros y descomunales gigantes. Mejor estaba con Bernardo del Carpio, porque en Roncesvalles había muerto a Roldán el encantado, valiéndose de la industria de Hércules, cuando ahogó a Anteo, el hijo de la Tierra, entre los brazos. Decía mucho bien del gigante Morgante, porque, con ser de aquella generación gigantea, que todos son soberbios y descomedidos, él solo era afable y bien criado. Pero, sobre todos, estaba bien con Reinaldos de Montalbán, y más cuando le veía salir de su castillo y robar cuantos topaba, y cuando en allende robó aquel ídolo de Mahoma que era todo de oro, según dice su historia. Diera él, por dar una mano de coces al traidor de Galalón, al ama que tenía, y aun a su sobrina de añadidura.
En efeto, rematado ya su juicio, vino a dar en el más extraño pensamiento que jamás dio loco en el mundo; y fue que le pareció convenible y necesario, así para el aumento de su honra como para el servicio de su república, hacerse caballero andante, y irse por todo el mundo con sus armas y caballo a buscar las aventuras y a ejercitarse en todo aquello que él había leído que los caballeros andantes se ejercitaban, deshaciendo todo género de agravio, y poniéndose en ocasiones y peligros donde, acabándolos, cobrase eterno nombre y fama. Imaginábase el pobre ya coronado por el valor de su brazo, por lo menos, del imperio de Trapisonda; y así, con estos tan agradables pensamientos, llevado del extraño gusto que en ellos sentía, se dio priesa a poner en efeto lo que deseaba. Y lo primero que hizo fue limpiar unas armas que habían sido de sus bisabuelos, que, tomadas de orín y llenas de moho, luengos siglos había que estaban puestas y olvidadas en un rincón. Limpiólas y aderezólas lo mejor que pudo, pero vio que tenían una gran falta, y era que no tenían celada de encaje, sino morrión simple; mas a esto suplió su industria, porque de cartones hizo un modo de media celada, que, encajada con el morrión, hacían una apariencia de celada entera. Es verdad que para probar si era fuerte y podía estar al riesgo de una cuchillada, sacó su espada y le dio dos golpes, y con el primero y en un punto deshizo lo que había hecho en una semana; y no dejó de parecerle mal la facilidad con que la había hecho pedazos, y, por asegurarse deste peligro, la tornó a hacer de nuevo, poniéndole unas barras de hierro por de dentro, de tal manera, que él quedó satisfecho de su fortaleza y, sin querer hacer nueva experiencia della, la diputó y tuvo por celada finísima de encaje.
Fue luego a ver su rocín, y aunque tenía más cuartos que un real y más tachas que el caballo de Gonela, que tantum pellis et ossa fuit, le pareció que ni el Bucéfalo de Alejandro ni Babieca el del Cid con él se igualaban. Cuatro días se le pasaron en imaginar qué nombre le pondría; porque (según se decía él a sí mesmo) no era razón que caballo de caballero tan famoso, y tan bueno él por sí, estuviese sin nombre conocido; y ansí, procuraba acomodársele de manera que declarase quién había sido antes que fuese de caballero andante, y lo que era entonces; pues estaba muy puesto en razón que, mudando su señor estado, mudase él también el nombre, y le cobrase famoso y de estruendo, como convenía a la nueva orden y al nuevo ejercicio que ya profesaba; y así, después de muchos nombres que formó, borró y quitó, añadió, deshizo y tornó a hacer en su memoria e imaginación, al fin le vino a llamar Rocinante, nombre, a su parecer, alto, sonoro y significativo de lo que había sido cuando fue rocín, antes de lo que ahora era, que era antes y primero de todos los rocines del mundo.
Puesto nombre, y tan a su gusto, a su caballo, quiso ponérsele a sí mismo, y en este pensamiento duró otros ocho días, y al cabo se vino a llamar don Quijote; de donde, como queda dicho, tomaron ocasión los autores desta tan verdadera historia que, sin duda, se debía de llamar Quijada, y no Quesada, como otros quisieron decir. Pero, acordándose que el valeroso Amadís no sólo se había contentado con llamarse Amadís a secas, sino que añadió el nombre de su reino y patria, por hacerla famosa, y se llamó Amadís de Gaula, así quiso, como buen caballero, añadir al suyo el nombre de la suya y llamarse don Quijote de la Mancha, con que, a su parecer, declaraba muy al vivo su linaje y patria, y la honraba con tomar el sobrenombre della.
Limpias, pues, sus armas, hecho del morrión celada, puesto nombre a su rocín y confirmándose a sí mismo, se dio a entender que no le faltaba otra cosa sino buscar una dama de quien enamorarse: porque el caballero andante sin amores era árbol sin hojas y sin fruto y cuerpo sin alma. Decíase él: «Si yo, por malos de mis pecados, o por mi buena suerte, me encuentro por ahí con algún gigante, como de ordinario les acontece a los caballeros andantes, y le derribo de un encuentro, o le parto por mitad del cuerpo, o, finalmente, le venzo y le rindo, ¿no será bien tener a quien enviarle presentado, y que entre y se hinque de rodillas ante mi dulce señora, y diga con voz humilde y rendida: «Yo, señora, soy el gigante Caraculiambro, señor de la ínsula Malindrania, a quien venció en singular batalla el jamás como se debe alabado caballero don Quijote de la Mancha, el cual me mandó que me presentase ante vuestra merced, para que la vuestra grandeza disponga de mí a su talante»? ¡Oh, cómo se holgó nuestro buen caballero cuando hubo hecho este discurso, y más cuando halló a quien dar nombre de su dama! Y fue, a lo que se cree, que en un lugar cerca del suyo había una moza labradora de muy buen parecer, de quien él un tiempo anduvo enamorado, aunque, según se entiende, ella jamás lo supo, ni le dio cata dello. Llamábase Aldonza Lorenzo, y a ésta le pareció ser bien darle título de señora de sus pensamientos; y, buscándole nombre que no desdijese mucho del suyo, y que tirase y se encaminase al de princesa y gran señora, vino a llamarla Dulcinea del Toboso, porque era natural del Toboso; nombre, a su parecer, músico y peregrino y significativo, como todos los demás que a él y a sus cosas había puesto.
*/