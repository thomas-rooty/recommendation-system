const express = require('express');
const { Kafka } = require('kafkajs');
const cors = require('cors');

const app = express();
const port = 3000;

const kafka = new Kafka({
  clientId: 'myapp',
  brokers: [process.env.KAFKA_BROKER]
});

const producer = kafka.producer();

app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
  const { message } = req.body;

  await producer.send({
    topic: 'topic1',
    messages: [
      { value: message },
    ],
  });

  res.status(200).send('Message sent');
});

const run = async () => {
  await producer.connect();

  app.listen(port, () => {
    console.log(`Node backend listening at http://localhost:${port}`);
  });
};

run().catch(console.error);
