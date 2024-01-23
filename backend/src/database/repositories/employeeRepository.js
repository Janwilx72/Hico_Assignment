var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
let db;
export const initialiseDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    db = yield open({
        filename: './mydatabase.db',
        driver: sqlite3.Database
    });
    yield db.run(`CREATE TABLE IF NOT EXISTS employees (
            id TEXT PRIMARY KEY,
            firstName TEXT,
            lastName TEXT,
            salutationId INTEGER,
            employeeNumber TEXT,
            grossSalary TEXT,
            profileColourId INTEGER,
            genderId INTEGER
        )`);
});
export const clearTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const clearTableStatement = 'DELETE FROM employees';
    yield db.run(clearTableStatement);
});
export const insertEmployee = (employee) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, firstName, lastName, salutationId, employeeNumber, grossSalary, profileColourId, genderId } = employee;
    const insertStatement = `INSERT INTO employees (id, firstName, lastName, salutationId, employeeNumber, grossSalary, profileColourId, genderId)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    yield db.run(insertStatement, id, firstName, lastName, salutationId, employeeNumber, grossSalary, profileColourId, genderId);
});
export const getAllEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    const stmt = `SELECT * FROM employees`;
    const employees = yield db.all(stmt);
    console.log('Employees: ', employees);
    return employees;
});
export const updateEmployee = (employee) => __awaiter(void 0, void 0, void 0, function* () {
    if (!employee.id) {
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
    yield db.run(stmt, firstName, lastName, salutationId, employeeNumber, grossSalary, profileColourId, genderId, id);
});
