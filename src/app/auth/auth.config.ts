import { AuthConfig } from "angular-oauth2-oidc";
import { environment } from "src/environments/environment";

export const AuthCodeFlowConfig: AuthConfig = {
    issuer: environment.authserver.issuer,
    redirectUri: environment.authserver.redirectUri,
    clientId: environment.authserver.clientId,
    responseType: environment.authserver.response_type,
    showDebugInformation: true,
    timeoutFactor: 0.01,
    postLogoutRedirectUri: environment.authserver.postLogoutRedirectUri,
    logoutUrl: environment.authserver.logoutUrl
}