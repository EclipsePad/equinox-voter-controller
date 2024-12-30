#!/bin/bash

yarn run capture

git add .
git commit -m "update snapshots"
git push origin dev

pr_url=$(gh pr create \
    --base main \
    --head dev \
    --title "update snapshots" \
    --fill)

gh pr merge "$pr_url" --merge
