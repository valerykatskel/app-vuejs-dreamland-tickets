set -e

yarn build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:valerykatskel/app-vuejs-dreamland-tickets.git master:gh-pages

cd -