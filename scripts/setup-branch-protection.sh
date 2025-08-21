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
  -f required_status_checks='{"strict":true,"contexts":["Test","Lint"]}' \
  -f enforce_admins=false \
  -f required_pull_request_reviews='{"dismiss_stale_reviews":true,"require_code_owner_reviews":false,"required_approving_review_count":0,"require_last_push_approval":false}' \
  -f restrictions=null \
  -f allow_force_pushes=false \
  -f allow_deletions=false \
  -f block_creations=false \
  -f required_conversation_resolution=true \
  -f lock_branch=false \
  -f allow_fork_syncing=true

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