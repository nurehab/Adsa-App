# Adsa — Photography Blog

Adsa is a modern Arabic photography blog built with React and Vite. It provides photography articles, tips, and educational content through a responsive RTL interface.

The project focuses on component-based architecture, client-side routing, dynamic pages, search, filtering, pagination, and reusable React components.

## Live Demo

https://adsa-teal.vercel.app

## Features

* Responsive RTL design
* Dynamic blog articles
* Search by title, category, excerpt, and tags
* Category filtering
* Grid and list views
* Client-side pagination
* Dynamic article routes using slugs
* Article table of contents
* Related articles
* Social sharing
* Copy article link
* Responsive navigation
* Not Found page
* Local JSON data structure

## Tech Stack

* React 19
* Vite 8
* JavaScript
* React Router DOM
* Tailwind CSS 4
* Flowbite React
* Font Awesome
* React Paginate

## Routing

The application uses React Router with the following routes:

| Route         | Description  |
| ------------- | ------------ |
| `/`           | Home         |
| `/blog`       | Blog         |
| `/about`      | About        |
| `/blog/:slug` | Blog article |
| `*`           | Not Found    |

The application uses a shared `Layout` component for the Navbar, Footer, and page structure.

## Data

Blog content is currently stored in:

```text
src/data/posts.json
```

The same dataset is used across the Home, Blog, Article Details, Related Articles, Categories, and Authors sections.

Each article contains information such as:

```json
{
  "id": 1,
  "slug": "mastering-golden-hour-photography",
  "title": "إتقان تصوير الساعة الذهبية: دليل شامل",
  "excerpt": "...",
  "content": "...",
  "category": "إضاءة",
  "author": {},
  "image": "...",
  "date": "2026-01-15",
  "readTime": "8 دقائق للقراءة",
  "featured": true,
  "tags": []
}
```

## Project Structure

```text
Adsa/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Footer/
│   │   ├── Layout/
│   │   ├── Navbar/
│   │   └── Scroll/
│   ├── data/
│   │   └── posts.json
│   ├── pages/
│   │   ├── Home/
│   │   ├── Blog/
│   │   ├── About/
│   │   └── NotFound/
│   ├── Router/
│   │   └── Route.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

## React Concepts

The project uses:

* Functional components
* Props
* `useState`
* `useEffect`
* `useRef`
* `useParams`
* `useSearchParams`
* Conditional rendering
* List rendering
* Component composition
* Event handling

The Blog page uses React state to manage search, category filtering, pagination, and grid/list views.

## Getting Started

Clone the repository:

```bash
git clone https://github.com/nurehab/Adsa-App.git
```

Navigate to the project:

```bash
cd Adsa-App/Adsa
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Create production build  |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Current Status

The project currently uses local JSON data and does not have a backend API or database.

The newsletter section is currently frontend-only and is not connected to an external email service.

## Author

**Nour Ehab**

Frontend Developer focused on JavaScript and React.

GitHub: https://github.com/nurehab

LinkedIn: https://www.linkedin.com/in/nour-ehab-0887ab371/
