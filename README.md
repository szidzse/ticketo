# Ticketo - Real-time Ticket Marketplace

# Description

Ticketo is a real-time event ticketing platform where users can advertise events and buy tickets for events.
It was built with Next.js, Typescript, Convex Backend-as-a-Service, Clerk Authentication, TailwindCSS, shadcn/ui and Stripe Connect.

# Used Technologies

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

![Convex](https://img.shields.io/badge/Convex-FF6B6B?style=for-the-badge&logo=convex&logoColor=white)  

![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  

![Clerk](https://img.shields.io/badge/Clerk-3E65FF?style=for-the-badge&logo=clerk&logoColor=white)  

![ShadCN](https://img.shields.io/badge/ShadCN-000000?style=for-the-badge&logo=shadcn&logoColor=white)  

![Stripe](https://img.shields.io/badge/Stripe-6772E5?style=for-the-badge&logo=stripe&logoColor=white)

# Demo Images

# Technical Features

- Real-time updates using Convex Backend-as-a-Service
- Authentication with Clerk
- Payment processing with Stripe Connect
- Server-side and client-side rendering
- Modern and responsive UI with Tailwind CSS and shadcn/ui
- Rate limiting for queue joins and purchases
- Automated fraud prevention
- Toast notifications for real-time feedback

# Features For Event Participants

- Real-time ticket availability tracking
- Smart queuing system with position updates
- Time-limited ticket offers
- Mobile-friendly ticket management
- Secure payment processing with Stripe
- Digital tickets with QR codes
- Automatic refunds for cancelled events

#  Features For Event Organizers

- Direct payments via Stripe Connect
- Real-time sales monitoring
- Automated queue management
- Event analytics and tracking
- Customizable ticket limits
- Event cancellation with automatic refunds


# UI/UX Features

- Instant feedback with toast notifications
- Consistent design system using shadcn/ui
- Fully accessible components
- Animated transitions and feedback
- Responsive design across all devices
- Loading states and animations

- - -

# Getting Started

## Prerequisites

- "node.js" installed, at least version 18 or newer
- "npm" installed
- Convex account (You can register here: https://www.convex.dev/)
- Clerk account (You can register here: https://clerk.com/)
- Stripe account (You can register here: https://stripe.com/)

## Environment variables

Create an .env.local file with the following key-value pairs: 

    NEXT_PUBLIC_CONVEX_URL=your_convex_url
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
    CLERK_SECRET_KEY=your_clerk_secret
    STRIPE_SECRET_KEY=your_stripe_secret
    STRIPE_WEBHOOK_SECRET=your_webhook_secret
    NEXT_PUBLIC_APP_URL=http://localhost:3000

## Installation

    # Clone the repository
    git clone git@github.com:szidzse/ticketo.git

    # Install dependencies
    npm install

    # Start the development server
    npm run dev

    # In a separate terminal, start Convex
    npx convex dev

## Setting up Convex

1. Create a Convex account if you haven't already
2. Create a new project in the Convex Dashboard
3. Install the Convex CLI:
    >npm install convex
4. Initialize Convex in your project:
    >npx convex init
5. Copy your deployment URL from the Convex dashboard and add it to your .env.local:
    >NEXT_PUBLIC_CONVEX_URL=your_deployment_url
6. Start the Convex development server:
    >npx convex dev

#### Keep the Convex development server running while working on your project. It will sync your backend functions and database schema automatically.

## Setting up Clerk

1. Create a Clerk account if you haven't already
2. Create a Clerk application in the Clerk Dashboard
3. Configure authentication providers
4. Set up redirect URLs
5. Add environment variables

## Setting up Stripe

1. Create a Stripe account if you haven't already
2. Enable Stripe Connect 
3. Set up webhook endpoints
4. Configure payment settings

## Setting up Stripe webhooks for local development

Installing the Stripe CLI is useful because it facilitates the testing of Stripe integration and the development process. One of the main features of the Stripe CLI is that it helps you to receive webhook events in the local development environment.

1. Install the Stripe CLI and login. You can read the instructions here:
    >https://docs.stripe.com/stripe-cli
2. Start webhook forwarding:
    >stripe listen --forward-to localhost:3000/api/webhooks/stripe
3. Copy the webhook signing secret that is displayed after running the listen command and add it to your .env.local:
    >STRIPE_WEBHOOK_SECRET=your_webhook_signing_secret

#### Make sure your webhook endpoint (/api/webhooks/stripe) is properly configured to handle incoming webhook events.

# Docker

In progress...