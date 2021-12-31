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

## loading JSON into firebase & reading firebase into JSON

**import into firebase**

- `MOCK_DATA.json` can have `null` entry on age (1st record), or missing the `age` key/value alltogether (2nd record)
- click `Load Data` button, records in `MOCK_DATA.json` will be loaded into firebase and show up in web page

**export out from firebase**

- click `Get Data` button, the firebase data will console.log out. `age/null` key/value pair will still be in the data file and show up in console. But if the `age` field is deleted at firebase, it's key/value pair will not be there.

**Commit 6**

# NetNinja branch

- [video series](https://www.youtube.com/watch?v=s1frrNxq4js&list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb&index=5)
- [code for different video in different branches](https://github.com/iamshaunjp/Getting-Started-with-Firebase-9/blob/lesson-4/src/index.js)

- didn't implement:

  - Use webpack (do "tree-shaking") instead of "create-react-app"
  - select firebase "start in test mode", otherwise you won't be able to access your data (has to do with firebase "rules", which we'll learn later).

- different methods of getting data
  - async/wait
  - promise/.then
  - map(), forEach()

**Commit B3-1**

- didn't implement

  - querySelector, addEvenListener, Form.reset()

- `addDoc` is a promise, can chain on `.then()`.
- changed `aync/wait` to `.then()` on `createUser`
- `updateUser` and `deleteUser` should be able to follow the suit

## query

- add `where()` to `query`, for both `onSnapshot` and `getDocs`
- `getDocs()` query can be used to:
  - update the web page
  - export database, if no restriction specified in query
- `orderBy()`
- `serverTimeStamp()` for createdAt field (don't just use regular time function like `Date()` or `Now()`)

**Commit B3-2**

# Auto_Filter branch

- it loads `users` collection from firebase automatically (3 fields: `name`, `age`, and `desc`)
- as you enter the searching word(s), it displays all the `desc` which have at least one matching word in it.
- if you click the `Click for suggestions contain ALL the searching words` button, only the `desc` have all the search words will remain
- click any of the matching `desc`, it will become the `text` entry
- the next step could be once the selection clicked, the whole document (all the fields, not just desc) displays

- change `{users2.map((user) => {` to `{users.map((user) => {`, then the normal database CRUD dominate the screen, so
- should separate "get query of the database" and "auto-filter" into different menu selections

**Commit B4-1**
