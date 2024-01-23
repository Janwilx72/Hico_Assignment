import {EmployeeTable} from "../components/tables/EmployeeTable";
import {EmployeeContext} from "../../core/context/EmployeeContext";
import {EmployeeContextType} from "../../core/types/EmployeeContextType";
import {useContext, useEffect} from "react";
import {EmployeeInformation} from "../components/sections/EmployeeInformation";


export const EmployeePage = () =>
{
    const {
        pageLoading, setPageLoading,
        displayEmployingInfo,
        toggleIsNewEmployee,
        getEmployeesFromApi
    } = useContext(EmployeeContext) as EmployeeContextType;

    useEffect(() =>
    {
        getEmployeesFromApi();
    }, [])

    const clickIsNewEmployee = (isNewEmployee: boolean) =>
    {
        toggleIsNewEmployee(isNewEmployee);
    }

    return (
        <div className='flex flex-col'>
            <div className='grid grid-cols-5 w-full mt-8'>
                <div>
                </div>

                <div className='flex col-span-3 justify-center'>
                    <span className='items-center font-bold'>Current Employees</span>
                </div>

                <div className='flex justify-end mx-8'>
                    <button className='border border-black px-2 rounded bg-gray-300'
                            onClick={(e) => clickIsNewEmployee(true)}>
                        Add Employee
                    </button>
                </div>
            </div>

            <div className='flex mx-8 my-4'>
                <EmployeeTable />
            </div>

            {displayEmployingInfo
                ? <div className='flex'>
                    <EmployeeInformation />
                  </div>
                : null
            }

        </div>
    )
}