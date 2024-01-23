import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
import {EmployeeType} from "../../core/types/employeeType";

let db: Database;

export const initialiseDatabase = async () =>
{
    db = await open({
        filename: './mydatabase.db',
        driver: sqlite3.Database
    });

    await db.run(`CREATE TABLE IF NOT EXISTS employees (
            id TEXT PRIMARY KEY,
            firstName TEXT,
            lastName TEXT,
            salutationId INTEGER,
            employeeNumber TEXT,
            grossSalary TEXT,
            profileColourId INTEGER,
            genderId INTEGER
        )`);
}

export const clearTable = async() =>
{
    const clearTableStatement = 'DELETE FROM employees';
    await db.run(clearTableStatement);
}

export const insertEmployee = async (employee: EmployeeType) =>
{
    const { id, firstName, lastName, salutationId, employeeNumber, grossSalary, profileColourId, genderId } = employee;
    const insertStatement = `INSERT INTO employees (id, firstName, lastName, salutationId, employeeNumber, grossSalary, profileColourId, genderId)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    await db.run(insertStatement, id, firstName, lastName, salutationId, employeeNumber, grossSalary, profileColourId, genderId);
}

export const getAllEmployees = async () =>
{
    const stmt = `SELECT * FROM employees`;
    const employees: EmployeeType[] | undefined = await db.all(stmt);
    console.log('Employees: ', employees);
    return employees as EmployeeType[] | null;
}

export const updateEmployee = async (employee: EmployeeType) =>
{
    if (!employee.id)
    {
        throw new Error("Employee ID is required for update");
    }

    const { id, firstName, lastName, salutationId, employeeNumber, grossSalary, profileColourId, genderId } = employee;
    const stmt = `UPDATE employees SET 
                      firstName = ?, 
                      lastName = ?, 
                      salutationId = ?, 
                      employeeNumber = ?, 
                      grossSalary = ?, 
                      profileColourId = ?, 
                      genderId = ?
                      WHERE id = ?`;
    await db.run(stmt, firstName, lastName, salutationId, employeeNumber, grossSalary, profileColourId, genderId, id);
}
