#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v20.5.0/bin

cd course-app-2
git pull origin main
cd express-server
pm2 stop index
pm2 start dist/index.js
