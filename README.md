# Shop Management System

**Note:** This project was initially developed a month ago but is now being pushed to GitHub. It is currently undergoing rigorous testing, with improvements being made on a weekly basis. Bug fixes, new reports, and additional features are being added regularly to enhance the system.

A comprehensive Shop Management System built using the PERN stack (PostgreSQL, Express, React, Node.js).

## Technologies Used

- **Frontend:** React, Redux
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JSON Web Tokens (JWT)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication & Authorization:** Secure login and role-based access
- **Invoice Management:**
  - Create, download, and print invoices for purchases, sales, and expenses
  - Manage and track all types of invoices efficiently
- **Dashboard:**
  - Real-time updates on total inventory, sales, purchases, revenue, and expenses
  - Visualize key metrics and performance indicators
- **Inventory Management:**
  - Track and manage inventory levels, stock status, and product details
  - Automated alerts for low stock and reordering
- **Full CRUD Operations:** Comprehensive RESTful API for creating, reading, updating, and deleting records
- **Responsive UI:** Intuitive and adaptable user interface for various devices
- **Weekly Improvements:** The project is continuously being updated with new features and bug fixes, including enhanced reporting and optimized performance.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/abdulrehman-code/Shop-Management-System.git
   ```

2. **Navigate to the project directories:**

   ```bash
   cd client
   cd server
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment variables:**

   - Create a `.env` file in both the `/client` and `/server` directories and populate them with the required variables as shown below.

5. **Run the application:**

   ```bash
   npm run dev
   ```

## Usage

- Visit `http://localhost:3000` to access the application.
- Register or log in to start managing your shop.
- Use the dashboard to create, update, and manage invoices.

## Environment Variables

Create a `.env` file in the root directories of `/client` and `/server` and include the following variables:

### Client

```plaintext
VITE_SERVER_BASE_URL=your_server_api_url
```

### Server

```plaintext
PORT=your_port_value
NODE_ENV=your_node_env_value
CLIENT_URL=your_client_url_value
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret_value
JWT_EXPIRES_IN=your_jwt_expires_in_value
COOKIE_EXPIRES_IN=your_cookie_expires_in_value
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or issues, feel free to contact [Abdul Rehman](mailto:abdulrehman.code1@gmail.com).
