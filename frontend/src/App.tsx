import { useState, useEffect } from 'react';
import { PublicStatusPage } from './components/PublicStatusPage';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginForm } from './components/LoginForm';
import { Button } from './components/ui/button';
import { User } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowLogin(false);
    setCurrentView('admin'); // Automatically redirect to admin dashboard
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('public');
    localStorage.removeItem('user');
  };

  const handleAdminAccess = () => {
    if (isAuthenticated) {
      setCurrentView('admin');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Status Page</h1>
            <div className="flex gap-2 items-center">
              <Button
                variant={currentView === 'public' ? 'default' : 'outline'}
                onClick={() => setCurrentView('public')}
              >
                Public Status
              </Button>
              <Button
                variant={currentView === 'admin' ? 'default' : 'outline'}
                onClick={handleAdminAccess}
              >
                Admin Dashboard
              </Button>
              {isAuthenticated && (
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-sm text-gray-600">
                    Welcome, {user?.name || user?.email}
                  </span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <LoginForm 
              onLogin={handleLogin}
              onCancel={() => setShowLogin(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      {currentView === 'public' ? (
        <PublicStatusPage />
      ) : (
        isAuthenticated ? (
          <AdminDashboard user={user} />
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
              <p className="text-gray-600 mb-4">Please log in to access the admin dashboard.</p>
              <Button onClick={() => setShowLogin(true)}>
                Login
              </Button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default App;
