const db = openDatabase('db', '1.0', 'My db', 5 * 1024 * 1024);

const log = 'my second log';
const author = 'R.Shutsman';
let logs = [];

function createTable () {
    db.transaction((query) => {
      console.log('query:', query);
    
      query.executeSql(`CREATE TABLE IF NOT EXISTS LOGS (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            log TEXT,
            author TEXT,
            createdAt TIMESTAMP DEFAULT(datetime('now', 'localtime')))`);
    });
}
createTable();


function itemInserted(transaction, result) {
  console.log(result);
  console.log('Id:', result.insertId);
}
// insert
function createValues() {
    db.transaction((q) => {
      q.executeSql(`INSERT INTO LOGS (log, author) VALUES ('My first record in WEB Sql', 'R.Shutsman')`)
      q.executeSql(`INSERT INTO LOGS (log, author) VALUES (?, ?)`, [log, author], itemInserted)
    });
}
createValues()

//read
function readLogs() {
    logs = [];
    db.transaction((q) => {
      q.executeSql(`SELECT * FROM LOGS`, [], (q, result) => {
        // console.log(result);
        
        for (let i = 0; i < result.rows.length; i++) {
            logs.push(result.rows.item(i));
        }
        console.log(logs);
      });
    });
}
readLogs();

//update
function updateLogById(log, id) {
    db.transaction(q => {
        q.executeSql(`UPDATE LOGS SET log = ? WHERE id = ?`, [log, id])
        readLogs()
    })
}
updateLogById('log update', 2);

//delete 
function deleteLogById(id) {
    db.transaction(q =>  {
        q.executeSql("DELETE FROM LOGS WHERE id = ?", [id]);
    });
}
deleteLogById(1);