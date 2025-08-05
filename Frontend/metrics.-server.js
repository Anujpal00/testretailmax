const express = require('express');
const client = require('prom-client');

const app = express();
const port = 8081; // your existing port

// Collect default metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Optional: custom metric
const pageLoadCounter = new client.Counter({
  name: 'page_loads_total',
  help: 'Total number of page loads'
});
register.registerMetric(pageLoadCounter);

// Your existing app routes...
app.get('/', (req, res) => {
  res.send('Hello from EC2 app!');
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
