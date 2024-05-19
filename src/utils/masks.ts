// Função para aplicar a máscara de CEP
export const maskCEP = (value: string) => {
  return value.replace(/^(\d{5})(\d{3})$/, "$1-$2");
};

// Função para aplicar a máscara de Telefone
export const maskTelefone = (value: string) => {
  return value.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
};

// Função para aplicar a máscara de CPF
export const maskCPF = (value: string) => {
  return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};

// Função para aplicar a máscara de Celular
export const maskCelular = (value: string) => {
  return value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
};
