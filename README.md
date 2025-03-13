# Fetch Finder

A Next.js application for finding and managing dog adoptions.

## Tech Stack

- Next.js 15
- TypeScript
- TailwindCSS
- RadixUI
- js-cookie for auth persistence
- Server-side authentication middleware

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/Myles-J/fetch-finder.git
cd fetch-finder
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Project Structure

```
src/
  ├── lib/
  │   ├── auth.tsx    # Authentication context and hooks
  │   └── api.ts      # API client functions
  ├── middleware.ts   # Auth route protection
  └── app/           # Next.js app router pages
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run format-and-lint` - Format and lint with Biomejs
- `npm run format-and-lint:fix` - Format, lint, and apply safe changes with Biomejs
