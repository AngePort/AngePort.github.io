#!/usr/bin/env bash
# Fetch latest GitHub repos and feed them into _data/github_repos.json for Jekyll.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT"

USERNAME="${1:-AngePort}"
LIMIT="${2:-6}"
OUTPUT_PATH="_data/github_repos.json"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is required. Install from https://cli.github.com/." >&2
  exit 1
fi

echo "Fetching latest ${LIMIT} repos for ${USERNAME}..."
gh repo list "$USERNAME" --limit "$LIMIT" --json name,description,updatedAt,primaryLanguage,url \
  --jq 'map({name, description, url, language: (.primaryLanguage.name // null), updated_at: .updatedAt})' \
  > "$OUTPUT_PATH"

python3 -m json.tool "$OUTPUT_PATH" >/dev/null 2>&1 || {
  echo "Generated JSON is invalid. Check ${OUTPUT_PATH}." >&2
  exit 1
}

echo "Done. Review ${OUTPUT_PATH}, commit it, and the Projects page will surface the latest repos."
