import { Component } from '@angular/core';
import { MSAdal, AuthenticationContext, AuthenticationResult, AuthenticationSettings } from '@ionic-native/ms-adal/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  name: string;
  endpointUrl: string;
  azureAdClientId: string;
  redirectUri: string;

  constructor(private msAdal: MSAdal) {
    this.endpointUrl = 'https://login.microsoftonline.com/009f69a3-375b-4902-b7d6-bb192542da24/wsfed';
    this.azureAdClientId = '0da7e4a5-3068-408c-8e6d-fbd4ea09a53b';
    this.redirectUri = 'msal0da7e4a5-3068-408c-8e6d-fbd4ea09a53b://auth';
    this.login();
  }

  login() {
    /* AuthenticationSettings.setUseBroker(true).then(function() {
      alert("buh")
    });*/
    AuthenticationSettings.INSTANCE.setUseBroker(true);
    const authContext: AuthenticationContext = this.msAdal.createAuthenticationContext(this.endpointUrl, false);


    authContext.acquireTokenSilentAsync(this.azureAdClientId, this.azureAdClientId, '')
      .then((authResponse: AuthenticationResult) => {
        console.log('Token is' , authResponse.accessToken);
        console.log('Token will expire on', authResponse.expiresOn);
        this.name = authResponse.userInfo.givenName;
      })
      .catch((e: any) => {
        alert("silent login fails");
        console.log(e);
        authContext.acquireTokenAsync(this.azureAdClientId, this.azureAdClientId, this.redirectUri, '', '')
        .then((authResponse: AuthenticationResult) => {
          console.log('Token is' , authResponse.accessToken);
          console.log('Token will expire on', authResponse.expiresOn);
          this.name = authResponse.userInfo.givenName;
      })
        .catch((e: any) => console.log('Authentication failed', e));
      });

    }
    
}
