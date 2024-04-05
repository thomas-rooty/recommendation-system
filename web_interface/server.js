const { Kafka } = require('kafkajs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());

const kafka = new Kafka({
  clientId: 'web-recommendation',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const run = async () => {
    await producer.connect();
    console.log("Connecté à Kafka avec succès");
}

run().catch(console.error);

app.post('/send-message', async (req, res) => {
    const message = req.body.message;

    try {
        await producer.send({
            topic: 'topic1',
            messages: [
                { value: message },
            ],
        });

        res.status(200).json({ message: 'Message envoyé avec succès' });
    } catch (error) {
        console.error("Erreur lors de l'envoi du message", error);
        res.status(500).json({ message: "Erreur lors de l'envoi du message" });
    }
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
