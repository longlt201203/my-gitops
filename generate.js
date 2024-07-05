console.log("Calling generate function with parameters:", process.argv);

const project = process.argv[2];
const runId = process.argv[3];
const registry = process.argv[4];

const fs = require("fs");
const path = require("path");

const projectFolder = path.resolve(__dirname, project);

console.log("Finding project...");
if (!fs.existsSync(projectFolder)) {
  console.log("Project not found! Creating new...");
  fs.mkdirSync(projectFolder);
  const serviceContent = fs
    .readFileSync(path.resolve(__dirname, "templates", "service.yaml"))
    .toString()
    .replaceAll("{{ project }}", project);
  fs.writeFileSync(
    path.resolve(__dirname, project, "service.yaml"),
    serviceContent
  );
  const deploymentTemplateContent = fs
    .readFileSync(path.resolve(__dirname, "templates", "deployment.yaml"))
    .toString()
    .replaceAll("{{ project }}", project)
    .replaceAll("{{ registry }}", registry);
  fs.writeFileSync(
    path.resolve(__dirname, "templates", `${project}.deployment.yaml`),
    deploymentTemplateContent
  );
  console.log("Project created!");
} else {
  console.log("Project found!");
}

console.log("Reading and replacing the content of deloyment template...");
const deploymentContent = fs
  .readFileSync(
    path.resolve(__dirname, "templates", `${project}.deployment.yaml`)
  )
  .toString()
  .replaceAll("{{ run_id }}", runId);

console.log("Writing output to deployment.yaml file...");
fs.writeFileSync(
  path.resolve(__dirname, project, "deployment.yaml"),
  deploymentContent
);
console.log("Finish writing output.");

const dir = fs.readdirSync(path.resolve(__dirname, project));
console.log("Check dir content:", dir);

console.log("DONE");
