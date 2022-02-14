import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './component/LoginPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
