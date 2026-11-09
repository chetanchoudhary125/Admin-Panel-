# Admin Panel

A frontend-only commerce administration dashboard built with React, React Router, Vite, and Tailwind CSS.

## Run locally

```sh
npm install
npm run dev
```

Create an account from the registration screen, then sign in. The application stores account/session information, product changes, and blocked-customer IDs in this browser's `localStorage`. Products are initialized with sample records on first use; deleting every product keeps the list empty.

## Available screens

- Dashboard with sample sales, products, and transactions
- Orders with search, status filtering, detail panel, and pagination
- Products with search, add, edit, delete, and pagination
- Customers with search, status filtering, profile details, and block status
- Transactions with search, status filtering, and CSV export
- Payout summary, analytics, and editable admin profile

## Frontend demo limitations

This project does not have a backend. Sample orders, customers, transactions, and payout history are bundled demo data. Account credentials and editable data are stored only in the current browser and are not suitable for real authentication or production use. Clearing browser storage removes local accounts and changes.

## Checks

```sh
npm run lint
npm run build
```
