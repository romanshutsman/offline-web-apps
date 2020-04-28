(function initIndexDB() {
  window.indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
  window.IDBCursor = window.IDBCursor || window.webkitIDBCursor;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
})();

let db, openRequest;
const indexedDB = window.indexedDB;
const newVersion = 1;
openRequest = indexedDB.open("Logs", newVersion);
openRequest.onsuccess = function (response) {
  db = openRequest.result;
};
openRequest.onerror = function (response) {
  console.log(this.error);
};
openRequest.onupgradeneeded = function (response) {
  console.log(response);
  if (!response.srcElement.result.objectStoreNames.contains("logs")) {
    const db = response.currentTarget.result;
    const store = db.createObjectStore("logs", {
      keypath: "id",
      autoIncrement: true,
    });
    store.createIndex("by_author", "author", { unique: false });
    store.createIndex("by_timestamp", "timestamp", { unique: false });
  }
};
function createLog() {
  const req = indexedDB.open("Logs", newVersion);
  req.onsuccess = function (res) {
    db = req.result;
    const trans = db.transaction("logs", "readwrite");
    const logs = trans.objectStore("logs");
    // const logsArray = [
    //   { author: "John", timestamp: 1 },
    //   { author: "Joe", timestamp: 2 },
    // ];
    // for (const key in logsArray) {
    //   logs.add(logsArray[key]);
    // }
    // const request = logs.add({
    //   author: "R Shutsman",
    //   timestamp: 1231231,
    // });
    // request.onsuccess = function (event) {
    //   console.log(event);
    // };
  };
  req.onerror = function (res) {
    console.log(res);
  };
}
createLog();

function updateLog() {
  const req = indexedDB.open("Logs", newVersion);
  req.onsuccess = function (res) {
    db = req.result;
    const trans = db.transaction("logs", "readwrite");
    const logs = trans.objectStore("logs");
    // const request = logs.put({ author: "Bob" }, 3);
    // request.onsuccess = function (event) {
    //   console.log(event);
    // };
    // request.onerror = function (event) {
    //   console.log(event);
    // };
  };
  req.onerror = function (res) {
    console.log(res);
  };
}
updateLog();

function deleteLog() {
  setTimeout(() => {
    const trans = db.transaction("logs", "readwrite");
    const logs = trans.objectStore("logs");
    // const request = logs.delete(3);
  }, 0);
}
deleteLog();

function getLogs() {
  setTimeout(() => {
    const trans = db.transaction("logs", "readonly");
    const logs = trans.objectStore("logs");
    // const req = logs.get(2);
    // const req = logs.getAll();
    // req.onsuccess = function (event) {
    //   console.log(event);
    // };
    // req.onerror = function (event) {
    //   console.log(event);
    // };
  }, 0);
}
getLogs();

function deleteDB() {
  const req = indexedDB.deleteDatabase("Logs");
}
// deleteDB();
