# Leadership Academy Backend Specifications

## Database Schema

### 1. users
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'trainee', -- 'trainee' or 'admin'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. tracks
```sql
CREATE TABLE tracks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. modules
```sql
CREATE TABLE modules (
    id SERIAL PRIMARY KEY,
    track_id INTEGER NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content_type VARCHAR(50), -- 'video', 'reading', 'activity'
    content_url TEXT,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. user_progress
```sql
CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, module_id)
);
```

### 5. certificates
```sql
CREATE TABLE certificates (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    track_id INTEGER NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    certificate_number VARCHAR(100) UNIQUE NOT NULL
);
```

## API Endpoints

### Authentication

#### POST /api/auth/login
Request:
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```
Response:
```json
{
    "success": true,
    "token": "jwt_token_here",
    "user": {
        "id": 1,
        "email": "user@example.com",
        "full_name": "John Doe",
        "role": "trainee"
    }
}
```

#### POST /api/auth/register
Request:
```json
{
    "email": "user@example.com",
    "password": "password123",
    "full_name": "John Doe"
}
```
Response:
```json
{
    "success": true,
    "user": {
        "id": 1,
        "email": "user@example.com",
        "full_name": "John Doe",
        "role": "trainee"
    }
}
```

### Trainee Endpoints

#### GET /api/trainee/dashboard
Headers: `Authorization: Bearer {token}`

Response:
```json
{
    "user": {
        "id": 1,
        "full_name": "John Doe",
        "email": "user@example.com"
    },
    "tracks": [
        {
            "id": 1,
            "title": "Leadership Fundamentals",
            "description": "Core leadership skills",
            "total_modules": 5,
            "completed_modules": 3,
            "progress_percentage": 60,
            "current_module": {
                "id": 4,
                "title": "Communication Skills",
                "order_index": 4
            }
        }
    ]
}
```

#### GET /api/trainee/track/:trackId
Headers: `Authorization: Bearer {token}`

Response:
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
            "description": "Basic leadership concepts",
            "content_type": "video",
            "content_url": "https://example.com/video1.mp4",
            "order_index": 1,
            "completed": true,
            "completed_at": "2026-01-15T10:30:00Z",
            "locked": false
        },
        {
            "id": 2,
            "title": "Leadership Styles",
            "description": "Different approaches to leadership",
            "content_type": "reading",
            "content_url": null,
            "order_index": 2,
            "completed": false,
            "completed_at": null,
            "locked": false
        },
        {
            "id": 3,
            "title": "Team Building",
            "description": "Building effective teams",
            "content_type": "activity",
            "content_url": null,
            "order_index": 3,
            "completed": false,
            "completed_at": null,
            "locked": true
        }
    ]
}
```

#### POST /api/trainee/complete-module
Headers: `Authorization: Bearer {token}`

Request:
```json
{
    "module_id": 2
}
```
Response:
```json
{
    "success": true,
    "progress": {
        "module_id": 2,
        "completed": true,
        "completed_at": "2026-01-23T14:30:00Z"
    },
    "track_completed": false,
    "next_module_id": 3
}
```

#### GET /api/trainee/certificate/:trackId
Headers: `Authorization: Bearer {token}`

Response:
```json
{
    "certificate": {
        "id": 1,
        "certificate_number": "CERT-2026-001234",
        "issued_at": "2026-01-23T15:00:00Z",
        "user_name": "John Doe",
        "track_title": "Leadership Fundamentals",
        "completion_date": "2026-01-23"
    }
}
```

### Admin Endpoints

#### GET /api/admin/trainees
Headers: `Authorization: Bearer {token}`

Response:
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
                    "progress_percentage": 100,
                    "completed": true
                },
                {
                    "track_id": 2,
                    "track_title": "Advanced Leadership",
                    "completed_modules": 2,
                    "total_modules": 6,
                    "progress_percentage": 33,
                    "completed": false
                }
            ]
        }
    ]
}
```

#### GET /api/admin/reports/completions
Headers: `Authorization: Bearer {token}`
Query Parameters: `start_date`, `end_date`, `track_id` (optional)

Example: `/api/admin/reports/completions?start_date=2026-01-01&end_date=2026-01-31&track_id=1`

Response:
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
        },
        {
            "track_id": 3,
            "track_title": "Executive Leadership",
            "completions": 10
        }
    ]
}
```

#### GET /api/admin/reports/completion-time
Headers: `Authorization: Bearer {token}`
Query Parameters: `track_id` (optional)

