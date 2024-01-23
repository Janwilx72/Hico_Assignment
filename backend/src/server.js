var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import employeeRepository from './database/repositories/employeeRepository';
const app = express();
app.use(express.json());
const repository = new employeeRepository();
// Route to add a new employee
app.post('/employees', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEmployee = req.body;
        yield repository.insertEmployee(newEmployee);
        res.status(201).send('Employee added successfully');
    }
    catch (error) {
        res.status(500).send('Error adding employee');
    }
}));
// Route to get an employee by ID
app.get('/employees', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield repository.getAllEmployees();
        if (employees) {
            res.status(200).json(employees);
        }
        else {
            res.status(404).send('Employee not found');
        }
    }
    catch (error) {
        res.status(500).send('Error fetching employee');
    }
}));
app.post('/employees/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeePayload = req.body;
        yield repository.updateEmployee(employeePayload);
        res.status(201).send('Employee updated successfully');
    }
    catch (error) {
        res.status(500).send('Error updating employee');
    }
}));
