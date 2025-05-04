CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE loans (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    loan_amount DECIMAL(10, 2) NOT NULL,
    interest_rate DECIMAL(5, 2) NOT NULL,
    term INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS calculations (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    loanTypeName TEXT NOT NULL,
    loanAmount REAL NOT NULL,
    interestRate REAL NOT NULL,
    term INTEGER NOT NULL,
    termType TEXT NOT NULL,
    monthlyPayment REAL NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);