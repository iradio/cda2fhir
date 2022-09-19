const {buildJsonTemplate, schemaIdFromOID} = require("./convertor.js");
const axios = require("axios").default;

class RegistrySchemaSource {
    constructor(registryUrl) {
        this.schemas={};
        axios.defaults.baseURL = registryUrl;
        axios.defaults.headers.common['Accept'] = "application/json";
    }

    async get(templateId) {
        if (templateId in this.schemas) return this.schemas[templateId];
        try {
            // TODO: build id, version from templateId
            const urlParts= schemaIdFromOID(templateId);
            if (!urlParts) {
                console.warn("Schema getting error. Bad templateId: "+templateId);
                return;
            }
            const response = await axios.get(`${urlParts.id}/${urlParts.version}`);
            if (response.status===200 && response.data) {
                const data = (typeof response.data === "string" ? JSON.parse(response.data) : response.data);
                this.schemas[templateId] = buildJsonTemplate(data);
                return {...(this.schemas[templateId]) };
            }
            console.warn("Schema getting error:", templateId, response.status);
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports={RegistrySchemaSource}

