#!/usr/bin/env node

const { execSync } = require("child_process");
const URI = require("uri-js");

// Read template content from file
console.log("starting");
try {
  const template = execSync("cat template.md", { encoding: "utf-8" });
  if (!template) {
    return console.log("No ghostwriter template found");
  }

  // Get current git branch
  const currentBranch = execSync("git rev-parse --abbrev-ref HEAD");

  // Get the git diff
  const diffs = execSync(`git diff main..${currentBranch}`, {
    encoding: "utf-8",
  });

  // Escape template and diffs
  const escapedTemplate = escapeString(template);
  const escapedDiffs = escapeString(diffs);

  // Create JSON data without newlines
  const data = JSON.stringify({
    template: escapedTemplate,
    diffs: escapedDiffs,
  });

  const url = "http://localhost:3000/write";

  const result = fetch(url, { method: "POST", body: data });

  return console.log(result);
} catch (error) {
  console.log(error);
}

// Function to escape special characters in a string
function escapeString(str) {
  console.log(str);
  return URI.serialize(URI.parse(str));
}
