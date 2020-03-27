import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

function App() {
  const text = _.add(99, 1);
  return (
    <div>
      <div>list page</div>
      <div>{text}</div>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));