#!/bin/bash

PRE_PUSH_HOOK="../../.git/hooks/pre-push"

if [ -f "$PRE_PUSH_HOOK" ]; then
    # Append custom logic to existing pre-push hook
    echo -e "\nnode .git/hooks/pre-push.js\nexit 0" > "$PRE_PUSH_HOOK"
else
    # Create pre-push hook and add custom logic
    touch ../../.git/hooks/pre-push
    echo -e "#!/bin/bash\n\nnode .git/hooks/pre-push.js\nexit 0" > "$PRE_PUSH_HOOK"
    chmod +x "$PRE_PUSH_HOOK"
fi
