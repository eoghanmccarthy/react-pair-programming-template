# MLOps Platform - Dataset Manager

## 🎯 Pair Programming Exercise

Welcome! This is a **pair programming exercise** designed to simulate building features for an MLOps platform where users manage image datasets for machine learning projects.

### What's Already Built 📦

We've pre-built a working **Image Dataset Manager** with these features:

✅ **File Upload System**
- Drag & drop image upload
- File selection via button
- Image type validation
- Visual feedback during upload

✅ **Image Gallery**
- Responsive grid layout  
- Thumbnail previews
- Image removal functionality

✅ **Metadata Management**
- Add tags to images
- Categorize images
- Edit metadata inline
- Dataset statistics overview

### Your Task 🚀

**Goal**: Enhance the dataset manager with search and filtering capabilities

**Time**: ~45-60 minutes

**Focus Areas**:
1. **Search Functionality** - Allow users to find images by filename or tags
2. **Category Filtering** - Quick filters for different categories
3. **UI/UX Improvements** - Make the interface more intuitive
4. **Bonus Features** - Export capabilities, advanced filters, etc.

### 💡 Suggested Implementation Steps

**Step 1: Basic Search (15-20 min)**
- Add a search input field
- Filter images by filename
- Show/hide images based on search query
- Add "clear search" functionality

**Step 2: Tag Search (10-15 min)**  
- Extend search to include tags
- Handle multiple search terms
- Case-insensitive matching

**Step 3: Category Filters (10-15 min)**
- Add category filter buttons
- Show available categories dynamically
- Allow "All Categories" option

**Step 4: Polish & Bonus (10-15 min)**
- Improve search UX (debouncing, highlighting)
- Add export functionality
- Show search/filter counts
- Empty states for no results

### 🛠 Technical Notes

- **Framework**: React Router v7 with TypeScript
- **Styling**: TailwindCSS (already configured)
- **State**: React hooks (useState, useCallback, useEffect)
- **File**: Main component is at `app/routes/dataset.tsx`
- **TODO Section**: Look for the yellow highlighted TODO area in the UI

### 🎨 Design Principles

- **MLOps Context**: Think about data scientists managing training datasets
- **Usability**: Large datasets need efficient filtering
- **Performance**: Consider search debouncing for better UX
- **Accessibility**: Proper labels and keyboard navigation

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

## 📋 For Interviewers

### What to Look For
- **Problem-solving approach**: How do they break down the task?
- **React patterns**: Proper use of hooks, state management
- **Code quality**: TypeScript usage, component structure, naming
- **User experience**: Intuitive interfaces, edge cases, loading states
- **MLOps understanding**: Do they consider dataset management workflows?

### Discussion Topics
- Performance considerations for large datasets
- Accessibility improvements
- Testing strategies
- Real-world MLOps challenges
- Scaling the architecture

Built with ❤️ using React Router.
