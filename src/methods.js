export const inr = (num) =>
  num.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

export const inra = (num) =>
  Math.abs(num).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

export const round = (value) => Math.round(value * 100) / 100;
