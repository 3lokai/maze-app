# 🚀 Setup Guide for v1+ Development

## Quick Start

Since you've already added CodeRabbit to your GitHub account, here's how to get started with the new Git workflow:

### 1. **Verify CodeRabbit Integration**

1. Go to your GitHub repository
2. Check that CodeRabbit appears in the "Apps" section
3. Ensure it has access to your repository

### 2. **Set Up Branch Protection (Recommended)**

1. Go to your repository → Settings → Branches
2. Add rule for `develop` branch:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators

### 3. **Test the Workflow**

```bash
# Create a test feature branch
git checkout -b test/workflow-setup

# Make a small change
echo "# Test workflow" >> README.md

# Commit and push
git add README.md
git commit -m "test: verify workflow setup"
git push origin test/workflow-setup

# Create a test PR
gh pr create --title "test: verify workflow setup" --body "Testing the new workflow" --base develop
```

### 4. **Start Your First Epic**

```bash
# Create feature branch for Epic 1
git checkout develop
git pull origin develop
git checkout -b feature/epic-1-flexible-players

# Start development following the workflow in docs/development/git-workflow.md
```

## What You Get

✅ **Automated Quality Checks**: GitHub Actions run on every PR
✅ **CodeRabbit Analysis**: AI-powered code review via GitHub App
✅ **BMad Method Integration**: PR template includes BMad compliance checks
✅ **TypeScript Strict Mode**: Enforced through CI/CD
✅ **shadcn/ui Patterns**: Custom checks for your component library

## Next Steps

1. **Configure CodeRabbit Rules**: Go to https://coderabbit.ai and set up analysis rules
2. **Test the Workflow**: Create a test PR to verify everything works
3. **Start Epic 1**: Begin development on flexible players feature
4. **Monitor Quality**: Check CodeRabbit dashboard for insights

## Need Help?

- **Workflow Details**: See `docs/development/git-workflow.md`
- **CodeRabbit Issues**: Check the CodeRabbit dashboard
- **GitHub Actions**: Check the Actions tab in your repository
- **BMad Method**: Refer to the BMad documentation

Happy coding! 🎮
