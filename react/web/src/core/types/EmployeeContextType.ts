import React from "react";
import {EmployeeType} from "./dto/EmployeeType";
import {SalutationType} from "./models/SalutationType";
import {ColourType} from "./models/ColourType";
import {TextWithIdType} from "./models/TextWithIdType";

export type EmployeeContextType =
{
    pageLoading: boolean,
    setPageLoading: React.Dispatch<React.SetStateAction<boolean>>

    displayEmployingInfo: boolean,
    setDisplayEmployeeInfo: React.Dispatch<React.SetStateAction<boolean>>,

    selectedEmployee: EmployeeType,
    setSelectedEmployee: React.Dispatch<React.SetStateAction<EmployeeType>>,

    allEmployees: Array<EmployeeType>,
    setAllEmployees: React.Dispatch<React.SetStateAction<Array<EmployeeType>>>,

    isNewEmployee: boolean ,
    setIsNewEmployee: React.Dispatch<React.SetStateAction<boolean>>,

    updateUserFirstName: (text: string) => void,
    updateUserLastName: (text: string) => void,
    updateUserSalutation: (salutation: SalutationType) => void,
    updateUserEmployeeNumber: (text: string) => void,
    updateUserGrossSalary: (text: string) => void,
    updateUserProfileColour: (text: ColourType) => void,
    updateUserGender: (text: TextWithIdType) => void,
    hideEmployeeInfoScreen: () => void,
    saveNewEmployee: (employee: EmployeeType) => void,
    updateEmployee: (employee: EmployeeType) => void,
    viewSelectedEmployee: (employee: EmployeeType) => void,
    toggleIsNewEmployee: (isNewEmployee: boolean) => void,

    getEmployeesFromApi: () => void
}