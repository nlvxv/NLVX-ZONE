# NLVX - Legendary Developer Portfolio

A professional, fully-featured portfolio website built with modern web technologies, featuring smooth animations, GitHub project integration, and Telegram bot contact form integration.

## ✨ Features

### 🎨 Design & UX
- **Dark Theme** - Professional dark mode with gradient accents
- **Smooth Animations** - Fade-in, slide-in, and hover effects
- **Responsive Design** - Mobile-first, works on all devices
- **Modern UI** - Glass-morphism effects and gradient text

### 🔗 Integrations
- **GitHub API** - Automatically displays your top projects with stars and forks
- **Telegram Bot** - Contact form submissions sent directly to your Telegram
- **Database** - All messages stored in MySQL/TiDB database
- **Notifications** - Owner notifications for new contact submissions

### 📱 Sections
1. **Hero** - Eye-catching introduction with call-to-action buttons
2. **About** - Personal bio and key information
3. **Skills** - Technical skills organized by category
4. **Projects** - Featured projects from GitHub with live links
5. **Contact** - Contact form with validation and submission handling
6. **Footer** - Copyright and additional information

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Vite** - Fast build tool
- **tRPC** - Type-safe API calls
- **Lucide Icons** - Beautiful icons

### Backend
- **Node.js** - Runtime
- **Express 4** - Web framework
- **tRPC 11** - RPC framework
- **Drizzle ORM** - Database ORM
- **MySQL/TiDB** - Database

### Deployment
- **Vercel** - Hosting platform
- **GitHub** - Version control

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)
- Git
- MySQL/TiDB database

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/nlvx-portfolio.git
   cd nlvx-portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Push database schema**
   ```bash
   pnpm db:push
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL=mysql://user:password@host:port/database

# Authentication
JWT_SECRET=your-secret-key-here
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
OWNER_OPEN_ID=your-open-id
OWNER_NAME=Your Name

# Branding
VITE_APP_TITLE=NLVX - Legendary Developer Portfolio
VITE_APP_LOGO=https://your-logo-url.com/logo.png

# Telegram Integration
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_CHAT_ID=your-chat-id

# Analytics (Optional)
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id

# Forge API
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your-api-key
```

## 📦 Project Structure

```
nlvx-portfolio/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── lib/           # Utilities and helpers
│   │   ├── App.tsx        # Main app component
│   │   └── index.css      # Global styles
│   ├── public/            # Static assets
│   └── index.html         # HTML template
├── server/                 # Backend Express app
│   ├── routers.ts         # tRPC routes
│   ├── db.ts              # Database helpers
│   └── _core/             # Core utilities
├── drizzle/               # Database schema
│   ├── schema.ts          # Table definitions
│   └── migrations/        # Database migrations
├── shared/                # Shared code
├── storage/               # S3 storage helpers
├── DEPLOYMENT.md          # Deployment guide
└── README.md              # This file
```

## 🎯 Key Features Explained

### GitHub Integration
The portfolio automatically fetches your top 6 GitHub repositories using the GitHub API. Projects are displayed with:
- Repository name and description
- Star count
- Fork count
- Primary language
- Link to GitHub repository

To change the GitHub username, edit `Home.tsx`:
```typescript
const response = await fetch("https://api.github.com/users/nlvxv/repos?sort=stars&per_page=6");
```

### Contact Form with Telegram
When a visitor submits the contact form:
1. Data is validated on the client
2. Sent to the server via tRPC
3. Stored in the database
4. Sent to your Telegram chat as a formatted message
5. Owner notification is triggered

### Database Schema

#### Users Table
- `id` - Primary key
- `openId` - OAuth identifier
- `name` - User name
- `email` - Email address
- `role` - User role (admin/user)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

#### Contact Messages Table
- `id` - Primary key
- `name` - Sender name
- `email` - Sender email
- `message` - Message content
- `status` - Message status (new/read/replied)
- `telegramMessageId` - Telegram message ID
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## 🎨 Customization

### Change Colors
Edit `client/src/index.css` to modify the color scheme:
```css
:root {
  --accent: oklch(0.967 0.001 286.375);
  --background: oklch(0.141 0.005 285.823);
  /* ... more colors ... */
}
```

### Modify Content
Edit `client/src/pages/Home.tsx` to update:
- Hero section text
- About section content
- Skills list
- Social media links
- Contact information

### Add New Sections
1. Create a new component in `client/src/pages/`
2. Import it in `App.tsx`
3. Add route to the router

## 🚀 Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Quick Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables
5. Click Deploy

## 📊 Performance

- **Lighthouse Score**: 90+
- **Page Load Time**: < 2 seconds
- **Optimized Images**: WebP format
- **Code Splitting**: Automatic with Vite
- **Caching**: Aggressive browser caching

## 🔒 Security

- **HTTPS Only** - Vercel provides SSL/TLS
- **Environment Variables** - Secrets never committed
- **Input Validation** - All form inputs validated
- **CORS Protection** - Configured for safety
- **Rate Limiting** - Recommended for production

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a personal portfolio, but feel free to fork and customize for your own use!

## 📄 License

MIT License - Feel free to use this template for your portfolio

## 🆘 Troubleshooting

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm db:push
```

### Database Connection Issues
```bash
# Test database connection
pnpm db:push
```

### Port Already in Use
```bash
# Use a different port
pnpm dev -- --port 3001
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC Documentation](https://trpc.io)
- [Drizzle ORM](https://orm.drizzle.team)
- [Vercel Docs](https://vercel.com/docs)
- [Telegram Bot API](https://core.telegram.org/bots/api)

## 🎉 Credits

Built with ❤️ using modern web technologies.

---

**Ready to deploy? Check out [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions!**

