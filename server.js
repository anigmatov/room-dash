const mqtt = require('mqtt');
const WebSocket = require('ws');

const mqttBroker = 'mqtt://172.25.25.20:1883';
const mqttUser = 'CityNet';
const mqttPassword = '123456';
const topic = 'esp32/GREE16/status';

// Create an MQTT client
const mqttClient = mqtt.connect(mqttBroker, {
  username: mqttUser,
  password: mqttPassword
});

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

let latestMessage = 'Waiting for message...';

mqttClient.on('connect', function () {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe(topic, function (err) {
    if (!err) {
      console.log(`Subscribed to topic ${topic}`);
    } else {
      console.error('Subscription error:', err);
    }
  });
});

mqttClient.on('message', function (topic, message) {
  const payload = message.toString();
  console.log('Message received:', payload);
  if (!isNaN(payload)) {
    latestMessage = payload;
    wss.clients.forEach(function each(ws) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(payload);
      }
    });
  }
});

wss.on('connection', function connection(ws) {
  ws.send(latestMessage);
});

console.log('WebSocket server is listening on ws://localhost:8080');
