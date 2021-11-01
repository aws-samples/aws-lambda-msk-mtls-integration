const fs = require('fs')

const { Kafka } = require('kafkajs')
const kafkaHosts = process.env.KAFKA_HOSTS;

//Creates a kafka object for cert authentications
let kafka = new Kafka({
    clientId: 'my-app',
    brokers: kafkaHosts.split(","),
    ssl: {
      rejectUnauthorized: false,
      key: fs.readFileSync('client_key.pem', 'utf-8'),
      cert: fs.readFileSync('client_cert.pem', 'utf-8')
    },
  })
  
/**
 * event - JSON
{
  "newTopic":"CREATE_TOPIC" //creates topic. If topic exist, do not send
  "topicName":"topic", //required
  "message":"hello" //required
}
 * context - Lambda context object
 */
module.exports.handler = async (event, context) =>{
    try {
          
      if(event.newTopic == 'CREATE_TOPIC')
         await createTopic(event.topicName);    
      await sendMessage(event.topicName, event.message)
    }
    catch (e) {
        console.log(e);
    }
}

async function sendMessage(topic, message) {
    const producer = kafka.producer()
    await producer.connect()
    await producer.send({
        topic: topic,
        messages: [
            { value: message },
        ],
      })
      
    await producer.disconnect()

}

async function createTopic(topic) {
    const admin = kafka.admin();
    await admin.connect();
    await admin.createTopics({
        topics: [{topic:topic, numPartitions:10, replicationFactor:2 }]
    })
    let metadata = await admin.fetchTopicMetadata({ topics: [topic] })
    console.log(JSON.stringify(metadata));

    await admin.disconnect()


}

