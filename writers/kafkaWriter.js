const {Kafka, Partitioners } = require("kafkajs");
class KafkaWriter {
    constructor(config) {
        this.config = {
            clientId: 'CDA-generator',
            brokers: ['localhost:9092'],
            topic:"CDAinput",
            ...(config || {})
        };
        const kafka = new Kafka({
            clientId: this.config.clientId,
            brokers: this.config.brokers
        })
        this.producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner })
    }
    async init() {
        await this.producer.connect()
    }
    async write(data, topic) {
        return this.producer.send({
            topic: topic || this.config.topic,
            messages: [
                {value: JSON.stringify(data)},
            ],
        })
    }
}

module.exports={KafkaWriter}
