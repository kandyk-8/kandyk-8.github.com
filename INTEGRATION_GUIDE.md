# Frontend-Backend Integration Guide

This guide explains how to connect the React frontend to your Python Flask backend.

## Current State

The React application currently runs with **mock data** to demonstrate all features without requiring a backend. This allows you to:
- See the full UI and functionality
- Test user workflows
- Understand the application structure
- Demo to stakeholders

## Integration Steps

### Step 1: Setup Python Backend

Follow the `PYTHON_BACKEND_GUIDE.md` to:
1. Install Python and dependencies
2. Setup PostgreSQL database
3. Create and run the Flask application
4. Test API endpoints

**Verify backend is running:**
```bash
curl http://localhost:5000/api/auth/login
# Should return: {"message": "Method Not Allowed"} or similar
# This confirms the server is responding
```

### Step 2: Update API Configuration

In `/src/app/services/api.ts`, update the API base URL:

```typescript
// Change from:
const API_BASE_URL = 'http://localhost:5000/api';

// To your actual backend URL:
const API_BASE_URL = 'https://your-backend-url.com/api';
// or keep localhost:5000 for local development
```

### Step 3: Replace Mock Data in App.tsx

Open `/src/app/App.tsx` and replace the mock implementations with real API calls.

#### Before (Mock):
```typescript
const handleLogin = (email: string, password: string) => {
  // Mock authentication
  let authenticatedUser: User | null = null;
  if (email === 'john.doe@example.com' && password === 'user123') {
    authenticatedUser = mockUsers.trainee;
  }
  // ... more mock code
};
```

#### After (Real API):
```typescript
import { authAPI, storage } from '@/app/services/api';

const handleLogin = async (email: string, password: string) => {
  try {
    const result = await authAPI.login(email, password);
    
    if (result.success && result.user && result.token) {
      setUser(result.user);
      storage.setToken(result.token);
      storage.setUser(result.user);
      
      if (result.user.role === 'admin') {
        setView('admin-dashboard');
      } else {
        setView('trainee-dashboard');
      }
      
      toast.success('Login successful!');
    } else {
      toast.error(result.message || 'Login failed');
    }
  } catch (error) {
    toast.error('Network error. Please try again.');
    console.error('Login error:', error);
  }
};
```

### Step 4: Update All Handler Functions

Replace each mock handler with real API calls:

#### Registration Handler
```typescript
const handleRegister = async (email: string, password: string, fullName: string) => {
  try {
    const result = await authAPI.register(email, password, fullName);
    
    if (result.success && result.user) {
      // Auto-login after registration
      const loginResult = await authAPI.login(email, password);
      
      if (loginResult.success && loginResult.user && loginResult.token) {
        setUser(loginResult.user);
        storage.setToken(loginResult.token);
        storage.setUser(loginResult.user);
        setView('trainee-dashboard');
        toast.success('Registration successful!');
      }
    } else {
      toast.error(result.message || 'Registration failed');
    }
  } catch (error) {
    toast.error('Network error. Please try again.');
    console.error('Registration error:', error);
  }
};
```

#### Complete Module Handler
```typescript
const handleCompleteModule = async (moduleId: number) => {
  try {
    const result = await traineeAPI.completeModule(moduleId);
    
    if (result.success) {
      // Reload track data to get updated progress
      if (selectedTrackId) {
        const trackData = await traineeAPI.getTrack(selectedTrackId);
        setModuleProgress(prev => ({
          ...prev,
          [selectedTrackId]: trackData.modules
        }));
      }
      
      if (result.track_completed) {
        toast.success('Congratulations! You completed the track!', {
          description: 'Your certificate is ready to view.',
        });
      } else {
        toast.success('Module completed!');
      }
    } else {
      toast.error(result.message || 'Failed to complete module');
    }
  } catch (error) {
    toast.error('Network error. Please try again.');
    console.error('Complete module error:', error);
  }
};
```

### Step 5: Load Dashboard Data from API

#### Trainee Dashboard
```typescript
const [dashboardData, setDashboardData] = useState<any>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadDashboard = async () => {
    if (view === 'trainee-dashboard' && user) {
      try {
        setLoading(true);
        const data = await traineeAPI.getDashboard();
        setDashboardData(data);
      } catch (error) {
        toast.error('Failed to load dashboard');
        console.error('Dashboard error:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  loadDashboard();
}, [view, user]);

// Then in render:
{view === 'trainee-dashboard' && dashboardData && (
  <TraineeDashboard
    user={dashboardData.user}
    tracks={dashboardData.tracks}
    onSelectTrack={handleSelectTrack}
    onLogout={handleLogout}
  />
)}
```

#### Admin Dashboard
```typescript
const [adminData, setAdminData] = useState<any>(null);

useEffect(() => {
  const loadAdminData = async () => {
    if (view === 'admin-dashboard' && user?.role === 'admin') {
      try {
        setLoading(true);
        const [traineesData, tracksData] = await Promise.all([
          adminAPI.getTrainees(),
          adminAPI.getTracks()
        ]);
        
        setAdminData({
          trainees: traineesData.trainees,
          tracks: tracksData.tracks
        });
      } catch (error) {
        toast.error('Failed to load admin data');
        console.error('Admin data error:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  loadAdminData();
}, [view, user]);
```

