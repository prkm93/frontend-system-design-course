const grpc = require('@grpc/grpc-js');
const PROTO_PATH = './problems.proto';
const protoLoader = require('@grpc/proto-loader');

const options = {
  keepCase: true,
  long: String,
  enum: String,
  default: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const problemsProto = grpc.loadPackageDefinition(packageDefinition);

// express is our client
const server = new grpc.Server();

let problems = [
  {
    id: '0',
    title: 'Polyfill of Array.map',
    description: 'Some description',
  },
  {
    id: '1',
    title: 'Polyfill of Promise.all()',
    description: 'Some description',
  },
];

server.addService(problemsProto.ProblemService.service, {
  getAllProblems: (_, callback) => {
    callback(null, { problems: problems });
  },
  updateProblem: (call, callback) => {
    const id = call.request.id;
    console.log(call.request);
    /* if we send { "title": "New title" } as body params, we aren't sending description, so grpc server will take description as ''(empty)
     because the contract is to send Problem in .proto file. i.e. id, title, and description. This needs to be taken care while using grpc */
    problems = problems.map((p) => {
      if (id === p.id) {
        return { ...p, ...call.request }; // call.request is similar to request.body from express
      }
      return p;
    });
    const updatedProblem = problems.find((p) => p.id === id);
    callback(null, { ...updatedProblem });
  },
});

// creates insecure http call
server.bindAsync(
  '127.0.0.1:50051',
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log('grpc is up and running');
    // server.start();
  }
);
