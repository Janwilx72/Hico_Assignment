import {RadioWithText} from "../radioButtons/RadioWithText";
import {getGenders} from "../../../core/constants/Genders";
import {getColourById, getColours} from "../../../core/constants/Colours";
import {CheckBoxWithText} from "../checkBoxes/CheckBoxWithText";
import {useContext} from "react";
import {EmployeeContext} from "../../../core/context/EmployeeContext";
import {EmployeeContextType} from "../../../core/types/EmployeeContextType";
import {SalutationSelects} from "../selects/SalutationSelects";
import {EmployeeType} from "../../../core/types/dto/EmployeeType";
import {formatCurrency} from "../../../core/utils/TextUtil";

export const EmployeeInformation = () =>
{
    const {
        selectedEmployee,
        updateUserFirstName,
        updateUserLastName,
        updateUserEmployeeNumber,
        updateUserGrossSalary,
        hideEmployeeInfoScreen,
        saveNewEmployee,
        updateEmployee,
        isNewEmployee
    } = useContext(EmployeeContext) as EmployeeContextType;

    const clickSaveOrUpdateEmployee = (employee: EmployeeType) =>
    {
        if (isNewEmployee)
            saveNewEmployee(employee);
        else
            updateEmployee(selectedEmployee);
    }

    const colour = getColourById(selectedEmployee.profileColourId);

    const handleGrossSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        const numericValue = event.target.value.replace(/\D/g, ''); // Remove non-digits
        updateUserGrossSalary(numericValue);
    };

    return (
        <div className='flex flex-col border border-black mx-16 mb-2 w-full'>
            {/*Section Title*/}
            <div className='flex justify-center mt-8'>
                <span className='font-bold'>Employee Information</span>
            </div>

            {/*Buttons*/}
            <div className='flex justify-end gap-3 mt-4 mb-8 mr-6'>
                <button className='border border-black rounded px-2 bg-gray-300'
                        onClick={hideEmployeeInfoScreen}>
                    Cancel
                </button>
                <button className={`border border-black rounded px-2 ${colour.hexCode}`}
                        onClick={() => clickSaveOrUpdateEmployee(selectedEmployee)}>
                    Save
                </button>
            </div>

            <div className='flex gap-48 px-6'>
                <div className='flex flex-col w-1/2'>

                    {/*First Name*/}
                    <div className='flex justify-between mb-4'>
                        <span>First Name(s) *</span>
                        <input className='border border-black ml-3 w-3/4'
                               value={selectedEmployee.firstName}
                               onChange={(e) => updateUserFirstName(e.target.value)}/>
                    </div>

                    {/*Last Name*/}
                    <div className='flex justify-between mb-4'>
                        <span>Last Name *</span>
                        <input className='border border-black ml-3 w-3/4'
                               value={selectedEmployee.lastName}
                               onChange={(e) => updateUserLastName(e.target.value)}/>
                    </div>

                    {/*Salutations Options*/}
                    <div className='flex justify-between mb-4'>
                        <span>Salutation *</span>
                        <SalutationSelects />
                    </div>

                    {/*Gender Radio Buttons*/}
                    <div className='flex justify-between mb-4'>
                        <span>Gender *</span>
                        {getGenders().map(gender =>
                        {
                            return <RadioWithText data={gender}
                                                  currentSelectedId={selectedEmployee.genderId}/>
                        })}
                    </div>

                    {/*Employee Number*/}
                    <div className='flex justify-between mb-4'>
                        <span>Employee # *</span>
                        <input  className='border border-black ml-3 w-3/4 text-end'
                                value={selectedEmployee.employeeNumber}
                                onChange={(e) => updateUserEmployeeNumber(e.target.value)}/>
                    </div>

                </div>

                <div className='flex flex-col w-1/2'>

                    {/*Full Name*/}
                    <div className='flex justify-between mb-4'>
                        <span>Full Name</span>
                        <span className='border border-black ml-3 w-3/4 text-gray-400'>
                            {selectedEmployee.firstName} {selectedEmployee.lastName}
                        </span>
                    </div>

                    {/*Gross Salary*/}
                    <div className='flex justify-between mb-4'>
                        <span>Gross Salary $PY</span>
                        <input  className='border border-black ml-3 w-3/4 text-end'
                                value={formatCurrency(selectedEmployee.grossSalary)}
                                onChange={(e) => handleGrossSalaryChange(e)}/>
                    </div>

                    {/*Colour Checkboxes*/}
                    <div className='flex justify-between mb-4'>
                        <span>Employee Profile Colour</span>
                        {getColours().map(colour =>
                        {
                            let checked = colour.id === selectedEmployee.profileColourId;
                            return <CheckBoxWithText data={colour} isChecked={checked}/>
                        })}
                    </div>

                </div>
            </div>

        </div>
    )
}