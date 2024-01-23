import {UUID} from "crypto";

export type EmployeeType =
{
    id: string | null,
    firstName: string,
    lastName: string,
    salutationId: number,
    employeeNumber: string,
    grossSalary: string,
    profileColourId: number,
    genderId: number
}

export const defaultEmployee: EmployeeType =
{
    id: null,
    firstName: '',
    lastName: '',
    salutationId: 1,
    employeeNumber: '',
    grossSalary: '',
    profileColourId: 4,
    genderId: 3
}