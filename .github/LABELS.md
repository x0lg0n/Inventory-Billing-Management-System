# GitHub Labels Configuration

This file documents all the labels used in the Inventory & Billing Management System project for organizing issues and pull requests.

## Label Categories

### Version Labels (for Roadmap)

These labels indicate which version(s) an issue is targeted for.

| Label | Color | Description |

|-------|-------|-------------|
| `v1.1.0` | `#0075CA` (Blue) | Targeted for v1.1.0 (Q2 2026) |
| `v1.2.0` | `#0075CA` (Blue) | Targeted for v1.2.0 (Q3 2026) |
| `v2.0.0` | `#0075CA` (Blue) | Targeted for v2.0.0 (Q4 2026) |
| `v2.1.0` | `#0075CA` (Blue) | Targeted for v2.1.0 (Q1 2027) |
| `v3.0.0` | `#0075CA` (Blue) | Targeted for v3.0.0 (Future) |

### Contribution Level Labels

These labels help contributors find tasks matching their skill level and experience.

| Label | Color | Description |

|-------|-------|-------------|
| `good-first-issue` | `#7057FF` (Purple) | Perfect for newcomers and first-time contributors |
| `help-wanted` | `#33AA3F` (Green) | Community contributions welcome; explicit call for help |
| `intermediate` | `#F9D0EB` (Pink) | Intermediate level; requires some project knowledge |
| `advanced` | `#C2E0C6` (Light Green) | Advanced level; deep project knowledge required |

### Issue Type Labels

These categorize the nature of the issue.

| Label | Color | Description |

|-------|-------|-------------|
| `bug` | `#D73A49` (Red) | Something isn't working |
| `feature` | `#A2EOEA` (Teal) | New feature or enhancement |
| `documentation` | `#0052CC` (Dark Blue) | Improvements or additions to documentation |
| `refactor` | `#B60205` (Dark Red) | Code refactoring or technical debt |
| `performance` | `#FBCA04` (Yellow) | Performance improvements |
| `security` | `#D876E3` (Purple) | Security-related issues |
| `testing` | `#CCEBEd` (Light Blue) | Testing and test coverage |

### Priority Labels

These indicate the urgency and importance of an issue.

| Label | Color | Description |

|-------|-------|-------------|
| `priority: critical` | `#B60205` (Dark Red) | Blocks releases; urgent |
| `priority: high` | `#D73A49` (Red) | Important; should be addressed soon |
| `priority: medium` | `#FBCA04` (Yellow) | Normal; will be addressed |
| `priority: low` | `#0075CA` (Blue) | Nice to have; can wait |

### Status Labels

These track the current status of an issue.

| Label | Color | Description |

|-------|-------|-------------|
| `status: backlog` | `#FFEAA7` | In the backlog, not yet scheduled |
| `status: in-progress` | `#F0E68C` | Currently being worked on |
| `status: blocked` | `#D73A49` (Red) | Blocked by another issue |
| `status: review` | `#A2EOEA` (Teal) | Waiting for review |
| `status: waiting-feedback` | `#BFD4F2` (Light Blue) | Waiting for more information |

### Area Labels

These identify which part of the project an issue relates to.

| Label | Color | Description |

|-------|-------|-------------|
| `area: backend` | `#0052CC` (Dark Blue) | Backend/API related |
| `area: frontend` | `#6F42C1` (Purple) | Frontend/UI related |
| `area: database` | `#795548` (Brown) | Database related |
| `area: devops` | `#FF9800` (Orange) | DevOps, CI/CD, infrastructure |
| `area: documentation` | `#009688` (Teal) | Documentation only |
| `area: testing` | `#4CAF50` (Green) | Testing infrastructure |

### Community Labels

For community engagement and coordination.

| Label | Color | Description |

|-------|-------|-------------|
| `question` | `#D876E3` (Purple) | Questions from the community |
| `discussion` | `#0066CC` (Blue) | Discussion topic |
| `duplicate` | `#CCCCCC` (Gray) | Duplicate of another issue |
| `won't-fix` | `#FFFFFF` (White, with border) | Not going to fix |
| `invalid` | `#E6E6E6` (Light Gray) | Not a valid issue |

---

## How to Create These Labels

### Method 1: GitHub CLI (Recommended)

If you have GitHub CLI installed, you can create labels programmatically:

```bash
# Install GitHub CLI if you haven't: https://cli.github.com/

# Log in to GitHub
gh auth login

# Navigate to the repository directory
cd Inventory-Billing-Management-System

# Create a label with a specific color and description
gh label create "v1.1.0" --color "0075CA" --description "Targeted for v1.1.0 (Q2 2026)"
gh label create "good-first-issue" --color "7057FF" --description "Perfect for newcomers and first-time contributors"
gh label create "help-wanted" --color "33AA3F" --description "Community contributions welcome; explicit call for help"
# ... and so on for all labels
```

### Method 2: GitHub Web UI (Manual)

1. Go to your repository on GitHub
2. Click **Settings** → **Labels**
3. Click **New label**
4. Fill in:
   - **Label name**: (from the table above)
   - **Description**: (from the table above)
   - **Color**: (hex code from the table above)
5. Click **Create label**
6. Repeat for each label in the tables above

### Method 3: Using a Script

Create a script file `.github/scripts/create-labels.sh`:

