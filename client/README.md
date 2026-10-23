# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Badminton Court Booking

The booking page is available at `/badmintonbooking`; the request dashboard is at `/admin-badminton-booking`. Badminton uses courts 6 and 7 in the Sports API, with court-specific availability on `GET /api/slots?sport=badminton`, filtered requests on `GET /students?sport=badminton`, booking submission on `POST /api/booking`, and status updates on `PUT /student/:id/status`. Slot responses and booking records must include a `court` field; booking requests include `sport: "badminton"` and `court` so the backend keeps badminton inventory separate from turf. Each court has 11 half-hour sessions from 4:00 PM through 9:30 PM.

Badminton booking roll numbers are matched case-insensitively. A request can include at most four player roll numbers and 2–4 players; the booking page prevents the owner or any listed player from submitting another active request for the same date.

The admin passcode is defined in the badminton admin frontend and is only a UI gate, not database authorization. Deploy only after the Sports API supports sport-scoped slots and court-aware status updates.

## Feedback Firebase Setup

The feedback app is already configured to use Firebase project `iitb-gc-26-27`. Complete these one-time setup steps before using the new Firebase feedback flow. You need permission to manage this Firebase project. Existing feedback submissions stay in Back4App; they are not copied. The contact dropdown still loads from the old feedback API.

### 1. Turn on sign-in methods

1. Open [Firebase Console](https://console.firebase.google.com/) and select `iitb-gc-26-27`.
2. Go to **Build → Authentication → Get started**.
3. Open **Sign-in method**.
4. Enable **Email/Password** and save.
5. Enable **Anonymous** and save.

Email/Password is for staff who manage feedback. Anonymous sign-in lets a person submit feedback without creating an account.

### 2. Create the database and image storage

1. In Firebase Console, go to **Build → Firestore Database** and create the database if it does not exist. Choose a location close to the users; the database location cannot be changed later.
2. Go to **Build → Storage** and get started if Storage is not already set up. Confirm any billing prompt and check the project's pricing before enabling a paid plan.

### 3. Publish the security rules

In the project folder, the files `firestore.rules` and `storage.rules` contain the access rules the app needs.

1. In **Firestore Database → Rules**, replace the editor contents with the complete contents of `firestore.rules`, then click **Publish**.
2. In **Storage → Rules**, replace the editor contents with the complete contents of `storage.rules`, then click **Publish**.

Do not make feedback publicly readable or allow the public to write administrator records.

### 4. Add feedback administrators

For each staff member who should manage feedback:

1. In **Authentication → Users**, click **Add user** and create an Email/Password account for them.
2. Copy that user's **UID** from the Authentication user list.
3. In **Firestore Database → Data**, create a collection named `feedbackAdmins` if it does not exist.
4. Add a document whose document ID is exactly the copied UID. Add a field `enabled` with type **boolean** and value `true`.

The document ID must match the Authentication UID exactly; otherwise that account will not be allowed into the feedback dashboard.

### 5. Set Storage CORS for the website

This allows the admin dashboard to load uploaded images securely. The settings are in `storage.cors.json`; it allows the production site `https://gymkhana.iitb.ac.in` and local development at `http://localhost:3000`.

1. Install the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) if `gcloud` is not already installed.
2. Open a terminal in the `client` folder and sign in with a Google account that has permission to update this project's Storage bucket:

   ```sh
   gcloud auth login
   gcloud config set project iitb-gc-26-27
   gcloud storage buckets update gs://iitb-gc-26-27.firebasestorage.app --cors-file=storage.cors.json
   ```

If the website is hosted at another domain, add that exact origin to `storage.cors.json` before running the final command.

### 6. Check it

1. Run `npm start` from the `client` folder and open the feedback page.
2. Submit a test feedback with an image; it should show the success screen.
3. Open `/feedback-admin`, sign in with the administrator account, and confirm the submission and image appear.
4. Change its status, then delete the test submission.

If feedback submission or image display fails, check the browser console and the Firebase **Firestore → Rules** and **Storage → Rules** pages first.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
