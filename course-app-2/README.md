## Course App 2

As of now, there are four sub-folders in this directory.
1. common - not in use right now.
2. node modules - not in use yet, because express-server and react-app both have their own package.json and node modules.
3. express-server
4. react-app

Steps to follow:
1. cd into express-server and do "npm install"
2. cd into react-app and do "npm install"
3. after this whenever you open a code file, TypesScript will throw error telling you to download types when you hover over the imports. Copy the command given there and paste into the terminal, you'll have to do it for all dependencies.
4. You are ready to start the website.
5. cd into express-server and type command - "node dist/index.js" to start the server.
6. cd into react-app and typr command - "npm run dev" to start the react frontend.
7. IMPORTANT: This file -  "course-app-2/react-app/src/App.tsx" has all the browser routes defined.
