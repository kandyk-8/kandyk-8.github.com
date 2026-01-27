# Leadership Academy Tracking Software

A comprehensive training management system built with React frontend and Python backend.

## 🎯 Features

### For Trainees
- ✅ User registration and authentication
- 📚 Multiple training tracks with ordered modules
- 🎥 Support for videos, readings, and activities
- 🔒 Sequential module unlocking (must complete current before next)
- ✓ Manual completion tracking
- 🏆 Printable certificates on track completion
- 📊 Personal progress dashboard

### For Administrators
- 👥 View all trainees and their progress
- 📈 Generate completion reports by time period
- ⏱️ Generate time-to-complete reports
- 📋 Filter reports by specific track or view all
- 🎯 Track overall training metrics

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives
- **State Management**: React Hooks
- **Notifications**: Sonner (toast notifications)

### Backend (Python + Flask)
- **Framework**: Flask
- **Database**: PostgreSQL (MySQL/SQLite compatible)
- **Authentication**: JWT tokens
- **Password Security**: Werkzeug password hashing
- **API**: RESTful endpoints

## 📁 Project Structure

```
leadership-academy/
├── frontend/                     # This React application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/      # React components
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   ├── TraineeDashboard.tsx
│   │   │   │   ├── AdminDashboard.tsx
│   │   │   │   ├── TrackView.tsx
│   │   │   │   ├── Certificate.tsx
│   │   │   │   └── ui/          # Reusable UI components
│   │   │   ├── services/        # API and data services
│   │   │   │   ├── api.ts       # API client
│   │   │   │   └── mockData.ts  # Demo data
│   │   │   └── App.tsx          # Main application
│   │   └── styles/              # CSS files
│   ├── BACKEND_SPECIFICATIONS.md # Complete API specs
│   └── PYTHON_BACKEND_GUIDE.md  # Python implementation guide
│
└── backend/                      # Your Python backend (to be created)
    ├── app.py                    # Flask application
    ├── .env                      # Environment variables
    └── requirements.txt          # Python dependencies
```

## 🚀 Getting Started

### Frontend Setup (Current React App)

This React application is already configured and running with **mock data** for demonstration.

**Demo Credentials:**
- **Trainee**: john.doe@example.com / user123
- **Admin**: admin@academy.com / admin123

The frontend currently works standalone with simulated data to show all features.

### Backend Setup (Python)

To connect to a real Python backend:

1. **Read the Backend Documentation**
   - `BACKEND_SPECIFICATIONS.md` - Complete database schema and API endpoints
   - `PYTHON_BACKEND_GUIDE.md` - Step-by-step Python/Flask implementation

2. **Create the Backend**
   ```bash
   # In a new directory
   mkdir backend
   cd backend
   
   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install flask flask-cors psycopg2-binary pyjwt python-dotenv werkzeug
   
   # Copy the Flask implementation from PYTHON_BACKEND_GUIDE.md
   # to app.py
   ```

3. **Setup Database**
   ```bash
   # Create PostgreSQL database
   createdb leadership_academy
   
   # Run SQL schema from BACKEND_SPECIFICATIONS.md
   psql leadership_academy < schema.sql
   ```

4. **Configure Environment**
   ```bash
   # Create .env file (see PYTHON_BACKEND_GUIDE.md for template)
   ```

5. **Run Backend**
   ```bash
   python app.py
   ```

6. **Connect Frontend to Backend**
   - Update `API_BASE_URL` in `/src/app/services/api.ts`
   - Replace mock data calls in `/src/app/App.tsx` with real API calls

## 📊 Database Schema

### Tables
- **users** - User accounts (trainees and admins)
- **tracks** - Training tracks/courses
- **modules** - Individual learning modules within tracks
- **user_progress** - Trainee progress on modules
- **certificates** - Generated completion certificates

See `BACKEND_SPECIFICATIONS.md` for complete schema with relationships.

## 🔐 Authentication

- JWT-based authentication
- Secure password hashing with Werkzeug
- Role-based access control (trainee/admin)
- Token expiration handling

## 🎨 UI Components

Built with Radix UI and Tailwind CSS:
- Responsive design for mobile and desktop
- Accessible components (WCAG compliant)
- Beautiful, modern interface
- Print-friendly certificates

## 📱 Key Features Explained

### Sequential Module Locking
- Trainees must complete modules in order
- Next module unlocks only after current is completed
- Visual indicators show locked/unlocked status

### Progress Tracking
- Real-time progress updates
- Visual progress bars
- Completion percentages
- Module status indicators

### Certificate Generation
- Auto-generated on track completion
- Unique certificate numbers (CERT-YEAR-USERID-TRACKID)
- Includes completion date
- Print/PDF ready

### Admin Reports
1. **Completion Reports**
   - Filter by date range
   - Filter by specific track or all tracks
   - Shows total completions and breakdown by track

2. **Time Reports**
   - Average days to complete
   - Min/max completion times
   - Total completions per track

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Trainee
- `GET /api/trainee/dashboard` - Get dashboard data
- `GET /api/trainee/track/:id` - Get track details
- `POST /api/trainee/complete-module` - Mark module complete
- `GET /api/trainee/certificate/:trackId` - Get certificate

### Admin
- `GET /api/admin/trainees` - List all trainees
- `GET /api/admin/tracks` - List all tracks
- `GET /api/admin/reports/completions` - Completion report
- `GET /api/admin/reports/completion-time` - Time report

See `BACKEND_SPECIFICATIONS.md` for detailed request/response formats.

## 🛠️ Development

### Running Frontend
The frontend is already running in your current environment.

### Adding New Features

**Frontend:**
1. Create component in `/src/app/components/`
2. Add API call in `/src/app/services/api.ts`
3. Integrate in `/src/app/App.tsx`

**Backend:**
1. Add route in `app.py`
2. Update database if needed
3. Document in `BACKEND_SPECIFICATIONS.md`

## 📝 Sample Data

To populate your database with sample data, use the SQL in `BACKEND_SPECIFICATIONS.md`:

```sql
-- Creates 3 tracks with multiple modules
-- Creates admin and trainee users
-- Sample module content
```

## 🔒 Security Considerations

- Never commit `.env` files
- Use strong JWT secret keys
- Hash all passwords before storage
- Validate all user inputs
- Use HTTPS in production
- Implement rate limiting
- Regular security updates

## 🚀 Production Deployment

### Frontend
- Build: `npm run build`
- Deploy to Vercel, Netlify, or any static host
- Configure environment variables

### Backend
- Use Gunicorn or uWSGI
- Set up reverse proxy (Nginx)
- Use production database
- Enable HTTPS
- Set up logging and monitoring

## 📖 Documentation Files

1. **README.md** (this file) - Overview and quick start
2. **BACKEND_SPECIFICATIONS.md** - Complete API and database documentation
3. **PYTHON_BACKEND_GUIDE.md** - Step-by-step Python implementation

## 🤝 Support

For backend implementation help:
1. Review `PYTHON_BACKEND_GUIDE.md` for complete Flask code
2. Check `BACKEND_SPECIFICATIONS.md` for API contracts
3. Test API endpoints with curl or Postman

## 📄 License

This is a demonstration project for educational purposes.

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and Python Flask
