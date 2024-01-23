var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import cors from 'cors';
import express from 'express';
import { insertEmployee, getAllEmployees, updateEmployee, initialiseDatabase, clearTable } from './database/repositories/employeeRepository.js';
const app = express();
app.use(express.json());
app.use(cors());
// Route to add a new employee
app.post('/employees', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Create Employee-Request: ', req);
        const newEmployee = req.body;
        console.log('Create Employee-Employee: ', newEmployee);
        yield initialiseDatabase();
        yield insertEmployee(newEmployee);
        res.status(201).send('Employee added successfully');
    }
    catch (error) {
        res.status(500).send('Error adding employee');
    }
}));
// Route to get an employee by ID
app.get('/employees', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield initialiseDatabase();
        const employees = yield getAllEmployees();
        if (employees) {
            res.status(200).json(employees);
        }
        else {
            console.log('Get Employees Error: ');
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
        console.log('Employee Update Body: ', employeePayload);
        yield initialiseDatabase();
        yield updateEmployee(employeePayload);
        res.status(201).send('Employee updated successfully');
    }
    catch (error) {
        console.log('Error Updating Employee: ', error);
        res.status(500).send('Error updating employee');
    }
}));
app.post('/clear', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield initialiseDatabase();
        yield clearTable();
        res.status(201).send('Employee updated successfully');
    }
    catch (error) {
        res.status(500);
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
