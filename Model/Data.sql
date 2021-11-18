USE AttendanceSystem;

-- Creation Departments
INSERT INTO Department (name) VALUES
('Architecture and Urbanism'),
('Design'),
('Physics and Geosciences'),
('Mathematics and Statistics'),
('Chemistry and Biology'),
('Computer and Systems Engineering'),
('Spanish'),
('Social Comunication');

-- Academic Program Architecture
INSERT INTO Program VALUES
('90329', 'Architecture', '0', 'Architect', 4, 41, 1);

-- Syllabus Architecture
INSERT INTO Syllabus VALUES
('90329_1', '90329');

INSERT INTO Subject VALUES
-- Semester 1 Architecture
('ARQ4071', 'Expression Workshop I', 4, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/1935/1935173.png', 1),
('MAT1011', 'Algebra and Trigonometry', 3, '', 'Theory', 'https://cdn-icons-png.flaticon.com/512/3079/3079210.png', 4),
('ARQ4125', 'Basic Workshop I', 4, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/681/681560.png', 1),
-- Semester 2 Architecture
('ARQ4072', 'Expression Workshop II', 4, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/1935/1935173.png', 1),
('ARQ4027', 'Construction Principles', 3, '', 'Theory', 'https://cdn-icons-png.flaticon.com/512/899/899154.png', 1),
('ARQ4120', 'Basic Workshop II', 4, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/681/681560.png', 1),
-- Semester 3 Architecture
('ARQ4018', 'Graphic Techniques I', 4, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/6078/6078025.png', 1),
('ARQ4050', 'Habitat, Climate and Environment', 3, '', 'Theory', 'https://cdn-icons.flaticon.com/png/512/4078/premium/4078446.png?token=exp=1636988008~hmac=ac44f407c184b9d666e9eef0cc6cbdab', 1),
('ARQ4023', 'Construction I', 3, '', 'Theory', 'https://cdn-icons.flaticon.com/png/512/2276/premium/2276374.png?token=exp=1636988132~hmac=0a1772dc8a4e71072e2b1fd04138fbc3', 1),
-- Semester 4 Architecture
('ARQ4014', 'History and Theory - XIX Century', 3, '', 'Theory', 'https://cdn-icons.flaticon.com/png/512/4215/premium/4215285.png?token=exp=1636988194~hmac=eefb01d736922ec1eb48eb87a3e5dbc3', 1),
('ARQ4019', 'Graphic Techniques II', 3, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/6078/6078025.png', 1),
('ARQ4024', 'Construction II', 3, '', 'Theory', 'https://cdn-icons.flaticon.com/png/512/2276/premium/2276374.png?token=exp=1636988132~hmac=0a1772dc8a4e71072e2b1fd04138fbc3', 1);

-- In Syllabus Architecture
INSERT INTO In_syllabus VALUES
('ARQ4071', '90329_1', 1), ('MAT1011', '90329_1', 1), ('ARQ4125', '90329_1', 1),
('ARQ4072', '90329_1', 2), ('ARQ4027', '90329_1', 2), ('ARQ4120', '90329_1', 2),
('ARQ4018', '90329_1', 3), ('ARQ4050', '90329_1', 3), ('ARQ4023', '90329_1', 3),
('ARQ4014', '90329_1', 4), ('ARQ4019', '90329_1', 4), ('ARQ4024', '90329_1', 4);

-- Academic Program Industrial Design
INSERT INTO Program VALUES
('20477', 'Industrial Design', '0', 'Industrial Designer', 4, 51, 2);

-- Syllabus Industrial Design
INSERT INTO Syllabus VALUES
('20477_1', '20477');

INSERT INTO Subject VALUES
-- Semester 1 Industrial Design
('DIN5050', 'Composition Workshop I', 5, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/1874/1874643.png', 2),
('DIN5060', 'Design Theory I', 2, '', 'Theory', 'https://cdn-icons-png.flaticon.com/512/2807/2807101.png', 2),
('DIN5070', 'Expression Workshop I', 3, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/1935/1935173.png', 2),
-- Semester 2 Industrial Design
('DIN5010', 'Composition Workshop II', 5, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/1874/1874643.png', 2),
('DIN7120', 'Design Theory II', 3, '', 'Theory', 'https://cdn-icons-png.flaticon.com/512/2807/2807101.png', 2),
('DIN5020', 'Expression Workshop II', 3, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/1935/1935173.png', 2),
-- Semester 3 Industrial Design
('DIN0033', 'Materials and Processes I', 3, '', 'Theory and Laboratory', 'https://cdn-icons.flaticon.com/png/512/3137/premium/3137770.png?token=exp=1636988447~hmac=e697b785eed41669fc33e9cea53dda45', 2),
('DIN7040', 'Human Factors Workshop', 5, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/426/426736.png', 2),
('FIS1080', 'Physics I - DI', 3, '', 'Theory and Laboratory', 'https://cdn-icons.flaticon.com/png/512/4090/premium/4090374.png?token=exp=1636988643~hmac=0f15ab396622b698deef68e1484a2e15', 3),
-- Semester 4 Industrial Design
('DIN0035', 'Materials and Processes II', 3, '', 'Theory and Laboratory', 'https://cdn-icons.flaticon.com/png/512/3137/premium/3137770.png?token=exp=1636988447~hmac=e697b785eed41669fc33e9cea53dda45', 2),
('DIN5040', 'Design Ecology', 3, '', 'Theory', 'https://cdn-icons-png.flaticon.com/512/1104/1104857.png', 2),
('DIN7080', 'Digital Design I', 3, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/2721/2721291.png', 2);

-- In Syllabus Industrial Design
INSERT INTO in_syllabus VALUES
('DIN5050', '20477_1', 1), ('DIN5060', '20477_1', 1), ('DIN5070', '20477_1', 1),
('DIN5010', '20477_1', 2), ('DIN7120', '20477_1', 2), ('DIN5020', '20477_1', 2),
('DIN0033', '20477_1', 3), ('DIN7040', '20477_1', 3), ('FIS1080', '20477_1', 3),
('DIN0035', '20477_1', 4), ('DIN5040', '20477_1', 4), ('DIN7080', '20477_1', 4);

-- Academic Program Graphic Design
INSERT INTO Program VALUES
('52362', 'Graphic Design', '0', 'Graphic Designer', 4, 36, 2);

-- Syllabus Graphic Design
INSERT INTO Syllabus VALUES
('52362_1', '52362');

INSERT INTO Subject VALUES
-- Semester 1 Graphic Design
('DIG0036', 'Design History', 3, '', 'Theory', 'https://cdn-icons-png.flaticon.com/512/2285/2285189.png', 2),
('CAS3020', 'Communicative Competences I', 3, '', 'Theory', 'https://cdn-icons-png.flaticon.com/512/3050/3050525.png', 7),
-- ('DIN5070', 'Expression Workshop I', 3, '', 'Theory and Laboratory', 1),
-- Semester 2 Graphic Design
('ART0020', 'Photography and Laboratory', 3, '', 'Theory and Laboratory', 'https://cdn-icons.flaticon.com/png/512/792/premium/792947.png?token=exp=1636988867~hmac=da909d345a5ae43f31a0701d7cfe8e78', 8),
('CAS3030', 'Communicative Competences II', 3, '', 'Theory', 'https://cdn-icons-png.flaticon.com/512/3050/3050525.png', 7),
-- ('DIN5020', 'Expression Workshop II', 3, '', 'Theory and Laboratory', 1),
-- Semester 3 Graphic Design
('DIG0037', 'Advertising Photography', 3, '', 'Theory', 'https://cdn-icons-png.flaticon.com/512/2005/2005181.png',  2),
('CMN1060', 'Semiotica y Comunicación', 3, '', 'Theory', 'https://cdn-icons.flaticon.com/png/512/3061/premium/3061332.png?token=exp=1636989079~hmac=aac753c7bdf282b450d59d5bc35222be', 8),
('DIG4010', 'Expression Workshop III', 3, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/1935/1935173.png', 2),
-- Semester 4 Graphic Design
('DIG0034', 'Aesthetics', 3, '', 'Theory', 'https://cdn-icons-png.flaticon.com/512/4647/4647072.png', 2),
('DIG4000', 'Expression Workshop IV', 3, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/1935/1935173.png', 2),
('DIG0032', 'Digital Design I', 3, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/2779/2779775.png', 2);

-- In Syllabus Graphic Design
INSERT INTO In_syllabus VALUES
('DIG0036', '52362_1', 1), ('CAS3020', '52362_1', 1), ('DIN5070', '52362_1', 1),
('ART0020', '52362_1', 2), ('CAS3030', '52362_1', 2), ('DIN5020', '52362_1', 2),
('DIG0037', '52362_1', 3), ('CMN1060', '52362_1', 3), ('DIG4010', '52362_1', 3),
('DIG0034', '52362_1', 4), ('DIG4000', '52362_1', 4), ('DIG0032', '52362_1', 4);

-- Academic Mathematics Program
INSERT INTO Program VALUES
('51825', 'Mathematics', '0', 'Mathematical', 4, 32, 4);

-- Syllabus Mathematics
INSERT INTO Syllabus VALUES
('51825_1', '51825');

INSERT INTO Subject VALUES
-- Semester 1 Mathematics
('CSV0040', 'Fundamentals of Physics', 3, '', 'Theory', 'https://cdn-icons.flaticon.com/png/512/4090/premium/4090374.png?token=exp=1636989364~hmac=66298391dc221420ce0faa46d50d3419', 5),
('MAT1101', 'Calculus I', 4, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/2919/2919752.png', 4),
('IST2088', 'Algorithmic and Programming I', 4, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/1006/1006363.png', 6),
-- Semester 2 Mathematics
('MAT1031', 'Linear Algebra I', 3, '', 'Theory', 'https://cdn-icons-png.flaticon.com/512/3299/3299966.png', 4),
('MAT4263', 'Probability Theory', 3, '', 'Theory', 'https://cdn-icons.flaticon.com/png/512/2480/premium/2480809.png?token=exp=1636989621~hmac=9fed01475350449fcf3dca3859a30ce8', 4),
('MAT1111', 'Calculus II', 4, '', 'Theory', 'https://cdn-icons-png.flaticon.com/512/1902/1902648.png', 4),
-- Semester 3 Mathematics
('MAT4261', 'Mathematical Statistics', 3, '', 'Theory', 'https://cdn-icons-png.flaticon.com/512/2920/2920349.png', 4),
('MAT1221', 'Logic and Sets', 4, '', 'Theory', 'https://cdn-icons.flaticon.com/png/512/2106/premium/2106672.png?token=exp=1636989854~hmac=22d1cb6fd627f3f993aeeed08c7f4c14', 4),
('MAT1121', 'Calculus III', 4, '', 'Theory', 'https://cdn-icons.flaticon.com/png/512/2792/premium/2792365.png?token=exp=1636989744~hmac=589f24c99d644062d695a19602eb39b3', 4),
-- Semester 4 Mathematics
('MAT8570', 'Linear Algebra II', 4, '', 'Theory', 'https://cdn-icons-png.flaticon.com/512/3299/3299966.png', 4),
('MAT4160', 'Mathematical Analysis I', 4, '', 'Theory', 'https://cdn-icons-png.flaticon.com/512/1875/1875211.png', 4),
('MAT4264', 'Topology', 3, '', 'Theory and Laboratory', 'https://cdn-icons.flaticon.com/png/512/4760/premium/4760043.png?token=exp=1636990179~hmac=e24955aa2c04b62a2b5cd86d0dfa6ccb', 4);

-- In Syllabus Mathematics
INSERT INTO In_syllabus VALUES
('CSV0040', '51825_1', 1), ('MAT1101', '51825_1', 1), ('IST2088', '51825_1', 1),
('MAT1031', '51825_1', 2), ('MAT4263', '51825_1', 2), ('MAT1111', '51825_1', 2),
('MAT4261', '51825_1', 3), ('MAT1221', '51825_1', 3), ('MAT1121', '51825_1', 3),
('MAT8570', '51825_1', 4), ('MAT4160', '51825_1', 4), ('MAT4264', '51825_1', 4);

-- Academic Program of Computer and Systems Engineering
INSERT INTO Program VALUES
('103821', 'Computer and Systems Engineering', '0', 'Systems Engineer', 4, 31, 6);

-- Syllabus
INSERT INTO Syllabus VALUES
('103821_1', '103821');

INSERT INTO Subject VALUES
-- Semester 1 Systems Engineering
-- ('MAT1031', 'Linear Algebra I', 3, '', 'Theory', 4),
-- ('IST2088', 'Algorithmic and Programming I', 4, '', 'Theory and Laboratory', 6),
('IST0010', 'Introduction to Systems Engineering', 1, '', 'Theory', 'https://cdn-icons-png.flaticon.com/512/897/897066.png', 6),
-- Semester 2 Systems Engineering
('FIS1023', 'Mechanical Physics', 4, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/1753/1753487.png', 3),
('IST2089', 'Algorithmic and Programming II', 4, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/1197/1197511.png', 6),
('IST4021', 'Data Structure I', 4, '', 'Theory and Laboratory', 'https://cdn-icons.flaticon.com/png/512/3080/premium/3080750.png?token=exp=1636990726~hmac=1708e97734e58509d6a24dc76fd1791e', 6),
-- Semester 3 Systems Engineering
('FIS1043', 'Physics Heat Waves', 4, '', 'Theory and Laboratory', 'https://cdn-icons.flaticon.com/png/512/1533/premium/1533931.png?token=exp=1636990813~hmac=2e5b6bfbd0b4428b72a8ba3e3e37ac1c', 3),
('IST2110', 'Object Oriented Programming', 4, '', 'Theory and Laboratory', 'https://cdn-icons.flaticon.com/png/512/5815/premium/5815526.png?token=exp=1637272232~hmac=6f5186e845d85ab96b9a86cc266844cd', 6),
('MAT4011', 'Differential Equations', 3, '', 'Theory', 'https://cdn-icons-png.flaticon.com/512/3402/3402282.png', 4),
-- Semester 4 Systems Engineering
('MAT4022', 'Discrete Mathematics', 3, '', 'Theory', 'https://cdn-icons-png.flaticon.com/512/647/647857.png', 4),
('FIS1033', 'Physics Electricity', 4, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/4231/4231883.png', 3),
('IST7111', 'Databases', 3, '', 'Theory and Laboratory', 'https://cdn-icons-png.flaticon.com/512/2232/2232241.png', 6);

-- In Syllabus Systems Engineering
INSERT INTO In_syllabus VALUES
('MAT1031', '103821_1', 1), ('IST2088', '103821_1', 1), ('IST0010', '103821_1', 1),
('FIS1023', '103821_1', 2), ('IST2089', '103821_1', 2), ('IST4021', '103821_1', 2),
('FIS1043', '103821_1', 3), ('IST2110', '103821_1', 3), ('MAT4011', '103821_1', 3),
('MAT4022', '103821_1', 4), ('FIS1033', '103821_1', 4), ('IST7111', '103821_1', 4);

-- Admins
INSERT INTO Person (id, name1, lastname1, gender, birthdate, type, id_dept) VALUES
('12345', 'Isaac', 'Blanco', 'M', '2000-06-24', '0', NULL),
('54321', 'Jonathan', 'Arias', 'M', '2000-11-16', '0', NULL);

-- Users Admin
INSERT INTO User (username, passcode, id_pers) VALUES
('isaacb', 'test', '12345'),
('jonathana', 'test', '54321');

-- Teachers
INSERT INTO Person (id, name1, lastname1, gender, birthdate, type, id_dept) VALUES
('42224748', 'Kelsey', 'Guthrie', 'F', '1970-06-24', '1', 1),
('40712706', 'Hedley', 'Fulton', 'M', '1971-11-16', '1', 2),
('11950408', 'Montana', 'Morris', 'F', '1972-02-10', '1', 2),
('13988897', 'Teagan', 'York', 'M', '1973-03-09', '1', 3),
('31324943', 'Joan', 'Richmond', 'M', '1974-02-15', '1', 4),
('32482114', 'Aristotle', 'Mcdonald', 'M', '1975-03-19', '1', 5),
('49183669', 'Deirdre', 'Nunez', 'F', '1976-07-29', '1', 6),
('26322523', 'Justin', 'Gonzalez', 'M', '1977-01-10', '1', 7),
('38988417', 'Eleanor', 'Brock', 'F', '1978-11-18', '1', 8);

-- Users Teacher
INSERT INTO User (username, passcode, id_pers) VALUES
('kelseyg', 'test', '42224748'),
('hedleyf', 'test', '40712706'),
('teagany', 'test', '13988897'),
('joanr', 'test', '31324943'),
('aristotlem', 'test', '32482114'),
('deirdren', 'test', '49183669'),
('justing', 'test', '26322523'),
('eleanorb', 'test', '38988417');

-- Students
INSERT INTO Person (id, name1, lastname1, gender, birthdate, type, id_dept) VALUES
('25701372', 'Amy', 'Pickett', 'F', '1995-08-05', '2', NULL),
('34499945', 'Karen', 'Ellison', 'F', '1997-11-13', '2', NULL),
('19886608', 'Chaney', 'Elliott', 'F', '1999-12-08', '2', NULL),
('89592690', 'Anika', 'Tran', 'F', '1997-10-09', '2', NULL),
('72479522', 'Hope', 'Ferguson', 'M', '1992-04-20', '2', NULL),
('23183571', 'Liberty', 'Ramos', 'F', '1995-10-11', '2', NULL),
('16747246', 'Kyla', 'Peterson', 'F', '1995-12-18', '2', NULL),
('35526383', 'Raphael', 'Franklin', 'M', '1996-06-13', '2', NULL),
('11783934', 'Dieter', 'Head', 'M', '1992-08-21', '2', NULL),
('37938836', 'Maris', 'Strickland', 'F', '2000-01-23', '2', NULL);

INSERT INTO User (username, passcode, id_pers) VALUES
('amyp', 'test', '25701372'),
('karene', 'test', '34499945'),
('chaneye', 'test', '19886608'),
('anikat', 'test', '89592690'),
('hopef', 'test', '72479522'),
('libertyr', 'test', '23183571'),
('kylap', 'test', '16747246'),
('raphaelf', 'test', '35526383'),
('dieterh', 'test', '11783934'),
('mariss', 'test', '37938836');

-- Periods
INSERT INTO Period VALUES
(2021, '02', '');

-- Courses Architecture
INSERT INTO Course VALUES
('4071_01', 'ARQ4071', '42224748'), ('1011_01', 'MAT1011', '31324943'), ('4125_01', 'ARQ4125', '42224748'),
('4072_01', 'ARQ4072', '42224748'), ('4027_01', 'ARQ4027', '42224748'), ('4120_01', 'ARQ4120', '42224748'),
('4018_01', 'ARQ4018', '42224748'), ('4050_01', 'ARQ4050', '42224748'), ('4023_01', 'ARQ4023', '42224748'),
('4014_01', 'ARQ4014', '42224748'), ('4019_01', 'ARQ4019', '42224748'), ('2024_01', 'ARQ4024', '42224748');

-- Offered_In Architecture
INSERT INTO Offered_In VALUES
('4071_01', 2021, '02'), ('1011_01', 2021, '02'), ('4125_01', 2021, '02'),
('4072_01', 2021, '02'), ('4027_01', 2021, '02'), ('4120_01', 2021, '02'),
('4018_01', 2021, '02'), ('4050_01', 2021, '02'), ('4023_01', 2021, '02'),
('4014_01', 2021, '02'), ('4019_01', 2021, '02'), ('2024_01', 2021, '02');

-- Courses Industrial Design
INSERT INTO Course VALUES
('5050_01', 'DIN5050', '40712706'), ('5060_01', 'DIN5060', '40712706'), ('5070_01', 'DIN5070', '40712706'),
('5010_01', 'DIN5010', '40712706'), ('7120_01', 'DIN7120', '40712706'), ('5020_01', 'DIN5020', '40712706'),
('0033_01', 'DIN0033', '40712706'), ('7040_01', 'DIN7040', '40712706'), ('1080_01', 'FIS1080', '13988897'),
('0035_01', 'DIN0035', '40712706'), ('5040_01', 'DIN5040', '40712706'), ('7080_01', 'DIN7080', '40712706');

-- Offered_In Industrial Design
INSERT INTO Offered_In VALUES
('5050_01', 2021, '02'), ('5060_01', 2021, '02'), ('5070_01', 2021, '02'),
('5010_01', 2021, '02'), ('7120_01', 2021, '02'), ('5020_01', 2021, '02'),
('0033_01', 2021, '02'), ('7040_01', 2021, '02'), ('1080_01', 2021, '02'),
('0035_01', 2021, '02'), ('5040_01', 2021, '02'), ('7080_01', 2021, '02');

-- Courses Graphic Design
INSERT INTO Course VALUES
('0036_01', 'DIG0036', '11950408'), ('3020_01', 'CAS3020', '26322523'), ('5070_02', 'DIN5070', '11950408'),
('0020_01', 'ART0020', '38988417'), ('3030_01', 'CAS3030', '26322523'), ('5020_02', 'DIN5020', '11950408'),
('0037_01', 'DIG0037', '11950408'), ('1060_01', 'CMN1060', '38988417'), ('4010_01', 'DIG4010', '11950408'),
('0034_01', 'DIG0034', '11950408'), ('4000_01', 'DIG4000', '11950408'), ('0032_01', 'DIG0032', '11950408');

-- Offered_In Graphic Design
INSERT INTO Offered_In VALUES
('0036_01', 2021, '02'), ('3020_01', 2021, '02'), ('5070_02', 2021, '02'),
('0020_01', 2021, '02'), ('3030_01', 2021, '02'), ('5020_02', 2021, '02'),
('0037_01', 2021, '02'), ('1060_01', 2021, '02'), ('4010_01', 2021, '02'),
('0034_01', 2021, '02'), ('4000_01', 2021, '02'), ('0032_01', 2021, '02');

-- Courses Mathematics
INSERT INTO Course VALUES
('0040_01', 'CSV0040', '32482114'), ('1101_01', 'MAT1101', '31324943'), ('2088_01', 'IST2088', '49183669'),
('1031_01', 'MAT1031', '31324943'), ('4263_01', 'MAT4263', '31324943'), ('1111_01', 'MAT1111', '31324943'),
('4261_01', 'MAT4261', '31324943'), ('1221_01', 'MAT1221', '31324943'), ('1121_01', 'MAT1121', '31324943'),
('8570_01', 'MAT8570', '31324943'), ('4160_01', 'MAT4160', '31324943'), ('4264_01', 'MAT4264', '31324943');

-- Offered_In Mathematics
INSERT INTO Offered_In VALUES
('0040_01', 2021, '02'), ('1101_01', 2021, '02'), ('2088_01', 2021, '02'),
('1031_01', 2021, '02'), ('4263_01', 2021, '02'), ('1111_01', 2021, '02'),
('4261_01', 2021, '02'), ('1221_01', 2021, '02'), ('1121_01', 2021, '02'),
('8570_01', 2021, '02'), ('4160_01', 2021, '02'), ('4264_01', 2021, '02');

-- Courses Systems Engineering
INSERT INTO Course VALUES
('0010_01', 'IST0010', '49183669'), ('1031_02', 'MAT1031', '32482114'), ('2088_02', 'IST2088', '49183669'),
('1023_01', 'FIS1023', '13988897'), ('2089_01', 'IST2089', '49183669'), ('4021_01', 'IST4021', '49183669'),
('1043_01', 'FIS1043', '13988897'), ('2110_01', 'IST2110', '49183669'), ('4011_01', 'MAT4011', '31324943'),
('4022_01', 'MAT4022', '31324943'), ('1033_01', 'FIS1033', '13988897'), ('7111_01', 'IST7111', '49183669');

-- Offered_In Systems Engineering
INSERT INTO Offered_In VALUES
('0010_01', 2021, '02'), ('1031_02', 2021, '02'), ('2088_02', 2021, '02'),
('1023_01', 2021, '02'), ('2089_01', 2021, '02'), ('4021_01', 2021, '02'),
('1043_01', 2021, '02'), ('2110_01', 2021, '02'), ('4011_01', 2021, '02'),
('4022_01', 2021, '02'), ('1033_01', 2021, '02'), ('7111_01', 2021, '02');

-- ClassRooms
INSERT INTO Classroom VALUES
('L-01', 'Physical'), ('L-02', 'Physical'), ('L-03', 'Physical'), ('L-04', 'Physical'),
('K-01', 'Physical'), ('K-02', 'Physical'), ('K-03', 'Physical'), ('K-04', 'Physical'),
('V-01', 'Virtual'), ('V-02', 'Virtual'), ('V-03', 'Virtual'), ('V-04', 'Virtual');

-- Schedules Architecture
INSERT INTO Schedule (weekday, start_time, duration) VALUES 
('Monday', '08:30:00', 2), ('Monday', '10:30:00', 2), ('Monday', '14:30:00', 2), ('Monday', '16:30:00', 2),
('Tuesday', '08:30:00', 2), ('Tuesday', '10:30:00', 2), ('Tuesday', '14:30:00', 2), ('Tuesday', '16:30:00', 2),
('Wednesday', '08:30:00', 2), ('Wednesday', '10:30:00', 2), ('Wednesday', '14:30:00', 2), ('Wednesday', '16:30:00', 2),
('Thursday', '08:30:00', 2), ('Thursday', '10:30:00', 2), ('Thursday', '14:30:00', 2), ('Thursday', '16:30:00', 2),
('Friday', '08:30:00', 2), ('Friday', '10:30:00', 2), ('Friday', '14:30:00', 2), ('Friday', '16:30:00', 2),
('Saturday', '10:30:00', 2);

-- Spaces Courses Architecture
INSERT INTO Space (code_cour, weekday_sche, start_time_sche, code_clasR) VALUES 
('4071_01', 'Monday', '08:30:00', 'L-01'), ('1011_01', 'Tuesday', '08:30:00', 'L-02'), ('4125_01', 'Wednesday', '08:30:00', 'L-03'),
('4072_01', 'Monday', '10:30:00', 'L-01'), ('4027_01', 'Tuesday', '10:30:00', 'L-02'), ('4120_01', 'Wednesday', '10:30:00', 'L-03'),
('4018_01', 'Monday', '14:30:00', 'L-01'), ('4050_01', 'Tuesday', '14:30:00', 'L-02'), ('4023_01', 'Wednesday', '14:30:00', 'L-03'),
('4014_01', 'Monday', '16:30:00', 'L-01'), ('4019_01', 'Tuesday', '16:30:00', 'L-02'), ('2024_01', 'Wednesday', '16:30:00', 'L-03');

-- Spaces Courses Industrial Design
INSERT INTO Space (code_cour, weekday_sche, start_time_sche, code_clasR) VALUES 
('5050_01', 'Thursday', '08:30:00', 'L-01'), ('5060_01', 'Friday', '08:30:00', 'L-02'), ('5070_01', 'Monday', '08:30:00', 'L-03'),
('5010_01', 'Thursday', '10:30:00', 'L-01'), ('7120_01', 'Friday', '10:30:00', 'L-02'), ('5020_01', 'Monday', '10:30:00', 'L-03'),
('0033_01', 'Thursday', '14:30:00', 'L-01'), ('7040_01', 'Friday', '14:30:00', 'L-02'), ('1080_01', 'Monday', '14:30:00', 'L-03'),
('0035_01', 'Thursday', '16:30:00', 'L-01'), ('5040_01', 'Friday', '16:30:00', 'L-02'), ('7080_01', 'Monday', '16:30:00', 'L-03');

-- Spaces Courses Graphic Design
INSERT INTO Space (code_cour, weekday_sche, start_time_sche, code_clasR) VALUES 
('0036_01', 'Tuesday', '08:30:00', 'L-01'), ('3020_01', 'Wednesday', '08:30:00', 'L-02'), ('5070_02', 'Thursday', '08:30:00', 'L-03'),
('0020_01', 'Tuesday', '10:30:00', 'L-01'), ('3030_01', 'Wednesday', '10:30:00', 'L-02'), ('5020_02', 'Thursday', '10:30:00', 'L-03'),
('0037_01', 'Tuesday', '14:30:00', 'L-01'), ('1060_01', 'Wednesday', '14:30:00', 'L-02'), ('4010_01', 'Thursday', '14:30:00', 'L-03'),
('0034_01', 'Tuesday', '16:30:00', 'L-01'), ('4000_01', 'Wednesday', '16:30:00', 'L-02'), ('0032_01', 'Thursday', '16:30:00', 'L-03');

-- Spaces Courses Mathematics
INSERT INTO Space (code_cour, weekday_sche, start_time_sche, code_clasR) VALUES 
('0040_01', 'Friday', '08:30:00', 'K-01'), ('1101_01', 'Wednesday', '08:30:00', 'K-02'), ('2088_01', 'Thursday', '08:30:00', 'K-03'),
('1031_01', 'Tuesday', '10:30:00', 'K-01'), ('4263_01', 'Friday', '10:30:00', 'K-02'), ('1111_01', 'Wednesday', '10:30:00', 'K-03'),
('4261_01', 'Thursday', '10:30:00', 'K-01'), ('1221_01', 'Tuesday', '16:30:00', 'K-02'), ('1121_01', 'Friday', '16:30:00', 'K-03'),
('8570_01', 'Wednesday', '14:30:00', 'K-01'), ('4160_01', 'Thursday', '14:30:00', 'K-02'), ('4264_01', 'Tuesday', '14:30:00', 'K-03');

-- Spaces Courses Systems Engineering
INSERT INTO Space (code_cour, weekday_sche, start_time_sche, code_clasR) VALUES 
('0010_01', 'Monday', '08:30:00', 'L-04'), ('1031_02', 'Tuesday', '08:30:00', 'V-01'), ('2088_02', 'Wednesday', '08:30:00', 'V-02'),
('1023_01', 'Thursday', '10:30:00', 'V-03'), ('2089_01', 'Friday', '10:30:00', 'V-04'), ('4021_01', 'Saturday', '10:30:00', 'L-04'),
('1043_01', 'Monday', '08:30:00', 'V-01'), ('2110_01', 'Tuesday', '14:30:00', 'V-02'), ('4011_01', 'Wednesday', '16:30:00', 'V-03'),
('4022_01', 'Thursday', '08:30:00', 'V-04'), ('1033_01', 'Friday', '14:30:00', 'L-04'), ('7111_01', 'Friday', '08:30:00', 'V-01'),
('7111_01', 'Monday', '10:30:00', 'V-01');

ALTER TABLE Contract AUTO_INCREMENT = 10001;
-- Contracts
INSERT INTO Contract (id_stud, code_syll, year_peri, term_peri) VALUES
('25701372', '90329_1', 2021, '02'),
('34499945', '20477_1', 2021, '02'),
('19886608', '52362_1', 2021, '02'),
('89592690', '51825_1', 2021, '02'),
('72479522', '103821_1', 2021, '02'),
('23183571', '52362_1', 2021, '02'),
('16747246', '51825_1', 2021, '02'),
('35526383', '103821_1', 2021, '02'),
('11783934', '103821_1', 2021, '02'),
('37938836', '103821_1', 2021, '02');

ALTER TABLE Enrollment AUTO_INCREMENT = 1000000001;
-- Enrollments
INSERT INTO Enrollment (id_stud, year_peri, term_peri) VALUES
('25701372', 2021, '02'),
('34499945', 2021, '02'),
('19886608', 2021, '02'),
('89592690', 2021, '02'),
('72479522', 2021, '02'),
('23183571', 2021, '02'),
('16747246', 2021, '02'),
('35526383', 2021, '02'),
('11783934', 2021, '02');

-- Course Enrollment
INSERT INTO Cour_Enro (code_cour, id_enro) VALUES
-- Architecture Student
('4071_01', 1000000001), ('1011_01', 1000000001), ('4125_01', 1000000001),
-- Industrial Design Student
('5050_01', 1000000002), ('5060_01', 1000000002), ('5070_01', 1000000002),
-- Graphic Design Student
('0036_01', 1000000003), ('3020_01', 1000000003), ('5070_02', 1000000003),
('0036_01', 1000000006), ('3020_01', 1000000006), ('5070_02', 1000000006),
-- Mathematics Student
('0040_01', 1000000004), ('1101_01', 1000000004), ('2088_01', 1000000004),
('0040_01', 1000000007), ('1101_01', 1000000007), ('2088_01', 1000000007),
-- Systems Engineering Student
('0010_01', 1000000005), ('1031_02', 1000000005), ('2088_02', 1000000005),
('0010_01', 1000000008), ('1031_02', 1000000008), ('2088_02', 1000000008),
('0010_01', 1000000009), ('2110_01', 1000000009), ('7111_01', 1000000009);