export const environment = {
  production: true,
  baseUrl: 'https://list4u.herokuapp.com/api',
  authUrl: 'https://bmo-auth-server-25d7c6b7683d.herokuapp.com/oauth2',
  tokenhUrl: 'https://bmo-auth-server-25d7c6b7683d.herokuapp.com',
  redirectUri: 'https://list4u-front.herokuapp.com'
  // authserver: {
  //   issuer: 'https://bmo-auth-server-25d7c6b7683d.herokuapp.com',
  //   clientId: 'list4u-dev',
  //   clientSecret: 'myClientSecretValue',
  //   redirectUri: 'https://list4u-front.herokuapp.com/authorized',
  //   scope: 'openid profile',
  //   response_type: 'code',
  //   logoutUrl: 'https://bmo-auth-server-25d7c6b7683d.herokuapp.com',
  //   postLogoutRedirectUri: 'https://list4u-front.herokuapp.com/landing',
  // }
};
