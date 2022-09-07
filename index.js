const argsProcessor = require('command-line-parser');
const path = require("path");
const fs=require("fs-extra");
const {KafkaWriter, FileWriter} = require("./writers");
const {KafkaReader, FileReader} = require("./readers");
// const jsonSchema = require("./example/schema.json");
const {router, xml2json, buildJsonTemplate} = require("./convertor");

const options= {
    config:{
        name:"config",
        short:"c",
        envName:"CDA_CNV_SRC",
        default:"/home/node/src",
        description: "\t -c(onfig) config_dir \n\t\t path to schemas directory. Schemas names must built by pattern {{templateId}}.json`"
    },
    kafka:{
        name:"kafka",
        short:"k",
        envName:"KAFKA_BROKERS",
        default:"localhost:9092",
        description: "\t -k(afka) brokers\t\t Comma separated broker list, ex. 'kafka1:9092, kafka2:9092'. "
    },
    group:{
        name: "group",
        short: "g",
        envName: "KAFKA_CONSUMER_GROUP",
        default: "xml2json",
        description: "\t -g(roup) consumer_group_name\n\t\t Consumer group name. Used if Kafka source mode enabled.\t\t By default Kafka broker not used \n"
    },
    src:{
        name: "src",
        short: "s",
        required:true,
        envName: "KAFKA_SOURCE_TOPIC",
        default: "semd.raw",
        description: "\t -s(rc) topic\n\t\t Broker topic or exists directory for pulling input data"
    },
    dst:{
        name: "dst",
        short: "d",
        required:true,
        envName: "KAFKA_TARGET_TOPIC",
        default: "semd.dep_{{templateId}}",
        description: "\t -d(st) destination\n\t\t Template for directory or Kafka topic for saving or pushing results. Use {{templateId}} variable in pattern"
    },
    error:{
        name: "error",
        short: "e",
        required:true,
        envName: "KAFKA_DMQ_TOPIC",
        default: "semd.dep_error",
        description: "\t -e(rror) error_topic_or_directory\n\t\t Broker topic or exists directory for invalid data"
    }
}
function readParams() {
    const cmd = argsProcessor() || {};
    if (cmd.h || cmd.help) {
        console.log("XML 2 JSON stream convertor. Use with parameters:");
        for (let p in options) {
            console.log(options[p].description);
            if (options[p].env)
                console.log(`\t\t It can be passed by $${options[p].env} environment variable`);
            if (options[p].default)
                console.log(`\t\tDefault value is ${options[p].default}`);
            console.log(``);
            process.exit(0);
        }
    }

    function _opt(cmd, option) {
        return cmd[option.name] || cmd[option.short] || (option.env ? process.env[option.env] : undefined) || option.default;
    }

    const params = {};
    for (let p in options) {
        params[p] = _opt(cmd, options[p])
        if (!params[p] && options[p].requred) {
            console.log(`Undefined required parameter: ${p}. Run with -h for help`);
            process.exit(1);
        }
    }
    return params;
}

async function init() {
    const params = readParams();
    let writer, reader;
    const schemas={};
    if (params.kafka) {
        try {
            writer = new KafkaWriter({
                brokers: params.kafka.split(",").map(s=>s.trim())});
            await writer.init()
        } catch(e) {
            console.error("Destination configuration apply error:\n", e);
            process.exit(2);
        }

        try {
            reader = new KafkaReader({
                brokers: params.kafka.split(",").map(s=>s.trim()),
                topics: params.src.split(",").map(s=>s.trim()),
                group: params.group
            });

        } catch(e) {
            console.error("Source configuration apply error:\n", e);
            process.exit(2);
        }
    } else {
        writer = new FileWriter({ destination: path.resolve(__dirname, params.dst) });
        await writer.init()

        reader = new FileReader({source: path.resolve(__dirname, params.src) })
    }

    const schemaPath = path.resolve(__dirname, params.config);
    try {
        const files = fs.readdirSync(schemaPath);
        files.forEach(fn => {
            try {
                if (path.extname(fn).toLowerCase() === ".json") {
                    schemas[path.basename(fn, ".json")] = buildJsonTemplate(fs.readJsonSync(path.join(schemaPath, fn)));
                }
            } catch (e) {
                console.error(`Error reading schema file ${fn} with error\n ${e.message}`);
                process.exit(4);
            }
        })

    } catch(e) {
            console.error(`Error reading schema files from directory ${schemaPath}`);
            process.exit(4);
    }
    return {writer, reader, schemas, params}
}

init().then(res=>{
    const {writer, reader, schemas, params}  = res;
    reader.init(async (msgValue, srcTopic, partition)=>{
        let {data, topic, templateId} = await router(msgValue, params);
        if (!templateId || !schemas[templateId]) {
            console.warn(`Unknown templateId=${templateId} for sourceId=${msgValue.sourceId} from source=${srcTopic}`);
            templateId = undefined;
            topic=params.error;
        }
        try {
            if (templateId) {
                data = await xml2json(data, schemas[templateId])
            }
            await writer.write(data, topic);
        } catch(e1) {
            try {
                console.error(`Error ${e1.message} for sourceId=${msgValue.sourceId} from source=${srcTopic}`);
                await writer.write(data, params.error);
            } catch(e) { }
        }
    })
})
