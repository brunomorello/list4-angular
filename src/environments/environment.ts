// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: '/backend',
  // authUrl: 'http://localhost:8082/oauth2',
  authUrl: 'https://bmo-auth-server-25d7c6b7683d.herokuapp.com/oauth2',
  tokenhUrl: '/authserver',
  // tokenhUrl: 'http://authserver:8082',
  redirectUri: 'http://localhost:4200'
  // redirectUri: 'https://list4u-front.herokuapp.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
