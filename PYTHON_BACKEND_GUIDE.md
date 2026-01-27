# Python Backend Implementation Guide

## Quick Start

This guide will help you implement the Python backend for the Leadership Academy Tracking Software.

## Architecture Overview

```
Frontend (React) <---> Backend API (Python Flask) <---> Database (PostgreSQL)
```

## Prerequisites

- Python 3.8+
- PostgreSQL 12+ (or MySQL/SQLite)
- pip (Python package manager)

## Setup Instructions

### 1. Install Dependencies

```bash
# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install required packages
pip install flask flask-cors psycopg2-binary pyjwt python-dotenv werkzeug
```

### 2. Create Database

```sql
-- Connect to PostgreSQL and create database
CREATE DATABASE leadership_academy;

-- Use the database
\c leadership_academy;

-- Run all the CREATE TABLE statements from BACKEND_SPECIFICATIONS.md
```

### 3. Environment Configuration

Create a `.env` file in your backend directory:

```env
# Database Configuration
DB_HOST=localhost
DB_NAME=leadership_academy
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_PORT=5432

# Security
SECRET_KEY=your-super-secret-jwt-key-change-this-in-production
FLASK_ENV=development

# CORS (your React frontend URL)
FRONTEND_URL=http://localhost:5173
```

### 4. Complete Backend Implementation

Create a file named `app.py`:

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, origins=[os.getenv('FRONTEND_URL')])
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

# Database connection
def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv('DB_HOST'),
        database=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        port=os.getenv('DB_PORT'),
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
        except Exception as e:
            return jsonify({'message': 'Token is invalid', 'error': str(e)}), 401
        return f(current_user, *args, **kwargs)
    return decorated

# Admin required decorator
def admin_required(f):
    @wraps(f)
    def decorated(current_user, *args, **kwargs):
        if current_user.get('role') != 'admin':
            return jsonify({'message': 'Admin access required'}), 403
        return f(current_user, *args, **kwargs)
    return decorated

# ============= Authentication Endpoints =============

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'success': False, 'message': 'Email and password required'}), 400
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute('SELECT * FROM users WHERE email = %s', (email,))
        user = cur.fetchone()
        
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
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500
    finally:
        cur.close()
        conn.close()

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    full_name = data.get('full_name')
    
    if not email or not password or not full_name:
        return jsonify({'success': False, 'message': 'All fields required'}), 400
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        # Check if user exists
        cur.execute('SELECT id FROM users WHERE email = %s', (email,))
        if cur.fetchone():
            return jsonify({'success': False, 'message': 'Email already registered'}), 400
        
        # Create user
        password_hash = generate_password_hash(password)
        cur.execute(
            'INSERT INTO users (email, password_hash, full_name, role) VALUES (%s, %s, %s, %s) RETURNING *',
            (email, password_hash, full_name, 'trainee')
        )
        user = cur.fetchone()
        conn.commit()
        
        return jsonify({
            'success': True,
            'user': {
                'id': user['id'],
                'email': user['email'],
                'full_name': user['full_name'],
                'role': user['role']
            }
        })
    except Exception as e:
        conn.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# ============= Trainee Endpoints =============

