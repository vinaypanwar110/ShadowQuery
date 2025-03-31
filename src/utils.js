export const queries = [
  { id: 1, query: "SELECT id, name FROM users;", table: "users", columns: ["id", "name"] },
  { id: 2, query: "SELECT name, age FROM users;", table: "users", columns: ["name", "age"] },
  { id: 3, query: "SELECT id, age FROM users;", table: "users", columns: ["id", "age"] },
  { id: 4, query: "SELECT name, department FROM employees;", table: "employees", columns: ["name", "department"] },
  { id: 5, query: "SELECT name, age FROM employees;", table: "employees", columns: ["name", "age"] },
  { id: 6, query: "SELECT product, price FROM sales;", table: "sales", columns: ["product", "price"] },
  { id: 7, query: "SELECT product, quantity FROM sales;", table: "sales", columns: ["product", "quantity"] },
  { id: 8, query: "SELECT order_id, customer FROM orders;", table: "orders", columns: ["order_id", "customer"] },
  { id: 9, query: "SELECT customer, amount FROM orders;", table: "orders", columns: ["customer", "amount"] }
];

// Dummy data mapped to each query 
export const queryDataMap = {
  1: [...Array(50)].map((_, i) => ({ id: i + 1, name: `User${i + 1}` })),
  2: [...Array(50)].map((_, i) => ({ name: `User${i + 1}`, age: 18 + (i % 50) })),
  3: [...Array(50)].map((_, i) => ({ id: i + 1, age: 18 + (i % 50) })),
  4: [...Array(50)].map((_, i) => ({ name: `Employee${i + 1}`, department: ["HR", "IT", "Finance", "Marketing"][i % 4] })),
  5: [...Array(50)].map((_, i) => ({ name: `Employee${i + 1}`, age: 20 + (i % 40) })),
  6: [...Array(50)].map((_, i) => ({ product: `Product${i + 1}`, price: 100 + (i * 5) })),
  7: [...Array(50)].map((_, i) => ({ product: `Product${i + 1}`, quantity: (i % 20) + 1 })),
  8: [...Array(50)].map((_, i) => ({ order_id: 1000 + i, customer: `Customer${i + 1}` })),
  9: [...Array(50)].map((_, i) => ({ customer: `Customer${i + 1}`, amount: (i * 10) + 50 }))
};
