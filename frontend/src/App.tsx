import { useState } from 'react';
import { PublicStatusPage } from './components/PublicStatusPage';
import { AdminDashboard } from './components/AdminDashboard';
import { Button } from './components/ui/button';

function App() {
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Status Page</h1>
            <div className="flex gap-2">
              <Button
                variant={currentView === 'public' ? 'default' : 'outline'}
                onClick={() => setCurrentView('public')}
              >
                Public Status
              </Button>
              <Button
                variant={currentView === 'admin' ? 'default' : 'outline'}
                onClick={() => setCurrentView('admin')}
              >
                Admin Dashboard
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {currentView === 'public' ? <PublicStatusPage /> : <AdminDashboard />}
    </div>
  );
}

export default App;
