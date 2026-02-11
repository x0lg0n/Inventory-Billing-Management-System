# Release Guide

This document outlines the process for creating releases of the Inventory & Billing Management System project and the checklist to follow before releasing.

---

## 📋 Pre-Release Checklist

Before creating any release, ensure you've completed all of these checks:

### 1. **Code Quality & Testing** ✅

- [ ] All tests pass locally (`pnpm test`)

  ```bash
  cd backend && pnpm test
  cd ../frontend && pnpm test
  ```

- [ ] No console errors or warnings in development
- [ ] ESLint checks pass (`pnpm lint`)

  ```bash
  cd frontend && pnpm lint
  ```

- [ ] Build succeeds (`pnpm build`)

  ```bash
  cd backend && # No build needed for Node backend
  cd ../frontend && pnpm build
  ```

- [ ] GitHub Actions workflows pass (check Actions tab on GitHub)
  - ✅ Test workflow passed
  - ✅ Lint workflow passed
  - ✅ Build workflow passed
  - ✅ Security audit passed

### 2. **Documentation Updates** 📚

- [ ] [CHANGELOG.md](../CHANGELOG.md) updated with new features, bug fixes, and breaking changes
  - Format: Use [Keep a Changelog](https://keepachangelog.com/) format
  - Include version number and release date
  - List all notable changes organized by type (Added, Changed, Fixed, Removed, Security)
- [ ] [README.md](../README.md) updated if needed
- [ ] [ROADMAP.md](../ROADMAP.md) updated to reflect new progress
- [ ] API documentation updated in Postman collection (if applicable)
- [ ] Backend [README.md](../backend/README.md) updated (if backend changes)
- [ ] Frontend [README.md](../frontend/README.md) updated (if frontend changes)

### 3. **Version Numbers Updated** 🔢

- [ ] [backend/package.json](../backend/package.json) version updated

  ```json
  {
    "version": "1.0.0"
  }
  ```
  
- [ ] [frontend/package.json](../frontend/package.json) version updated

  ```json
  {
    "version": "1.0.0"
  }
  ```

- [ ] [CITATION.cff](../CITATION.cff) version updated (if applicable)

### 4. **Dependencies & Security** 🔒

- [ ] No critical or high-severity vulnerabilities (`pnpm audit`)

  ```bash
  cd backend && pnpm audit
  cd ../frontend && pnpm audit
  ```

- [ ] Dependencies are up to date (or deliberately pinned for stability)
- [ ] No deprecated dependencies being used

### 5. **Git Status** 📝

- [ ] Working directory is clean (`git status`)

  ```bash
  git status  # Should show "working tree clean"
  ```

- [ ] All changes are committed
- [ ] No uncommitted files
- [ ] Branch is up to date with main branch

  ```bash
  git pull origin main
  ```

### 6. **Breaking Changes** ⚠️

- [ ] No unintended breaking changes introduced
- [ ] If breaking changes exist, they are documented in CHANGELOG
- [ ] Migration guide provided (if major version bump)
- [ ] Deprecation warnings added before removal (prefer minor version bumps)

### 7. **Feature Completeness** ✨

- [ ] All planned features for this version are complete
- [ ] No incomplete features shipped (mark as beta if needed)
- [ ] Known issues documented

### 8. **Performance** ⚡

- [ ] No performance regressions
- [ ] Large files checked for optimization
- [ ] Bundle size checked (frontend)

  ```bash
  cd frontend && pnpm build  # Check output for warnings
  ```

---

## 🚀 Creating a Release

### Step 1: Prepare the Release Branch

```bash
# Make sure you're on the main branch
git checkout main
git pull origin main

# Create a release branch (optional but recommended)
git checkout -b release/v1.0.0
```

### Step 2: Update Files

Update the following files with the new version number and changelog:

## **1. CHANGELOG.md**

```markdown
## [1.0.0] - 2026-02-10

### Added
- Initial project setup with core functionality
- Authentication system with JWT
- Product management module
- Contact management (customers & vendors)
- Transaction processing (purchases & sales)
- Dashboard with basic analytics
- Dark mode support
- Docker deployment support

### Fixed
- Fixed initial bugs and issues
- Improved error handling

### Security
- Implemented security best practices (Helmet.js, rate limiting)
- Added input validation and sanitization
```

## **2. backend/package.json**

```json
{
  "name": "inventory-billing-backend",
  "version": "1.0.0",
  ...
}
```

## **3. frontend/package.json**

```json
{
  "name": "inventory-billing-frontend",
  "version": "1.0.0",
  ...
}
```

### Step 3: Commit & Push

```bash
# Stage all changes
git add CHANGELOG.md backend/package.json frontend/package.json CITATION.cff README.md

# Commit with standard message
git commit -m "chore: bump version to 1.0.0"

# Push the branch
git push origin release/v1.0.0

# If not using a release branch, push to main
git push origin main
```

### Step 4: Create a Pull Request (Optional)

If using a release branch:

1. Go to GitHub
2. Click "Compare & pull request" for the release branch
3. Add release notes as PR description
4. Have it reviewed and merged to main

### Step 5: Create a GitHub Release

1. **Go to GitHub Repository**

   - Navigate to: `https://github.com/x0lg0n/`Inventory-Billing-Management-System
   - Click on "Releases" (right sidebar)
   - Click "Draft a new release"

2. **Fill in Release Details**
   - **Tag version**: `v1.0.0`
   - **Release title**: `Version 1.0.0 - Initial Release`
   - **Description**: (See Release Notes Template below)
   - **Prerelease**: Uncheck (only check for beta/alpha releases)
   - **Latest release**: Check

3. **Add Release Notes** (Use template below)

4. **Publish Release**
   - Click "Publish release"
   - GitHub will automatically create the tag

---

## 📝 Release Notes Template

Use this template for GitHub release descriptions:

```markdown
# 🎉 Version 1.0.0 - Initial Release

The Inventory & Billing Management System is now ready for use! This is the first stable release featuring core functionality for inventory and billing management.

## ✨ What's New

### Features Added
- **🔐 Authentication System** - Secure JWT-based authentication with user roles
- **📦 Product Management** - Complete inventory management with stock tracking
- **👥 Contact Management** - Unified customer and vendor management
- **💰 Transaction Processing** - Purchase and sales transactions with automatic inventory updates
- **📊 Dashboard & Analytics** - Real-time dashboard with sales trends and reports
- **🌓 Dark Mode** - Light and dark theme support
- **🐳 Docker Support** - Easy deployment with Docker Compose

### Technical Improvements
- Built with Next.js 15, Express.js, and MongoDB
- TypeScript for type safety
- Comprehensive API documentation (Postman)
- Security best practices (Helmet.js, rate limiting, validation)

### Documentation
- Complete README with setup instructions
- Contributing guidelines for new developers
- CONTRIBUTING.md for community contributions
- API documentation included

## 📥 Installation

### Docker (Recommended)
```bash
git clone https://github.com/x0lg0n/Inventory-Billing-Management-System.git
cd Inventory-Billing-Management-System
docker-compose up
```

### Manual Setup

See [README.md](../README.md) for detailed setup instructions.

## 🐛 Known Issues

- None at this time. Please report issues [here](https://github.com/x0lg0n/Inventory-Billing-Management-System/issues).

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - See [LICENSE](../LICENSE) for details.

## 🙏 Thanks

Special thanks to all contributors who made this release possible!

---
**Release Date**: February 10, 2026  
**Node.js**: v18+  
**MongoDB**: v6.0+

## 🔄 Version Numbering (Semantic Versioning)

This project follows [Semantic Versioning](https://semver.org/):

### Format: `MAJOR.MINOR.PATCH`

**Examples:**

- `1.0.0` - First stable release
- `1.1.0` - New features added (backward compatible)
- `1.1.1` - Bug fixes only
- `2.0.0` - Major changes, may have breaking changes

### When to Bump Versions

| Scenario | Bump To | Example |

|----------|---------|---------|
| New features (backward compatible) | `MINOR` | 1.0.0 → 1.1.0 |
| Bug fixes only | `PATCH` | 1.0.0 → 1.0.1 |
| Breaking changes | `MAJOR` | 1.0.0 → 2.0.0 |
| Beta/Pre-release | Append suffix | 1.1.0-beta.1 |
| Release candidate | Append suffix | 1.1.0-rc.1 |

---

## 🏷️ GitHub Release Tags

When you create a GitHub release, always use the tag format: `v1.0.0`

**Good examples:**

- `v1.0.0`
- `v1.1.0`
- `v1.0.1`
- `v1.1.0-beta.1`

**Avoid:**

- `1.0.0` (missing `v` prefix)
- `version-1.0.0` (inconsistent format)
- `release-1-0-0` (wrong separators)

---

## 📦 Downloadable Assets

When you create a GitHub Release, GitHub automatically provides:

- **Source code** (ZIP download)
- **Source code** (TAR.GZ download)
- **Release notes** in markdown

You can optionally add:

- Compiled binaries (if applicable)
- Docker images pushed to registry
- API documentation snapshots

For this Node.js project, users typically:

1. Clone from GitHub
2. Run `pnpm install`
3. Follow setup in README.md

---

## 📢 Announcing the Release

After publishing:

1. **Update ROADMAP.md**
   - Mark the completed version
   - Update progress notes

2. **Announce in Discussions**
   - Create a [GitHub Discussion](https://github.com/x0lg0n/Inventory-Billing-Management-System/discussions) under Announcements
   - Link to the release notes
   - Highlight key features

3. **Update Project Status** (if needed)
   - Update README badges (if any status indicators)
   - Update version in documentation files

4. **Share Externally** (Optional)
   - Twitter/social media
   - Dev.to blog post
   - Reddit communities
   - LinkedIn

---

## ✅ Post-Release Tasks

After releasing:

1. **Verify Installation**
   - Test fresh installation from release
   - Verify Docker deployment works
   - Check that URLs in docs are correct

2. **Monitor Issues**
   - Watch for bug reports
   - Respond quickly to critical issues
   - Track feedback

3. **Plan Next Release**
   - Update [ROADMAP.md](../ROADMAP.md) for next version
   - Create GitHub milestone for v1.1.0
   - Label issues accordingly

4. **Bug Fix Releases**
   - If critical bugs found, create v1.0.1 quickly
   - Follow same process but for PATCH version

---

## 🔧 Hotfix Process (For Critical Bugs)

If a critical bug is found after release:

1.**Create hotfix branch**

   ```bash
   git checkout -b hotfix/v1.0.1
   git pull origin main
   ```

2.**Fix the bug** with minimal changes

3.**Update CHANGELOG** (add Hotfix section)

4.**Bump PATCH version** only (1.0.0 → 1.0.1)

5.**Follow same release process**

6.**Merge back to main** and develop branches

---

## 📋 Release Checklist Summary

```bash
# Quick reference checklist
- [ ] Tests pass: pnpm test
- [ ] Build succeeds: pnpm build
- [ ] No lint errors: pnpm lint
- [ ] No vulnerabilities: pnpm audit
- [ ] CHANGELOG.md updated
- [ ] Version numbers updated in package.json files
- [ ] Git clean: git status
- [ ] Documentation updated
- [ ] GitHub Actions all green
- [ ] Commit changes: git commit
- [ ] Push to GitHub: git push
- [ ] Create GitHub Release with tag v1.0.0
- [ ] Publish release
- [ ] Update discussions/announcements
```

---

## 🆘 Troubleshooting

### Problem: Tag already exists

```bash
# Delete local tag
git tag -d v1.0.0

# Delete remote tag (after creating release on GitHub)
git push origin :refs/tags/v1.0.0
```

### Problem: Need to change release after publishing

1. Edit the release on GitHub (three dots menu → Edit)
2. Update description and publish again
3. Re-tag if version number changed

### Problem: Beta release published as stable

1. Edit the release
2. Check "This is a pre-release"
3. Publish stable version as separate release

---

## 📚 References

- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [GitHub Releases Documentation](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
- [Best Practices for Release Management](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

---

**Last Updated**: February 2026  
**Maintained by**: [Project Maintainers](MAINTAINERS.md)
