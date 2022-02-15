import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './component/LoginPage';
import Logo from './component/Logo';
import SignUpPage from './component/SignUpPage';

function App() {
  return (
    <div className="App">
      <Logo />
      <Router>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
