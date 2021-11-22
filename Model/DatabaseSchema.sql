DROP DATABASE IF EXISTS AttendanceSystem;

CREATE DATABASE If NOT EXISTS AttendanceSystem;
USE AttendanceSystem;

CREATE TABLE Department (
	id INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR(70) NOT NULL,
	-- Primary Key
	PRIMARY KEY (id)
);

CREATE TABLE Person (
	id VARCHAR(10) NOT NULL,
	name1 VARCHAR(50) NOT NULL,
	name2 VARCHAR(50),
	lastName1 VARCHAR(50) NOT NULL,
	lastName2 VARCHAR(50),
	gender ENUM('F', 'M', 'O') NOT NULL,
	birthdate DATE NOT NULL,
	age INTEGER AS (YEAR(CURRENT_DATE) - YEAR(birthdate)),
	type ENUM('0', '1', '2') NOT NULL, -- 0: admin, 1: teacher, 2: student
	id_dept INTEGER,
	-- Primary Key
	PRIMARY KEY (id),
	-- Foreign Key
	FOREIGN KEY (id_dept) REFERENCES Department(id),
	UNIQUE (id),
	-- Constraint
	CONSTRAINT teacher_dept_nn 
		CHECK (
			type = '0' OR 
			(type = '1' AND id_dept IS NOT NULL) OR 
			type = '2'
		)
);

CREATE TABLE User (
	username VARCHAR(50) NOT NULL,
	passcode VARCHAR(80) NOT NULL DEFAULT 'test',
	urlimage VARCHAR(500) 
	DEFAULT 'https://cdn-icons.flaticon.com/png/512/1144/premium/1144709.png?token=exp=1636986561~hmac=e7d2e38f7d3e6cd42e66a74e8daf6416',
	id_pers VARCHAR(10) NOT NULL,
	-- Primary Key
	PRIMARY KEY (userName, id_pers),
	-- Foreign Key
	FOREIGN KEY (id_pers) REFERENCES Person(id),
	-- Unique Key
	UNIQUE (id_pers)
);

CREATE TABLE Program (
	snies VARCHAR(6) NOT NULL,
	name VARCHAR(50) NOT NULL,
	type ENUM('0', '1') NOT NULL, -- 0: under, 1: post
	title VARCHAR(20) NOT NULL,
	duration INTEGER NOT NULL,
	credits INTEGER NOT NULL,
	id_dept INTEGER NOT NULL,
	-- Primary Key
	PRIMARY KEY (snies),
	-- Foreign Key
	FOREIGN KEY (id_dept) REFERENCES Department(id)
);

CREATE TABLE Subject (
	code VARCHAR(7) NOT NULL,
	name VARCHAR(50) NOT NULL,
	credits INTEGER NOT NULL,
	description VARCHAR(100),
	type ENUM('Theory and Laboratory', 'Theory') NOT NULL,
	urlimage VARCHAR(200),
	id_dept INTEGER NOT NULL,
	-- Primary Key
	PRIMARY KEY (code),
	-- Foreign Key
	FOREIGN KEY (id_dept) REFERENCES Department(id)
);

CREATE TABLE Syllabus (
	code VARCHAR(10) NOT NULL,
	snies_prog VARCHAR(6) NOT NULL,
	-- Primary Key
	PRIMARY KEY (code),
	-- Foreign Key
	FOREIGN KEY (snies_prog) REFERENCES Program(snies),
	-- Unique Key
	UNIQUE (snies_prog)
);

CREATE TABLE In_Syllabus (
	code_subj VARCHAR(7) NOT NULL,
	code_syll VARCHAR(10) NOT NULL,
	semester ENUM('1', '2', '3', '4') NOT NULL,
	-- Primary Key
	PRIMARY KEY (code_subj, code_syll),
	-- Foreign Key
	FOREIGN KEY (code_subj) REFERENCES Subject(code),
	FOREIGN KEY (code_syll) REFERENCES Syllabus(code)
);

DELIMITER $$

