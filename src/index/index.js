import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {Button} from 'antd';

function App() {
  const text = _.add(9999, 1);
  return (
    <div>
      <div>index page</div>
      <div>{text}</div>
      <Button>click</Button>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));