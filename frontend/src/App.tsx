import { useMemo, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { UserType } from '../@types/@types';
import HomePage from './component/HomePage';
import LoginPage from './component/LoginPage';
import SignUpPage from './component/SignUpPage';
import { UserContext } from './UserContext';

function App() {
  const [user, setUser] = useState<UserType | null>(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const ComingSoon = () => (
    <div>
      <h1>Coming Soon</h1>
      <Link to="/">Back Home</Link>
    </div>
  );
  return (
    <div className="App">
      <UserContext.Provider value={value}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/chat" element={<ComingSoon />} />
            <Route path="/profile" element={<ComingSoon />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
