var fs = require("fs");

var data = "こんにちは";

fs.writeFile("./data/hello.txt", data, (error) => {
  if (error) {
    console.log(error.message);
    return;
  }
  console.log("書き込み完了");
});