export const paginno = [1, 2, 3, 5, 10, 20, 30, 40];

export const fixedLengthValue = 250;
export const numRegex = /^[1-9]{1}[0-9]*$/;

export const accountTypes = [
  "Personal Account",
  "Real Living",
  "My Dream Home",
  "Full Circle",
  "Core Realtors",
  "Big Block",
];

export const transactionTypes = ["Home Expense", "Personal Expense", "Income"];

export const today = new Date();
export const currentyear = today.getFullYear();
export const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthYears = [];

export const supportedImg = ["png", "jpg", "jpeg"];

export const mb1 = 1024 * 1024;

export const fileReader = new FileReader();

month.map((month) => monthYears.push(`${month} ${currentyear}`));

export default monthYears;

export const fixedimit = 2;

export const currency = {
  rupee: <span>&#8377;</span>,
  dollar: <span>&#36;</span>,
  pound: <span>&#163;</span>,
  yen: <span>&#165;</span>,
  euro: <span>&#8364;</span>,
};

export const groupby = [
  { tdate: "Transaction-date" },
  { monthyear: "Month-year" },
  { ttype: "Transaction-type" },
  { FromAc: "From-Ac" },
  { ToAc: "To-Ac" },
  { amount: "Amount" },
  { notes: "Notes" },
];

export const amountFormatter = (amount, type) => {
  let newamount = amount.toString();
  let length = newamount.length;
  let newstr = "";

  if (length <= 3) {
    newstr += newamount;
  } else {
    let j = 0;
    newamount
      .split("")
      .reverse()
      .forEach((item) => {
        if (j === 3) {
          newstr = newstr + "," + item;
        } else if (j % 2 !== 0 && j > 3) {
          newstr = newstr + "," + item;
        } else {
          newstr += item;
        }

        j++;
      });
    newstr = newstr.split("").reverse().join("");
  }

  newstr = (
    <p>
      {type !== null && type !== undefined && type !== ""
        ? currency[type.trim().toLowerCase()]
        : currency.rupee}
      {newstr}
    </p>
  );

  return newstr;
};
