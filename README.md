# Portfolio - Andri | Full Stack Developer

A modern, responsive portfolio website built with Next.js 14, featuring glassmorphism design, smooth animations, and a functional contact form API.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

## Features

- **Modern Design**: Dark theme with glassmorphism effects and gradient accents
- **Fully Responsive**: Mobile-first approach, works on all devices
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Contact Form API**: Functional API with validation and rate limiting
- **SEO Optimized**: Meta tags, Open Graph, structured data
- **Accessible**: WCAG compliant, keyboard navigation, screen reader friendly
- **Type Safe**: Full TypeScript implementation
- **Clean Architecture**: Organized folder structure following best practices

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations and transitions
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Zod** - Runtime validation
- **Rate Limiting** - Protection against spam

### Form Handling
- **React Hook Form** - Performant forms
- **@hookform/resolvers** - Zod integration

## Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   │   └── contact/       # Contact form endpoint
│   │   ├── globals.css        # Global styles & design system
│   │   ├── layout.tsx         # Root layout with metadata
│   │   └── page.tsx           # Home page
│   │
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   ├── sections/          # Hero, About, Skills, Projects, Contact
│   │   └── ui/                # Reusable UI components
│   │
│   ├── data/                  # Static data (skills, projects)
│   ├── lib/                   # Utilities and helpers
│   └── types/                 # TypeScript type definitions
│
├── public/                    # Static assets
└── README.md                 # This file
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy!

That's it! No environment variables required for basic functionality.

## API Endpoints

### POST /api/contact

Submit a contact message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully!",
  "data": {
    "id": "msg_..."
  }
}
```

**Features:**
- Input validation with Zod
- Rate limiting (5 requests per minute per IP)
- Proper error handling

### GET /api/contact

Health check endpoint.

## Customization

### Personal Information
- Edit `src/components/sections/Hero.tsx` - Name and tagline
- Edit `src/components/sections/About.tsx` - Bio and highlights
- Edit `src/components/layout/Footer.tsx` - Social links
- Edit `src/app/layout.tsx` - SEO metadata

### Skills
- Edit `src/data/skills.ts` - Add/remove/modify skills

### Projects
- Edit `src/data/projects.ts` - Add your real projects

### Design
- Edit `src/app/globals.css` - Colors, typography, effects

## Adding Database (Optional)

To persist contact form messages, you can add a database:

1. **Install Prisma**
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

2. **Configure your database** (e.g., Supabase, PlanetScale)

3. **Update the API route** to use Prisma instead of in-memory storage

## Performance

- Lighthouse Score: 90+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s

## Contributing

This is a personal portfolio, but feel free to fork and customize for your own use!

## License

MIT License - feel free to use this as a template for your own portfolio.

---

Built with Next.js, TypeScript, and passion.
