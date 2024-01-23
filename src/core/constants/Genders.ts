import {SalutationType} from "../types/models/SalutationType";
import {TextWithIdType} from "../types/models/TextWithIdType";


const genders = [
    {id: 1, text: 'Male'},
    {id: 2, text: 'Female'},
    {id: 3, text: 'Unspecified'}
];

export const getGenders = () : Array<TextWithIdType> =>
{
    return genders;
}