```bash
#!/bin/bash

# Script to create GitHub labels using GitHub CLI

REPO="x0lg0n/Inventory-Billing-Management-System"

# Version Labels
gh label create --repo $REPO "v1.1.0" --color "0075CA" --description "Targeted for v1.1.0 (Q2 2026)" --force
gh label create --repo $REPO "v1.2.0" --color "0075CA" --description "Targeted for v1.2.0 (Q3 2026)" --force
gh label create --repo $REPO "v2.0.0" --color "0075CA" --description "Targeted for v2.0.0 (Q4 2026)" --force
gh label create --repo $REPO "v2.1.0" --color "0075CA" --description "Targeted for v2.1.0 (Q1 2027)" --force
gh label create --repo $REPO "v3.0.0" --color "0075CA" --description "Targeted for v3.0.0 (Future)" --force

# Contribution Level Labels
gh label create --repo $REPO "good-first-issue" --color "7057FF" --description "Perfect for newcomers and first-time contributors" --force
gh label create --repo $REPO "help-wanted" --color "33AA3F" --description "Community contributions welcome; explicit call for help" --force
gh label create --repo $REPO "intermediate" --color "F9D0EB" --description "Intermediate level; requires some project knowledge" --force
gh label create --repo $REPO "advanced" --color "C2E0C6" --description "Advanced level; deep project knowledge required" --force

# Issue Type Labels
gh label create --repo $REPO "bug" --color "D73A49" --description "Something isn't working" --force
gh label create --repo $REPO "feature" --color "A2EOEA" --description "New feature or enhancement" --force
gh label create --repo $REPO "documentation" --color "0052CC" --description "Improvements or additions to documentation" --force
gh label create --repo $REPO "refactor" --color "B60205" --description "Code refactoring or technical debt" --force
gh label create --repo $REPO "performance" --color "FBCA04" --description "Performance improvements" --force
gh label create --repo $REPO "security" --color "D876E3" --description "Security-related issues" --force
gh label create --repo $REPO "testing" --color "CCEBEd" --description "Testing and test coverage" --force

# Priority Labels
gh label create --repo $REPO "priority: critical" --color "B60205" --description "Blocks releases; urgent" --force
gh label create --repo $REPO "priority: high" --color "D73A49" --description "Important; should be addressed soon" --force
gh label create --repo $REPO "priority: medium" --color "FBCA04" --description "Normal; will be addressed" --force
gh label create --repo $REPO "priority: low" --color "0075CA" --description "Nice to have; can wait" --force

# Status Labels
gh label create --repo $REPO "status: backlog" --color "FFEAA7" --description "In the backlog, not yet scheduled" --force
gh label create --repo $REPO "status: in-progress" --color "F0E68C" --description "Currently being worked on" --force
gh label create --repo $REPO "status: blocked" --color "D73A49" --description "Blocked by another issue" --force
gh label create --repo $REPO "status: review" --color "A2EOEA" --description "Waiting for review" --force
gh label create --repo $REPO "status: waiting-feedback" --color "BFD4F2" --description "Waiting for more information" --force

# Area Labels
gh label create --repo $REPO "area: backend" --color "0052CC" --description "Backend/API related" --force
gh label create --repo $REPO "area: frontend" --color "6F42C1" --description "Frontend/UI related" --force
gh label create --repo $REPO "area: database" --color "795548" --description "Database related" --force
gh label create --repo $REPO "area: devops" --color "FF9800" --description "DevOps, CI/CD, infrastructure" --force
gh label create --repo $REPO "area: documentation" --color "009688" --description "Documentation only" --force
gh label create --repo $REPO "area: testing" --color "4CAF50" --description "Testing infrastructure" --force

# Community Labels
gh label create --repo $REPO "question" --color "D876E3" --description "Questions from the community" --force
gh label create --repo $REPO "discussion" --color "0066CC" --description "Discussion topic" --force
gh label create --repo $REPO "duplicate" --color "CCCCCC" --description "Duplicate of another issue" --force
gh label create --repo $REPO "won't-fix" --color "FFFFFF" --description "Not going to fix" --force
gh label create --repo $REPO "invalid" --color "E6E6E6" --description "Not a valid issue" --force

echo "✅ All labels created successfully!"
```

Make the script executable and run it:

```bash
chmod +x .github/scripts/create-labels.sh
./.github/scripts/create-labels.sh
```

---

## Label Usage Guidelines

### For Issue Reporters

- **Always** add a type label (`bug`, `feature`, `documentation`, etc.)
- Add **at least one area label** to indicate which part of the project it affects
- Add a **priority label** if you know the urgency
- For feature requests, add the target **version label**

### For Maintainers

- Use **status labels** to track progress through the workflow
- Add **good-first-issue** or **help-wanted** to encourage contributions
- Apply **priority labels** when triaging issues
- Use **blocked** status if an issue depends on another

### For Contributors

- Filter issues by:
  - `good-first-issue` — Perfect for getting started
  - `help-wanted` — Looking for community help
  - `v1.1.0`, `v1.2.0`, etc. — Work on planned versions
  - `area: backend`, `area: frontend` — Filter by interest area

---

## Default GitHub Labels to Remove

GitHub creates some default labels that we don't use. You can optionally remove these:

- `bug` → We use a custom one
- `enhancement` → Use `feature` instead  
- `documentation` → We use a custom one
- `good first issue` → Use `good-first-issue` (hyphenated) for consistency
- `help wanted` → Use `help-wanted` (hyphenated) for consistency

---

## References

- [GitHub Labels Documentation](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels)
- [GitHub CLI - Label Commands](https://cli.github.com/manual/gh_label)
