import express from 'express';
import {EmployeeType} from "./core/types/employeeType";
import employeeRepository from './database/repositories/employeeRepository'

const app = express();

app.use(express.json());
const repository = new employeeRepository();

// Route to add a new employee
app.post('/employees', async (req, res) =>
{
    try
    {
        const newEmployee: EmployeeType = req.body;
        await repository.insertEmployee(newEmployee);
        res.status(201).send('Employee added successfully');
    }
    catch (error)
    {
        res.status(500).send('Error adding employee');
    }
});

// Route to get an employee by ID
app.get('/employees', async (req, res) =>
{
    try
    {
        const employees = await repository.getAllEmployees();
        if (employees)
        {
            res.status(200).json(employees);
        }
        else
        {
            res.status(404).send('Employee not found');
        }
    }
    catch (error)
    {
        res.status(500).send('Error fetching employee');
    }
});

app.post('/employees/update', async (req, res) =>
{
    try
    {
        const employeePayload: EmployeeType = req.body;
        await repository.updateEmployee(employeePayload);
        res.status(201).send('Employee updated successfully');
    }
    catch (error)
    {
        res.status(500).send('Error updating employee');
    }
})
