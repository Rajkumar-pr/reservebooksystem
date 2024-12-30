import React from 'react';

import SignupForm from './SignUp';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from './Login';
import Home from './Home';
function App() {
  
  return (
    <div>
      <Router><Routes>
      <Route path='/' element={<SignupForm/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        </Routes></Router>

</div>
  );
}

export default App;

