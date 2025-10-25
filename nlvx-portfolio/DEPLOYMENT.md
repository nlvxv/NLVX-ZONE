# NLVX Portfolio - Deployment Guide to Vercel

## 📋 Prerequisites

Before deploying to Vercel, ensure you have:

1. **GitHub Account** - Your project must be pushed to GitHub
2. **Vercel Account** - Create one at [vercel.com](https://vercel.com)
3. **Environment Variables** - All required secrets configured
4. **Database** - MySQL/TiDB database URL

## 🚀 Deployment Steps

### Step 1: Push to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: NLVX Portfolio"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/nlvx-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Search for and select your `nlvx-portfolio` repository
5. Click **"Import"**

### Step 3: Configure Environment Variables

In the Vercel project settings, add the following environment variables:

#### Required Variables:
- `DATABASE_URL` - Your MySQL/TiDB connection string
- `JWT_SECRET` - Secret key for session cookies (generate a random string)
- `VITE_APP_ID` - Your Manus OAuth application ID
- `OAUTH_SERVER_URL` - Manus OAuth server URL (usually `https://api.manus.im`)
- `VITE_OAUTH_PORTAL_URL` - Manus OAuth portal URL
- `OWNER_OPEN_ID` - Your Manus OpenID
- `OWNER_NAME` - Your name
- `VITE_APP_TITLE` - "NLVX - Legendary Developer Portfolio"
- `VITE_APP_LOGO` - Your logo URL

#### Telegram Integration:
- `TELEGRAM_BOT_TOKEN` - Your Telegram Bot token (from BotFather)
- `TELEGRAM_CHAT_ID` - Your Telegram Chat ID

#### Analytics (Optional):
- `VITE_ANALYTICS_ENDPOINT` - Analytics endpoint URL
- `VITE_ANALYTICS_WEBSITE_ID` - Analytics website ID

#### Built-in Forge API:
- `BUILT_IN_FORGE_API_URL` - Manus Forge API URL
- `BUILT_IN_FORGE_API_KEY` - Manus Forge API key

### Step 4: Configure Build Settings

1. **Framework Preset**: Select **"Other"** or **"Node.js"**
2. **Build Command**: `pnpm run build`
3. **Output Directory**: `dist`
4. **Install Command**: `pnpm install`

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete
3. Your site will be live at `https://your-project-name.vercel.app`

## 🔧 Environment Variables Reference

### Generate JWT_SECRET

```bash
# On macOS/Linux
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Get Telegram Credentials

1. **Create a Bot**:
   - Message [@BotFather](https://t.me/botfather) on Telegram
   - Send `/newbot` command
   - Follow the prompts to create your bot
   - Copy the token provided

2. **Get Your Chat ID**:
   - Message your bot with `/start`
   - Visit `https://api.telegram.org/bot{YOUR_TOKEN}/getUpdates`
   - Look for your message in the response
   - Copy the `chat.id` value

## 📝 Post-Deployment

### 1. Test Contact Form

1. Navigate to your deployed site
2. Scroll to "Get In Touch" section
3. Fill out the contact form
4. Verify:
   - Form submission succeeds
   - Message appears in your Telegram chat
   - Message is stored in database

### 2. Verify GitHub Integration

1. Check "Featured Projects" section
2. Verify your GitHub projects are displayed
3. Confirm stars and forks counts are accurate

### 3. Monitor Logs

In Vercel dashboard:
1. Go to your project
2. Click **"Deployments"** tab
3. Select the latest deployment
4. Click **"Logs"** to view build and runtime logs

## 🐛 Troubleshooting

### Build Fails

**Error**: `Cannot find module 'zod'`
- **Solution**: Run `pnpm install` locally and push to GitHub

**Error**: `DATABASE_URL is not set`
- **Solution**: Add `DATABASE_URL` to Vercel environment variables

### Contact Form Not Working

**Issue**: Form submission fails
- **Solution**: 
  1. Check database connection
  2. Verify `DATABASE_URL` is correct
  3. Check server logs in Vercel

**Issue**: Telegram messages not received
- **Solution**:
  1. Verify `TELEGRAM_BOT_TOKEN` is correct
  2. Verify `TELEGRAM_CHAT_ID` is correct
  3. Test bot with: `curl -X POST https://api.telegram.org/bot{TOKEN}/sendMessage -d "chat_id={CHAT_ID}&text=Test"`

### Projects Not Loading

**Issue**: GitHub projects section shows loading spinner
- **Solution**:
  1. Check browser console for errors
  2. Verify GitHub API is accessible
  3. Check if user has public repositories

## 🔐 Security Best Practices

1. **Never commit secrets** - Use environment variables only
2. **Rotate JWT_SECRET** - Generate a new one regularly
3. **Enable HTTPS** - Vercel provides this by default
4. **Monitor logs** - Check for suspicious activity
5. **Update dependencies** - Run `pnpm update` regularly

## 📚 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Manus OAuth Documentation](https://docs.manus.im)
- [Drizzle ORM Documentation](https://orm.drizzle.team)

## 🆘 Support

If you encounter issues:

1. Check Vercel logs for error messages
2. Verify all environment variables are set
3. Test database connection locally
4. Check Telegram bot token validity
5. Review GitHub API rate limits

---

**Happy Deploying! 🎉**

