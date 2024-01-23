import {SalutationType} from "../types/models/SalutationType";

const salutations = [
    {id: 1, text: 'Dr.'},
    {id: 2, text: 'Mr.'},
    {id: 3, text: 'Ms.'},
    {id: 4, text: 'Mrs.'},
    {id: 5, text: 'Mx.'}
];

export const getSalutations = () : Array<SalutationType> =>
{
    return salutations;
}

export const getSalutationById = (id: number): SalutationType =>
{
    const sal = salutations.filter(x => x.id === id);
    return sal[0];
}