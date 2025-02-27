#!/usr/bin/env sh

# abort on errors
# set -e

# build
npm run build

# navigate into the build output directory
cd dist

# create 404 page to ensure refresh works 
cp index.html 404.html

# if you are deploying to a custom domain
echo 'lzawbrito.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m 'deploy'

git push https://github.com/lzawbrito/lzawbrito.github.io

cd -