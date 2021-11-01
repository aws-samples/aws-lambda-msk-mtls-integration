const aws = require('aws-sdk')
/**
 * event - event payload as a batch of messages from MSK
 * context - Lambda context object
 */
exports.handler = function(event, context) {
  console.log('Records from Kafka topic: ' , JSON.stringify(event));
  // Iterate through keys
    for (let key in event.records) {
      console.log('Key: ', key)
      // Iterate through records
      event.records[key].map((record) => {
        console.log('Record: ', record)
        // Decode base64
        const msg = Buffer.from(record.value, 'base64').toString()
        console.log('Message:', msg)
      }) 
    }
}