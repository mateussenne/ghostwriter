#!/usr/bin/env node

const { execSync } = require("child_process");
const URI = require("uri-js");
require("dotenv").config();

// Function to escape special characters in a string
const escapeString = (str) => {
  return URI.serialize(URI.parse(str));
};

async function prePush() {
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
    headers: {
      Authorization: process.env.OPEN_AI_API_KEY,
      "Content-Type": "application/json",
    },
    body: data,
  });
  return result;
}

// Call async prePush function
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
