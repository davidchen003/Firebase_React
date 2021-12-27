- [course video](https://www.youtube.com/watch?v=jCY6DH8F4oc)
- [code](https://github.com/machadop1407/firebase-react-crud)

- See [Fireship's course](https://www.youtube.com/watch?v=q5J5ho7YUhA) for hosting and emulators setup (which is not covered here).

- `node_modules` folder will not be pushed to Github and may be deleted from local holder to (once project is done) to save space. Simple run `npm install` to rebuild it.

- **CSS** totally ignored in this course

# Setup

## React

- `$ npx create-react-app .` (. mean inside the current folder. othersie `$ npx create-react-app myProjectFolderName`)

## Firebase

- `npm add firebase` (firebase's Project Settings instruction says `npm install firebase` )
- used the same `FirebaseBasics` Web app in `Fireship-Demos` project of my firebase account created for [Fireship's course](https://www.youtube.com/watch?v=q5J5ho7YUhA)

- `src/firebase-config.js`, mostly copied from firebase Project Settings

  - `import { initializeApp } from "firebase/app";`
  - `import {} from '@firebase/firestore'`
  - `const firebaseConfig = {`
  - we should protect the info by parametizing them into `.env` file as show in [FalconMasters firebase video, 10:50](https://www.youtube.com/watch?v=s_Txhh-clVk)
  - `const app = initializeApp(firebaseConfig);`
  - `export const db = getFirestore()`

- Video: create database (used `start in production mode`, instead of **test mode**. "it doesn't matter). But we'll use the existing database `fireship-demos-87aa8`, which is setup in test mode.

- **Rules**

  - instructed to set it `allow read, write: if true;`, which means everyone has the API key can read it.
  - our existing database was previously set at `false` (so need to install firebase CLI tool for **login** before we can access the database)

- create a collection `users` and add one document (name: Pedro, age: 20)

- `$npm start`, to start local server at http://localhost:3000/

# CRUD

## Read

- App.js

**Commit 1**

## Create

- but need to manually refresh the page to see the new entry displayed

**Commit 2**

## Update

- also need to manually refresh to see the effect

**Commit 3**

## Delete

**Commit 4**
