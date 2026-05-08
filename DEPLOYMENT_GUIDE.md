# 🚀 Production Deployment Guide

## Frontend

**URL**: https://docent-desk-ai-chatbot.vercel.app/

## Backend Configuration

### Vercel Environment Variables

Set these in your Vercel backend project settings:

```
SUPABASE_URL=<your-supabase-url>
SUPABASE_SERVICE_KEY=<your-supabase-key>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GOOGLE_CALLBACK_URL=https://your-backend-domain.vercel.app/api/auth/google/callback
CLIENT_URL=https://docent-desk-ai-chatbot.vercel.app
JWT_SECRET=<your-jwt-secret>
SESSION_SECRET=<your-session-secret>
NODE_ENV=production
```

### Steps:

1. Go to https://vercel.com/dashboard
2. Select your backend project
3. Settings → Environment Variables
4. Add each variable (Production scope)
5. Redeploy

### Google Cloud Console

1. Go to https://console.cloud.google.com/
2. APIs & Services → Credentials
3. Add authorized redirect URI:
   ```
   https://your-backend-domain.vercel.app/api/auth/google/callback
   ```

---

## Testing

1. Open frontend: https://docent-desk-ai-chatbot.vercel.app/
2. Click "Sign in with Google"
3. Complete login
4. ✅ Should work without errors!

---

## Troubleshooting

| Error                      | Fix                                                             |
| -------------------------- | --------------------------------------------------------------- |
| Service worker errors      | Clear cache, see [SERVICE_WORKER_FIX.md](SERVICE_WORKER_FIX.md) |
| OAuth callback issues      | Verify GOOGLE_CALLBACK_URL matches backend domain               |
| Database connection errors | Check Supabase credentials in Vercel env vars                   |

---

**Documentation**: Store sensitive values in Vercel, not in GitHub!