@app.route('/api/trainee/dashboard', methods=['GET'])
@token_required
def trainee_dashboard(current_user):
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        user_id = current_user['user_id']
        
        # Get user info
        cur.execute('SELECT id, email, full_name FROM users WHERE id = %s', (user_id,))
        user = cur.fetchone()
        
        # Get all tracks with progress
        cur.execute('''
            SELECT 
                t.id,
                t.title,
                t.description,
                COUNT(m.id) as total_modules,
                COUNT(CASE WHEN up.completed = TRUE THEN 1 END) as completed_modules
            FROM tracks t
            LEFT JOIN modules m ON t.id = m.track_id
            LEFT JOIN user_progress up ON m.id = up.module_id AND up.user_id = %s
            GROUP BY t.id, t.title, t.description
            ORDER BY t.order_index
        ''', (user_id,))
        
        tracks = []
        for row in cur.fetchall():
            total = row['total_modules']
            completed = row['completed_modules']
            progress = (completed / total * 100) if total > 0 else 0
            
            # Get current module
            cur.execute('''
                SELECT m.id, m.title, m.order_index
                FROM modules m
                LEFT JOIN user_progress up ON m.id = up.module_id AND up.user_id = %s
                WHERE m.track_id = %s AND (up.completed IS NULL OR up.completed = FALSE)
                ORDER BY m.order_index
                LIMIT 1
            ''', (user_id, row['id']))
            current_module = cur.fetchone()
            
            tracks.append({
                'id': row['id'],
                'title': row['title'],
                'description': row['description'],
                'total_modules': total,
                'completed_modules': completed,
                'progress_percentage': round(progress, 1),
                'current_module': dict(current_module) if current_module else None
            })
        
        return jsonify({
            'user': dict(user),
            'tracks': tracks
        })
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    finally:
        cur.close()
        conn.close()

@app.route('/api/trainee/track/<int:track_id>', methods=['GET'])
@token_required
def get_track(current_user, track_id):
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        user_id = current_user['user_id']
        
        # Get track info
        cur.execute('SELECT * FROM tracks WHERE id = %s', (track_id,))
        track = cur.fetchone()
        
        if not track:
            return jsonify({'message': 'Track not found'}), 404
        
        # Get modules with progress
        cur.execute('''
            SELECT 
                m.*,
                up.completed,
                up.completed_at
            FROM modules m
            LEFT JOIN user_progress up ON m.id = up.module_id AND up.user_id = %s
            WHERE m.track_id = %s
            ORDER BY m.order_index
        ''', (user_id, track_id))
        
        modules = []
        for i, row in enumerate(cur.fetchall()):
            module_dict = dict(row)
            
            # Check if previous module is completed
            if i > 0:
                prev_module = modules[i - 1]
                module_dict['locked'] = not prev_module['completed']
            else:
                module_dict['locked'] = False
            
            module_dict['completed'] = bool(module_dict.get('completed'))
            modules.append(module_dict)
        
        return jsonify({
            'track': dict(track),
            'modules': modules
        })
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    finally:
        cur.close()
        conn.close()

