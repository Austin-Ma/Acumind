import auth0 from 'auth0-js';
//import history from '../../history.js';

class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'acumind.auth0.com',
    clientID: 'O8qAHYv6lIIi4zTdmU04YYfSXO8iYONV',
    redirectUri: 'http://localhost:3000/twittercallback',
    audience: 'https://acumind.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        //history.replace('/home');
      } else if (err) {
        //history.replace('/home');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('auth0_accesstoken', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    //history.replace('/home');
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('auth0_accesstoken');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_id');
    // navigate to the home route
    //history.replace('/home');
    window.location='/';
    console.log("logged out");
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  login() {
    this.auth0.authorize();
  }

  renewToken() {
    this.auth0.checkSession({}, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          this.setSession(result);
        }
      }
    );
  }

  getUserID() {
    this.auth0.client.userInfo(localStorage.getItem("auth0_accesstoken"), function(err, user) {
      if (err) {
        console.log(err);
      } else {
        return user;
      }
    })
  }
}

export default Auth;