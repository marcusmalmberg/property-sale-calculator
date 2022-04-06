export const calculateProfit = ({ boughtPrice, sellPrice }: { boughtPrice: number, sellPrice: number }) => {
  return sellPrice - boughtPrice
}
