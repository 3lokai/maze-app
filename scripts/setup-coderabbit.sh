#!/bin/bash

# CodeRabbit Setup Script for Maze App
# This script helps set up CodeRabbit integration for v1+ development

set -e

echo "🚀 Setting up CodeRabbit for Maze App v1+"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_status "Checking prerequisites..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

print_success "Prerequisites check passed"

# Install CodeRabbit CLI
print_status "Installing CodeRabbit CLI..."
npm install -g @coderabbit/cli

if [ $? -eq 0 ]; then
    print_success "CodeRabbit CLI installed successfully"
else
    print_error "Failed to install CodeRabbit CLI"
    exit 1
fi

# Check if CodeRabbit is installed
if ! command -v coderabbit &> /dev/null; then
    print_error "CodeRabbit CLI installation failed"
    exit 1
fi

# Initialize CodeRabbit (if not already done)
if [ ! -f ".coderabbit/config.yaml" ]; then
    print_status "Initializing CodeRabbit configuration..."
    coderabbit init --yes
    print_success "CodeRabbit initialized"
else
    print_status "CodeRabbit configuration already exists"
fi

# Create .coderabbit directory if it doesn't exist
mkdir -p .coderabbit

# Copy configuration files
print_status "Setting up CodeRabbit configuration..."

# The config files should already be created by the edit_file commands
if [ -f ".coderabbit/config.yaml" ]; then
    print_success "CodeRabbit config.yaml is ready"
else
    print_warning "CodeRabbit config.yaml not found - please create it manually"
fi

if [ -f ".coderabbit/ignore" ]; then
    print_success "CodeRabbit ignore file is ready"
else
    print_warning "CodeRabbit ignore file not found - please create it manually"
fi

# Setup Git hooks (optional)
print_status "Setting up Git hooks for pre-commit checks..."

# Create pre-commit hook
mkdir -p .git/hooks
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash

echo "🔍 Running pre-commit checks..."

# Run linting
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Please fix the issues before committing."
    exit 1
fi

# Run type checking
npm run type-check
if [ $? -ne 0 ]; then
    echo "❌ Type checking failed. Please fix the issues before committing."
    exit 1
fi

# Run CodeRabbit analysis (optional, can be slow)
# echo "🤖 Running CodeRabbit analysis..."
# coderabbit analyze --quick
# if [ $? -ne 0 ]; then
#     echo "❌ CodeRabbit analysis failed. Please review the issues."
#     exit 1
# fi

echo "✅ Pre-commit checks passed"
EOF

chmod +x .git/hooks/pre-commit
print_success "Git pre-commit hook installed"

# Setup environment variables template
print_status "Creating environment variables template..."

cat > .env.coderabbit.template << 'EOF'
# CodeRabbit Configuration
# Copy this file to .env.local and fill in your actual values

# CodeRabbit API Configuration
CODERABBIT_API_KEY=your_api_key_here
CODERABBIT_WEBHOOK_SECRET=your_webhook_secret_here
CODERABBIT_PROJECT_ID=your_project_id_here

# GitHub Integration (optional)
GITHUB_TOKEN=your_github_token_here

# Additional Configuration
CODERABBIT_ENVIRONMENT=development
CODERABBIT_VERBOSE=true
EOF

print_success "Environment template created at .env.coderabbit.template"

# Test CodeRabbit installation
print_status "Testing CodeRabbit installation..."
coderabbit --version
if [ $? -eq 0 ]; then
    print_success "CodeRabbit is working correctly"
else
    print_error "CodeRabbit installation test failed"
    exit 1
fi

# Setup GitHub repository secrets (instructions)
print_status "Setting up GitHub repository secrets..."

echo ""
echo "🔐 Next steps to complete CodeRabbit setup:"
echo ""
echo "1. Get your CodeRabbit API key from https://coderabbit.ai"
echo "2. Add the following secrets to your GitHub repository:"
echo "   - Go to Settings > Secrets and variables > Actions"
echo "   - Add CODERABBIT_API_KEY"
echo "   - Add CODERABBIT_PROJECT_ID"
echo "   - Add CODERABBIT_WEBHOOK_SECRET"
echo ""
echo "3. Copy .env.coderabbit.template to .env.local and fill in your values:"
echo "   cp .env.coderabbit.template .env.local"
echo ""
echo "4. Test the setup:"
echo "   coderabbit analyze"
echo ""
echo "5. Create your first feature branch:"
echo "   git checkout -b feature/epic-1-flexible-players"
echo ""

# Check if we're on the right branch
current_branch=$(git branch --show-current)
if [ "$current_branch" = "main" ] || [ "$current_branch" = "master" ]; then
    print_warning "You're currently on the main branch. Consider creating a feature branch for development:"
    echo "   git checkout -b develop"
    echo "   git push -u origin develop"
fi

print_success "🎉 CodeRabbit setup completed successfully!"
echo ""
echo "📚 Next steps:"
echo "1. Read docs/development/git-workflow.md for the complete workflow"
echo "2. Set up your GitHub repository secrets"
echo "3. Start developing on feature branches"
echo "4. Use the PR template for all pull requests"
echo ""
echo "Happy coding! 🚀"
