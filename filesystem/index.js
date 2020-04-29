// C:\Users\Roman\AppData\Local\Google\Chrome\User Data\Profile 1\File System\2193\t\00
window.requestFileSystem =
  window.requestFileSystem || window.webkitRequestFileSystem;

window.requestFileSystem(TEMPORARY, 5 * 1024 * 1024, getFile, handleError);

function getFile(fileSystem) {
  console.log(fileSystem);
  fileSystem.root.getFile(
    "shutsman2.txt",
    { create: true },
    writeOpenedFile,
    handleError
  );
}
function writeOpenedFile(fileEntry) {
  fileEntry.createWriter(writeToFile, handleError);
}
function writeToFile(fileWriter) {
  fileWriter.onwriteend = function () {
    console.log("created");
  };
  fileWriter.onerror = function () {
    console.log("Failed");
  };
  fileWriter.write(new Blob(["Hello world!!"], { type: "text/plain" }));
}
function readOpenedFile(fileEntry) {
  fileEntry.file(readFile, handleError);
 }
function handleError(error) {
  console.log(error.code);
  console.log(error);
}
function readFile(file) {
  var fileReader = new FileReader();
  fileReader.onloadend = function(e) { 
    console.log(this.result); 
  };
  fileReader.onerror = function() { console.log('Failed'); };
  fileReader.readAsText(file);
 }

 function deleteOpenedFile(fileEntry) {
   fileEntry.remove(() => console.log('removed'), handleError)
 }
 function getDirectory(fileSystem) {

  fileSystem.root.getDirectory('offline', {create: true}, dir => {
    dir.getFile(
      "offline.txt",
      { create: true },
      writeOpenedFile,
      handleError
    );
  },
  handleError)
 }