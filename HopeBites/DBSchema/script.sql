CREATE TABLE donors (
    donor_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mobile VARCHAR(15) NOT NULL,
    country VARCHAR(100) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE donations (
    donation_id SERIAL PRIMARY KEY,
    donor_id INT NOT NULL,
    country_type VARCHAR(20) CHECK (country_type IN ('Indian', 'Foreign')),
    donation_type VARCHAR(10) CHECK (donation_type IN ('Once', 'Monthly')),
    donation_amount DECIMAL(10,2) CHECK (donation_amount > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donor_id) REFERENCES donors(donor_id) ON DELETE CASCADE
);


-- Explanation:
--     donors Table:
--          Stores donor information (name, email, phone, country, etc.).
--          email is unique to avoid duplicate entries.
-- donations Table:
--          Linked to donors using donor_id as a foreign key.
--          Stores donation-specific data (amount, type, country type, timestamp).
--          ON DELETE CASCADE ensures that if a donor is deleted, their donations are also removed.

-- This design ensures data integrity and avoids duplication in donor details. 