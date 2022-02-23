import { useMemo, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { UserType } from '../@types/@types';
import Chat from './component/Chat';
import HomePage from './component/HomePage';
import LoginPage from './component/LoginPage';
import SignUpPage from './component/SignUpPage';
import { UserContext } from './contexts/User/UserContext';
import UserProvider from './contexts/User/UserProvider';

function App() {
  const ComingSoon = () => (
    <div>
      <h1>Coming Soon</h1>
      <Link to="/">Back Home</Link>
    </div>
  );
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="chat">
              <Route path=":room" element={<Chat />} />
              <Route path="" element={<Chat />} />
            </Route>
            <Route path="/profile" element={<ComingSoon />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
