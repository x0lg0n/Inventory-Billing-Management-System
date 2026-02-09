#!/bin/bash

# Script to create GitHub labels for Inventory-Billing-Management-System
# Usage: chmod +x create-labels.sh && ./create-labels.sh
# Requires: GitHub CLI (https://cli.github.com)

set -e

REPO="x0lg0n/Inventory-Billing-Management-System"
TOTAL_LABELS=0
CREATED_LABELS=0

echo "🏷️  Creating GitHub Labels for $REPO..."
echo ""

# Function to create a label
create_label() {
    local name=$1
    local color=$2
    local description=$3
    
    TOTAL_LABELS=$((TOTAL_LABELS + 1))
    
    if gh label create --repo "$REPO" "$name" --color "$color" --description "$description" --force 2>/dev/null; then
        echo "✅ Created label: $name"
        CREATED_LABELS=$((CREATED_LABELS + 1))
    else
        echo "⚠️  Label already exists: $name"
    fi
}

echo "📌 Version Labels:"
create_label "v1.1.0" "0075CA" "Targeted for v1.1.0 (Q2 2026)"
create_label "v1.2.0" "0075CA" "Targeted for v1.2.0 (Q3 2026)"
create_label "v2.0.0" "0075CA" "Targeted for v2.0.0 (Q4 2026)"
create_label "v2.1.0" "0075CA" "Targeted for v2.1.0 (Q1 2027)"
create_label "v3.0.0" "0075CA" "Targeted for v3.0.0 (Future)"

echo ""
echo "👥 Contribution Level Labels:"
create_label "good-first-issue" "7057FF" "Perfect for newcomers and first-time contributors"
create_label "help-wanted" "33AA3F" "Community contributions welcome; explicit call for help"
create_label "intermediate" "F9D0EB" "Intermediate level; requires some project knowledge"
create_label "advanced" "C2E0C6" "Advanced level; deep project knowledge required"

echo ""
echo "📝 Issue Type Labels:"
create_label "bug" "D73A49" "Something isn't working"
create_label "feature" "A2EOEA" "New feature or enhancement"
create_label "documentation" "0052CC" "Improvements or additions to documentation"
create_label "refactor" "B60205" "Code refactoring or technical debt"
create_label "performance" "FBCA04" "Performance improvements"
create_label "security" "D876E3" "Security-related issues"
create_label "testing" "CCEBEd" "Testing and test coverage"

echo ""
echo "⚡ Priority Labels:"
create_label "priority: critical" "B60205" "Blocks releases; urgent"
create_label "priority: high" "D73A49" "Important; should be addressed soon"
create_label "priority: medium" "FBCA04" "Normal; will be addressed"
create_label "priority: low" "0075CA" "Nice to have; can wait"

echo ""
echo "🔄 Status Labels:"
create_label "status: backlog" "FFEAA7" "In the backlog, not yet scheduled"
create_label "status: in-progress" "F0E68C" "Currently being worked on"
create_label "status: blocked" "D73A49" "Blocked by another issue"
create_label "status: review" "A2EOEA" "Waiting for review"
create_label "status: waiting-feedback" "BFD4F2" "Waiting for more information"

echo ""
echo "🎯 Area Labels:"
create_label "area: backend" "0052CC" "Backend/API related"
create_label "area: frontend" "6F42C1" "Frontend/UI related"
create_label "area: database" "795548" "Database related"
create_label "area: devops" "FF9800" "DevOps, CI/CD, infrastructure"
create_label "area: documentation" "009688" "Documentation only"
create_label "area: testing" "4CAF50" "Testing infrastructure"

echo ""
echo "💬 Community Labels:"
create_label "question" "D876E3" "Questions from the community"
create_label "discussion" "0066CC" "Discussion topic"
create_label "duplicate" "CCCCCC" "Duplicate of another issue"
create_label "won't-fix" "FFFFFF" "Not going to fix"
create_label "invalid" "E6E6E6" "Not a valid issue"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Label Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Summary:"
echo "   Total: $TOTAL_LABELS labels"
echo "   Created/Updated: $CREATED_LABELS labels"
echo ""
echo "🔗 View labels: https://github.com/$REPO/labels"
echo ""
echo "✅ Ready to use! Start creating issues with these labels to organize contributions."
