# TastyTales Platform

# **Note:**
`I have not developed strong UI design sensibilities, but I am proficient in creating pixel-perfect designs based on Figma UI designs. Therefore, please disregard any shortcomings in the UI layout of this project as my primary focus has been on implementing core functionality.`

## Overview

Welcome to the TastyTales This application allows users to explore and share recipes while earning and spending virtual coins. Built with React.js for the front-end, MongoDB and Express.js for the back-end, and Firebase for authentication, this platform offers a seamless and engaging experience for food enthusiasts.

## Features

### Redux-Toolkit State Management
This application utilizes Redux for state management, providing a predictable and centralized way to manage application state. Redux helps in maintaining a consistent state across components, simplifying complex data flow and interactions.

To understand more about Redux and how it's implemented in this project, refer to the Redux [documentation](https://redux-toolkit.js.org/) and the codebase.

### User Authentication
- **Google Authentication**: Users can register and log in using their Google accounts.
- **Default Coins**: New users receive 50 coins upon registration.

### Recipe Management
- **View Recipes**: Users can browse all available recipes.
- **Recipe Details**: View detailed information about a recipe by spending 10 coins.
- **Add Recipes**: Logged-in users can add new recipes, including images and embedded YouTube videos, and earn 1 coin for each view of their recipe.

### Coin Management
- **Purchase Coins**: Users can buy additional coins in packages of 100, 500, or 1000 using real currency.
- **Coin Transactions**: Spend coins to view recipes and earn coins from views of your recipes.

### Navigation and Layout
- **Navbar**: Includes website name/logo, home, recipes, add recipes (after login), coin balance with user image, and logout.
- **Footer**: Contains developer information and links to social profiles.
- **Homepage**: Features an attractive banner, success stories, and developer info.

### Recipe Interactions
- **View Conditions**: Access to recipe details is conditional based on login status and coin balance.
- **Reaction System**: Logged-in users can react to recipes.

### Search and Filtering
- **Search**: Search for recipes by title.
- **Filter**: Filter recipes by category and country.
- **Infinite Scrolling**: Browse recipes with infinite scrolling on the all recipes page.

### Additional Features
- **Secure API**: All API endpoints are secured with JWT tokens.
- **Suggestions**: On the recipe detail page, view suggestions for other recipes in the same category or from the same country.

# Setting Up Environment Variables

This project relies on certain environment variables for configuration. You need to set these up before running the application. Below are the required environment variables:

## Firebase Configuration
```yaml
VITE_FIREBASE_API_KEY: Your Firebase API key.
VITE_FIREBASE_AUTH_DOMAIN: Your Firebase authentication domain.
VITE_FIREBASE_PROJECT_ID: Your Firebase project ID.
VITE_FIREBASE_STORAGE_BUCKET: Your Firebase storage bucket.
VITE_FIREBASE_MESSAGING_SENDER_ID: Your Firebase messaging sender ID.
VITE_FIREBASE_APP_ID: Your Firebase app ID.
VITE_FIREBASE_MEASUREMENT_ID: Your Firebase measurement ID.
```

## Other Configurations
```yaml
VITE_BASE_PATH: The base path of your application.
VITE_STRIPE_PK: Your Stripe public key.
VITE_SERVER_API_BASE_PATH: Base URL for your server API.
VITE_IMGBB_API: API key for ImgBB service.
```

## Setting Up

1. Create a `.env` file in the root of your project.
2. Copy the variables above into the `.env` file.
3. Replace the placeholder values with your own values.
4. Save the `.env` file.

Ensure you do not share your `.env` file publicly, especially if it contains sensitive information like API keys or credentials. Also, make sure to add `.env` to your `.gitignore` file to prevent it from being checked into version control.

## Getting Started

To get started with the project, clone the repository and install the dependencies:

```sh
git clone https://github.com/Safin-Ali/TastyTales
cd TastyTales
npm install
