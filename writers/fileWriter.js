const path = require("path");
const fs=require("fs-extra");
const {v4}=require("uuid");
const moment=require("moment");

class FileWriter {
    constructor(config) {
        this.config = {
            destination: '~/CDA-results',
            ...(config || {})
        };
        this.folder = this.config.destination;
        console.log("Write files to folder: ", this.folder)
    }
    async init() {
        return new Promise((resolve, reject)=>{
            fs.ensureDir(this.folder, (e)=>{
                if (e) return reject(e);
                return  resolve();
            })
        })
    }
    async write(data) {
        const subFolder = ""
        const guid = v4();
        const fn = guid + '-' + moment().format("YYYY-MM-DD") + ".json";
        const folder = subFolder ? path.join(this.folder, subFolder) : this.folder;
        return new Promise((resolve, reject)=>{
            fs.ensureDir(folder, (e)=>{
                if (e) return reject(e);
                fs.writeFile(path.join(folder, fn), JSON.stringify(data), (e)=>{
                    if (e) return reject(e);
                    return  resolve(path.join(folder, fn));
                })
            })
        })
    }
}

module.exports={FileWriter}

