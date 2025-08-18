import express from 'express';
import path from 'path';
import './models/UserModel';    


const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World! :)');
});

app.listen(port, () => {
  console.log('Server is running on port', port);
});
