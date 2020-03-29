// import React from 'react';
// import ReactDOM from 'react-dom';
// import _ from 'lodash';
// import {sayHello} from '../../commons/index'

// function App() {
//   const text = _.add(99, 1);
//   sayHello();
//   return (
//     <div>
//       <div>list page</div>
//       <div>{text}</div>
//     </div>
//   );
// }

// ReactDOM.render(<App />, document.querySelector('#app'));
import Dog from './dog';

class Cat{
  constructor(name){
    this.name = name;
    this.dog = new Dog('hehe');
  }
  say(){
    console.log('miao');
  }
}