#### Load Track Content
```typescript
const handleSelectTrack = async (trackId: number) => {
  try {
    setLoading(true);
    const trackData = await traineeAPI.getTrack(trackId);
    
    setSelectedTrackId(trackId);
    setModuleProgress(prev => ({
      ...prev,
      [trackId]: trackData.modules
    }));
    
    const allCompleted = trackData.modules.every((m: any) => m.completed);
    setView(allCompleted ? 'certificate' : 'track');
  } catch (error) {
    toast.error('Failed to load track');
    console.error('Track load error:', error);
  } finally {
    setLoading(false);
  }
};
```

#### Load Certificate
```typescript
const [certificateData, setCertificateData] = useState<any>(null);

useEffect(() => {
  const loadCertificate = async () => {
    if (view === 'certificate' && selectedTrackId) {
      try {
        const data = await traineeAPI.getCertificate(selectedTrackId);
        setCertificateData(data.certificate);
      } catch (error) {
        toast.error('Failed to load certificate');
        console.error('Certificate error:', error);
      }
    }
  };
  
  loadCertificate();
}, [view, selectedTrackId]);
```

### Step 6: Add Loading States

Add loading indicators while fetching data:

```typescript
import { Loader2 } from 'lucide-react';

// In your component:
const [loading, setLoading] = useState(false);

// Show loading spinner:
{loading && (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
  </div>
)}
```

### Step 7: Error Handling

Add comprehensive error handling:

```typescript
const handleAPICall = async (apiFunction: () => Promise<any>) => {
  try {
    setLoading(true);
    setError(null);
    const result = await apiFunction();
    return result;
  } catch (error: any) {
    if (error.message === 'Token is invalid') {
      // Token expired, logout user
      handleLogout();
      toast.error('Session expired. Please login again.');
    } else if (error.message === 'Network error') {
      toast.error('Cannot connect to server. Please check your connection.');
    } else {
      toast.error(error.message || 'An error occurred');
    }
    console.error('API Error:', error);
    setError(error);
  } finally {
    setLoading(false);
  }
};
```

### Step 8: Environment Variables

Create `.env` file in frontend root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
# For production:
# VITE_API_BASE_URL=https://api.your-domain.com/api
```

Update `api.ts`:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
```

### Step 9: Test Integration

1. **Start Backend:**
   ```bash
   cd backend
   python app.py
   ```

2. **Start Frontend:**
   ```bash
   npm run dev
   ```

3. **Test Flow:**
   - Register a new user
   - Login with credentials
   - Navigate to dashboard
   - Select a track
   - Complete a module
   - View certificate (if track completed)
   - Login as admin
   - View reports

### Step 10: Handle CORS

If you get CORS errors, ensure your Flask backend has:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:5173'])  # Your frontend URL
```

Or for development:
```python
CORS(app, origins='*')  # Allow all origins (development only!)
```

## Complete Integration Checklist

- [ ] Backend running on port 5000
- [ ] Database created and populated
- [ ] Frontend API_BASE_URL updated
- [ ] All mock handlers replaced with API calls
- [ ] Loading states added
- [ ] Error handling implemented
- [ ] CORS configured
- [ ] Environment variables set
- [ ] Registration working
- [ ] Login working
- [ ] Dashboard loading
- [ ] Track selection working
- [ ] Module completion working
- [ ] Certificate generation working
- [ ] Admin reports working
- [ ] Logout working

## Debugging Tips

### Check Network Tab
Open browser DevTools > Network tab to see:
- API requests being sent
- Response status codes
- Response data
- Error messages

### Common Issues

**1. CORS Error**
```
Access to fetch at 'http://localhost:5000/api/auth/login' from origin 
'http://localhost:5173' has been blocked by CORS policy
```
**Solution:** Configure CORS in Flask backend

**2. 401 Unauthorized**
```
Token is missing or invalid
```
**Solution:** Check token is being sent in Authorization header

**3. 404 Not Found**
```
Cannot find route
```
**Solution:** Verify API_BASE_URL and endpoint paths

**4. Network Error**
```
Failed to fetch
```
**Solution:** Ensure backend is running on correct port

### Testing Without Backend

To test the integration code without a backend, you can use a mock API server:

```bash
npm install -g json-server
json-server --watch db.json --port 5000
```

## Production Deployment

### Frontend
1. Build the app: `npm run build`
2. Deploy `dist` folder to:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - Any static host

### Backend
1. Use production WSGI server (Gunicorn)
2. Deploy to:
   - Heroku
   - AWS EC2
   - DigitalOcean
   - Google Cloud Platform

### Environment
- Set production environment variables
- Use HTTPS for all connections
- Configure production CORS
- Use production database
- Enable logging and monitoring

## Next Steps

After successful integration:
1. Add data validation
2. Implement caching
3. Add pagination for large lists
4. Implement search/filter
5. Add export functionality
6. Enhance error messages
7. Add loading skeletons
8. Implement refresh tokens
9. Add user profile editing
10. Implement track management (admin)

---

**Note:** The current mock implementation in `App.tsx` is fully functional for demonstration. You can keep it as a fallback or for offline mode by adding a toggle between mock and real API modes.
