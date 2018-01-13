import '../scss/index';

import React from 'react';
import ReactDOM from 'react-dom';

import Dashboard from './Dashboard';

ReactDOM.render(<Dashboard proxy='http://localhost:8545' />, document.getElementById('content'));