// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: '/backend',
  authserver: {
    // prod https://bmo-auth-server-25d7c6b7683d.herokuapp.com
    issuer: 'http://auth-server:8082',
    clientId: 'list4u-dev',
    clientSecret: 'myClientSecretValue',
    redirectUri: 'http://localhost:4200/authorized',
    scope: 'openid profile',
    response_type: 'code',
    logoutUrl: 'http://127.0.0.1:8081',
    postLogoutRedirectUri: 'http://localhost:4200/landing',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
