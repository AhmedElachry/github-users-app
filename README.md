GitHub Users Browser — Hiring Challenge (Q3 2025)

This project is a simple web application built as part of a Frontend Engineer Hiring Challenge (Q3 2025).
It fetches and displays paginated lists of GitHub users using GitHub’s public API, supports search within the fetched data, and provides a route for a Favorites page.

**Features Implemented**

Fetch & Display Users — Using GitHub’s REST API (https://api.github.com/users).

Infinite Scroll — Users are loaded automatically as the user scrolls down the page, replacing manual pagination for a seamless experience.

Search Functionality — Debounced client-side search within the fetched page.

Favorites System — Add/remove users to a favorites list that persists across page reloads using Zustand and localStorage.

UI Feedback — Non-intrusive toast notifications (via Sonner) confirm when users are added or removed from favorites.

Routing — Implemented with React Router v7+ (/ for Home, /favorites ).

Responsive UI — Styled with Tailwind CSS.

Environment Variable Support — Optional GitHub token via .env file to increase rate limits.

Dark Mode — Toggle between light and dark themes with the user's preference saved in localStorage.

Enhanced Loading States — Skeleton loaders are displayed while fetching new users to improve perceived performance and visual continuity.

Improved Error Handling — Clear, user-friendly error messages are now shown for API or network failures.

**Tech Stack**

React 19

TypeScript

Vite

React Router DOM

Zustand (for global state management)

Sonner (for toast notifications)

Tailwind CSS

Bun / NPM / PNPM / Yarn (any can be used)

Fetch API for network requests

**Environment Variables**

This project supports an optional environment variable to increase the GitHub API rate limit.
By default, unauthenticated requests to the GitHub API are limited to 60 requests per hour.
If you add a personal access token, you can raise this limit to 5,000 requests per hour.

How to use it

[1] Create a new file named .env in the project root.

[2] Copy the contents of .env.example into it.

[3] Replace your_github_token_here with your actual token.

If no token is provided, the app will continue to work but may hit the rate limit after multiple API requests.

**Installation & Setup**

1. Clone the repository

git clone https://github.com/AhmedElachry/github-users-app

cd github-users-app

2. Install dependencies

You can use any package manager you prefer:

# using bun

bun install

# or npm

npm install

# or pnpm

pnpm install

# or yarn

yarn install

3. Create .env file (optional but recommended)

GitHub’s public API has a rate limit of 60 requests per hour for unauthenticated requests.
To avoid hitting this limit, create a .env file in the project root and include a personal access token:

VITE_GITHUB_TOKEN=your_personal_github_token

You can create a token here:
[ Generate a new GitHub Personal Access Token](https://github.com/settings/tokens)

4. Run the development server
   bun dev

# or npm run dev / pnpm dev / yarn dev

5. Build for production
   bun run build

# or npm run build / pnpm build / yarn build

6. Preview production build
   bun run preview

# or npm run preview / pnpm preview / yarn preview

**Project Structure**

src/  
├── api/  
│ └── githubUsers.ts # Fetch logic  
├── hooks/  
│ ├── useUsers.ts # Custom hook for fetching users with basic error handling  
│ └── usedarkMode.ts # Custom hook for toggling theme with local storage persistance  
├── pages/  
│ ├── HomePage.tsx # Paginated users + search  
│ └── FavoritesPage.tsx # Placeholder (future feature)  
├── components/  
│ ├── UserCard.tsx  
│ ├── UserSkeleton.tsx   # skeleton loader
│ ├── NavBar.tsx         # Active route highlighting  
│ ├── searchBar.tsx  
│ ├── ToggleDarkMode.tsx  
│ ├── UserList.tsx  
│ └── PaginationControls.tsx # this file is useless now but i left it for reviewing purpose  
├── store/  
│ └── favoritesStore.ts # Zustand store for managing favorites with persist
├── App.tsx # Routing and navigation  
└── main.tsx

**Technical Notes**

_Infinite Scroll_

The application now uses an infinite scroll mechanism to load more users. This is implemented using the Intersection Observer API to detect when the user has scrolled to the bottom of the list, providing a more seamless browsing experience than traditional pagination.

_Loading & Error Handling_

Skeleton Loaders: While data is being fetched, placeholder cards are displayed for a smoother loading experience.

Refined Error Messages: showing clear, actionable messages instead of generic ones.

_Search_

The search feature is client-side only and filters users within the currently fetched page.
A debounce mechanism prevents unnecessary re-renders while typing.

_Favorites_

The favorites feature is managed globally using Zustand. User data is persisted in localStorage via Zustand's persist middleware, ensuring the list is saved across page reloads. The /favorites route reads from this store to display saved users.

_Dark Mode_

The application supports both light and dark themes. The implementation uses Tailwind CSS’s built-in dark variant and saves the user's preference to localStorage to ensure persistence across sessions.

Toast Notifications

The app uses Sonner to provide non-intrusive toast notifications. This gives the user immediate feedback when they add or remove a user from their favorites, improving the overall user experience.

**Known Issues & Future Improvements**

Expand error handling to show retry options or fallbacks for API rate limits.

**Backlog / Next Steps**

Add Jest unit tests for hooks and components.

**Technical Rationale**

React 19 and Vite were chosen for their modern, fast developer experience.

TypeScript ensures type safety and easier maintenance.

Fetch API was used instead of Axios to keep dependencies minimal.

Tailwind CSS allows quick, responsive UI development and built-in dark mode support.

Zustand was chosen for state management due to its simplicity, minimal boilerplate, and powerful persist middleware for handling localStorage.

React Router v7+ provides a clean routing structure for SPA navigation.

Debounced search improves UX without unnecessary re-renders.

Sonner was selected for toast notifications due to its clean design, ease of use, and lightweight nature.

Intersection Observer for efficient infinite scrolling.

**Code Review Notes**

Error handling is minimal and should be expanded to differentiate between rate limits, 404s, and network issues.

The migration to infinite scroll using the Intersection Observer API is a significant UX improvement over manual pagination and is implemented cleanly within the useUsers hook. it fixxed activly changed data on each page with pagination aproach beacouse reling on users IDs due to deleted users from DB.

The code structure is modular and maintainable — api/, hooks/, and pages/ separation is clear.

Future iterations should extract UI feedback (loading/error) into dedicated components.

Overall, the foundation is clean and extendable for the next iteration.

**Requirements**

Node.js ≥ 20

Package manager: Bun / npm / pnpm / yarn

Environment: Works on any OS with a modern browser

**Boilerplate Notes**

The original Vite React TypeScript template notes have been moved to
docs/boilerplate-template-notes.md for reference.
