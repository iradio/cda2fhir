const path = require("path");
const fs=require("fs-extra");
const watch  =require("watch");

class FileReader {
    constructor(config) {
        this.config = {
            source: '~/CDA-results',
            ...(config || {})
        };
        this.folder = this.config.source;
        console.log("Watch files from folder: ", this.folder)
    }
    async init(asyncReceiver) {
        const that = this;
        const folder = this.folder;
        function _processOne(f) {
            fs.readFile(f, "utf-8", (e, data)=>{
                if (e) {
                    console.error(f, e);
                    return
                }
                const p = path.parse(f);
                const envelope = {value:JSON.stringify({
                    "sourceId": path.basename(f),
                    "sourceType": path.basename(p.dir),
                    "clientId": path.basename(p.dir),
                    "filename": f,
                    "code_by_emdr": "59a3a7b8-b6bc-4663-9d4e-cec12c634693",
                    "xml":data
                    })}
                asyncReceiver(envelope, path.basename(p.dir))
            })
        }
        return new Promise((resolve, reject)=>{
            fs.ensureDir(folder, (e)=>{
                if (e) return reject(e)
                watch.watchTree(folder, {filter:(f)=>{ console.log(f); return path.extname(f)===".xml"}, ignoreDotFiles:true, ignoreNotPermitted:true }, function (f, curr, prev) {
                    if (typeof f === "object") {
                        for(let p in f) {
                            if (f[p] && (f[p].nlink !== 0 && f[p].size>0) && !f[p].isDirectory()) {
                                _processOne(p)
                            }
                        }
                    }
                    if (f && (typeof f  === "string") && curr && (curr.nlink !== 0 && curr.size>0)) {
                        _processOne(f)
                    }
                })
                resolve(that);
            })
        });
    }
}

module.exports={FileReader}

