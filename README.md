# Node.js Web App with Login, Register, and Contact Us Form

This is a web application built using **Node.js**, **MongoDB**, and **Express.js**. It features user authentication with login and registration functionality, along with a contact form for users to send messages.

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js
- MongoDB

## Installation

1. Clone this repository to your local machine or download the source code as a ZIP file.
2. Navigate to the project's root directory.
3. Install the dependencies by running the following command:
  ```bash
  npm install
  ``` 
4. Set up the MongoDB connection by replacing the MongoDB URL in `App.js` with your own database URL.

## Database Setup

1. Create a MongoDB database for the application.
2. Define the required schemas in your MongoDB database based on the following models used in the application:
- User Schema:
  - Username (String)
  - Email (String)
  - Password (String)

- Product Schema:
  - Define the fields based on your specific product requirements.

- Ticket Schema:
  - Name (String)
  - Email (String)
  - Message (String)

Ensure that the database and collection names used in the application match the ones you have set up in your MongoDB database.

## Usage

1. Start the application by running the following command:
  ```bash
  node App.js
  ``` 
  
2. Open your web browser and go to `http://localhost:3000` to access the application.

## Features

- **User Authentication**: Users can register an account and log in using their credentials.
- **Contact Us Form**: Users can send messages through the contact form.
- **Product Listing**: Users can view a list of products.
- **User Management**: Administrators can manage user accounts by deleting and updating email addresses.

## File Structure

- `App.js`: The main entry point of the application.
- `model/User.js`: Defines the User model for user authentication.
- `model/Products.js`: Defines the Products model for storing product information.
- `model/ticket.js`: Defines the Ticket model for storing contact form messages.
- `views/`: Contains the EJS templates for rendering the different pages.
- `public/`: Contains static assets such as CSS stylesheets and client-side JavaScript files.



