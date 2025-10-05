GitHub Users Browser — Hiring Challenge (Q3 2025)

This project is a simple web application built as part of a Frontend Engineer Hiring Challenge (Q3 2025).
It fetches and displays paginated lists of GitHub users using GitHub’s public API, supports search within the fetched data, and provides a route for a Favorites page.

 **Features Implemented**

Fetch & Display Users — Using GitHub’s REST API (https://api.github.com/users).

Pagination Controls — Next / Previous buttons using the since parameter.

Search Functionality — Debounced client-side search within the fetched page.

Routing — Implemented with React Router v7+ (/ for Home, /favorites ).

Responsive UI — Styled with Tailwind CSS.

Environment Variable Support — Optional GitHub token via .env file to increase rate limits.

 **Tech Stack**

React 19

TypeScript

Vite

React Router DOM

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
│ └── useUsers.ts # Custom hook for fetching users with basic error handling  
├── pages/  
│ ├── HomePage.tsx # Paginated users + search  
│ └── FavoritesPage.tsx # Placeholder (future feature)  
├── components/  
│ ├── UserCard.tsx  
│ └── PaginationControls.tsx  
├── App.tsx # Routing and navigation  
└── main.tsx  

 **Technical Notes**  
*Pagination*

Pagination uses GitHub’s since parameter.
This is a cursor-like pagination that relies on user IDs, not traditional page numbers.
This approach can cause inconsistencies if GitHub data changes or if users are deleted between requests.

*Search*

The search feature is client-side only and filters users within the currently fetched page.
A debounce mechanism prevents unnecessary re-renders while typing.

*Favorites*

A /favorites route is already set up but not yet implemented.
The logic for managing and persisting favorites will be added later using Context or Zustand.

 **Known Issues & Future Improvements**
Area Status Notes
Pagination Works, but relies on user IDs (since param) Can lead to inconsistent results when moving back/forth
Search Functional (debounced) Currently local to fetched data only
Error Handling Minimal Needs more robust handling for GitHub API errors
Favorites Placeholder only To be implemented
Dark Mode Not implemented yet Will be added later if time allows

 **Backlog / Next Steps**

Implement Favorites state management with Context or Zustand.

Improve error handling with toasts and better UI states.

Add Dark Mode toggle using Tailwind’s theme utilities.

Replace ID-based pagination with a cursor-based or infinite scroll strategy.

Add Jest unit tests for hooks and components.

Review accessibility and keyboard navigation.

 **Technical Rationale**

React 19 and Vite were chosen for their modern, fast developer experience.

TypeScript ensures type safety and easier maintenance.

Fetch API was used instead of Axios to keep dependencies minimal.

Tailwind CSS allows quick, responsive UI development.

React Router v7+ provides a clean routing structure for SPA navigation.

Debounced search improves UX without unnecessary re-renders.

 **Code Review Notes**

Error handling is minimal and should be expanded to differentiate between rate limits, 404s, and network issues.

The pagination approach works but is not ideal for stable back/forward navigation (known GitHub API limitation).

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