@echo off
REM Script to create GitHub labels for Inventory-Billing-Management-System (Windows)
REM Usage: create-labels.bat
REM Requires: GitHub CLI (https://cli.github.com)

setlocal enabledelayedexpansion

set REPO=x0lg0n/Inventory-Billing-Management-System
set TOTAL_LABELS=0
set CREATED_LABELS=0

echo.
echo 🏷️  Creating GitHub Labels for %REPO%...
echo.

REM Check if GitHub CLI is installed
where gh >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ GitHub CLI not found!
    echo Please install GitHub CLI from: https://cli.github.com
    pause
    exit /b 1
)

REM Function macro
setlocal enabledelayedexpansion
set "counter=0"

REM Version Labels
echo 📌 Version Labels:
call :create_label "v1.1.0" "0075CA" "Targeted for v1.1.0 (Q2 2026)"
call :create_label "v1.2.0" "0075CA" "Targeted for v1.2.0 (Q3 2026)"
call :create_label "v2.0.0" "0075CA" "Targeted for v2.0.0 (Q4 2026)"
call :create_label "v2.1.0" "0075CA" "Targeted for v2.1.0 (Q1 2027)"
call :create_label "v3.0.0" "0075CA" "Targeted for v3.0.0 (Future)"

echo.
echo 👥 Contribution Level Labels:
call :create_label "good-first-issue" "7057FF" "Perfect for newcomers and first-time contributors"
call :create_label "help-wanted" "33AA3F" "Community contributions welcome; explicit call for help"
call :create_label "intermediate" "F9D0EB" "Intermediate level; requires some project knowledge"
call :create_label "advanced" "C2E0C6" "Advanced level; deep project knowledge required"

echo.
echo 📝 Issue Type Labels:
call :create_label "bug" "D73A49" "Something isn't working"
call :create_label "feature" "A2EOEA" "New feature or enhancement"
call :create_label "documentation" "0052CC" "Improvements or additions to documentation"
call :create_label "refactor" "B60205" "Code refactoring or technical debt"
call :create_label "performance" "FBCA04" "Performance improvements"
call :create_label "security" "D876E3" "Security-related issues"
call :create_label "testing" "CCEBEd" "Testing and test coverage"

echo.
echo ⚡ Priority Labels:
call :create_label "priority: critical" "B60205" "Blocks releases; urgent"
call :create_label "priority: high" "D73A49" "Important; should be addressed soon"
call :create_label "priority: medium" "FBCA04" "Normal; will be addressed"
call :create_label "priority: low" "0075CA" "Nice to have; can wait"

echo.
echo 🔄 Status Labels:
call :create_label "status: backlog" "FFEAA7" "In the backlog, not yet scheduled"
call :create_label "status: in-progress" "F0E68C" "Currently being worked on"
call :create_label "status: blocked" "D73A49" "Blocked by another issue"
call :create_label "status: review" "A2EOEA" "Waiting for review"
call :create_label "status: waiting-feedback" "BFD4F2" "Waiting for more information"

echo.
echo 🎯 Area Labels:
call :create_label "area: backend" "0052CC" "Backend/API related"
call :create_label "area: frontend" "6F42C1" "Frontend/UI related"
call :create_label "area: database" "795548" "Database related"
call :create_label "area: devops" "FF9800" "DevOps, CI/CD, infrastructure"
call :create_label "area: documentation" "009688" "Documentation only"
call :create_label "area: testing" "4CAF50" "Testing infrastructure"

echo.
echo 💬 Community Labels:
call :create_label "question" "D876E3" "Questions from the community"
call :create_label "discussion" "0066CC" "Discussion topic"
call :create_label "duplicate" "CCCCCC" "Duplicate of another issue"
call :create_label "won't-fix" "FFFFFF" "Not going to fix"
call :create_label "invalid" "E6E6E6" "Not a valid issue"

echo.
echo ════════════════════════════════════════════════════════════════════
echo ✨ Label Setup Complete!
echo ════════════════════════════════════════════════════════════════════
echo.
echo 🔗 View labels: https://github.com/%REPO%/labels
echo.
echo ✅ Ready to use! Start creating issues with these labels to organize contributions.
echo.
pause
exit /b 0

:create_label
set /a TOTAL_LABELS+=1
gh label create --repo %REPO% %1 --color %2 --description %3 --force >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✅ Created label: %1
    set /a CREATED_LABELS+=1
) else (
    echo ⚠️  Label already exists: %1
)
exit /b 0
