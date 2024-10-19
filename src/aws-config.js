const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "28GXFELRFRUGTRU9RCVF",
  secretAccessKey: "VOahIdkumGt30jSBqj65YYlpqUFVlqnTlUSf7vSb",
  region: "eu-central-1",
  endpoint: "https://s3.eu-central-1.wasabisys.com",
});

const s3 = new AWS.S3();
module.exports = s3;
