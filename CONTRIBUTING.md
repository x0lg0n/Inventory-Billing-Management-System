# Contributing to Inventory & Billing Management System

First off, thank you for considering contributing to the Inventory & Billing Management System! 🎉 

It's people like you that make this project such a great tool for the community. This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Style Guidelines](#style-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

### Our Standards

- **Be Respectful**: Treat everyone with respect. No harassment, discrimination, or inappropriate behavior.
- **Be Collaborative**: Work together to resolve conflicts and assume good intentions.
- **Be Professional**: Keep discussions focused on the project and constructive.
- **Be Inclusive**: Welcome newcomers and help them get started.

## 🚀 Getting Started

### Prerequisites

Before contributing, make sure you have:

1. A GitHub account
2. Git installed on your local machine
3. Node.js (v18+) and npm installed
4. MongoDB installed locally or access to MongoDB Atlas
5. Basic knowledge of:
   - JavaScript/TypeScript
   - React/Next.js
   - Node.js/Express
   - MongoDB
   - Git version control

### First Contributions

Never contributed to open source before? Here are some resources to help:

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [First Timers Only](https://www.firsttimersonly.com/)
- [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

Look for issues labeled with:
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `documentation` - Documentation improvements

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

**Bug Report Template:**

```markdown
### Description
[Clear and concise description of the bug]

### Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

### Expected Behavior
[What you expected to happen]

### Actual Behavior
[What actually happened]

### Screenshots
[If applicable, add screenshots]

### Environment
- OS: [e.g., Windows 10, macOS 12.0, Ubuntu 20.04]
- Browser: [e.g., Chrome 96, Firefox 95]
- Node.js version: [e.g., 18.12.0]
- npm version: [e.g., 8.19.0]

### Additional Context
[Any other context about the problem]
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

**Feature Request Template:**

```markdown
### Feature Description
[Clear and concise description of the feature]

### Problem it Solves
[Describe the problem this feature would solve]

### Proposed Solution
[Describe how you envision this feature working]

### Alternatives Considered
[Any alternative solutions or features you've considered]

### Additional Context
[Any other context, mockups, or examples]
```

### Code Contributions

#### Finding Issues to Work On

1. Check the [Issues](https://github.com/yourusername/Inventory-Billing-Management-System/issues) page
2. Look for issues labeled `help wanted` or `good first issue`
3. Comment on the issue to express your interest
4. Wait for assignment before starting work

#### Creating a New Feature

1. Discuss the feature in an issue first
2. Get approval from maintainers
3. Follow the development workflow below

## 💻 Development Setup

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR-USERNAME/Inventory-Billing-Management-System.git
cd Inventory-Billing-Management-System
```

3. Add the upstream repository:

```bash
git remote add upstream https://github.com/ORIGINAL-OWNER/Inventory-Billing-Management-System.git
```

### Branch Setup

1. Create a new branch for your feature/fix:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

2. Keep your branch up to date:

```bash
git fetch upstream
git rebase upstream/main
```

### Development Environment

#### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Configure your .env file
npm run dev
```

#### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
# Configure your .env.local file
npm run dev
```

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Linting
npm run lint
```

## 📝 Style Guidelines

### JavaScript/TypeScript Style Guide

We use ESLint and Prettier for code formatting. Key conventions:

```javascript
// Use meaningful variable names
const userProfile = await getUserProfile(userId);

// Use async/await over promises
async function fetchData() {
  try {
    const data = await api.get('/endpoint');
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Destructure when possible
const { name, email, role } = user;

// Use template literals for string concatenation
const message = `Welcome ${name}!`;

// Comment complex logic
// Calculate the discount based on user tier and purchase amount
const discount = calculateTieredDiscount(user.tier, purchaseAmount);
```

### React/Next.js Guidelines

```typescript
// Use functional components with TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

// Use custom hooks for logic
const useAuth = () => {
  const [user, setUser] = useState(null);
  // ... authentication logic
  return { user, login, logout };
};
```

### API Design Guidelines

```javascript
// RESTful endpoints
GET    /api/products      // List all products
GET    /api/products/:id  // Get single product
POST   /api/products      // Create product
PUT    /api/products/:id  // Update product
DELETE /api/products/:id  // Delete product

// Consistent error responses
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}

// Consistent success responses
{
  "success": true,
  "data": {
    // ... response data
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

### CSS/Tailwind Guidelines

```css
/* Use Tailwind utility classes */
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

/* Custom CSS when necessary */
.custom-animation {
  animation: slideIn 0.3s ease-in-out;
}

/* Component-specific styles in modules */
.button {
  @apply px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600;
}
```

## 📋 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or modifying tests
- `build`: Build system or dependency changes
- `ci`: CI/CD configuration changes
- `chore`: Other changes that don't modify src or test files

### Examples

```bash
# Feature
git commit -m "feat(auth): add password reset functionality"

# Bug fix
git commit -m "fix(products): resolve inventory count issue"

# Documentation
git commit -m "docs(readme): update installation instructions"

# With body
git commit -m "feat(reports): add export to PDF functionality

- Added PDF generation library
- Created export service
- Updated UI with export button
- Added tests for export functionality

Closes #123"
```

## 🔄 Pull Request Process

### Before Submitting

1. **Update your branch**:
```bash
git fetch upstream
git rebase upstream/main
```

2. **Run tests**:
```bash
npm test
npm run lint
```

3. **Update documentation** if needed

4. **Self-review** your code

### PR Template

```markdown
## Description
[Describe your changes]

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] I have tested my changes locally
- [ ] All tests pass
- [ ] I have added tests for my changes

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] Any dependent changes have been merged and published

## Screenshots (if applicable)
[Add screenshots here]

## Related Issues
Closes #[issue number]
```

### Review Process

1. **Automated checks** run on all PRs
2. **Code review** by at least one maintainer
3. **Testing** in development environment
4. **Approval and merge**

### After Your PR is Merged

1. Delete your local branch:
```bash
git branch -d feature/your-feature-name
```

2. Update your fork:
```bash
git checkout main
git pull upstream main
git push origin main
```

## 🎯 Development Best Practices

### Security

- Never commit sensitive data (passwords, API keys, etc.)
- Validate all user inputs
- Use parameterized queries for database operations
- Keep dependencies updated
- Follow OWASP security guidelines

### Performance

- Optimize database queries
- Implement proper caching strategies
- Lazy load components when appropriate
- Minimize bundle sizes
- Use proper indexing in MongoDB

### Testing

- Write unit tests for new functions
- Add integration tests for API endpoints
- Include E2E tests for critical user flows
- Maintain test coverage above 80%
- Test edge cases and error scenarios

### Documentation

- Document all public APIs
- Add JSDoc comments to functions
- Update README for new features
- Include inline comments for complex logic
- Keep CHANGELOG updated

## 🌟 Recognition

Contributors will be recognized in the following ways:

- Listed in the project's Contributors section
- Mentioned in release notes for significant contributions
- Special badges for regular contributors
- Invitation to join the core team for exceptional contributors

## 💬 Community

### Communication Channels

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For general discussions and questions
- **Discord**: [Join our Discord](https://discord.gg/yourdiscord)
- **Email**: contributors@yourdomain.com

### Getting Help

If you need help:

1. Check the documentation
2. Search existing issues
3. Ask in GitHub Discussions
4. Join our Discord community
5. Contact maintainers directly

## 📚 Additional Resources

### Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB University](https://university.mongodb.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React Documentation](https://react.dev/)

### Tools

- [VS Code](https://code.visualstudio.com/) - Recommended IDE
- [Postman](https://www.postman.com/) - API testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database GUI
- [Git Kraken](https://www.gitkraken.com/) - Git GUI

## 🙏 Thank You!

Thank you for taking the time to contribute to the Inventory & Billing Management System! Your efforts help make this project better for everyone. We look forward to your contributions!

---

<p align="center">
  Happy Coding! 🚀
</p>