var fs = require("fs");

// If config file doesn't exist then create it
try {
    fs.statSync("config.json").isFile();
} catch(error){
    var stream = fs.createWriteStream("config.json");

    stream.once("open", function(fd) {
        stream.write("{\n\t");
        stream.write("\"host\": \"http://localhost\",\n\t");
        stream.write("\"port\": 8080,\n\n\t");
        stream.write("\"mysqlUser\": \"user\",\n\t");
        stream.write("\"mysqlPassword\": \"password\"\n");
        stream.write("}");
        stream.end();
    });
};
