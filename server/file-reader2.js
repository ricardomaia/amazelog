const fs = require("fs");
const readLastLines = require("read-last-lines");
const path = "access.log";

fs.watchFile(path, { interval: 10 }, (curr, prev) => {
  readLastLines.read(path, 1).then((lines) => {
    const regex = /^(?<hostname>[\d\.]+)\s(?<logname>.*?)\s(?<remote_user>.*?)\s\[(?<date>.*?):(?<time>\d{2}:\d{2}:\d{2})\s(?<timezone>[-|+]\d{3,4})]\s"(?<method>[A-Za-z]*)\s(?<request>[^ "]+)\sHTTP\/[0-9.]+"\s(?<status>[0-9]{3})\s(?<size>[0-9]+|-)\s(?<referer>.*?)\s"(?<user_agent>.*?)"/;
    let m = regex.exec(lines);
    console.log("hostname: ", m.groups["hostname"]);
    console.log("request: ", m.groups["request"]);
    console.log("user_agent: ", m.groups["user_agent"]);
  });
});
