# API Quick Reference

Quick reference guide for all backend API endpoints.

## Base URL
```
http://localhost:5000/api
```

## Authentication

All endpoints except `/auth/login` and `/auth/register` require JWT token in header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🔐 Authentication Endpoints

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "trainee"
  }
}
```

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "full_name": "Jane Smith"
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 2,
    "email": "newuser@example.com",
    "full_name": "Jane Smith",
    "role": "trainee"
  }
}
```

---

## 👤 Trainee Endpoints

### Get Dashboard
```http
GET /api/trainee/dashboard
Authorization: Bearer TOKEN
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "full_name": "John Doe"
  },
  "tracks": [
    {
      "id": 1,
      "title": "Leadership Fundamentals",
      "description": "Core leadership skills",
      "total_modules": 5,
      "completed_modules": 2,
      "progress_percentage": 40.0,
      "current_module": {
        "id": 3,
        "title": "Communication Skills",
        "order_index": 3
      }
    }
  ]
}
```

### Get Track Details
```http
GET /api/trainee/track/1
Authorization: Bearer TOKEN
```

**Response (200):**
```json
{
  "track": {
    "id": 1,
    "title": "Leadership Fundamentals",
    "description": "Core leadership skills"
  },
  "modules": [
    {
      "id": 1,
      "title": "Introduction to Leadership",
      "description": "Understanding leadership basics",
      "content_type": "video",
      "content_url": "https://example.com/video.mp4",
      "order_index": 1,
      "completed": true,
      "completed_at": "2026-01-15T10:30:00Z",
      "locked": false
    },
    {
      "id": 2,
      "title": "Leadership Styles",
      "description": "Different approaches",
      "content_type": "reading",
      "content_url": null,
      "order_index": 2,
      "completed": false,
      "completed_at": null,
      "locked": false
    }
  ]
}
```

### Complete Module
```http
POST /api/trainee/complete-module
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "module_id": 2
}
```

**Response (200):**
```json
{
  "success": true,
  "progress": {
    "id": 5,
    "user_id": 1,
    "module_id": 2,
    "completed": true,
    "completed_at": "2026-01-23T14:30:00Z"
  },
  "track_completed": false,
  "next_module_id": 3
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "Previous module not completed"
}
```

### Get Certificate
```http
GET /api/trainee/certificate/1
Authorization: Bearer TOKEN
```

**Response (200):**
```json
{
  "certificate": {
    "id": 1,
    "certificate_number": "CERT-2026-001001",
    "issued_at": "2026-01-23T15:00:00Z",
    "user_name": "John Doe",
    "track_title": "Leadership Fundamentals",
    "completion_date": "2026-01-23"
  }
}
```

---

## 👨‍💼 Admin Endpoints

### Get All Trainees
```http
GET /api/admin/trainees
Authorization: Bearer TOKEN
```

**Response (200):**
```json
{
  "trainees": [
    {
      "id": 1,
      "full_name": "John Doe",
      "email": "john@example.com",
      "tracks": [
        {
          "track_id": 1,
          "track_title": "Leadership Fundamentals",
          "completed_modules": 5,
          "total_modules": 5,
          "progress_percentage": 100.0,
          "completed": true
        }
      ]
    }
  ]
}
```

### Get All Tracks
```http
GET /api/admin/tracks
Authorization: Bearer TOKEN
```

**Response (200):**
```json
{
  "tracks": [
    {
      "id": 1,
      "title": "Leadership Fundamentals",
      "description": "Core leadership skills",
      "order_index": 1,
      "total_modules": 5
    }
  ]
}
```

### Get Completion Report
```http
GET /api/admin/reports/completions?start_date=2026-01-01&end_date=2026-01-31&track_id=1
Authorization: Bearer TOKEN
```

**Query Parameters:**
- `start_date` (required): YYYY-MM-DD
- `end_date` (required): YYYY-MM-DD
- `track_id` (optional): Filter by specific track

**Response (200):**
```json
{
  "period": {
    "start_date": "2026-01-01",
    "end_date": "2026-01-31"
  },
  "overall_completions": 45,
  "by_track": [
    {
      "track_id": 1,
      "track_title": "Leadership Fundamentals",
      "completions": 20
    },
    {
      "track_id": 2,
      "track_title": "Advanced Leadership",
      "completions": 15
    }
  ]
}
```

### Get Time Report
```http
GET /api/admin/reports/completion-time?track_id=1
Authorization: Bearer TOKEN
```

**Query Parameters:**
- `track_id` (optional): Filter by specific track

