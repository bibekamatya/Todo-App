# Todo App

A full-stack todo application with Next.js, MongoDB, and NextAuth.

## Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `MONGODB_URI`
   - `AUTH_SECRET`
   - `AUTH_GOOGLE_ID`
   - `AUTH_GOOGLE_SECRET`
4. Update Google OAuth redirect URI to: `https://your-domain.vercel.app/api/auth/callback/google`
5. Deploy

## Local Development

```bash
npm install
npm run dev
```
