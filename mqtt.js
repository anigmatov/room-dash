// mqtt.js

function connectMQTT() {
  const client = mqtt.connect('ws://172.25.25.20:9001', {
      username: 'CityNet',
      password: '123456'
  });

  client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('esp32/GREE16/status', (err) => {
          if (!err) {
              console.log('Subscribed to topic esp32/GREE16/status');
          }
      });
  });

  client.on('message', (topic, message) => {
      const data = JSON.parse(message.toString());
      document.getElementById('current-temp').innerText = `${data.temperature}°C`;
      document.getElementById('circular-temp').innerText = `${data.temperature}°C`;

      const statusInfo = `POWER:${data.POWER},MODE:${data.MODE},FAN:${data.FAN},TARGET_TEMP:${data.TARGET_TEMP}`;
      const statusParts = statusInfo.split(",");
      let power = statusParts.find(part => part.startsWith("POWER")).split(":")[1];
      let mode = statusParts.find(part => part.startsWith("MODE")).split(":")[1];
      let fan = statusParts.find(part => part.startsWith("FAN")).split(":")[1];
      let targetTemp = statusParts.find(part => part.startsWith("TARGET_TEMP")).split(":")[1];

      let powerText = power == "1" ? "On" : "Off";
      let modeText = mode == "1" ? "Cool" : "Heat";
      let fanText = fan == "0" ? "Low" : fan == "1" ? "Medium" : "High";

      document.getElementById('power-icon').innerText = `Power: ${powerText}`;
      document.getElementById('mode-icon').innerText = `Mode: ${modeText}`;
      document.getElementById('fan-icon').innerText = `Fan: ${fanText}`;
      document.getElementById('target-temp').innerText = `${targetTemp}°C`;
  });
}

// Initial call to connect to MQTT broker
connectMQTT();
