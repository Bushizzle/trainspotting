This is a simple trainspotting application. As it is a challenge, I decided to use as many fancy things as I could but still tried to stay reasonable.

You can edit input data (stations, lines, trains) in /public/data.json, also you can change some default settings in /src/config folder

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Scripts

In the project directory, you can run:
### `npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode

### `npm run lint`
Runs ESLint (flat config): correctness, React / React Hooks, and jsx-a11y accessibility checks. A husky pre-commit hook runs this automatically, so you can't commit without passing it.

### `npm run build`
Builds the app for production to the `build` folder.<br />o
The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Todos
-add passanger cycles on stations<br />
-think about trains cycle next step simulation and lock on crash report (to prevent all possible crashes)<br />
-add trains movement animation<br />
-add options values strict validation<br />
-think about possible issues data fetching in context and possibility of replacement with redux<br />
(I hadn't used Redux because Context is newer and more interesting for me)<br />
-add more tests