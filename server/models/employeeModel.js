import db from '../config/db.js';

export const createEmployee = async (employee) => {
  const { name, email, phone, emp_Id, role } = employee;
  const [result] = await db.execute(
    'INSERT INTO employees (name, email, phone, emp_Id, role, leaves) VALUES (?, ?, ?, ?, ?, 12)',
    [name, email, phone, emp_Id, role]
  );
  return result;
};

export const getAllEmployees = async () => {
  const [rows] = await db.execute('SELECT * FROM employees');
  return rows;
};

export const getEmployeeById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM employees WHERE id = ?', [id]);
  return rows[0];
};

export const updateEmployee = async (id, employee) => {
  const { name, email, phone, emp_Id, role } = employee;
  const [result] = await db.execute(
    'UPDATE employees SET name=?, email=?, phone=?, emp_Id=?, role=? WHERE id=?',
    [name, email, phone, emp_Id, role, id]
  );
  return result;
};

export const deleteEmployee = async (id) => {
  const [result] = await db.execute('DELETE FROM employees WHERE id = ?', [id]);
  return result;
};
