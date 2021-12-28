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

# Beyond video course

## realtime update

- so everytime database changes after any CRUD, the web page will be refreshed with the new data

**Method 1**

- add `window.location.reload(false)` to each button onClick function

**Method 2**

- use firebase query `onSnapShot`.

**Commit 5**

## deploy-hosting branch (B1)

- https://fireship-demos-87aa8.web.app
  or
- fireship-demos-87aa8.firebaseapp.com

- `npm install -g firebase-tools`, which we did in [fireship course](https://www.youtube.com/watch?v=q5J5ho7YUhA)
- `firebase login` (following instructions for authentication)

- `firebase init`

  - what do you want to use as your public directory? **build**
  - as a single-page-app? Yes

- `npm run build`

```
    firebase_react_crud@0.1.0 build
    react-scripts build

    Creating an optimized production build...
    Compiled with warnings.

    src/App.js

    Line 42:6:  React Hook useEffect has a missing dependency: 'usersCollectionRef'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

    Search for the keywords to learn more about each warning.
    To ignore, add // eslint-disable-next-line to the line before.

    The project was built assuming it is hosted at /.
    You can control this with the homepage field in your package.json.

    The build folder is ready to be deployed.
    You may serve it with a static server:

    npm install -g serve
    serve -s build

    Find out more about deployment here:
    https://cra.link/deployment
```

- `firebase deploy`

```
    Deploy complete!

    Project Console: https://console.firebase.google.com/project/fireship-demos-87aa8/overview
    Hosting URL: https://fireship-demos-87aa8.web.app
```

**B1-1 Commit**
