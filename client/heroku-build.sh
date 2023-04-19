cd client
[ -d "$PWD/node_modules" ] && echo "client/node_modules already installed." \
|| echo "Installing client/node_modules..." && npm install
npm run build
echo "Removing dev folders and files..."
rm -rf !(dist)
echo "Client was successfully installed."
cd ..