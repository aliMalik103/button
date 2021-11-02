import React from 'react';
import ReactDOM from 'react-dom';

import {TagSelector} from '../src/lib/index.js';


ReactDOM.render(
  <React.StrictMode>
    <TagSelector 
     data={[
{id:"1",
text:"ALi HAsnain"
},
{id:"2",
text:"ALi HAsnain"
},
{id:"3",
text:"ALi HAsnain"
},
{id:"4",
text:"ALi HAsnain"
},
{id:"5",
text:"ALi HAsnain"
},
{id:"6",
text:"ALi HAsnain"
},



     ]}
     borderColor="black"
     placeholder="Choose Organizations"
    
    />
  </React.StrictMode>,
  document.getElementById('root')
);


