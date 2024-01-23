import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
import {EmployeeType} from "../../core/types/employeeType";

export default class employeeRepository
{
    // @ts-ignore
    private db: Database;

    constructor()
    {
        this.initializeDatabase();
    }

    private async initializeDatabase()
    {
        this.db = await open({
            filename: './mydatabase.db',
            driver: sqlite3.Database
        });

        await this.db.run(`CREATE TABLE IF NOT EXISTS employees (
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

    public async insertEmployee(employee: EmployeeType): Promise<void>
    {
        const { id, firstName, lastName, salutationId, employeeNumber, grossSalary, profileColourId, genderId } = employee;
        const insertStatement = `INSERT INTO employees (id, firstName, lastName, salutationId, employeeNumber, grossSalary, profileColourId, genderId)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        await this.db.run(insertStatement, id, firstName, lastName, salutationId, employeeNumber, grossSalary, profileColourId, genderId);
    }

    public async getAllEmployees(): Promise<EmployeeType[] | null>
    {
        const stmt = `SELECT * FROM employees`;
        const employees: EmployeeType[] | undefined = await this.db.get(stmt);
        return employees as EmployeeType[] | null;
    }

    public async updateEmployee(employee: EmployeeType): Promise<void>
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
        await this.db.run(stmt, firstName, lastName, salutationId, employeeNumber, grossSalary, profileColourId, genderId, id);
    }
}