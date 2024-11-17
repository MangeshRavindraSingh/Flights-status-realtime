# Flight Status Application

A React application that fetches and displays flight data, including flight details and status updates. This application allows users to view a list of flights and details for each flight. It also includes a refresh mechanism that fetches the latest data every 30 seconds.

## Features

- **Flight List**: Displays a list of flights with information such as flight number, airline, origin, destination, departure time, and status.
- **Flight Details**: Displays detailed information about a specific flight.
- **Auto Refresh**: The flight list automatically refreshes every 30 seconds to fetch updated data.
- **Error Handling**: Displays appropriate error messages in case of issues like failed network requests or no data returned.

## Tech Stack

- **React** - JavaScript library for building user interfaces.
- **TypeScript** - For static typing and better code quality.
- **React Router** - For client-side routing.
- **vite** - 

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/).
- **npm**: Node package manager (comes with Node.js).

## Installation

### Clone the repository

Clone the repository to your local machine using:

```bash
git clone https://github.com/MangeshRavindraSingh/Flights-status-realtime.git
```

### Install dependencies

```bash
cd flight-status-app
npm install
```

## Running the Application

```bash
npm run dev
```

This will start the development server and the application will be available at: http://localhost:5173