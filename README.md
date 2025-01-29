# Subscription-Based Photography SAAS Platform 📷 | https://stripe-photography-subscription.vercel.app/
## Description
This subscription-based photography SaaS platform is built with Next.js, React, Stripe, and Supabase to manage user authentication, subscriptions, and payments. Users must purchase a subscription plan to access a curated library of images, all captured from scenes I experienced during my study abroad in Greece, Italy, the Netherlands, Hungary, Austria, and more. Stripe Checkout and Payment Intents handle secure transactions, allowing users to subscribe, manage, and cancel their plans anytime. Supabase stores user data and subscription statuses, while Next.js API routes process Stripe webhooks to update subscriptions in real-time. The platform leverages Toast notifications to provide real-time feedback for successful payments, subscription updates, and errors. It is deployed on Vercel, utilizing serverless functions for seamless payment processing and account management.

### Note
Stripe offers test cards that are compatable with this project that you can use if you do not want to enter your actual info. Here is the information of a test card:
<p align="center">
  Visa: 4242 4242 4242 4242
</p>
<p align="center">
   CVC: Any 3 digits
</p>
<p align="center">
   Expiration Date: Any future date
</p>

## Pictures
<div align="center">
  <img src="homePage.png" width="666" height="383">
</div>
<p align="center">
  Above is an example home page.
</p>
<div align="center">
  <img src="photosPage.png" width="666" height="383">
</div>
<p align="center">
  Above is an example photos page.
</p>
<div align="center">
  <img src="paymentPage.png" width="666" height="383">
</div>
<p align="center">
  Above is an example payment page for the subscription.
</p>
<div align="center">
  <img src="userAuthPage.png" width="666" height="383">
</div>
<p align="center">
  Above is an example user information page.
</p>

## Tech Stack
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- Stripe API (https://stripe.com/docs/api)
