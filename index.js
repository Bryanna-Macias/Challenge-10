const inquirer = require('inquirer');
const db = require('./db'); 
require('console.table');

const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'company_db'
});

module.exports = db;


const mainMenu = async () => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]);

    switch (action) {
        case 'View all departments':
            return viewDepartments();
        case 'View all roles':
            return viewRoles();
        case 'View all employees':
            return viewEmployees();
        case 'Add a department':
            return addDepartment();
        case 'Add a role':
            return addRole();
        case 'Add an employee':
            return addEmployee();
        case 'Update an employee role':
            return updateEmployeeRole();
        case 'Exit':
            process.exit();
    }
};

const viewDepartments = async () => {
    const [departments] = await db.query('SELECT id, name FROM departments');
    console.table(departments);
    mainMenu();
};

const viewRoles = async () => {
    const [roles] = await db.query(`
        SELECT roles.id, roles.title, roles.salary, departments.name AS department 
        FROM roles 
        JOIN departments ON roles.department_id = departments.id
    `);
    console.table(roles);
    mainMenu();
};

const viewEmployees = async () => {
    const [employees] = await db.query(`
        SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
        FROM employees 
        JOIN roles ON employees.role_id = roles.id
        JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees manager ON employees.manager_id = manager.id
    `);
    console.table(employees);
    mainMenu();
};

const addDepartment = async () => {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the new department:'
        }
    ]);

    await db.query('INSERT INTO departments (name) VALUES (?)', [name]);
    console.log(`Added ${name} to departments`);
    mainMenu();
};
const updateEmployeeRole = async () => {
    const [employees] = await db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees');
    const [roles] = await db.query('SELECT id, title FROM roles');

    const { employeeId, roleId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Select an employee to update:',
            choices: employees.map(employee => ({ name: employee.name, value: employee.id }))
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'Select the new role:',
            choices: roles.map(role => ({ name: role.title, value: role.id }))
        }
    ]);

    await db.query('UPDATE employees SET role_id = ? WHERE id = ?', [roleId, employeeId]);
    console.log('Employee role updated!');
    mainMenu();
};


mainMenu();
