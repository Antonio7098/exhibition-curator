# Exhibition Curator

A web application for browsing and curating virtual exhibitions from museum collections.

## Features

- **Browse Artworks**: Search and filter artworks from multiple museum APIs
- **Create Exhibitions**: Select artworks to add to your personal exhibition
- **Sort & Filter**: Sort results by relevance, date, or title
- **Responsive Design**: Works on desktop and mobile devices
- **Accessible**: Keyboard navigation, ARIA labels, and screen reader support
- **Authentication**: User accounts via Supabase

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Authentication**: Supabase Auth
- **Museum APIs**: Art Institute of Chicago, Cleveland Museum of Art

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Antonio7098/exhibition-curator.git
cd exhibition-curator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
HARVARD_API_KEY=your-harvard-api-key (optional)
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Authentication > Providers** and enable Email authentication
3. Copy your project URL and anon key to `.env`
4. Run the app and sign up for an account

## Museum APIs

The application uses two free, open-access museum APIs:

### Art Institute of Chicago
- **API**: https://api.artic.edu/docs/
- **Status**: No API key required
- **Collection**: 150,000+ artworks

### Cleveland Museum of Art
- **API**: https://openaccess-api.clevelandart.org/
- **Status**: No API key required
- **Collection**: 68,000+ artworks

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/      # Protected dashboard routes
│   │   ├── artworks/     # Browse and search artworks
│   │   ├── exhibitions/  # View curated exhibitions
│   │   └── page.tsx      # Dashboard home
│   ├── login/            # Authentication page
│   └── layout.tsx        # Root layout
├── components/
│   ├── artwork-card.tsx  # Artwork display card
│   ├── artwork-detail.tsx # Artwork detail modal
│   ├── exhibition-grid.tsx # Exhibition management
│   ├── header/           # App header
│   └── sidebar/          # Navigation sidebar
└── lib/
    ├── auth-context.tsx  # Authentication context
    ├── museums/          # Museum API integrations
    └── store.ts          # Zustand state store
```

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Docker

```bash
docker build -t exhibition-curator .
docker run -p 3000:3000 exhibition-curator
```

## Accessibility

This application follows WCAG 2.1 guidelines:

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Readers**: Proper ARIA labels and roles
- **Focus Management**: Visible focus indicators
- **Skip Links**: Skip to main content link for keyboard users
- **Color Contrast**: Meets minimum contrast ratios

## License

MIT

## Acknowledgments

- [Art Institute of Chicago API](https://api.artic.edu/docs/)
- [Cleveland Museum of Art Open Access API](https://openaccess-api.clevelandart.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
