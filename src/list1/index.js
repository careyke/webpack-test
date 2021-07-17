import React,{useState} from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [asyncModule, setAsyncModule] = useState(null);
  if(!asyncModule){
    import('./import').then((module)=>{
      setAsyncModule(module);
    }).catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div>
      <div>list page</div>
      <div>{asyncModule?asyncModule.add(1,2):0}</div>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));