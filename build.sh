#!/bin/bash

# Generate deploy info file
BRANCH=$(git rev-parse --abbrev-ref HEAD)
DEPLOY_TIME=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
TIMESTAMP=$(date +%s)

cat > deploy-info.json << EOF
{
  "branch": "$BRANCH",
  "deployTime": "$DEPLOY_TIME",
  "timestamp": $TIMESTAMP
}
EOF

echo "✓ Deploy info generated"
echo "  Branch: $BRANCH"
echo "  Deploy time: $DEPLOY_TIME"
