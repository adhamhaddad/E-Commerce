import React from 'react';
import Main from './components/common/main';
import { connect } from 'socket.io-client';

const socket = connect('http://localhost:8000');
const App = () => {
  return <Main socket={socket} />;
};

export default App;
