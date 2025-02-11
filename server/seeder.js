import db from './config/db.js';

const rows = [
  { id: 1, name: "Siva", email: "siva@gmail.com", phone: "9840350329", emp_Id: "1001", role: "HR", leaves: 12 },
  { id: 2, name: "Ravi", email: "ravi@gmail.com", phone: "9840350330", emp_Id: "1002", role: "Manager", leaves: 12 },
  { id: 3, name: "Anitha", email: "anitha@gmail.com", phone: "9840350331", emp_Id: "1003", role: "Developer", leaves: 12 },
  { id: 4, name: "Ajay", email: "ajay@gmail.com", phone: "9840350332", emp_Id: "1004", role: "Tester", leaves: 12 },
  { id: 5, name: "Kavya", email: "kavya@gmail.com", phone: "9840350333", emp_Id: "1005", role: "Developer", leaves: 12 },
  { id: 6, name: "Priya", email: "priya@gmail.com", phone: "9840350334", emp_Id: "1006", role: "HR", leaves: 12 },
  { id: 7, name: "Vijay", email: "vijay@gmail.com", phone: "9840350335", emp_Id: "1007", role: "Manager", leaves: 12 },
  { id: 8, name: "Latha", email: "latha@gmail.com", phone: "9840350336", emp_Id: "1008", role: "Developer", leaves: 12 },
  { id: 9, name: "Harish", email: "harish@gmail.com", phone: "9840350337", emp_Id: "1009", role: "Tester", leaves: 12 },
  { id: 10, name: "Suresh", email: "suresh@gmail.com", phone: "9840350338", emp_Id: "1010", role: "Developer", leaves: 12 },
];

const seedEmployees = async () => {
  try {
    // Clear existing data
    await db.execute('DELETE FROM employees');
    console.log('Existing employee data cleared.');

    // Insert new employee data
    for (const employee of rows) {
      await db.execute(
        'INSERT INTO employees (id, name, email, phone, emp_Id, role, leaves) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [employee.id, employee.name, employee.email, employee.phone, employee.emp_Id, employee.role, employee.leaves]
      );
    }

    console.log('Employee data seeded successfully.');
  } catch (error) {
    console.error('Error seeding employee data:', error);
  } finally {
    process.exit();
  }
};

seedEmployees();
