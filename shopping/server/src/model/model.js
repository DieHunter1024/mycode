const mongoose = require('mongoose');
const config = require('../../config/config')
// console.log(config)
module.exports = class Mongoose {
    constructor() {
        mongoose.connect(`mongodb://${config.DataBaseUrl+config.DataBasePort+config.Path+config.DataBaseName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        this.db = mongoose.connection;
        this.db.on("error", function (error) {
            console.log("Err:" + error);
        });

        this.db.on("open", function () {
            console.log("Connet Success~");
        });

        this.db.on('disconnected', function () {
            console.log('Connet Stop~');
        });
        return mongoose
    }
}