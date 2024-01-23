import cors from 'cors';
import express from 'express';
import {EmployeeType} from "./core/types/employeeType";
import {
    insertEmployee,
    getAllEmployees,
    updateEmployee,
    initialiseDatabase, clearTable
} from './database/repositories/employeeRepository.js'

const app = express();

app.use(express.json());
app.use(cors());

// Route to add a new employee
app.post('/employees', async (req, res) =>
{
    try
    {
        console.log('Create Employee-Request: ', req);

        const newEmployee: EmployeeType = req.body;
        console.log('Create Employee-Employee: ', newEmployee);
        await initialiseDatabase();
        await insertEmployee(newEmployee);
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
        await initialiseDatabase();
        const employees = await getAllEmployees();
        if (employees)
        {
            res.status(200).json(employees);
        }
        else
        {
            console.log('Get Employees Error: ')
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
        console.log('Employee Update Body: ', employeePayload)
        await initialiseDatabase();
        await updateEmployee(employeePayload);
        res.status(201).send('Employee updated successfully');
    }
    catch (error)
    {
        console.log('Error Updating Employee: ', error)
        res.status(500).send('Error updating employee');
    }
})

app.post('/clear', async (req, res) =>
{
    try
    {
        await initialiseDatabase();
        await clearTable();
        res.status(201).send('Employee deleted successfully');
    }
    catch (error)
    {
        res.status(500);
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});