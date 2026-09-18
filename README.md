Travel Explorer - UI Challenge

A modern, responsive, and interactive travel discovery website built using Next.js 14+ (App Router), React 18, and Tailwind CSS. Users can explore destinations, filter by category and price, inspect location details, calculate estimated trip costs, and manage a custom saved wishlist.

🚀 Live Demo & Repository

Live Demo: [Demo Link](https://cw-proj.vercel.app/)

GitHub Repository: [GitHub Link](https://github.com/aryanmjn/cw-proj)

🛠️ Technology Stack

Framework: Next.js 14+ (App Router)

UI & Logic: React 18+ (Hooks: useState, useEffect, useMemo)

Language: JavaScript (ES6+)

Styling: Tailwind CSS 3+

Icons: Lucide React

Deployment: Vercel

✨ Features

1. Explore / Home Page (/)

Hero Section: Full-width modern banner with gradient overlay and real-time destination search.

Category Browsing: Clean grid showcasing 5 major travel categories (Beach, Mountains, Adventure, City, Culture) with dedicated Lucide icons.

Featured Destinations: Curated selection of top destinations with quick ratings and pricing.

Trending Trips: Smooth horizontal scroll section showcasing popular travel spots.

2. Destinations Catalog (/destinations)

Search & Filter: Real-time text search by destination or country name, paired with instant category filter chips.

Sorting Options: Sort results by Rating (Highest first), Price (Low to High / High to Low), or Name (A–Z).

Client-Side Pagination: Seamless page navigation configured for 6–12 destinations per page.

Interactive Feedback: Lift-on-hover card animations and direct links to individual destination pages.

3. Destination Details Page (/destinations/[id])

Detailed Layout: Rich destination media, tags, rating breakdown, and key trip highlights.

Read More / Read Less: Expandable description toggle for better mobile readability.

Dynamic Trip Cost Calculator: Incremental duration picker (days) that calculates live total estimated costs.

Save Trip Action: Wishlist button featuring simulated loading states and persistent local storage sync.

Related Destinations: Contextual grid suggesting similar places based on matching categories.

4. Navigation & Bonus Features

Responsive Navigation: Clean navbar with a mobile slideout drawer menu.

Persistent Wishlist: Built-in custom hook (useWishlist) synced with localStorage.

📁 Project Structure

travel-explorer/
├── app/
│   ├── layout.js              # Main App layout & metadata
│   ├── page.js                # Page 1: Explore / Home Page
│   ├── globals.css            # Global Tailwind directives
│   └── destinations/
│       ├── page.js            # Page 2: Destinations Catalog Page
│       └── [id]/
│           └── page.js        # Page 3: Destination Details Page
├── components/
│   ├── Navbar.js              # Header with responsive mobile drawer
│   ├── Footer.js              # Site footer
│   ├── DestinationCard.js     # Reusable destination card component
│   ├── SearchInput.js         # Interactive search input
│   ├── Button.js              # Reusable button with loading states
│   └── Badge.js               # Styled category badges
├── hooks/
│   ├── useDestinations.js     # Custom hook for filtering, sorting & pagination
│   └── useWishlist.js         # Custom hook for localStorage persistence
└── data/
    └── destinations.js        # Mock destination dataset


⚡ Getting Started Locally

Follow these steps to run the application on your local machine:

Prerequisites

Ensure you have Node.js 18+ installed on your system.

Installation

Clone the repository:

git clone https://github.com/aryanmjn/cw-proj.git
cd cw-proj


Install dependencies:

npm install


Run the development server:

npm run dev


View in browser:
Open http://localhost:3000 in your browser.

📐 Assumptions & Design Decisions

Client-side Interactivity: Search, filtering, pagination, and saved state are handled client-side for immediate visual response without unnecessary page reloads.

Local Storage Wishlist: Saved state uses localStorage to preserve user preferences across browser sessions without requiring back-end authentication.

Data Source: Destination images are sourced directly from high-resolution Unsplash URLs with explicit aspect ratios and fallbacks.

📝 License

This project was built for educational and evaluation purposes.