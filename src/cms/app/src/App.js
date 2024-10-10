import './App.css';
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/protect";
import NotFound from "./pages/404";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth" exact element={<Auth/>} />
        <Route >
          <Route path="/" element={ <Dashboard /> } />
        </Route>
        <Route path="*" element={ <NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