**Response (200):**
```json
{
  "overall_average_days": 45.5,
  "by_track": [
    {
      "track_id": 1,
      "track_title": "Leadership Fundamentals",
      "average_days": 30.2,
      "min_days": 15,
      "max_days": 60,
      "total_completions": 50
    }
  ]
}
```

---

## 🔴 Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Email and password required"
}
```

### 401 Unauthorized
```json
{
  "message": "Token is missing"
}
```
```json
{
  "message": "Token is invalid"
}
```

### 403 Forbidden
```json
{
  "message": "Admin access required"
}
```

### 404 Not Found
```json
{
  "message": "Track not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Database connection error"
}
```

---

## 📝 Data Types

### User Object
```typescript
{
  id: number
  email: string
  full_name: string
  role: "trainee" | "admin"
}
```

### Track Object
```typescript
{
  id: number
  title: string
  description: string
  order_index: number
  total_modules: number
  completed_modules: number
  progress_percentage: number
  current_module?: {
    id: number
    title: string
    order_index: number
  }
}
```

### Module Object
```typescript
{
  id: number
  title: string
  description: string
  content_type: "video" | "reading" | "activity"
  content_url: string | null
  order_index: number
  completed: boolean
  completed_at: string | null
  locked: boolean
}
```

### Certificate Object
```typescript
{
  id: number
  certificate_number: string
  issued_at: string  // ISO 8601
  user_name: string
  track_title: string
  completion_date: string  // YYYY-MM-DD
}
```

---

## 🧪 Testing with cURL

### Login Test
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john.doe@example.com","password":"user123"}'
```

### Get Dashboard Test
```bash
TOKEN="your-token-here"

curl -X GET http://localhost:5000/api/trainee/dashboard \
  -H "Authorization: Bearer $TOKEN"
```

### Complete Module Test
```bash
curl -X POST http://localhost:5000/api/trainee/complete-module \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"module_id": 2}'
```

### Admin Report Test
```bash
curl -X GET "http://localhost:5000/api/admin/reports/completions?start_date=2026-01-01&end_date=2026-01-31" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🧪 Testing with JavaScript/Fetch

### Login
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john.doe@example.com',
    password: 'user123'
  })
});

const data = await response.json();
console.log(data);
```

### Get Dashboard
```javascript
const token = 'your-token-here';

const response = await fetch('http://localhost:5000/api/trainee/dashboard', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const data = await response.json();
console.log(data);
```

### Complete Module
```javascript
const response = await fetch('http://localhost:5000/api/trainee/complete-module', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    module_id: 2
  })
});

const data = await response.json();
console.log(data);
```

---

## 🔒 Security Notes

1. **Never expose tokens**
   - Store in httpOnly cookies or secure localStorage
   - Never log tokens in console
   - Clear on logout

2. **HTTPS in Production**
   - Always use HTTPS
   - Secure token transmission
   - Configure CORS properly

3. **Password Requirements**
   - Minimum 6 characters (configurable)
   - Hash before storage
   - Never return password in response

4. **Token Expiration**
   - Default: 24 hours
   - Implement refresh tokens for longer sessions
   - Handle expiration gracefully in frontend

---

## 📋 Rate Limiting (Recommended)

Add to backend for production:
- Login: 5 attempts per 15 minutes per IP
- API calls: 100 requests per minute per user
- Reports: 10 requests per minute per admin

---

## 🐛 Common Issues & Solutions

### CORS Error
**Problem:** Browser blocks request
**Solution:** Configure CORS in Flask backend
```python
CORS(app, origins=['http://localhost:5173'])
```

### Token Not Working
**Problem:** 401 Unauthorized
**Solution:** Check token format: `Bearer TOKEN`

### Module Won't Complete
**Problem:** Previous module not completed
**Solution:** Complete modules in order

### Certificate Not Found
**Problem:** 404 error
**Solution:** Complete all track modules first

---

## 📚 Full Documentation

For complete documentation, see:
- `BACKEND_SPECIFICATIONS.md` - Complete API specification
- `PYTHON_BACKEND_GUIDE.md` - Backend implementation
- `INTEGRATION_GUIDE.md` - Frontend integration

---

## 💡 Tips

1. **Save the token** after login for subsequent requests
2. **Check response status** before parsing JSON
3. **Handle errors** gracefully in UI
4. **Test endpoints** in order: auth → dashboard → track → module
5. **Use browser DevTools** Network tab to debug
6. **Validate data** before sending to API
7. **Implement retry logic** for failed requests
8. **Log errors** for debugging
9. **Use async/await** for cleaner code
10. **Test edge cases** (expired tokens, invalid IDs, etc.)
