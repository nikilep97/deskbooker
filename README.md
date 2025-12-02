# DeskBooker

**DeskBooker** is a full-stack room and resource booking application built with **Next.js 15**. It solves the common problem of resource management in coworking spaces by providing a real-time, conflict-free booking system.

![DeskBooker Screenshot](./public/varaus.png)

## Built With

This project leverages the latest web technologies to ensure performance, type safety, and a great user experience.

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router & Server Actions)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (hosted on Neon/Supabase)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
- **Validation:** [Zod](https://zod.dev/)

## Key Features

### Collision Detection (No Double Bookings)
The core logic of the application prevents users from booking the same resource at overlapping times. This is handled server-side within a transaction to prevent race conditions.

### Server Actions
Uses Next.js Server Actions to handle form submissions and data mutations directly from the server, reducing the need for a separate API layer and client-side JavaScript.

### Admin Dashboard
A comprehensive dashboard for administrators to view all bookings with relational data (User + Resource details) and manage cancellations.

### Modern UI/UX
- **Responsive Design:** Fully responsive layout using Tailwind CSS Grid and Flexbox.
- **Feedback:** Instant user feedback using Toast notifications (Sonner) for success and error states.
- **Type Safety:** Full TypeScript integration from the database schema to the frontend components.

## Database Schema

The data model relies on relational integrity between Users, Resources, and Bookings.

prisma
model User {
  id       String    @id @default(cuid())
  bookings Booking[]
}

model Resource {
  id       String    @id @default(cuid())
  bookings Booking[]
}

model Booking {
  id         String   @id @default(cuid())
  startTime  DateTime
  endTime    DateTime
  userId     String
  resourceId String
  // Relations defined here...
}

## Getting Started

1. Clone the repository

    git clone [https://github.com/nikilep97/deskbooker.git]
    cd deskbooker

2. Install dependencies

    npm install

3. Configure Enviromental Variable (Create a .env file in the root directory):

    DATABASE_URL="postgresql://user:password@localhost:5432/deskbooker"

4. Setup Databse

    npx prisma migrate dev --name init
    npx prisma db seed

5. Run the development server

    npm run dev

## Contact

Niki Leppänen - LinkedIn: www.linkedin.com/in/niki-leppänen
GitHub: nikilep97
