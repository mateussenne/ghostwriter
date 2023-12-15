const { execSync } = require("child_process");
const { URI } = require("uri-js");

// Read template content from file
const template = execSync("cat template.md", { encoding: "utf-8" });

// Get current git branch

// Get the git diff
const diffs = execSync("git diff..git rev-parse --abbrev-ref HEAD", {
  encoding: "utf-8",
});

// Function to escape special characters in a string
function escapeString(str) {
  return URI.serialize(URI.parse(str));
}

// Escape template and diffs
const escapedTemplate = escapeString(template);
const escapedDiffs = escapeString(diffs);

// Create JSON data without newlines
const data = JSON.stringify({
  template: escapedTemplate,
  diffs: escapedDiffs,
});

console.log(data);

// Replace the URL with your actual endpoint
// const url = "http://localhost:3000/write";
// const result = execSync(
//   `curl -X POST -H "Content-Type: application/json" -d '${data}' ${url}`,
//   { encoding: "utf-8" }
// );
// const result = fetch(url, {
//   body: {
//     data,
//   },
// });

// console.log(result);
