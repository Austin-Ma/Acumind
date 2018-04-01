import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Auth from '../../components/Auth/Auth.js';

import axios from 'axios';

class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isServering: true
    }

    const auth = new Auth();
    if (/access_token|id_token|error/.test(this.props.location.hash)) {
      auth.handleAuthentication();
/*

      const authHead = "Bearer " + localStorage.getItem("access_token");

      const userID = auth.getUserID();
      axios.get("https://acumind.auth0.com/api/v2/users/" + userID, {
        headers: {
          "Authorization": authHead
        }
      })

*/
    } else {
      // we goofed somehow
      console.log(this.props.location.hash.slice(this.props.location.hash.indexOf("error")))
    }

    const accessToken = this.getAccessToken(this.props.location.hash);
    if (accessToken !== null) {
      localStorage.setItem("auth0_accesstoken", accessToken);
    } else {
      console.log(this.props.location.hash.slice(this.props.location.hash.indexOf("error"), this.props.location.hash.length - 1))
    }

    const authHead = "Bearer " + localStorage.getItem("auth0_accesstoken");
    axios.get("https://acumind.auth0.com/userinfo", {
      headers: {
        "Authorization": authHead
      }
    }).then(res => {
      axios.get("https://acumind.auth0.com/api/v2/users/" + res.data.sub, {
        headers: {
          "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik56YzFPVEpFTTBJMVFqZzNSa1F3TWpsR1JURkdSRFV4UVVVNU1UUXdRa1EwTnpreE1rUTBRZyJ9.eyJpc3MiOiJodHRwczovL2FjdW1pbmQuYXV0aDAuY29tLyIsInN1YiI6InZFZG50Mmo2Tnl3T0s3YVZlT3c3WHBvM09yNVR6cTJLQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2FjdW1pbmQuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE1MjI1NzY2NzAsImV4cCI6MTUyMjY2MzA3MCwiYXpwIjoidkVkbnQyajZOeXdPSzdhVmVPdzdYcG8zT3I1VHpxMksiLCJzY29wZSI6InJlYWQ6dXNlcnMgcmVhZDp1c2VyX2lkcF90b2tlbnMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.JSxGhxueqlxHDCQfsI6ut7coxIu-tOyRaRDYseEVx2numosR_zGqN1yzeoX8ygxXV2pAGFnBjjcxcv2oX6yyDrzH53nI4G9r-U46fHcE9qQXhwUaPdEtp04XbI4ITvn45qu-7LwIWHOYvrekVRVqIwpkXoZZAQQRi8AJWLxOv_TfV_C0JP28h5pYKXUJKlWuyi4eNVhV2oN6YMHSZyp1H0X1Nql-eN_meYeX8W7kUR1XN0SQ7o7GQ8a5YLqJxbFrtZiKrkOX-i-EK2UPluxfOpWdXr6c705gkBTbmrgScDOvzoFy29HdOjn7nDfqsaEG_pqWo6MsiXLLjKwO7MDmKQ"
        }
      }).then(res2 => {
        const result = res2.data.identities[0];

        var bodyFormData = new FormData();
        bodyFormData.set("user_id", result.user_id);
        bodyFormData.set("access_token", result.access_token);
        bodyFormData.set("access_token_secret", result.access_token_secret);

        axios.post("http://localhost:5000", bodyFormData, {
          headers: {
            "Content-Type": 'multipart/form-data'
          }
        }).then(res => {
          console.log(res.data);
          this.state = {
            isServering: false
          }
        })
      })
    })

    //const userID = auth.getUserID();
    //console.log(userID);

    /*
    const authHead = "Bearer " + localStorage.getItem("access_token");

    axios.get("https://acumind.auth0.com/userinfo", {
      headers: {
        "Authorization": authHead
      }
    }).then(res => {
      axios.get(("https://acumind.auth0.com/api/v2/users/" + res.data.sub), {
        headers: {
          "Authorization": authHead
        }
      }).then(res2 => {
        localStorage.setItem("twitter_accesstoken", res2.data.identities[0].access_token);
        console.log(res2.data.identities);
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
    */

    /*
    const b64 = btoa(localStorage.getItem("twitter_accesstoken"));
    //console.log(localStorage.getItem("twitter_accesstoken"));
    const authHeader = "Bearer " + b64;
    console.log(authHeader);

    axios.get("https://api.twitter.com/1.1/statuses/home_timeline.json?count=100", {
      headers: {
        "Authorization": authHeader
      }
    }).then(res => {
      console.log(res.data);
    })
    */

    /*
    const accessToken = this.getAccessToken(this.props.location.hash);
    if (accessToken !== undefined) {
      localStorage.setItem("twitter_accesstoken", accessToken);
    } else {

    }
    */


  }

  getAccessToken(hash) {
    return hash.slice(hash.indexOf('=') + 1, hash.indexOf('&'));
  }
  
  render() {
    if (this.state.isServering) return null;
    else return (
      <Redirect to="/results" />
    )
  }
}

export default Callback;