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

### Main Page 
![ticketo-home-page](https://github.com/user-attachments/assets/320cfa19-e7a6-436c-819a-5e3031aa7fed)

### Event Card
![ticketo-event-card](https://github.com/user-attachments/assets/5d85cb6b-4dd1-4bc3-aea1-f1a2a09ef324)

### Event Card with Offer
![ticketo-event-offer](https://github.com/user-attachments/assets/e12db0f4-efc0-4cd8-8ea2-3cbd5183af4f)

### Ticket Purchase
![ticketo-ticket-purchase2](https://github.com/user-attachments/assets/e7008032-3099-406c-ab70-34e1d98f78c4)

### My Tickets
![ticketo-my-tickets](https://github.com/user-attachments/assets/24c2599a-4393-4846-9665-5f8a5de935eb)

### My Events
![ticketo-my-events](https://github.com/user-attachments/assets/474c4e1c-be21-44d2-9ab6-1df576d993cb)

### Event Create and Edit
![ticketo-create-event](https://github.com/user-attachments/assets/cfe25950-1c6e-431d-a07f-f74a03165fa6)
![ticketo-edit-event](https://github.com/user-attachments/assets/34acd883-33bd-431a-bcaf-124923ed0783)

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
    
5. Initialize Convex in your project:
   
    >npx convex init
    
6. Copy your deployment URL from the Convex dashboard and add it to your .env.local:
   
    >NEXT_PUBLIC_CONVEX_URL=your_deployment_url
    
7. Start the Convex development server:
   
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
    
3. Start webhook forwarding:
   
    >stripe listen --forward-to localhost:3000/api/webhooks/stripe
    
5. Copy the webhook signing secret that is displayed after running the listen command and add it to your .env.local:
   
    >STRIPE_WEBHOOK_SECRET=your_webhook_signing_secret

#### Make sure your webhook endpoint (/api/webhooks/stripe) is properly configured to handle incoming webhook events.

# Docker

In progress...
