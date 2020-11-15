var fs = require("fs"),
  lineno = 0;

var stream = fs.createWriteStream("test-read-write.txt", { flags: "a" });

stream.on("open", function () {
  console.log("Stream opened, will start writing in 2 secs");
  setInterval(function () {
    stream.write(++lineno + " oi!\n");
  }, 0);
});
