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
export default class employeeRepository {
    constructor() {
        this.initializeDatabase();
    }
    initializeDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield open({
                filename: './mydatabase.db',
                driver: sqlite3.Database
            });
            yield this.db.run(`CREATE TABLE IF NOT EXISTS employees (
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
    }
    insertEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, firstName, lastName, salutationId, employeeNumber, grossSalary, profileColourId, genderId } = employee;
            const insertStatement = `INSERT INTO employees (id, firstName, lastName, salutationId, employeeNumber, grossSalary, profileColourId, genderId)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            yield this.db.run(insertStatement, id, firstName, lastName, salutationId, employeeNumber, grossSalary, profileColourId, genderId);
        });
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            const stmt = `SELECT * FROM employees`;
            const employees = yield this.db.get(stmt);
            return employees;
        });
    }
    updateEmployee(employee) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield this.db.run(stmt, firstName, lastName, salutationId, employeeNumber, grossSalary, profileColourId, genderId, id);
        });
    }
}
