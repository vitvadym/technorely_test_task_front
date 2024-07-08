# Company Hub

## Overview

This project is a Single Page Application (SPA) designed to manage companies. It includes functionalities for user authentication, company management, and admin features.

## Features

- User Authentication (SignUp, SignIn)
- Company Management (View, Create, Edit)
- User Profile Management
- Admin Panel with User and Company Management
- Protected Routes

## Pages and Routes

### SignUp and SignIn

- **SignUp Form Fields**: email, password, phone number, last name, first name, nickname, description, position.
- **SignIn Form Fields**: email, password.
- All fields have basic validation. The email field only accepts email format.

### Companies Page

- Displays a table of companies.
- Server-side sorting by Name and Service fields.
- Users can view detailed information about a company and navigate back to the list.
- Each user can only see their own companies.

### Company Page

- Displays detailed information about a company.
- Users can edit their own companies.
- **Company Fields**: Name, Address, Service of activity, Number of employees, Description, Type.

### Create Company Page
- Form for creating a company.
- **Fields**: Name, Address, Service of activity, Number of employees, Description, Type.
- Form includes basic validation.

### Profile Page

- Displays the user's profile.
- Users can edit their own information.

### Admin View

- Includes  pages:
  - **User List**: List of all users in the system with the ability to edit them.
  - **Company List**: List of all companies in the system with the ability to edit them.

## Protected Routes

- Unauthenticated users cannot access the system or routes other than signup and login.

## Logout

- A button that logs the user out when clicked.

## Demo

Check out  demo [here](https://company-hub.onrender.com/).


## Technologies Used

- **Frontend:**
  - React
  - Tailwind CSS
  - daisyUI

- **Tools and Libraries:**
  - Axios
  - Redux Toolkit
  - Yup
  - React Hook Form
  - PrismaORM
