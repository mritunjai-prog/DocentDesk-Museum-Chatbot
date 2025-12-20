# Database Migration Guide

## Switching from MongoDB to Supabase PostgreSQL

This guide will help you set up the Supabase database for DocentDesk.

### Step 1: Access Supabase SQL Editor

1. Go to your Supabase project: https://app.supabase.com/project/pllxlvzoyitxfzehzodr
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**

### Step 2: Run the Migration

1. Open the file: `backend/migrations/001_create_users_table.sql`
2. Copy the entire SQL content
3. Paste it into the Supabase SQL Editor
4. Click **Run** (or press Ctrl+Enter)

The migration will create:

- `users` table with all necessary fields
- Indexes for faster queries (email, google_id, role, reset_token)
- Auto-update trigger for `updated_at` field
- Row Level Security (RLS) policies

### Step 3: Verify the Table

After running the migration, verify the table was created:

```sql
SELECT * FROM users LIMIT 1;
```

You should see the table structure with no errors.

### Step 4: Update Vercel Environment Variables

1. Go to your Vercel project: https://vercel.com/dashboard
2. Navigate to your backend project settings
3. Go to **Environment Variables**
4. Add these variables:
   - `SUPABASE_URL`: `https://pllxlvzoyitxfzehzodr.supabase.co`
   - `SUPABASE_SERVICE_KEY`: (Use your Supabase service role key - find it in Supabase Settings > API)

**Important:** Use the `service_role` key (not the `anon` key) for the backend. The service role key bypasses RLS policies and allows full database access.

### Step 5: Find Your Service Role Key

1. In Supabase, go to **Settings** (gear icon in sidebar)
2. Click **API**
3. Under **Project API keys**, copy the `service_role` key (it's the secret one)
4. Paste this as `SUPABASE_SERVICE_KEY` in both:
   - `backend/.env` (for local development)
   - Vercel Environment Variables (for production)

### Step 6: Test Locally

```bash
cd backend
npm start
```

Try registering a new user or logging in with Google OAuth.

### Step 7: Deploy to Vercel

```bash
git add .
git commit -m "Switch from MongoDB to Supabase PostgreSQL"
git push
```

Vercel will automatically deploy the changes.

### Why Supabase?

**Advantages over MongoDB for serverless:**

- ✅ Instant connection (no cold start timeout)
- ✅ Built-in connection pooling
- ✅ RESTful API with real-time capabilities
- ✅ Global CDN for worldwide access
- ✅ Designed specifically for serverless environments
- ✅ Free tier includes 500MB database and 2GB bandwidth
- ✅ Row Level Security for enhanced security

**MongoDB issues we had:**

- ❌ 10+ second timeout on Vercel
- ❌ Requires persistent connection
- ❌ Not optimized for serverless
- ❌ Complex connection pooling

### Database Schema Differences

**MongoDB (camelCase) → PostgreSQL (snake_case)**

| MongoDB Field         | PostgreSQL Field        |
| --------------------- | ----------------------- |
| `_id`                 | `id` (UUID)             |
| `googleId`            | `google_id`             |
| `firstName`           | `first_name`            |
| `lastName`            | `last_name`             |
| `authProvider`        | `auth_provider`         |
| `isEmailVerified`     | `is_email_verified`     |
| `isActive`            | `is_active`             |
| `lastLogin`           | `last_login`            |
| `resetPasswordToken`  | `reset_password_token`  |
| `resetPasswordExpire` | `reset_password_expire` |
| `createdAt`           | `created_at`            |
| `updatedAt`           | `updated_at`            |

All code has been updated to use the new snake_case field names.

### Next Steps

Once deployed, test the following:

1. Register a new user with email/password
2. Login with email/password
3. Login with Google OAuth
4. Password reset flow
5. Update user profile

All authentication should now work globally without timeouts! 🎉
