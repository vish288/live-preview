#!/bin/bash

# Setup branch protection for main branch
# Requires GitHub CLI (gh) to be installed and authenticated

REPO="vish288/live-preview"
BRANCH="main"

echo "Setting up branch protection for $REPO:$BRANCH..."

# Create branch protection rule using GitHub CLI
gh api \
  --method PUT \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "/repos/$REPO/branches/$BRANCH/protection" \
  --field required_status_checks[strict]=true \
  --field required_status_checks[contexts][]='Test' \
  --field required_status_checks[contexts][]='Lint' \
  --field enforce_admins=false \
  --field required_pull_request_reviews[dismiss_stale_reviews]=true \
  --field required_pull_request_reviews[require_code_owner_reviews]=false \
  --field required_pull_request_reviews[required_approving_review_count]=0 \
  --field required_pull_request_reviews[require_last_push_approval]=false \
  --raw-field restrictions=null \
  --field allow_force_pushes=false \
  --field allow_deletions=false \
  --field block_creations=false \
  --field required_conversation_resolution=true \
  --field lock_branch=false \
  --field allow_fork_syncing=true

if [ $? -eq 0 ]; then
  echo "✅ Branch protection successfully configured for $BRANCH"
  echo ""
  echo "Protection settings:"
  echo "  • Pull requests required before merging"
  echo "  • Status checks must pass (Test, Lint)"
  echo "  • Branches must be up to date before merging"
  echo "  • Conversation resolution required"
  echo "  • Dismiss stale reviews on new commits"
  echo "  • No force pushes allowed"
  echo "  • No branch deletion allowed"
else
  echo "❌ Failed to set up branch protection"
  echo "Make sure you have the necessary permissions and gh CLI is authenticated"
fi