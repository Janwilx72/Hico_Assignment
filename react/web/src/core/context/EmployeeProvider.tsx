import {EmployeeContext} from "./EmployeeContext";
import {useState} from "react";
import {defaultEmployee, EmployeeType} from "../types/dto/EmployeeType";
import {SalutationType} from "../types/models/SalutationType";
import {ColourType} from "../types/models/ColourType";
import {isAlphabetical, isCurrencyValue, isNullOrWhitespace, isNumeric} from "../utils/TextUtil";
import {TextWithIdType} from "../types/models/TextWithIdType";
import {v4 as uuidv4} from 'uuid';
import {getAllEmployees, insertEmployee, updateEmployeeOnApi} from "../api/ApiServer";

export const EmployeeProvider = (props: any) =>
{
    const [pageLoading, setPageLoading] = useState<boolean>(false);
    const [displayEmployingInfo, setDisplayEmployeeInfo] = useState<boolean>(false);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType>(defaultEmployee);
    const [allEmployees, setAllEmployees] = useState<Array<EmployeeType>>([])
    const [isNewEmployee, setIsNewEmployee] = useState<boolean>(false);

    const hideEmployeeInfoScreen = () =>
    {
        setSelectedEmployee(defaultEmployee);
        setDisplayEmployeeInfo(false);
    }

    const updateUserFirstName = (text: string) =>
    {
        if (!isNullOrWhitespace(text) && !isAlphabetical(text))
            return;

        setSelectedEmployee(prevState => {
            return {
                ...prevState,
                firstName: text
            }
        });
    }

    const updateUserLastName = (text: string) =>
    {
        if (!isNullOrWhitespace(text) && !isAlphabetical(text))
            return;

        setSelectedEmployee(prevState => {
            return {
                ...prevState,
                lastName: text
            }
        });
    }

    const updateUserSalutation = (salutation: SalutationType) =>
    {
        let genderId = selectedEmployee.genderId;
        if (salutation.id === 2)
            genderId = 1
        else if (salutation.id === 3 || salutation.id === 4)
            genderId = 2
        else if (salutation.id === 5)
            genderId = 3

        setSelectedEmployee(prevState => {
            return {
                ...prevState,
                salutationId: salutation.id,
                genderId: genderId
            }
        });
    }

    const updateUserEmployeeNumber = (text: string) =>
    {
        if (!isNullOrWhitespace(text) && !isNumeric(text))
            return;

        setSelectedEmployee(prevState => {
            return {
                ...prevState,
                employeeNumber: text
            }
        });
    }

    const updateUserGrossSalary = (text: string) =>
    {
        let currency = text;

        if (!isNullOrWhitespace(text) && !isCurrencyValue(text))
            return;

        if (text.substring(0,1) === ".")
            currency = `0${text}`;

        setSelectedEmployee(prevState => {
            return {
                ...prevState,
                grossSalary: currency
            }
        });
    }

    const updateUserProfileColour = (colour: ColourType) =>
    {
        setSelectedEmployee(prevState => {
            return {
                ...prevState,
                profileColourId: colour.id
            }
        });
    }

    const updateUserGender = (gender: TextWithIdType) =>
    {
        setSelectedEmployee(prevState => {
            return {
                ...prevState,
                genderId: gender.id
            }
        });
    }

    const updateEmployee = async (employee: EmployeeType) =>
    {
        if (!isValidPayload(employee))
        {
            alert('Please fill in all fields')
            return;
        }

        try
        {
            await updateEmployeeOnApi(employee);
            console.log('updated employee')
            setAllEmployees(prevState => allEmployees.map(emp =>
                emp.id === employee.id
                    ? {
                        id: employee.id,
                        firstName: employee.firstName,
                        lastName: employee.lastName,
                        salutationId: employee.salutationId,
                        employeeNumber: employee.employeeNumber,
                        grossSalary: employee.grossSalary,
                        profileColourId: employee.profileColourId,
                        genderId: employee.genderId
                    }
                    : emp
            ));
            setDisplayEmployeeInfo(false);
        }
        catch (error)
        {
            console.log('Employee update error: ', error)
            alert('Error Updating Employee')
        }
    }

    const saveNewEmployee = async (employee: EmployeeType) =>
    {
        if (!isValidPayload(employee))
        {
            alert('Please fill in all fields')
            return;
        }

        employee.id = uuidv4();

        try
        {
            await insertEmployee(employee)
            setAllEmployees(oldItems => [...oldItems, employee]);
            setSelectedEmployee(defaultEmployee);
            setDisplayEmployeeInfo(false);
        }
        catch (error)
        {
            console.log('Save Employee Error: ',error)
        }
    }

    const isValidPayload = (employee: EmployeeType) =>
    {
        return !(isNullOrWhitespace(employee.firstName)
            || isNullOrWhitespace(employee.lastName)
            || isNullOrWhitespace(employee.employeeNumber)
            || isNullOrWhitespace(employee.grossSalary));
    }

    const viewSelectedEmployee = (employee: EmployeeType) =>
    {
        setSelectedEmployee(employee);
    }

    const toggleIsNewEmployee = (isNewEmployee: boolean) =>
    {
        setIsNewEmployee(isNewEmployee);
        setDisplayEmployeeInfo(true);
    }

    const getEmployeesFromApi = async () =>
    {
        const employees = await getAllEmployees();
        console.log(employees);
        if (employees !== null)
            setAllEmployees(employees.data)
    }

    const provider =
    {
        // Variables
        pageLoading, setPageLoading,
        displayEmployingInfo, setDisplayEmployeeInfo,
        selectedEmployee, setSelectedEmployee,
        allEmployees, setAllEmployees,
        isNewEmployee, setIsNewEmployee,

        // Functions
        updateUserFirstName,
        updateUserLastName,
        updateUserSalutation,
        updateUserEmployeeNumber,
        updateUserGrossSalary,
        updateUserProfileColour,
        updateUserGender,
        hideEmployeeInfoScreen,
        saveNewEmployee,
        updateEmployee,
        viewSelectedEmployee,
        toggleIsNewEmployee,

        // Api
        getEmployeesFromApi
    }

    return (
        <EmployeeContext.Provider value={provider}>
            {props.children}
        </EmployeeContext.Provider>
    )
}