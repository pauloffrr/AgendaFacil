/**
 * Formata um valor string para o padrão de moeda brasileira (ex: "1.234,56").
 * @param value O valor digitado (string numérica).
 * @returns O valor formatado como string.
 */

export const formatCurrency = (value: string | undefined): string => {
    if (!value) return "";

    let cleanedValue = value.replace(/\D/g, "");

    if (cleanedValue.length === 0) return "";

    const num = parseInt(cleanedValue, 10) / 100;
    
    const formatted = num.toLocaleString('pt-BR', { 
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return formatted;
};

export const cleanCurrency = (formattedValue: string | undefined): string => {
    if (!formattedValue) return "";
    
    return formattedValue
        .replace(/\./g, '')
        .replace(',', '.');
};