import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Chat from './component/Chat/Chat';
import HomePage from './component/Feed/HomePage';
import LoginPage from './component/SignAndLog/LoginPage';
import SignUpPage from './component/SignAndLog/SignUpPage';
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
