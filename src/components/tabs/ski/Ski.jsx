import React from 'react';
import { Button } from '@material-ui/core';
import AppMenu from '../../overview/AppMenu';
import Title from '../../commons/title/Title';

class Ski extends React.Component {
  constructor() {
    super();
  }

    handleTestWebSockets =() => {
      console.log('Testing WebSocket');
      const ws = new WebSocket('ws://localhost:6060/resources/app/chat.addUser',
        ['Authorization', window.localStorage.getItem('accessToken')]);

      ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log('Connected');
      };
    };

    render() {
      return (
        <div>
          <AppMenu />
          <Title title="SKI" />
          <Button onClick={this.handleTestWebSockets}>
            {' '}
            {'WS'}
            {' '}
          </Button>
          <Button onClick={this.handleTestWebSockets2}>
            {' '}
            {'WS'}
            {' '}
          </Button>
          <Button onClick={this.handleTestWebSockets3}>
            {' '}
            {'WS'}
            {' '}
          </Button>
        </div>
      );
    }
}

export default Ski;
