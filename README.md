# Employee Management System
## Description

This is a command-line application that allows business owners to manage their company's departments, roles, and employees. The application provides options to view, add, and update data stored in a database, including information about departments, roles, and employees.

## Key Features:
- View all departments, roles, and employees
-  Add new departments, roles, and employees
- Update an employee's role

## Table of Contents
- Installation
- Usage
- Database Structure
- Application Functionality
- Technologies Used
- License

## Installation
Clone the repository:

```bash
git clone https://github.com/yourusername/employee-management-system.git
```
Navigate to the project directory:

```bash
cd employee-management-system
```

Install the required dependencies:

```bash
npm install
```
Set up your database:

- Create a MySQL (or PostgreSQL) database and update the db.js file with your database credentials.
- Run the SQL schema to create the necessary tables.
Set up environment variables (optional):

If you're using environment variables for sensitive data (e.g., DB credentials), create a .env file in the project root and configure it accordingly.



## Usage
Start the application:
```bash
node index.js
```

You will be presented with a menu of options:

- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role

Follow the prompts to manage your company's data.

## Example:
- When you choose "View all departments", you will see a formatted table with department names and IDs.
- When you choose "Add a role", you will be prompted to enter the title, salary, and department for the new role.

# Database Structure
The database consists of three main tables:

departments: Stores the department information.

- id: Primary key (int)
- name: Department name (varchar)

roles: Stores role/job information.

- id: Primary key (int)
- title: Role title (varchar)
- salary: Role salary (decimal)
- department_id: Foreign key referring to the departments table

employees: Stores employee information.

- id: Primary key (int)
- first_name: Employee's first name (varchar)
- last_name: Employee's last name (varchar)
- role_id: Foreign key referring to the roles table
- manager_id: Foreign key referencing another employee as the manager (nullable)

# Application Functionality
View Functions:
- View all departments: Displays a table of all department names and their corresponding IDs.
- View all roles: Shows job titles, role IDs, department names, and salaries.
- View all employees: Shows employee IDs, names, job titles, departments, salaries, and their managers.

Add Functions:
- Add a department: Prompts for the department name and adds it to the database.
- Add a role: Prompts for the role name, salary, and department. Adds the new role to the database.
- Add an employee: Prompts for the employee's first name, last name, role, and manager. Adds the new employee to the database.

Update Function:
- Update an employee role: Prompts to select an employee and a new role, then updates the employee's role in the database.

## Technologies Used
- Node.js: JavaScript runtime for building the command-line application.
- Inquirer: For interactive prompts in the terminal.
- MySQL2 (or PostgreSQL): Database driver for communicating with the SQL database.
- Console.table: For rendering data in a formatted table in the terminal.
- dotenv (optional): For loading environment variables.

## License
This project is licensed under the MIT License. See the LICENSE file for details.