// import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
// import _ from 'lodash';

import {promise} from './promise';

function App() {
  const text = _.add(99, 1);
  promise.then(()=>{
    console.log(456);
  })
  return (
    <div>
      <div>list page</div>
      <div>{text}</div>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));