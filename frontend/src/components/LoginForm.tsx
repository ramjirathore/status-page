import { useState } from 'react';
import { User } from '@/types';
import { usersApi } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginFormProps {
  onLogin: (user: User) => void;
  onCancel: () => void;
}

export function LoginForm({ onLogin, onCancel }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // For demo purposes, we'll use a simple email-based authentication
      // In a real app, you'd have proper authentication endpoints
      const users = await usersApi.getAll();
      const user = users.find(u => u.email === email);
      
      if (user) {
        // Simple password check (in real app, use proper authentication)
        if (password === 'admin123' || !password) {
          // Check if user has any organization memberships
          if (!user.orgs || user.orgs.length === 0) {
            // Add user to default organization as admin if no memberships
            try {
              const organizations = await fetch(`${import.meta.env.VITE_API_URL || 'https://status-page-bx79.onrender.com/api'}/organizations`).then(res => res.json());
              let defaultOrg = organizations[0];
              
              if (!defaultOrg) {
                defaultOrg = await fetch(`${import.meta.env.VITE_API_URL || 'https://status-page-bx79.onrender.com/api'}/organizations`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name: 'Default Organization' })
                }).then(res => res.json());
              }
              
              await fetch(`${import.meta.env.VITE_API_URL || 'https://status-page-bx79.onrender.com/api'}/members`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userId: user.id,
                  organizationId: defaultOrg.id,
                  role: 'admin'
                })
              });
              
              // Fetch updated user with memberships
              const updatedUser = await fetch(`${import.meta.env.VITE_API_URL || 'https://status-page-bx79.onrender.com/api'}/users/${user.id}`).then(res => res.json());
              onLogin(updatedUser);
            } catch (error) {
              console.error('Error setting up admin privileges:', error);
              onLogin(user);
            }
          } else {
            onLogin(user);
          }
        } else {
          setError('Invalid password. Use "admin123" for demo.');
        }
      } else {
        // User doesn't exist - show error message
        setError('User not found. Only existing users can login. Please contact an administrator to create an account.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Login</CardTitle>
        <p className="text-sm text-gray-600">
          Login with your existing account credentials
        </p>
        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
          <strong>Demo Accounts:</strong><br />
          • admin@techcorp.com (Admin)<br />
          • member@techcorp.com (Member)<br />
          Password: admin123 or leave empty
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Demo: Use "admin123" as password or leave empty for existing users
            </p>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
