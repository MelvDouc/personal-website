cd client
[ -d "$PWD/node_modules" ] && echo "client/node_modules already installed." \
|| echo "Installing client/node_modules..." && npm install;
npm run build
rm -rf public src .env index.html package-lock.json package.json tsconfig.json vite.config.ts
echo "Client was successfully installed."
cd ..