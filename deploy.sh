npm run build
cp dist/index.html dist/404.html
git add dist && git commit -m 'updates'
git subtree push --prefix dist origin gh-pages