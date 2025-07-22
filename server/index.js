const express = require('express');
const app = express();

const cors = require('cors');
const corsOptions = {
  origin: ['http://localhost:5173'], 
};

app.use(cors(corsOptions));

// Define a route for GET requests to the root URL
app.get('/', (req, res) => {
  res.send({ fruits: ['apple', 'banana', 'orange'], message: 'Hello from the server!' });
});

// Start the server
app.listen(8080, () => {
  console.log(`Example app listening at http://localhost:8080`);
});