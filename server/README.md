# LeadFlow Backend

MongoDB-powered backend for LeadFlow CRM.

## Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Install dependencies:
   ```bash
   cd server
   npm install
   ```

3. Update `.env` with your MongoDB URI:
   ```
   MONGODB_URI=mongodb://localhost:27017/leadflow
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/leadflow
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `POST /api/auth/login` - Login (email: admin@crm.com, password: admin123)
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create lead
- `PATCH /api/leads/:id/status` - Update status
- `POST /api/leads/:id/notes` - Add note
- `DELETE /api/leads/:id` - Delete lead

All lead endpoints require JWT token in Authorization header.
