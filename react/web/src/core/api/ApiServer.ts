
import axios from 'axios'
import {EmployeeType} from "../types/dto/EmployeeType";

const apiUrl = 'http://localhost:3000'

export const getAllEmployees = async () =>
{
    try
    {
        const response = await axios.get(`${apiUrl}/employees`);
        return response;
    }
    catch (error)
    {
        console.error('Error fetching employee:', error);
        return null;
    }
}

export const insertEmployee = async (employee: EmployeeType) =>
{
    try
    {
        const response = await axios.post(`${apiUrl}/employees`, employee);
    }
    catch (error)
    {
        // console.error('Error adding employee:', error);
        alert('Error adding employee');
    }
}

export const updateEmployeeOnApi = async (employee: EmployeeType) =>
{
    try
    {
        const response = await axios.post(`${apiUrl}/employees/update`, employee);
    }
    catch (error)
    {
        console.error('Error adding employee:', error);
        alert('Error adding employee');
    }
}