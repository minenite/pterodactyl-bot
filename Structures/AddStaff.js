const Guild = require("./Models/Guild");
class AddStaff {
    constructor(options) {
        this.user = options.user;
        this.guild = options.guild;
    }
    async saveToDatabase() {
        Guild.collection.findOneAndUpdate(
            { id: this.guild },
            { $push: { staff: this.user } },
            { safe: true, upsert: true },
            function (err, model) {
                console.log(err);
                return this;
            }
        );
    }
}
exports.AddStaff = AddStaff;
