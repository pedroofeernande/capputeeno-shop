export function formatPrice(valueInCents: number) {
    // Converte centavos para reais
    const formattedValue = valueInCents / 100;

    // Formata o valor para reais com duas casas decimais e adiciona o símbolo "R$"
    return formattedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    
}