/**
 * @see https://stackoverflow.com/questions/11225001/reading-a-file-in-real-time-using-node-js
 */

var fs = require("fs"),
  bite_size = 256,
  readbytes = 0,
  file;

fs.open("test-read-write.txt", "r", function (err, fd) {
  file = fd;
  readsome();
});

function readsome() {
  var stats = fs.fstatSync(file); // yes sometimes async does not make sense!
  if (stats.size < readbytes + 1) {
    console.log(
      "Hehe I am much faster than your writer..! I will sleep for a while, I deserve it!"
    );
    setTimeout(readsome, 1000);
  } else {
    fs.read(
      file,
      new Buffer.alloc(bite_size),
      0,
      bite_size,
      readbytes,
      processsome
    );
  }
}

function processsome(err, bytecount, buff) {
  console.log("Read", bytecount, "and will process it now.");

  // Here we will process our incoming data:
  // Do whatever you need. Just be careful about not using beyond the bytecount in buff.
  console.log(buff.toString("utf-8", 0, bytecount));

  // So we continue reading from where we left:
  readbytes += bytecount;
  process.nextTick(readsome);
}
