const path = require("path");
const fs=require("fs-extra");
const {KafkaWriter, FileWriter} = require("./writers");
const {KafkaReader, FileReader} = require("./readers");
const {router, xml2json, buildJsonTemplate} = require("./schemaSource/convertor");
const params = require("./config");
const {LocalSchemaSource} = require("./schemaSource/local.js");
const {RegistrySchemaSource} = require("./schemaSource/registry.js");
const {URL} = require("url");

async function init() {

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
    let schemaSource;
    try {
        const schemaUrl = new URL(params.config);
        if (!schemaUrl.protocol || schemaUrl.protocol==="file:") {
            const schemaPath = schemaUrl.protocol==="file:" ? params.config : path.resolve(__dirname, params.config);
            schemaSource = new LocalSchemaSource(path.resolve(__dirname, params.config))
        } else {
            schemaSource = new RegistrySchemaSource(params.config);
        }
    } catch (e) {
        schemaSource = new LocalSchemaSource(path.resolve(__dirname, params.config));
    }

    return {writer, reader, schemaSource, params}
}

init().then(res=>{
    const {writer, reader, schemaSource, params}  = res;
    reader.init(async (msgValue, srcTopic, partition)=>{
        msgValue = msgValue || {};
        let {data, topic, templateId} = await router(msgValue.value, params);
        // console.log(typeof msgValue, `${srcTopic} topic=${topic}, templateId=${templateId}`);
        if (!templateId) {
            console.warn(`Unknown templateId=${templateId} for sourceId=${msgValue.sourceId} from source=${srcTopic}`);
            templateId = undefined;
            topic=params.error;
        }
        const schema = await schemaSource.get(templateId);
        if (!schema) {
            console.warn(`Unknown schema for ${templateId} for sourceId=${msgValue.sourceId} from source=${srcTopic}`);
            templateId = undefined;
            topic=params.error;
        }
        console.log(`scheme ready for templateId=${templateId}`, schema);
        try {
            if (templateId) {
                data = await xml2json(data, schema)
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