Response:
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
        },
        {
            "track_id": 2,
            "track_title": "Advanced Leadership",
            "average_days": 52.8,
            "min_days": 25,
            "max_days": 90,
            "total_completions": 30
        }
    ]
}
```

#### GET /api/admin/tracks
Headers: `Authorization: Bearer {token}`

Response:
```json
{
    "tracks": [
        {
            "id": 1,
            "title": "Leadership Fundamentals",
            "description": "Core leadership skills",
            "total_modules": 5,
            "order_index": 1
        }
    ]
}
```

## Python Flask Implementation Example

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Database connection
def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="leadership_academy",
        user="your_user",
        password="your_password",
        cursor_factory=RealDictCursor
    )
    return conn

# JWT token required decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        try:
            token = token.split(' ')[1]  # Remove 'Bearer ' prefix
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = data
        except:
            return jsonify({'message': 'Token is invalid'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

# Admin required decorator
def admin_required(f):
    @wraps(f)
    def decorated(current_user, *args, **kwargs):
        if current_user['role'] != 'admin':
            return jsonify({'message': 'Admin access required'}), 403
        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM users WHERE email = %s', (email,))
    user = cur.fetchone()
    cur.close()
    conn.close()
    
    if user and check_password_hash(user['password_hash'], password):
        token = jwt.encode({
            'user_id': user['id'],
            'email': user['email'],
            'role': user['role'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }, app.config['SECRET_KEY'])
        
        return jsonify({
            'success': True,
            'token': token,
            'user': {
                'id': user['id'],
                'email': user['email'],
                'full_name': user['full_name'],
                'role': user['role']
            }
        })
    
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

@app.route('/api/trainee/complete-module', methods=['POST'])
@token_required
def complete_module(current_user):
    data = request.get_json()
    module_id = data.get('module_id')
    user_id = current_user['user_id']
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    # Check if previous module is completed
    cur.execute('''
        SELECT m.order_index, m.track_id
        FROM modules m
        WHERE m.id = %s
    ''', (module_id,))
    current_module = cur.fetchone()
    
    if current_module['order_index'] > 1:
        cur.execute('''
            SELECT m.id
            FROM modules m
            LEFT JOIN user_progress up ON m.id = up.module_id AND up.user_id = %s
            WHERE m.track_id = %s AND m.order_index = %s
            AND (up.completed IS NULL OR up.completed = FALSE)
        ''', (user_id, current_module['track_id'], current_module['order_index'] - 1))
        
        if cur.fetchone():
            cur.close()
            conn.close()
            return jsonify({'success': False, 'message': 'Previous module not completed'}), 400
    
    # Mark module as completed
    cur.execute('''
        INSERT INTO user_progress (user_id, module_id, completed, completed_at)
        VALUES (%s, %s, TRUE, NOW())
        ON CONFLICT (user_id, module_id)
        DO UPDATE SET completed = TRUE, completed_at = NOW()
        RETURNING *
    ''', (user_id, module_id))
    
    progress = cur.fetchone()
    
    # Check if track is completed
    cur.execute('''
        SELECT COUNT(*) as total,
               SUM(CASE WHEN up.completed THEN 1 ELSE 0 END) as completed
        FROM modules m
        LEFT JOIN user_progress up ON m.id = up.module_id AND up.user_id = %s
        WHERE m.track_id = %s
    ''', (user_id, current_module['track_id']))
    
    track_stats = cur.fetchone()
    track_completed = track_stats['total'] == track_stats['completed']
    
    # Get next module
    cur.execute('''
        SELECT id FROM modules
        WHERE track_id = %s AND order_index = %s
    ''', (current_module['track_id'], current_module['order_index'] + 1))
    
    next_module = cur.fetchone()
    
    # Generate certificate if track completed
    if track_completed:
        cert_number = f"CERT-{datetime.datetime.now().year}-{user_id:06d}{current_module['track_id']:03d}"
        cur.execute('''
            INSERT INTO certificates (user_id, track_id, certificate_number)
            VALUES (%s, %s, %s)
        ''', (user_id, current_module['track_id'], cert_number))
    
    conn.commit()
    cur.close()
    conn.close()
    
    return jsonify({
        'success': True,
        'progress': dict(progress),
        'track_completed': track_completed,
        'next_module_id': next_module['id'] if next_module else None
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

## Sample Data SQL

```sql
-- Insert sample tracks
INSERT INTO tracks (title, description, order_index) VALUES
('Leadership Fundamentals', 'Core leadership skills and principles', 1),
('Advanced Leadership', 'Advanced techniques for experienced leaders', 2),
('Executive Leadership', 'Strategic leadership for executives', 3);

-- Insert sample modules for Leadership Fundamentals
INSERT INTO modules (track_id, title, description, content_type, order_index) VALUES
(1, 'Introduction to Leadership', 'Understanding what makes a great leader', 'video', 1),
(1, 'Leadership Styles', 'Exploring different leadership approaches', 'reading', 2),
(1, 'Communication Skills', 'Effective communication for leaders', 'video', 3),
(1, 'Team Building', 'Creating and managing effective teams', 'activity', 4),
(1, 'Conflict Resolution', 'Managing and resolving team conflicts', 'reading', 5);

-- Insert sample admin user (password: admin123)
INSERT INTO users (email, password_hash, full_name, role) VALUES
('admin@academy.com', 'pbkdf2:sha256:...', 'Admin User', 'admin');

-- Insert sample trainee (password: user123)
INSERT INTO users (email, password_hash, full_name, role) VALUES
('john.doe@example.com', 'pbkdf2:sha256:...', 'John Doe', 'trainee');
```

## Notes

1. All endpoints require JWT authentication except login and register
2. Passwords must be hashed using bcrypt or similar before storing
3. Module locking logic: A module is locked if the previous module in the track is not completed
4. Certificate numbers follow format: CERT-YEAR-USERIDDTRACKID
5. Completion time is calculated from the first module started_at to last module completed_at
6. CORS should be configured to allow requests from your React frontend
7. Use environment variables for sensitive configuration (database credentials, JWT secret)