CREATE TRIGGER subjpersem 
	BEFORE INSERT ON In_Syllabus
	FOR EACH ROW
	BEGIN
		if (
			SELECT COUNT(*)
			FROM in_syllabus AS i INNER JOIN syllabus AS s
			ON i.code_syll = s.code
			WHERE s.code = NEW.code_syll AND i.semester = NEW.semester
			) = 3 then 
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'only 3 subjects per semester';
		end if;
	END $$

DELIMITER ;

CREATE TABLE Period (
	year YEAR NOT NULL,
	term ENUM('01', '02') NOT NULL,
	description VARCHAR(100),
	-- Primary Key
	PRIMARY KEY (year, term)
);

CREATE TABLE Course (
	code VARCHAR(7) NOT NULL,
	code_subj VARCHAR(7),
	id_teach VARCHAR(10) NOT NULL,
	-- Primary Key
	PRIMARY KEY (code),
	-- Foreign Key
	FOREIGN KEY (code_subj) REFERENCES Subject(code) ON DELETE SET NULL,
	FOREIGN KEY (id_teach) REFERENCES Person(id)
);

CREATE TABLE Offered_In (
	code_cour VARCHAR(7) NOT NULL,
	year_peri YEAR NOT NULL,
	term_peri ENUM('01', '02') NOT NULL,
	-- Primary Key
	PRIMARY KEY (code_cour, year_peri, term_peri),
	-- Foreign Key
	FOREIGN KEY (code_cour) REFERENCES Course(code),
	FOREIGN KEY (year_peri, term_peri) REFERENCES Period(year, term)
);

CREATE TABLE Classroom (
	code VARCHAR(4) NOT NULL,
	type ENUM('Physical', 'Virtual ') NOT NULL,
	-- Primary Key
	PRIMARY KEY (code)
);

CREATE TABLE Schedule (
	weekday ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday') NOT NULL,
	start_time TIME NOT NULL,
	duration INTEGER NOT NULL,
	end_time TIME AS (start_time + TIME(duration * 10000)),
	-- Primary Key
	PRIMARY KEY (weekday, start_time)
);

CREATE TABLE Space (
	code INTEGER NOT NULL AUTO_INCREMENT,
	code_cour VARCHAR(7) NOT NULL,
	weekday_sche ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday') NOT NULL,
	start_time_sche TIME NOT NULL,
	code_clasR VARCHAR(4) NOT NULL,
	-- Primary Key
	PRIMARY KEY (code, code_cour),
	-- Foreign Key
	FOREIGN KEY (code_cour) REFERENCES Course(code),
	FOREIGN KEY (weekday_sche, start_time_sche) REFERENCES Schedule(weekday, start_time),
	FOREIGN KEY (code_clasR) REFERENCES Classroom(code),
	-- Unique
	CONSTRAINT conflict_space 
	UNIQUE (weekday_sche, start_time_sche, code_clasR)
);

DELIMITER $$

CREATE TRIGGER correctAuto_Incr 
	BEFORE INSERT ON Space
	FOR EACH ROW 
	BEGIN
		SET NEW.code = (
		    SELECT IFNULL(MAX(code), 0) + 1
		    FROM Space
		    WHERE code_cour  = NEW.code_cour
		);
	END $$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER conflict_teacher_schedule
	BEFORE INSERT ON `space`
	FOR EACH ROW 
	BEGIN
		if (SELECT COUNT(*)
				FROM (
					SELECT sp.*
					FROM person AS p INNER JOIN course AS c
					ON p.id = c.id_teach INNER JOIN subject AS s
					ON s.code = c.code_subj INNER JOIN `space` AS sp
					ON sp.code_cour = c.code
					WHERE p.id = (
						SELECT p1.id
						FROM course AS c1 INNER JOIN person AS p1
						ON c1.id_teach = p1.id
						WHERE NEW.code_cour = c1.code
					)
				) AS t
				WHERE NEW.weekday_sche = t.weekday_sche AND NEW.start_time_sche = t.start_time_sche
			) = 1 then
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'schedule conflict teacher';
		end if;
	END $$

DELIMITER ;

