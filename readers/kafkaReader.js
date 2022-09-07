const {Kafka} = require("kafkajs");
class KafkaReader {
    constructor(config) {
        this.config = {
            group: 'xml2json',
            brokers: ['localhost:9092'],
            topics: [],
            ...(config || {})
        };
        const kafka = new Kafka({
            clientId: this.config.clientId,
            brokers: this.config.brokers
        })
        this.consumer = kafka.consumer({ groupId: config.group })
    }
    async init(asyncReceiver) {
        await this.consumer.connect()
        await this.consumer.subscribe({ topics: this.config.topics, fromBeginning: false })
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => asyncReceiver(message, topic, partition)
        })
    }
}

module.exports={KafkaWriter: KafkaReader}
