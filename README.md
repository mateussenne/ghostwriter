![logo](https://github.com/mateussenne/ghostwriter/assets/13854939/28757858-ab5e-428b-913e-bba132098b0f)

Ghostwriter is a tool designed to streamline the process of creating pull requests (PRs) by automatically generating them based on the changes made in your working branch compared to the main branch.

By analyzing a customizable PR template provided by you, Ghostwriter leverages the capabilities of artificial intelligence to craft clear and concise PRs, saving you time and effort in the code review process.

## Experimental Phase
- The tool is currently in an experimental phase. Installation, as outlined below, may not fully result in the intended functionality.
- **Uninstalling is not working at the moment** . You are not going to able to remove all ghostwriter files from your project by just running uninstall.

## Getting Started
**Disclaimer:** Ghostwriter employs `GPT-4-turbo` for crafting your Pull Request. To utilize this tool, you'll need an account with sufficient funds on OpenAI, which can be obtained at https://platform.openai.com/. Ghostwriter will evaluate the differences between the working branch and the main branch using the `git diff` command. Consequently, the greater the extent of your changes, the more funds Ghostwriter will consume. For more insights into how GPT consumes your funds, please refer to the [tokenizer](https://platform.openai.com/tokenizer).

1. Begin by inserting your organization ID and API keys into the `.env` file:
 ```
  OPENAI_ORGANIZATION_ID="your_org_id"
  OPENAI_API_KEY="your_open_ai_key"
```

2. Install the npm package:
```bash
  npm install gw-ghostwriter
```

3. Configure the template to suit your preferences:

  - After installing Ghostwriter, a default template will be created under the file `ghostwriter-template.md`. You can configure according to your liking by just adding what you would like ghostwriter to follow.

  - Now, you can continue working as usual. When you attempt to push your branch, Ghostwriter will seamlessly take action, composing the PR for you.

## Ghostwriter in action  
![gw-gif](https://github.com/mateussenne/ghostwriter/assets/13854939/f3c91aeb-64ca-43b3-b366-ad96940ee3bd) 


## Generated PR from the example above
- In the example above, we created a new branch `feature` and have systematically excluded the initial elements from a basic Next.js application and introduced a straightforward `<h1>` tag containing the greeting text.
The corresponding pull request (PR) reflecting these changes is provided below:

```
### Description
- The code changes in this pull request involve several div elements and modifying the content inside the main element. Specifically, the following changes have been made: 
  - The `<p>` element with the text "Get started by editing src/app/page.tsx has been removed.
  - The `<div>` element containing the Vercel logo and link has been removed.
  - The `<div>` element with the Next.js logo has been removed.
  - The grid layout with four `<a>` elements has been removed.
  - a New `<h1>` element with the text "Hello" has been added inside the main element.

### Changes
- Removed unecessary div elements.
- Added a new h1 element with the text "Hello".

### Testing
- Tested the changes locally to ensure that the page renders withou any errors.
- Verfified that the "Hello" text is displayed correctly on the page.
- Checked the layout and styling of the page to ensure that it still looks visually appealing
```