CREATE TABLE Class (
	code VARCHAR(2) NOT NULL, 
	start_time DATETIME NOT NULL,
	code_spac INTEGER NOT NULL,
	qr_teach VARCHAR(80) NOT NULL,
	-- Primary Key
	PRIMARY KEY (code),
	-- Foreign Key
	FOREIGN KEY (code_spac) REFERENCES Space(code)
);

CREATE TABLE Clas_Stud (
	code_clas VARCHAR(2) NOT NULL,
	id_stud VARCHAR(10) NOT NULL,
	attendance VARCHAR(2) NOT NULL,
	-- Primary Key
	PRIMARY KEY (code_clas, id_stud),
	-- Foreign Key
	FOREIGN KEY (code_clas) REFERENCES Class(code),
	FOREIGN KEY (id_stud) REFERENCES Person(id)
);

CREATE table Contract (
	id INTEGER NOT NULL AUTO_INCREMENT,
	id_stud VARCHAR(10) NOT NULL,
	completed BOOLEAN NOT NULL DEFAULT FALSE, 
	code_syll VARCHAR(10) NOT NULL,
	year_peri YEAR NOT NULL,
	term_peri ENUM('01', '02') NOT NULL,
	-- Primary Key
	PRIMARY KEY (id, id_stud),
	-- Foreign Key
	FOREIGN KEY (id_stud) REFERENCES Person(id),
	FOREIGN KEY (code_syll) REFERENCES Syllabus(code),
	FOREIGN KEY (year_peri, term_peri) REFERENCES Period(year, term),
	-- Unique Key
	UNIQUE (id_stud)
);

CREATE TABLE Enrollment (
	id INTEGER NOT NULL AUTO_INCREMENT,
	id_stud VARCHAR(10) NOT NULL,
	year_peri YEAR NOT NULL,
	term_peri ENUM('01', '02') NOT NULL,
	-- Primary Key
	PRIMARY KEY (id, id_stud),
	-- Foreign Key
	FOREIGN KEY (id_stud) REFERENCES Person(id),
	FOREIGN KEY (year_peri, term_peri) REFERENCES Period(year, term)
);

CREATE TABLE Cour_Enro (
	code_cour VARCHAR(7) NOT NULL,
	id_enro INTEGER NOT NULL,
	studying BOOLEAN NOT NULL DEFAULT TRUE,
	completed BOOLEAN NOT NULL DEFAULT FALSE,
	-- Primary Key
	PRIMARY KEY (code_cour, id_enro),
	-- Foreign Key
	FOREIGN KEY (code_cour) REFERENCES Course(code),
	FOREIGN KEY (id_enro) REFERENCES Enrollment(id)
);

DELIMITER $$

CREATE TRIGGER enrollment_control_study_plan
	BEFORE INSERT ON Cour_Enro
	FOR EACH ROW 
	BEGIN
		if (SELECT MAX(e.id) AS new_val
			FROM enrollment AS e INNER JOIN contract AS c
			ON e.id_stud = c.id_stud
			INNER JOIN syllabus AS s
			ON s.code = c.code_syll
			INNER JOIN in_syllabus AS i
			ON i.code_syll = s.code
			INNER JOIN course AS cc
			ON cc.code_subj = i.code_subj
			WHERE NEW.id_enro = e.id AND NEW.code_cour = cc.code) IS NULL then 
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'code_cour does not match is found in the students study plan';
		end if;
	END $$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER enrollment_control_schedulle
	BEFORE INSERT ON Cour_Enro
	FOR EACH ROW 
	BEGIN
		if (SELECT MAX(a.start_time_sche)
			FROM (
				(SELECT s.weekday_sche, s.start_time_sche
				FROM cour_enro AS ce INNER JOIN course AS c
				ON ce.code_cour = c.code
				INNER JOIN space AS s
				ON s.code_cour = c.code
				WHERE ce.id_enro = NEW.id_enro)
				intersect
				(SELECT s.weekday_sche, s.start_time_sche
				FROM course AS c INNER JOIN space AS s
				ON s.code_cour = c.code
				WHERE c.code = NEW.code_cour)
			) AS a) IS NOT NULL then 
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'code_cour has schedulle conflict';
		end if;
	END $$

DELIMITER ;