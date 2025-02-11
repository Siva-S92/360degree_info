import db from '../config/db.js';

export const applyLeave = async (leave) => {
  const { emp_id, from_date, to_date, leave_type, days } = leave;

  // Insert leave request
  const [result] = await db.execute(
    'INSERT INTO leaves (emp_id, from_date, to_date, leave_type, days) VALUES (?, ?, ?, ?, ?)',
    [emp_id, from_date, to_date, leave_type, days]
  );

  // Deduct leaves from employee
  await db.execute('UPDATE employees SET leaves = leaves - ? WHERE id = ?', [days, emp_id]);

  return result;
};


export const getAllLeaves = async () => {
  const [rows] = await db.execute(
    `SELECT leaves.id, leaves.emp_id, employees.name, leaves.from_date, leaves.to_date, leaves.leave_type, leaves.days
     FROM leaves 
     JOIN employees ON leaves.emp_id = employees.id`
  );
  return rows;
};

export const getLeaveById = async (id) => {
  const [rows] = await db.execute(
    `SELECT leaves.id, leaves.emp_id, employees.name, leaves.from_date, leaves.to_date, leaves.leave_type, leaves.days
     FROM leaves
     JOIN employees ON leaves.emp_id = employees.id
     WHERE leaves.id = ?`,
    [id]
  );

  return rows.length > 0 ? rows[0] : null;
};


export const updateLeave = async (id, leave) => {
  const { emp_id, from_date, to_date, leave_type, days } = leave;

  // Get previous leave details
  const [oldLeave] = await db.execute('SELECT days FROM leaves WHERE id = ?', [id]);

  if (oldLeave.length === 0) return null;

  const oldDays = oldLeave[0].days;

  // Update leave record
  const [result] = await db.execute(
    'UPDATE leaves SET from_date=?, to_date=?, leave_type=?, days=? WHERE id=?',
    [from_date, to_date, leave_type, days, id]
  );

  // Adjust employee leave balance
  await db.execute(
    'UPDATE employees SET leaves = leaves + ? - ? WHERE id = ?',
    [oldDays, days, emp_id]
  );

  return result;
};

export const deleteLeave = async (id) => {
  // Get the leave details before deleting
  const [leave] = await db.execute('SELECT emp_id, days FROM leaves WHERE id = ?', [id]);

  if (leave.length === 0) return null;

  const { emp_id, days } = leave[0];

  // Delete leave record
  await db.execute('DELETE FROM leaves WHERE id = ?', [id]);

  // Restore employee's leave balance
  await db.execute('UPDATE employees SET leaves = leaves + ? WHERE id = ?', [days, emp_id]);

  return true;
};
