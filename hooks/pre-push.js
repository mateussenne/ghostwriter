#!/usr/bin/env node

const { execSync } = require("child_process");
const { error } = require("console");
const URI = require("uri-js");

async function prePush() {
  try {
    const template = execSync("cat ghostwriter-template.md", {
      encoding: "utf-8",
    });
    if (!template) {
      return console.log("No ghostwriter template found");
    }

    // Get current git branch
    const currentBranch = execSync("git rev-parse --abbrev-ref HEAD");

    // Get the git diff from current branch to main
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
    const result = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
    return result;
  } catch (e) {
    console.log(error);
    return error;
  }
}

prePush()
  .then(async (response) => {
    const parsedResponse = await response.text();
    console.log(parsedResponse);
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

// Function to escape special characters in a string
function escapeString(str) {
  return URI.serialize(URI.parse(str));
}
