import React from 'react';
import logo from './logo.svg';
import './App.css';

import { EmployeeProvider } from "./core/context/EmployeeProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {EmployeePage} from "./ui/pages/EmployeePage";

function App() {
  return (
      <BrowserRouter>
        <EmployeeProvider>
          <Routes>
            <Route path='/' element={<EmployeePage />}/>
          </Routes>
        </EmployeeProvider>
      </BrowserRouter>
  );
}

export default App;
