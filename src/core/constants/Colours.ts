


const colours = [
    {id: 1, text: 'Green', hexCode: 'bg-green-500'},
    {id: 2, text: 'Blue', hexCode: 'bg-blue-500'},
    {id: 3, text: 'Red', hexCode: 'bg-red-500'},
    {id: 4, text: 'Default', hexCode: 'bg-transparent'}
]

export const getColours = () =>
{
    return colours;
}

export const getColourById = (id: number) =>
{
    const colourList = colours.filter(x => x.id === id);
    return colourList[0];
}