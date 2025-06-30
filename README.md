<!-- README_START -->
# Netflix Clone

A modern streaming platform inspired by Netflix, built with Next.js and powered by Cosmic CMS. Features movies with YouTube trailers, genre categorization, and user reviews. Built using your existing content structure with movies, genres, and reviews.

![Netflix Clone Banner](https://imgix.cosmicjs.com/b427f2e0-55f9-11f0-a051-23c10f41277a-photo-1446776653964-20c1d3a81b06-1751319139014.jpg?w=1200&h=400&fit=crop&auto=format,compress)

## ✨ Features

- **🎬 Movie Catalog** - Browse movies with trailers, ratings, and detailed information
- **🎭 Genre Filtering** - Filter movies by genre with color-coded categories
- **⭐ User Reviews** - Read and display user reviews with star ratings
- **🎥 YouTube Integration** - Watch movie trailers directly embedded
- **📱 Responsive Design** - Optimized for all devices
- **🎨 Netflix-style UI** - Dark theme with modern streaming platform design
- **🔍 Featured Content** - Highlight featured movies and content
- **✅ Verified Reviews** - Display verified purchase indicators

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=netflix-clone-production)

## Prompts

This application was built using the following prompts to understand your content structure and generate the code:

### Content Model Prompt

> "Create a Netflix clone with videos from YouTube, categories, and reviews"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. Set apiEnvironment: "staging" in cosmic config

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for content management
- **Lucide React** - Beautiful icons
- **Inter Font** - Modern typography

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with the cloned bucket

### Installation

1. **Clone and install dependencies:**
```bash
git clone <your-repo>
cd netflix-clone
bun install
```

2. **Set up environment variables:**
```bash
cp .env.example .env.local
```

3. **Add your Cosmic credentials to `.env.local`:**
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. **Run the development server:**
```bash
bun dev
```

5. **Open your browser:**
Navigate to `http://localhost:3000`

## 📖 Cosmic SDK Examples

### Fetching Movies with Genre Information
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all movies with their genre relationships
const movies = await cosmic.objects
  .find({ type: 'movies' })
  .depth(1) // Include genre data
  .props(['id', 'title', 'slug', 'metadata'])

// Get featured movies only
const featuredMovies = await cosmic.objects
  .find({ 
    type: 'movies',
    'metadata.featured': true 
  })
  .depth(1)
```

### Fetching Reviews for a Specific Movie
```typescript
// Get reviews for a specific movie
const movieReviews = await cosmic.objects
  .find({ 
    type: 'reviews',
    'metadata.movie': movieId // Query by movie ID
  })
  .depth(1) // Include movie data in reviews
```

### Fetching Movies by Genre
```typescript
// Get movies in a specific genre
const sciFiMovies = await cosmic.objects
  .find({ 
    type: 'movies',
    'metadata.genre': genreId // Query by genre ID
  })
  .depth(1)
```

## 🎨 Cosmic CMS Integration

This application integrates with your Cosmic bucket structure:

### Content Types
- **Movies** (`movies`) - Movie information with trailers, ratings, and genres
- **Genres** (`genres`) - Movie categories with colors and descriptions  
- **Reviews** (`reviews`) - User reviews with ratings and verification status

### Key Features
- **Object Relationships** - Movies connected to genres, reviews connected to movies
- **File Management** - Poster images with imgix optimization
- **Select Dropdowns** - Movie ratings (G, PG, PG-13, R, NC-17) and review ratings (1-5 stars)
- **Rich Content** - YouTube URL integration for trailers
- **Boolean Fields** - Featured movies and verified purchases

### Environment Configuration
The app is configured to use Cosmic's staging environment as requested:
```typescript
apiEnvironment: "staging"
```

## 🚀 Deployment Options

### Vercel (Recommended for Next.js)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Environment Variables for Production
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

For more deployment options, check the [Next.js deployment documentation](https://nextjs.org/docs/deployment).
<!-- README_END -->