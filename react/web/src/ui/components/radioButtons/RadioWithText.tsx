import {TextWithIdType} from "../../../core/types/models/TextWithIdType";
import {useContext} from "react";
import {EmployeeContext} from "../../../core/context/EmployeeContext";
import {EmployeeContextType} from "../../../core/types/EmployeeContextType";

type RadioWithTextType =
{
    data: TextWithIdType,
    currentSelectedId: number
}

export const RadioWithText = (props: RadioWithTextType) =>
{
    const {
        updateUserGender
    } = useContext(EmployeeContext) as EmployeeContextType;

    const isChecked = () =>
    {
        return props.data.id === props.currentSelectedId;
    }

    return (
        <div className='flex gap-2'>
            <input type='radio' checked={isChecked()} onChange={(e) => updateUserGender((props.data))}/>
            <span>{props.data.text}</span>
        </div>
    )
}