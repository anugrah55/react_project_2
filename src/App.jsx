import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ApplicationProvider } from './context/ApplicationContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import AddApplication from './pages/AddApplication';
import Analytics from './pages/Analytics';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ApplicationProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <Navbar />
          <main className="max-w-6xl mx-auto px-6 md:px-12 py-12">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/applications/new" element={<AddApplication />} />
              <Route path="/applications/:id" element={<AddApplication />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
          <ToastContainer
            theme="dark"
            position="bottom-center"
            autoClose={2500}
            hideProgressBar
            newestOnTop
            closeOnClick
            toastStyle={{
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px',
              color: '#fff',
              fontSize: '14px',
            }}
          />
        </div>
      </Router>
    </ApplicationProvider>
  );
}

export default App;
