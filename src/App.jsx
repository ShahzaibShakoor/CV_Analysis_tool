import Home from './pages/Home';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <section>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </Layout>
          </section>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
