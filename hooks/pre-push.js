#!/usr/bin/env node

const { execSync } = require("child_process");
const URI = require("uri-js");
const path = require("path");
const writerFilePath = path.join(__dirname, "writer.js");
const { writePullRequest } = require(writerFilePath);

require("dotenv").config();

// Load access keys from .env file
const apiKey = process.env.OPENAI_API_KEY;
const organizationId = process.env.OPENAI_ORGANIZATION_ID;

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

  console.log("let's ride");
  // Stringify diffs and template to remove newlines
  const result = await writePullRequest({
    diffs: JSON.stringify(escapedDiffs),
    template: JSON.stringify(escapedTemplate),
    apiKey,
    organizationId,
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
