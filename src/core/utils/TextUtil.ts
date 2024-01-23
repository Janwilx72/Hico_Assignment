export const isAlphabetical = (text: string): boolean =>
{
    const regex = /^[A-Za-z ]+$/;
    return regex.test(text);
}

export const isCurrencyValue = (text: string): boolean =>
{
    const regex = /^\d*(\.\d{0,2})?$/;
    return regex.test(text);
}

export const isNumeric = (text: string): boolean =>
{
    const regex = /^\d*$/;
    return regex.test(text);
}

export const formatCurrency = (text: string): string =>
{
    if (isNullOrWhitespace(text))
        return '';

    const number = parseFloat(text);
    return new Intl.NumberFormat('fr-FR').format(number);
}

export const isNullOrWhitespace = (input: string | null | undefined): boolean =>
{
    return !input || !input.trim();
}