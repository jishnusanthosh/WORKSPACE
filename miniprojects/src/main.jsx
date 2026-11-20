import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import Hello from './hello.jsx'
import Counter from './Counter.jsx'
import Pasragraph from './Pasragraph.jsx'
import NameShow from './NameShow.jsx'
import Login from './Login.jsx'
import Students from './Students.jsx'
import Search from './Search.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Hello /> */}
    {/* <Counter /> */}

    {/* <Pasragraph/> */}
    {/* <NameShow/> */}
    {/* <Login/> */}
    {/* <Students/> */}
    <Search/>
  </React.StrictMode>
)