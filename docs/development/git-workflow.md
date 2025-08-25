# Git Workflow with CodeRabbit Integration

## Overview

This document outlines the Git workflow for v1+ development of the Maze App, incorporating CodeRabbit (GitHub App) for automated code reviews and quality assurance.

## Branching Strategy

### Main Branches
- `main` - Production-ready code, always deployable
- `develop` - Integration branch for features, staging environment
- `release/*` - Release preparation branches

### Feature Development
- `feature/epic-{n}-{description}` - Feature branches for epics
- `feature/story-{n}-{description}` - Story branches for individual stories
- `bugfix/{description}` - Bug fix branches
- `hotfix/{description}` - Critical production fixes

## CodeRabbit Setup (GitHub App)

### 1. GitHub App Integration

Since you've already added CodeRabbit to your GitHub account:

1. **CodeRabbit Dashboard**: Go to https://coderabbit.ai
2. **Repository Connection**: Ensure your maze-app repository is connected
3. **Configuration**: Set up analysis rules through the web interface
4. **Webhook**: CodeRabbit will automatically receive PR events

### 2. Local Development Tools

For local quality checks, use these tools:

```bash
# Install development dependencies
npm install

# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests
npm run test

# Build project
npm run build
```

## Git Upload Flow

### 1. Pre-Development Setup

```bash
# Ensure you're on develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/epic-1-flexible-players
```

### 2. Development Workflow

```bash
# Make your changes
# ... code changes ...

# Stage changes
git add .

# Commit with conventional commit format
git commit -m "feat: add support for 3-4 players in type system

- Update player types to support 1-4 players
- Add validation for player count limits
- Update UI components for flexible player display

Closes #123"
```

### 3. Pre-Push Quality Checks

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests
npm run test

# Build project
npm run build

# Fix any issues found
# ... fix issues ...

# Re-commit if needed
git add .
git commit -m "fix: resolve linting issues"
```

### 4. Push and Create Pull Request

```bash
# Push to remote
git push origin feature/epic-1-flexible-players

# Create PR via GitHub CLI or web interface
gh pr create \
  --title "feat: add support for 3-4 players in type system" \
  --body "## Description
Adds support for 3-4 players in the type system and UI components.

## Changes
- Update player types to support 1-4 players
- Add validation for player count limits  
- Update UI components for flexible player display

## Testing
- [ ] Unit tests pass
- [ ] TypeScript compilation successful
- [ ] Manual testing with 3-4 players

## CodeRabbit Analysis
- [ ] Code quality checks pass
- [ ] Coverage requirements met
- [ ] No critical issues found

Closes #123" \
  --base develop \
  --head feature/epic-1-flexible-players
```

### 5. CodeRabbit Review Process

1. **Automatic Analysis**: CodeRabbit automatically analyzes the PR via GitHub App
2. **Quality Report**: Review the CodeRabbit report in the PR
3. **Address Issues**: Fix any issues identified by CodeRabbit
4. **Re-analyze**: Push fixes and trigger re-analysis
5. **Approval**: Once CodeRabbit approves, request human review

### 6. Merge and Deploy

```bash
# After approval, merge to develop
git checkout develop
git pull origin develop
git merge feature/epic-1-flexible-players
git push origin develop

# Delete feature branch
git branch -d feature/epic-1-flexible-players
git push origin --delete feature/epic-1-flexible-players
```

## Commit Message Convention

Use conventional commits format:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```
feat(players): add support for 3-4 players in type system
fix(movement): resolve collision detection edge case
docs(api): update component documentation
refactor(store): simplify game state management
test(executor): add unit tests for movement engine
```

## Quality Gates

### GitHub Actions Quality Checks
- **TypeScript Strict Mode**: Enforced through type checking
- **ESLint**: Code style and best practices
- **Tests**: All tests must pass
- **Build**: Successful production build
- **Bundle Size**: Reasonable bundle size

### CodeRabbit Quality Checks
- **Code Coverage**: Minimum 80% coverage (if configured)
- **Complexity**: Maximum cyclomatic complexity of 10
- **Duplication**: Maximum 5% code duplication
- **Security**: No critical security vulnerabilities
- **Performance**: No performance anti-patterns

### Manual Review Checklist
- [ ] Code follows project patterns and conventions
- [ ] TypeScript strict mode compliance
- [ ] Proper error handling implemented
- [ ] Accessibility requirements met
- [ ] Responsive design considerations
- [ ] Performance impact assessed
- [ ] Documentation updated if needed

## Release Process

### 1. Create Release Branch
```bash
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0
```

### 2. Final Testing
```bash
# Run full test suite
npm run test

# Run type checking
npm run type-check

# Run linting
npm run lint

# Build project
npm run build

# Manual testing checklist
# ... complete testing checklist ...
```

### 3. Merge to Main
```bash
git checkout main
git pull origin main
git merge release/v1.0.0
git tag v1.0.0
git push origin main --tags
```

### 4. Deploy
```bash
# Deploy to production
npm run deploy:prod
```

## Troubleshooting

### Common Issues

#### GitHub Actions Failures
```bash
# Check workflow logs
# Go to Actions tab in GitHub repository

# Run checks locally
npm run lint
npm run type-check
npm run test
npm run build
```

#### Merge Conflicts
```bash
# Resolve conflicts
git status
# ... resolve conflicts manually ...
git add .
git commit -m "fix: resolve merge conflicts"
```

#### Quality Gate Failures
1. Review GitHub Actions logs
2. Address critical issues first
3. Update tests if needed
4. Refactor complex code if needed
5. Re-run checks after fixes

## Integration with BMad Method

### Story Development Flow
1. **Create Story**: Use BMad story templates
2. **Development**: Follow Git workflow above
3. **Review**: CodeRabbit + human review
4. **Documentation**: Update story status in docs
5. **QA**: Complete QA checklist before merge

### Epic Development Flow
1. **Epic Planning**: Use BMad epic templates
2. **Story Breakdown**: Create individual stories
3. **Parallel Development**: Multiple feature branches
4. **Integration**: Merge stories to epic branch
5. **Epic Review**: Comprehensive review before merge to develop

## Environment Variables

No additional environment variables needed for CodeRabbit GitHub App integration.

## Next Steps

1. **Test the workflow** with a small change
2. **Configure CodeRabbit rules** in the web dashboard
3. **Set up branch protection** on `develop` to require checks
4. **Monitor quality metrics** in your CodeRabbit dashboard
5. **Iterate**: Refine workflow based on team feedback
