window.requestFileSystem =
  window.requestFileSystem || window.webkitRequestFileSystem;

window.requestFileSystem(TEMPORARY, 5 * 1024 * 1024, getFile, handleError);

function getFile(fileSystem) {
  console.log(fileSystem);
  fileSystem.root.getFile(
    "example1.txt",
    { create: true },
    fileOpened,
    handleError
  );
}
function fileOpened(fileEntry) {
  fileEntry.createWriter(writeToFile, handleError);
}
function writeToFile(fileWriter) {
  fileWriter.onwriteend = function () {
    console.log("Success");
  };
  fileWriter.onerror = function () {
    console.log("Failed");
  };
  fileWriter.write(new Blob(["Hello world!"], { type: "text/plain" }));
}
function handleError(error) {
  console.log(error.code);
}
