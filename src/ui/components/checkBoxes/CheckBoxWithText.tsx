import {ColourType} from "../../../core/types/models/ColourType";
import {useContext} from "react";
import {EmployeeContext} from "../../../core/context/EmployeeContext";
import {EmployeeContextType} from "../../../core/types/EmployeeContextType";

type CheckBoxWithTextType =
{
    data: ColourType,
    isChecked: boolean
}

export const CheckBoxWithText = (props: CheckBoxWithTextType) =>
{
    const {
        updateUserProfileColour
    } = useContext(EmployeeContext) as EmployeeContextType;

    return (
        <div className='flex gap-2'>
            <input type='checkbox'
                   checked={props.isChecked}
                   onChange={(e) => updateUserProfileColour(props.data)}/>
            <span>{props.data.text}</span>
        </div>
    )
}