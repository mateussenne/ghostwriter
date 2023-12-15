#!/bin/bash

PRE_PUSH_HOOK="../../.git/hooks/pre-push"

touch ../../ghostwriter_template.md

# TODO: Improve if / else statement
if [ -f "$PRE_PUSH_HOOK" ]; then
    # Append custom logic to existing pre-push hook
    echo -e '\nnode .git/hooks/pre-push.js\n\n[ $? -ne 0 ] && { echo "Error: Ghostwriter could not write your PR. Push rejected."; exit 1; } || { echo "GHOSTWRITER SAYS:"; exit 0; }' > "$PRE_PUSH_HOOK"
else
    # Create pre-push hook and add custom logic
    touch ../../.git/hooks/pre-push
    echo -e '\nnode .git/hooks/pre-push.js\n\n[ $? -ne 0 ] && { echo "Error: Ghostwriter could not write your PR. Push rejected."; exit 1; } || { echo "GHOSTWRITER SAYS:"; exit 0; }' > "$PRE_PUSH_HOOK"
    chmod +x "$PRE_PUSH_HOOK"
fi
