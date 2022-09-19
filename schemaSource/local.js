const fs = require("fs-extra");
const path = require("path");
const {buildJsonTemplate} = require("./convertor.js");

class LocalSchemaSource {
    constructor(schemaPath) {
        this.schemas = {};
        const files = fs.readdirSync(schemaPath);
        files.forEach(fn => {
            if (path.extname(fn).toLowerCase() === ".json") {
                this.schemas[path.basename(fn, ".json")] = buildJsonTemplate(fs.readJsonSync(path.join(schemaPath, fn)));
            }
        })
    }

    async get(templateId) {
        return {...(this.schemas[templateId])};
    }
}

module.exports={LocalSchemaSource}

