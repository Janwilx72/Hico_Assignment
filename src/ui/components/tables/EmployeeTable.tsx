import {useContext} from "react";
import {EmployeeContext} from "../../../core/context/EmployeeContext";
import {EmployeeContextType} from "../../../core/types/EmployeeContextType";
import {getColourById} from "../../../core/constants/Colours";
import {getSalutationById} from "../../../core/constants/Salutations";
import {EmployeeType} from "../../../core/types/dto/EmployeeType";

export const EmployeeTable = () =>
{
    const {
        allEmployees,
        viewSelectedEmployee,
        toggleIsNewEmployee
    } = useContext(EmployeeContext) as EmployeeContextType;

    const getColour = (id: number) =>
    {
        return getColourById(id);
    }

    const getSalutation = (id: number) =>
    {
        return getSalutationById(id);
    }

    const clickViewSelectedEmployee = (employee: EmployeeType) =>
    {
        viewSelectedEmployee(employee);
        toggleIsNewEmployee(false);
    }

    const generateRows = () =>
    {
        if (allEmployees === undefined || allEmployees.length === 0)
            return <div></div>

        return allEmployees.map((employee, index) =>
        {
            const colour = getColour(employee.profileColourId);
            let rowColour = colour.hexCode;
            const salutation = getSalutation(employee.salutationId);

            if (colour.id === 4)
            {
                rowColour = index % 2 === 1 ? 'bg-white' : 'bg-gray-300';
            }

            return (
                <tr key={employee.id}
                    className='cursor-pointer'
                    onClick={() => clickViewSelectedEmployee(employee)}>
                    <td className={`p-1 whitespace-nowrap border border-black ${rowColour}`}>{employee.employeeNumber}</td>
                    <td className={`p-1 whitespace-nowrap w-1/3 border border-black ${rowColour}`}>{employee.firstName}</td>
                    <td className={`p-1 whitespace-nowrap border border-black ${rowColour}`}>{employee.lastName}</td>
                    <td className={`p-1 whitespace-nowrap border border-black ${rowColour}`}>{salutation.text}</td>
                    <td className={`p-1 whitespace-nowrap border border-black ${rowColour}`}>{colour.text}</td>
                </tr>
            )
        })
    }

    return (
        <table className="min-w-full border border-black">
            <thead>
                <tr>
                    <th className="bg-gray-400 font-bold px-1 py-0 text-left text-xs font-medium text-black tracking-wider border border-black">Employee #</th>
                    <th className="bg-gray-400 font-bold px-1 py-0 text-left text-xs font-medium text-black tracking-wider w-1/3 border border-black">First Name</th>
                    <th className="bg-gray-400 font-bold px-1 py-0 text-left text-xs font-medium text-black tracking-wider border border-black">Last Name</th>
                    <th className="bg-gray-400 font-bold px-1 py-0 text-left text-xs font-medium text-black tracking-wider border border-black">Salutation</th>
                    <th className="bg-gray-400 font-bold px-1 py-0 text-left text-xs font-medium text-black tracking-wider border border-black">Profile Colour</th>
                </tr>
            </thead>
            <tbody>
                {generateRows()}
            </tbody>
        </table>
    )
}