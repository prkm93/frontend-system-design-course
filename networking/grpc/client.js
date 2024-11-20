const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = './problems.proto';
const express = require('express');

const app = express();
app.use(express.json());

const options = {
  keepCase: true,
  long: String,
  enum: String,
  default: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const ProblemService =
  grpc.loadPackageDefinition(packageDefinition).ProblemService;

// will call client object which in turns call to grpc server for data
const client = new ProblemService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// express server will be called via frontend client (React, Vue, etc)
app.get('/getAllProblems', (req, res) => {
  client.getAllProblems({}, (error, problems) => {
    if (error) {
      throw error;
    }
    res.json(problems);
  });
});

app.post('/updateProblem/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  client.updateProblem({ id, ...body }, (error, problem) => {
    if (error) {
      throw error;
    }
    res.json(problem);
  });
});

app.listen(3000, () => {
  console.log('client is running!');
});
