import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../Home';
import ResetPasswordpage from './ResetPasswordpage';

function App (props) {
  
  
    return (
        <div>

            <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/Preset' element={<ResetPasswordpage />} />


            </Routes>





        </div>
    );
}

export default App;


