const path = require("path");
const fs=require("fs-extra");
const watch  =require("watch");

class FileReader {
    constructor(config) {
        this.config = {
            source: '~/CDA-results',
            ...(config || {})
        };
        this.folder = path.resolve(__dirname, this.config.source);
    }
    async init(asyncReceiver) {
        const that = this;
        const folder = this.folder;
        return new Promise((resolve, reject)=>{
            fs.ensureDir(folder, (e)=>{
                if (e) return reject(e)
                watch.watchTree(folder, {filter:"*.xml", ignoreDotFiles:true, ignoreNotPermitted:true }, function (f, curr, prev) {
                    if (curr.nlink !== 0 && curr.size>0) {
                        fs.readFileSync(f, "utf-8", (e, data)=>{
                            if (e) return reject(e);
                            const p = path.parse(f);
                            asyncReceiver(data, path.basename(p.dir))
                        })
                    }
                })
                resolve(that);
            })
        });
    }
}

module.exports={FileWriter: FileReader}

