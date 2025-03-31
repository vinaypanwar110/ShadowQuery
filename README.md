# ShadowQuery - SQL Query Viewer

-- Overview
ShadowQuery is a web-based application that allows users to input SQL queries and view corresponding results in a structured format. The application provides an intuitive interface for interacting with mock query results.

Key Features
Run predefined SQL queries.

Display tabular data associated with each query.

Filter query results.

Export data in CSV or JSON format.

Tech Stack
Framework: React.js

State Management: useState

Styling: CSS

Data Handling: JavaScript

Major Dependencies
None (pure React and JavaScript used)

Optimizations Implemented
Efficient Data Rendering: Only the displayed rows are processed at any given time.

Minimal Re-renders: State updates are optimized to avoid unnecessary re-renders.

Setup & Installation
Prerequisites
Ensure you have Node.js and npm installed.

Steps to Run Locally
Clone the repository:
git clone https://github.com/your-github/shadowquery.git
cd shadowquery
Install dependencies:
npm install
Start the development server:
npm run dev
Open http://localhost:5173 in your browser.

How to Use the App
Select a Query: Use the dropdown to pick a predefined SQL query.

Run the Query: Click the "Run Query" button to display results.

Filter Data: Use the search bar to filter results.

Export Data: Download results in CSV or JSON format.

Deployment
The application is deployed on Render. You can access it here:
[🔗 Live Demo](https://shadowquery.onrender.com)

Additional Documentation
Video Walkthrough: Watch Here
