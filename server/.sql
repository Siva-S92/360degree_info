CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  emp_Id VARCHAR(50),
  role VARCHAR(255),
  leaves INT DEFAULT 12
);

CREATE TABLE leaves (
  id INT AUTO_INCREMENT PRIMARY KEY,
  emp_id INT,
  from_date DATE,
  to_date DATE,
  leave_type VARCHAR(255),
  days INT,
  FOREIGN KEY (emp_id) REFERENCES employees(id) ON DELETE CASCADE
);
