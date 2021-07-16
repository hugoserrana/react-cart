import { format, parseISO } from "date-fns";

export function displayCurrency(valueStr) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(priceToNum(valueStr));
}

export function priceToNum(valueStr) {
  return Number(valueStr).toFixed(2);
}

export function displayDate(valueStr) {
  const parsedDate = parseISO(valueStr);
  const formattedDate = format(parsedDate, "HH:mm dd/MM/yyyy");
  return formattedDate;
}