@app.route('/api/trainee/complete-module', methods=['POST'])
@token_required
def complete_module(current_user):
    data = request.get_json()
    module_id = data.get('module_id')
    user_id = current_user['user_id']
    
    if not module_id:
        return jsonify({'success': False, 'message': 'Module ID required'}), 400
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        # Get module info
        cur.execute('SELECT track_id, order_index FROM modules WHERE id = %s', (module_id,))
        module = cur.fetchone()
        
        if not module:
            return jsonify({'success': False, 'message': 'Module not found'}), 404
        
        # Check if previous module is completed (if not first module)
        if module['order_index'] > 1:
            cur.execute('''
                SELECT m.id
                FROM modules m
                LEFT JOIN user_progress up ON m.id = up.module_id AND up.user_id = %s
                WHERE m.track_id = %s AND m.order_index = %s
                AND (up.completed IS NULL OR up.completed = FALSE)
            ''', (user_id, module['track_id'], module['order_index'] - 1))
            
            if cur.fetchone():
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
        ''', (user_id, module['track_id']))
        
        track_stats = cur.fetchone()
        track_completed = track_stats['total'] == track_stats['completed']
        
        # Get next module
        cur.execute('''
            SELECT id FROM modules
            WHERE track_id = %s AND order_index = %s
        ''', (module['track_id'], module['order_index'] + 1))
        
        next_module = cur.fetchone()
        
        # Generate certificate if track completed
        if track_completed:
            cert_number = f"CERT-{datetime.datetime.now().year}-{user_id:06d}{module['track_id']:03d}"
            cur.execute('''
                INSERT INTO certificates (user_id, track_id, certificate_number)
                VALUES (%s, %s, %s)
                ON CONFLICT DO NOTHING
            ''', (user_id, module['track_id'], cert_number))
        
        conn.commit()
        
        return jsonify({
            'success': True,
            'progress': dict(progress),
            'track_completed': track_completed,
            'next_module_id': next_module['id'] if next_module else None
        })
    except Exception as e:
        conn.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500
    finally:
        cur.close()
        conn.close()

@app.route('/api/trainee/certificate/<int:track_id>', methods=['GET'])
@token_required
def get_certificate(current_user, track_id):
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        user_id = current_user['user_id']
        
        cur.execute('''
            SELECT 
                c.*,
                u.full_name as user_name,
                t.title as track_title
            FROM certificates c
            JOIN users u ON c.user_id = u.id
            JOIN tracks t ON c.track_id = t.id
            WHERE c.user_id = %s AND c.track_id = %s
        ''', (user_id, track_id))
        
        cert = cur.fetchone()
        
        if not cert:
            return jsonify({'message': 'Certificate not found'}), 404
        
        cert_dict = dict(cert)
        cert_dict['completion_date'] = cert_dict['issued_at'].strftime('%Y-%m-%d')
        
        return jsonify({'certificate': cert_dict})
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    finally:
        cur.close()
        conn.close()

# ============= Admin Endpoints =============

@app.route('/api/admin/trainees', methods=['GET'])
@token_required
@admin_required
def get_trainees(current_user):
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute("SELECT id, full_name, email FROM users WHERE role = 'trainee'")
        trainees = []
        
        for user in cur.fetchall():
            # Get track progress for each trainee
            cur.execute('''
                SELECT 
                    t.id as track_id,
                    t.title as track_title,
                    COUNT(m.id) as total_modules,
                    COUNT(CASE WHEN up.completed = TRUE THEN 1 END) as completed_modules
                FROM tracks t
                LEFT JOIN modules m ON t.id = m.track_id
                LEFT JOIN user_progress up ON m.id = up.module_id AND up.user_id = %s
                GROUP BY t.id, t.title
                ORDER BY t.order_index
            ''', (user['id'],))
            
            tracks = []
            for track in cur.fetchall():
                total = track['total_modules']
                completed = track['completed_modules']
                progress = (completed / total * 100) if total > 0 else 0
                
                tracks.append({
                    'track_id': track['track_id'],
                    'track_title': track['track_title'],
                    'completed_modules': completed,
                    'total_modules': total,
                    'progress_percentage': round(progress, 1),
                    'completed': completed == total
                })
            
            trainees.append({
                'id': user['id'],
                'full_name': user['full_name'],
                'email': user['email'],
                'tracks': tracks
            })
        
        return jsonify({'trainees': trainees})
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    finally:
        cur.close()
        conn.close()

@app.route('/api/admin/tracks', methods=['GET'])
@token_required
@admin_required
def get_tracks(current_user):
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute('''
            SELECT t.*, COUNT(m.id) as total_modules
            FROM tracks t
            LEFT JOIN modules m ON t.id = m.track_id
            GROUP BY t.id
            ORDER BY t.order_index
        ''')
        
        tracks = [dict(row) for row in cur.fetchall()]
        return jsonify({'tracks': tracks})
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    finally:
        cur.close()
        conn.close()

@app.route('/api/admin/reports/completions', methods=['GET'])
@token_required
@admin_required
def get_completion_report(current_user):
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    track_id = request.args.get('track_id')
    
    if not start_date or not end_date:
        return jsonify({'message': 'start_date and end_date required'}), 400
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        # Overall completions
        query = '''
            SELECT COUNT(*) as total
            FROM certificates
            WHERE issued_at BETWEEN %s AND %s
        '''
        params = [start_date, end_date]
        
        if track_id:
            query += ' AND track_id = %s'
            params.append(track_id)
        
        cur.execute(query, params)
        overall = cur.fetchone()['total']
        
        # By track
        query = '''
            SELECT t.id as track_id, t.title as track_title, COUNT(c.id) as completions
            FROM tracks t
            LEFT JOIN certificates c ON t.id = c.track_id 
                AND c.issued_at BETWEEN %s AND %s
        '''
        params = [start_date, end_date]
        
        if track_id:
            query += ' WHERE t.id = %s'
            params.append(track_id)
        
        query += ' GROUP BY t.id, t.title ORDER BY t.order_index'
        
        cur.execute(query, params)
        by_track = [dict(row) for row in cur.fetchall()]
        
        return jsonify({
            'period': {
                'start_date': start_date,
                'end_date': end_date
            },
            'overall_completions': overall,
            'by_track': by_track
        })
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    finally:
        cur.close()
        conn.close()

@app.route('/api/admin/reports/completion-time', methods=['GET'])
@token_required
@admin_required
def get_time_report(current_user):
    track_id = request.args.get('track_id')
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        # Calculate completion time by track
        query = '''
            WITH completion_times AS (
                SELECT 
                    c.track_id,
                    t.title as track_title,
                    EXTRACT(EPOCH FROM (MAX(up.completed_at) - MIN(up.started_at)))/86400 as days
                FROM certificates c
                JOIN tracks t ON c.track_id = t.id
                JOIN modules m ON m.track_id = c.track_id
                JOIN user_progress up ON up.module_id = m.id AND up.user_id = c.user_id
                GROUP BY c.user_id, c.track_id, t.title
            )
            SELECT 
                track_id,
                track_title,
                AVG(days) as average_days,
                MIN(days) as min_days,
                MAX(days) as max_days,
                COUNT(*) as total_completions
            FROM completion_times
        '''
        params = []
        
        if track_id:
            query += ' WHERE track_id = %s'
            params.append(track_id)
        
        query += ' GROUP BY track_id, track_title ORDER BY track_id'
        
        cur.execute(query, params)
        by_track = []
        
        for row in cur.fetchall():
            by_track.append({
                'track_id': row['track_id'],
                'track_title': row['track_title'],
                'average_days': round(float(row['average_days']), 1),
                'min_days': int(row['min_days']),
                'max_days': int(row['max_days']),
                'total_completions': row['total_completions']
            })
        
        # Overall average
        overall_avg = sum(t['average_days'] for t in by_track) / len(by_track) if by_track else 0
        
        return jsonify({
            'overall_average_days': round(overall_avg, 1),
            'by_track': by_track
        })
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    finally:
        cur.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

### 5. Run the Backend

```bash
python app.py
```

The server will start on `http://localhost:5000`

### 6. Connect Frontend to Backend

In the React app, update `/src/app/services/api.ts`:

Change:
```typescript
const API_BASE_URL = 'http://localhost:5000/api';
```

Then uncomment the API calls in `/src/app/App.tsx` and replace the mock data logic.

## Testing the API

Use curl or Postman to test endpoints:

```bash
# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","full_name":"Test User"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get dashboard (use token from login response)
curl -X GET http://localhost:5000/api/trainee/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Production Deployment

For production, consider:

1. Use environment variables for all sensitive data
2. Enable HTTPS
3. Use a production-grade database
4. Implement rate limiting
5. Add logging and monitoring
6. Use a production WSGI server like Gunicorn:

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Alternative: Django Implementation

If you prefer Django over Flask:

```bash
pip install django djangorestframework django-cors-headers djangorestframework-simplejwt
django-admin startproject leadership_academy
cd leadership_academy
python manage.py startapp api
```

Then follow Django REST Framework patterns for implementing the same endpoints.

## Database Alternatives

- **SQLite**: For development only
- **MySQL**: Change `psycopg2` to `mysql-connector-python`
- **MongoDB**: Use `pymongo` with document-based schema

## Support

Refer to `BACKEND_SPECIFICATIONS.md` for complete API documentation and database schema.
