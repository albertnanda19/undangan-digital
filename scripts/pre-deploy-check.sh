#!/bin/bash
echo "Pre-deployment check..."

echo "Checking dependencies..."
npm install

echo "Type checking..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
  echo "TypeScript errors found. Fix before deploying."
  exit 1
fi

echo "Building project..."
npm run build
if [ $? -ne 0 ]; then
  echo "Build failed. Fix errors before deploying."
  exit 1
fi

echo "All checks passed! Ready to deploy."
echo ""
echo "Next steps:"
echo "1. Buka https://vercel.com/new"
echo "2. Import repository: undangan-digital"
echo "3. Isi environment variables dari .env.local"
echo "4. Klik Deploy"
