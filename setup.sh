#!/bin/bash

PRE_PUSH_HOOK="../../.git/hooks/pre-push"

GHOSTWRITER_TEMPLATE="../../ghostwriter-template.md"

touch $GHOSTWRITER_TEMPLATE
echo -e '\n### Description \n-  \n\n### Changes\n-\n\n### Testing\n-' > "$GHOSTWRITER_TEMPLATE"

# TODO: Improve if / else statement
if [ -f "$PRE_PUSH_HOOK" ]; then
    # Append custom logic to existing pre-push hook
    echo -e '\nnode .git/hooks/pre-push.js\n\n[ $? -ne 0 ] && { echo "Error: Ghostwriter could not write your PR. Push rejected."; exit 1; } || { exit 0; }' > "$PRE_PUSH_HOOK"
else
    # Create pre-push hook and add custom logic
    touch $PRE_PUSH_HOOK
    echo -e '\nnode .git/hooks/pre-push.js\n\n[ $? -ne 0 ] && { echo "Error: Ghostwriter could not write your PR. Push rejected."; exit 1; } || { exit 0; }' > "$PRE_PUSH_HOOK"
    chmod +x "$PRE_PUSH_HOOK"
fi
