import '@babel/polyfill';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import _ from 'lodash';
// // import {Button} from 'antd';
// import { add } from './tree_shaking';
// import {sayHello} from '../../commons/index';
// import './index.css';
// // import bg from './4.png';


// function App() {
//   const text = _.add(9999, 1);
//   sayHello();
//   return (
//     <div>
//       <div className={'red'}>index page</div>
//       <div>{text}{add(1, 2)}</div>
//       {/* <Button>click</Button> */}
//       {/* <img src={bg} /> */}
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.querySelector('#app'));

// const sum = add(1,2);
// export {sum}

new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve(123)
  },1000)
})