# Todo App

A modern, full-stack todo application built with Next.js 15, featuring authentication, pagination, and real-time updates.

## Features

- ✅ User authentication (Email + Google OAuth)
- ✅ Create, read, update, delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Filter todos (All, Active, Completed)
- ✅ Pagination (8 items per page)
- ✅ Real-time statistics (Total, Active, Completed)
- ✅ Responsive design (Mobile-first)
- ✅ Toast notifications
- ✅ Loading states with transitions

## Tech Stack

**Frontend:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- React Hot Toast

**Backend:**
- Next.js Server Actions
- MongoDB
- NextAuth.js (Authentication)

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Google OAuth credentials (optional)

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd todo-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
AUTH_SECRET=your_secret_key_here
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
```

To generate `AUTH_SECRET`:
```bash
openssl rand -base64 32
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
todo-app/
├── app/
│   ├── actions/          # Server actions
│   ├── api/              # API routes
│   ├── auth/             # Auth pages
│   └── types.ts          # TypeScript types
├── components/
│   ├── Todo.tsx          # Main todo component
│   ├── TodoList.tsx      # Todo list with items
│   ├── Form.tsx          # Add todo form
│   ├── Pagination.tsx    # Pagination component
│   └── ...
├── lib/
│   ├── mongodb.ts        # MongoDB connection
│   └── types.ts          # Shared types
└── auth.ts               # NextAuth configuration
```

## Features in Detail

### Authentication
- Email/password authentication
- Google OAuth integration
- Protected routes
- Session management

### Todo Management
- Add todos with title and description
- Mark as complete/incomplete
- Delete todos
- Filter by status
- Paginated list view

### UI/UX
- Responsive design (mobile, tablet, desktop)
- Loading states with React transitions
- Toast notifications for actions
- Empty states
- Smooth animations

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `AUTH_SECRET` | Secret for JWT tokens | Yes |
| `AUTH_GOOGLE_ID` | Google OAuth client ID | No |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret | No |
| `NEXTAUTH_URL` | Application URL | Yes |

## License

MIT

## Author

Bibek Amatya
