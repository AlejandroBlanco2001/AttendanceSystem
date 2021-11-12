DROP DATABASE IF EXISTS AttendanceSystem;

CREATE DATABASE If NOT EXISTS AttendanceSystem;
USE AttendanceSystem;

CREATE TABLE Department (
	id VARCHAR(10),
	name VARCHAR(50) NOT NULL,
	-- Primary Key
	PRIMARY KEY (id)
);

CREATE TABLE Person (
	id VARCHAR(10),
	name1 VARCHAR(50) NOT NULL,
	name2 VARCHAR(50),
	lastName1 VARCHAR(50) NOT NULL,
	lastName2 VARCHAR(50),
	gender ENUM('F', 'M', 'O'),
	birthdate DATE,
	age INTEGER AS (YEAR(CURRENT_DATE) - YEAR(birthdate)),
	type ENUM('0', '1', '2') NOT NULL, -- 0: admin, 1: teacher, 2: student
	id_dept VARCHAR(10),
	-- Primary Key
	PRIMARY KEY (id),
	-- Foreign Key
	FOREIGN KEY (id_dept) REFERENCES Department(id),
	-- Constraint
	CONSTRAINT teacher_dept_nn 
		CHECK (
			type = '0' OR 
			(type = '1' AND id_dept IS NOT NULL) OR 
			type = '2'
		)
);

CREATE TABLE User (
	userName VARCHAR(50),
	password VARCHAR(50),
	id_pers VARCHAR(10) NOT NULL,
	online BOOLEAN NOT NULL,
	-- Primary Key
	PRIMARY KEY (userName, id_pers),
	-- Foreign Key
	FOREIGN KEY (id_pers) REFERENCES Person(id),
	-- Unique Key
	UNIQUE (id_pers)
);

CREATE TABLE Program (
	snies VARCHAR(6),
	title VARCHAR(50) NOT NULL,
	description VARCHAR(100),
	duration INTEGER NOT NULL,
	credits INTEGER NOT NULL,
	id_dept VARCHAR(10) NOT NULL,
	-- Primary Key
	PRIMARY KEY (snies),
	-- Foreign Key
	FOREIGN KEY (id_dept) REFERENCES Department(id)
);

CREATE TABLE Subject (
	code VARCHAR(7),
	name VARCHAR(50) NOT NULL,
	credits INTEGER NOT NULL,
	description VARCHAR(100),
	type VARCHAR(20) NOT NULL,
	id_dept VARCHAR(10) NOT NULL,
	-- Primary Key
	PRIMARY KEY (code),
	-- Foreign Key
	FOREIGN KEY (id_dept) REFERENCES Department(id)
);

CREATE TABLE Syllabus (
	code VARCHAR(10),
	snies_prog VARCHAR(6) NOT NULL,
	-- Primary Key
	PRIMARY KEY (code),
	-- Foreign Key
	FOREIGN KEY (snies_prog) REFERENCES Program(snies),
	-- Unique Key
	UNIQUE (snies_prog)
);

CREATE TABLE In_Syllabus (
	code_subj VARCHAR(7),
	code_syll VARCHAR(10),
	semester ENUM('1', '2', '3', '4') NOT NULL,
	-- Primary Key
	PRIMARY KEY (code_subj, code_syll),
	-- Foreign Key
	FOREIGN KEY (code_subj) REFERENCES Subject(code),
	FOREIGN KEY (code_syll) REFERENCES Syllabus(code)
);

CREATE table Course (
	code VARCHAR(4),
	code_subj VARCHAR(7),
	id_teach VARCHAR(10) NOT NULL,
	-- Primary Key
	PRIMARY KEY (code),
	-- Foreign Key
	FOREIGN KEY (code_subj) REFERENCES Subject(code) ON DELETE SET NULL,
	FOREIGN KEY (id_teach) REFERENCES Person(id)
);

CREATE TABLE ClassRoom (
	code VARCHAR(4),
	type ENUM('Physical', 'Virtual ') NOT NULL,
	-- Primary Key
	PRIMARY KEY (code)
);

CREATE TABLE Schedule (
	weekday ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	start_time TIME NOT NULL,
	duration INTEGER NOT NULL,
	code_cour VARCHAR(4),
	code_claR VARCHAR(4) NOT NULL,
	-- Primary Key
	PRIMARY KEY (weekday, code_cour),
	-- Foreign Key
	FOREIGN KEY (code_cour) REFERENCES Course(code),
	FOREIGN KEY (code_claR) REFERENCES ClassRoom(code)
);

CREATE TABLE Class (
	code VARCHAR(2),
	code_cour VARCHAR(4) NOT NULL,
	code_claR VARCHAR(4) NOT NULL,
	start_time DATETIME NOT NULL,
	-- Primary Key
	PRIMARY KEY (code, code_cour),
	-- Foreign Key
	FOREIGN KEY (code_cour) REFERENCES Course(code),
	FOREIGN KEY (code_claR) REFERENCES ClassRoom(code)
);

CREATE TABLE Clas_Stud (
	code_clas VARCHAR(2),
	code_cour_clas VARCHAR(4),
	id_stud VARCHAR(10),
	attendance BOOLEAN NOT NULL,
	-- Primary Key
	PRIMARY KEY (code_clas, code_cour_clas, id_stud),
	-- Foreign Key
	FOREIGN KEY (code_clas) REFERENCES Class(code),
	FOREIGN KEY (code_cour_clas) REFERENCES Class(code_cour),
	FOREIGN KEY (id_stud) REFERENCES Person(id)
);

CREATE TABLE Period (
	year YEAR,
	term ENUM('01', '02'),
	description VARCHAR(100),
	-- Primary Key
	PRIMARY KEY (year, term)
);

CREATE table Contract (
	id VARCHAR(10),
	id_stud VARCHAR(10),
	completed BOOLEAN NOT NULL, 
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

CREATE TABLE Offered_In (
	code_cour VARCHAR(4),
	year_peri YEAR,
	term_peri ENUM('01', '02'),
	-- Primary Key
	PRIMARY KEY (code_cour, year_peri, term_peri),
	-- Foreign Key
	FOREIGN KEY (code_cour) REFERENCES Course(code),
	FOREIGN KEY (year_peri, term_peri) REFERENCES Period(year, term)
);

CREATE TABLE Enrollment (
	id VARCHAR(10),
	id_stud VARCHAR(10),
	approved BOOLEAN NOT NULL,
	completed BOOLEAN NOT NULL,
	year_peri YEAR NOT NULL,
	term_peri ENUM('01', '02') NOT NULL,
	code_cour VARCHAR(4) NOT NULL,
	-- Primary Key
	PRIMARY KEY (id, id_stud),
	-- Foreign Key
	FOREIGN KEY (id_stud) REFERENCES Person(id),
	FOREIGN KEY (year_peri, term_peri) REFERENCES Period(year, term),
	FOREIGN KEY (code_cour) REFERENCES Course(CODE)
);

CREATE TABLE Cour_Enro (
	code_cour VARCHAR(4) NOT NULL,
	id_enro VARCHAR(10),
	-- Primary Key
	PRIMARY KEY (code_cour, id_enro),
	-- Foreign Key
	FOREIGN KEY (code_cour) REFERENCES Class(code),
	FOREIGN KEY (id_enro) REFERENCES Enrollment(id)
);