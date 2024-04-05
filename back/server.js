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
  const { username, contentId, contentCategory, interactionType, timestamp } = req.body;

  // Construction de l'objet message
  const message = {
    username,
    contentId,
    contentCategory,
    interactionType,
    timestamp: timestamp || Date.now(),
  };

  try {
    await producer.send({
      topic: 'topic1',
      messages: [
        { value: JSON.stringify(message) },
      ],
    });

    res.status(200).send('Message sent');
  } catch (error) {
    console.error('Error sending message to Kafka:', error);
    res.status(500).send('Failed to send message');
  }
});

const run = async () => {
  await producer.connect();

  app.listen(port, () => {
    console.log(`Node backend listening at http://localhost:${port}`);
  });
};

run().catch(console.error);
