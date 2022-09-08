const { transform } = require('camaro')
// const Ajv = require("ajv");
// const addFormats = require("ajv-formats")
// const ajv = new Ajv({coerceTypes: true, strict: false})
// addFormats(ajv);

function buildJsonTemplate(schema) {
    function _node(node, pkey) {
        if (node.type === "array") {
            return [node.xpath, _node(node.items)];
        }
        if (node.type === "object") {
            const r = {};
            for(let p in node.properties) {
                r[p]=_node(node.properties[p]);
            }
            return r;
        }
        if (node.type === "string") {
            return node.xpath;
        }
        if (node.type === "number") {
            return `${node.type}(${node.xpath})`
        }
        if (node.type === "boolean") {
            const asTrue = node.trueValue || "1";
            return `${node.type}(${node.xpath} = "${asTrue}")`
        }
    }
    return _node(schema)
}

async function router(msgValue, config) {
    const DOC_TYPE_TEMPLATE = {
        "templateId": "/ClinicalDocument/templateId/@root"
    }

    if (!msgValue) return {topic: config.error, data:"Empty message received"};
    let val;
    if (msgValue instanceof  Buffer) {
        val = msgValue.toString();
    }
    if (typeof val !== "string") {
        return {topic: config.error, data:`Message value is not a String or Buffer`};
    }
    try {
        val = JSON.parse(val)
    } catch (e) {
        console.warn("Non JSON envelope");
        return {topic: config.error, data:`Non JSON envelope`};
    }
    if (!val.xml) {
        return {topic: config.error, data:`Message ${val.code_by_emdr} without XML document inside`};
    }
    val = val.xml || val;
    try {
        const r = await transform(val, DOC_TYPE_TEMPLATE);
        console.log(r);
        if (!r.templateId) return {topic: config.error, data:`Message ${val.code_by_emdr} XML document haven't value for doctype field`};
        const topic = config.dst.replace(`{{templateId}}`, r.templateId);
        return {topic, templateId:r.templateId, data: val}
    } catch(e) {
        return {topic: config.error,  data:"Message value is not a valid JSON document:"+e.message};
    }
}

module.exports = {buildJsonTemplate, router, xml2json: transform}
