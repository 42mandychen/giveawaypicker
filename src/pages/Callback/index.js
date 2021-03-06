import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

function storeAccessToken (accessToken) {
  if (typeof(Storage) !== "undefined") {
    // browser supports localStorage
    localStorage.setItem('access_token', accessToken);
  }
}

const baseUrl = process.env.PUBLIC_URL;

class Callback extends Component {
  render () {
    document.title = "Redirect";
    // TODO: more thorough checks
    const tokenFragment = window.location.hash;
    const errorFragment = window.location.search;
    const instagram = baseUrl + '/instagram';
    if (tokenFragment) {
      // URL is: http://redirect-uri#access_token=ACCESS-TOKEN
      const accessToken = tokenFragment.split('=')[1];
      storeAccessToken(accessToken);
      return (
          <Redirect to={{
            pathname: instagram//,
            //state: { token: accessToken }
          }} />
      );
    } else {
      // URL is: http://redirect-uri?error=access_denied&error_reason=user_denied&error_description=The+user+denied+your+request
      return (
        <Redirect to={{
          pathname: baseUrl,
          from: this.props.location
        }} />
      );
    }
  }
}

export default Callback;
