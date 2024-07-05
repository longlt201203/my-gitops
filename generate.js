console.log("Calling generate function with parameters:", process.argv);

const project = process.argv[2];
const runId = process.argv[3];

const fs = require("fs");
const path = require("path");

const deploymentTemplatePath = path.resolve(
  __dirname,
  "templates",
  `${project}.deployment.yaml`
);

console.log("Reading and replacing the content of deloyment template...");
const deploymentContent = fs
  .readFileSync(deploymentTemplatePath)
  .toString()
  .replace("{{ run_id }}", runId);

const deploymentFileOutput = path.resolve(
  __dirname,
  project,
  "deployment.yaml"
);

console.log("Writing output to deployment.yaml file...");
fs.writeFileSync(deploymentFileOutput, deploymentContent);
console.log("Finish writing output.");

const dir = fs.readdirSync(path.resolve(__dirname, project));
console.log("Check dir content:", dir);

console.log("DONE");
