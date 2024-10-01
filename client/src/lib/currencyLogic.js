export const currencyFormatter = new Intl.NumberFormat();

export const calculateTotalAmount = (data) => {
  const initialValue = 0;
  return data?.reduce(
    (lastValue, object) => parseInt(lastValue) + (parseInt(object.amount) || 0),
    initialValue
  );
};
