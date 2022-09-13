import "./App.css";
import { Home, Login, Signup } from "./pages";
import { Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Payroll,
  Leave,
  Test,
  Engineering,
  SupplyChain,
  Operations,
  Accounts,
} from "./component";


function App() {
  return (
    <div className="App">
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route exact path='signup' element={<Signup />} />

      <Route exact path='home' element={<Home />}>
          <Route exact path="dashboard" element={<Dashboard />}>
            <Route exact path="Engineering" element={<Engineering />} />
            <Route exact path="SupplyChain" element={<SupplyChain />} />
            <Route exact path="Operations" element={<Operations />} />
            <Route exact path="Accounts" element={<Accounts />} />
          </Route>
          
        <Route exact path='payroll' element={<Payroll />}>
            <Route exact path="Engineering" element={<Engineering />} />
            <Route exact path="SupplyChain" element={<SupplyChain />} />
            <Route exact path="Operations" element={<Operations />} />
            <Route exact path="Accounts" element={<Accounts />} />
        </Route>
        <Route exact path='leave' element={<Leave />} />
        <Route exact path='test' element={<Test />} />
      </Route>
      
    </Routes>

    </div>
  );
}

export default App;
