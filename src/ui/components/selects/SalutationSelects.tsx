import {getSalutationById, getSalutations} from "../../../core/constants/Salutations";
import {useContext} from "react";
import {EmployeeContext} from "../../../core/context/EmployeeContext";
import {EmployeeContextType} from "../../../core/types/EmployeeContextType";


export const SalutationSelects = () =>
{
    const {
        updateUserSalutation,
        selectedEmployee
    } = useContext(EmployeeContext) as EmployeeContextType;

    const generateSalutationOptions = (): any =>
    {
        return getSalutations().map(sal => {
            return <option key={sal.id} value={sal.id}>{sal.text}</option>
        })
    }

    const handleSelectChange = (e: any, value: any) =>
    {
        const selectedSalutation = getSalutationById(value + 1);
        updateUserSalutation(selectedSalutation);
    }

    const getSalutationId = (): string =>
    {
        const sal = getSalutationById(selectedEmployee.salutationId);
        return sal.id.toString();
    }

    const salId = getSalutationId();

    return (
        <select name='salutations'
                id='salutation'
                className='border border-black ml-3 w-3/4'
                value={salId}
                onChange={((e) => handleSelectChange(e, e.target.selectedIndex))}>
            {generateSalutationOptions()}
        </select>
    )
}