# Vercel Deployment

## Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

1. `MONGODB_URI` - Your MongoDB Atlas connection string
   Example: `mongodb+srv://username:password@cluster.mongodb.net/leadflow`

2. `JWT_SECRET` - Random secret key
   Example: `your-super-secret-jwt-key-change-this`

## MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist all IPs (0.0.0.0/0) for Vercel
5. Get connection string

## Deploy

```bash
vercel --prod
```

Login credentials:
- Email: admin@crm.com
- Password: admin123
