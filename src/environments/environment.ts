// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAFUmp4pVUx2huv5vVklwvO59RFluzTlBw",
    authDomain: "tienda-a5ee1.firebaseapp.com",
    projectId: "tienda-a5ee1",
    storageBucket: "tienda-a5ee1.appspot.com",
    messagingSenderId: "329869182777",
    appId: "1:329869182777:web:fdc05a43e4150138f10ae8"
  },
  login:'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFUmp4pVUx2huv5vVklwvO59RFluzTlBw',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
