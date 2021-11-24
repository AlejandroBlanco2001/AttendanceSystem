# AttendanceSystem
AttendaceSystem is a software made for taking the attendace of some given class (face-to-face, online, bimodal) taking into account the Zero Paper policy. Made with NodeJS, React and MariaDB

# Installation 
Copy the url in this repo and open a new terminal in your workspace
```bash
git clone [URL]
```
then 

```bash
npm install
```

create a variables.env file as follows in the parent directory 
```bash
# COOKIE KEY
COOKIE_KEY = 'Please hide this key, so the Cookie Monster cant eat it'

#DATABASE
DATABASE_NAME = 'attendancesystem'
DATABASE_HOST = 'localhost'
DATABASE_USERNAME = 'root'
DATABASE_PASSWORD = '[YOUR DBMS PASSWORD]'

# MODE BY DEFAULT
NODE_ENV = 'development'

```

# RUN
open up your terminal and run
 ```bash
 npm run dev
 ```
