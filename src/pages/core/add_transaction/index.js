// import { useEffect, useState } from "react";

// import "../../../assets/styles/form.css";

// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Account } from "./components/accountlist";
// import { MonthYear } from "./components/monthyearlist";
// import monthYears, {
//   accountTypes,
//   fileReader,
//   fixedLengthValue,
//   mb1,
//   numRegex,
//   supportedImg,
//   transactionTypes,
// } from "../../../utils/constants";
// import {
//   saveData,
//   getAllTransactions,
//   getSingleTransaction,
// } from "../../../requests/requests";

// export const AddTransaction = () => {
//   const { id } = useParams();

//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     values: {
//       notes: "",
//       amount: "",
//       FromAc: "",
//       ToAc: "",
//       ttype: "",
//       monthyear: "",
//       tdate: "",
//       receipt: "",
//     },
//     errors: {
//       notes: "",
//       amount: "",
//       FromAc: "",
//       ToAc: "",
//       ttype: "",
//       monthyear: "",
//       tdate: "",
//       receipt: "",
//       errcolor: "red",
//     },
//     submit: false,
//   });

//   const [userData, setUserData] = useState({});

//   useEffect(() => {
//     let auth_data = JSON.parse(localStorage.getItem("auth_token"));

//     setUserData(auth_data);
//   }, []);

//   useEffect(() => {
//     if (id !== null && id !== undefined && id !== "") {
//       if (userData !== null && userData !== undefined) {
//         if (
//           localStorage.getItem(userData.email) !== null &&
//           localStorage.getItem(userData.email) !== undefined
//         ) {
//           let data = [];

//           data = getSingleTransaction(userData.email, id);

//           if (data.length !== 0) {
//             let newform = { ...form };
//             for (let i in data[0]) {
//               newform.values[i] = data[0][i];
//             }
//             setForm(newform);
//           } else {
//             navigate("/*");
//           }
//         }
//       }
//     } else {
//       setForm({
//         values: {
//           notes: "",
//           amount: "",
//           FromAc: "",
//           ToAc: "",
//           ttype: "",
//           monthyear: "",
//           tdate: "",
//           receipt: "",
//         },
//         errors: {
//           notes: "",
//           amount: "",
//           FromAc: "",
//           ToAc: "",
//           ttype: "",
//           monthyear: "",
//           tdate: "",
//           receipt: "",
//           errcolor: "red",
//         },
//         submit: false,
//       });
//     }
//   }, [userData, id]);

//   useEffect(() => {
//     if (form.submit === true) {
//       let allvalues = form.values;
//       let allerrors = form.errors;

//       let errflag = 0;

//       for (let i in allvalues) {
//         if (allvalues[i].length === 0) {
//           console.log(i, allvalues[i]);
//           errflag = 1;
//         }
//       }

//       for (let i in allerrors) {
//         if (allerrors[i] !== "" && i !== "errcolor") {
//           errflag = 1;
//         }
//       }

//       if (errflag !== 1) {
//         if (
//           localStorage.getItem(userData.email) !== null &&
//           localStorage.getItem(userData.email) !== undefined
//         ) {
//           let existingData = getAllTransactions(userData.email);

//           saveData(
//             userData.email,
//             form.values,
//             "create-edit",
//             existingData,
//             id
//           );
//         } else {
//           saveData(userData.email, form.values, "first");
//         }

//         navigate(`/transactions`);
//       }
//     }
//     // eslint-disable-next-line
//   }, [form]);

//   const allvalidate = (e) => {
//     let newstateform = { ...form };

//     e.preventDefault();
//     let newform = e.target;

//     // let allelements = document.getElementsByClassName("allvalidate");

//     let allelements = [];

//     for (let i = 0; i < newform.length; i++) {
//       if (newform[i].className.split(" ")[0] === "allvalidate") {
//         allelements.push(newform[i]);
//       }
//     }

//     allelements.forEach((item) => {
//       let validatetype = item.classList[1];

//       let name = item.name;

//       let value = item.value;

//       let errfield = item.classList[2];

//       if (validatetype === "validate-type-checkempty") {
//         validateempty(name, value, errfield);
//       }
//       if (validatetype === "validate-type-account") {
//         validateaccount(name, value, errfield);
//       }
//       if (validatetype === "validate-type-fixedlength") {
//         validatefixedlength(name, value, errfield);
//       }
//       if (validatetype === "validate-type-num_gthan0") {
//         validatenumgthan0(name, value, errfield);
//       }

//       if (validatetype === "validate-type-date") {
//         validatedate(name, value, errfield);
//       }
//       if (validatetype === "validate-type-imgfile") {
//         validateimgfile(name, value, errfield, item);
//       }
//     });

//     newstateform.submit = true;

//     setForm(newstateform);
//   };

//   function validatefixedlength(name, value, errfield) {
//     let newform = { ...form };

//     if (value.trim() === "") {
//       newform.errors[name] = `**${errfield} can't be empty..!`;
//     } else {
//       if (
//         value.trim().length <= fixedLengthValue &&
//         value.trim().length !== 0
//       ) {
//         newform.errors[name] = "";
//         newform.values[name] = value.trim();
//       } else {
//         newform.errors[
//           name
//         ] = `**${errfield} length must be of ${fixedLengthValue} or lesser than it..!`;
//       }
//     }

//     newform.values[name] = value;

//     newform.submit = false;

//     setForm(newform);
//   }

//   function validatenumgthan0(name, value, errfield) {
//     let newform = { ...form };

//     if (value === "") {
//       newform.errors[name] = `**${errfield} can't be empty..!`;
//     } else {
//       if (value.match(numRegex)) {
//         if (value > 0) {
//           newform.errors[name] = "";
//           newform.values[name] = value;
//         } else {
//           newform.errors[name] = `**${errfield} is not valid..!`;
//         }
//       } else {
//         newform.errors[name] = `**${errfield} is not valid..!`;
//       }
//     }
//     newform.values[name] = value;

//     newform.submit = false;

//     setForm(newform);
//   }

//   function validateempty(name, value, errfield) {
//     let newform = { ...form };

//     if (value.trim() === "") {
//       newform.errors[name] = `**${errfield} can't be empty..!`;
//     } else {
//       newform.errors[name] = "";
//     }
//     newform.values[name] = value.trim();

//     newform.submit = false;

//     setForm(newform);
//   }

//   function validateaccount(name, value, errfield) {
//     let newform = { ...form };

//     newform.values[name] = value;

//     if (newform.values.FromAc === "" || newform.values.ToAc === "") {
//       if (newform.values.FromAc === "") {
//         newform.errors.FromAc = `**FromAc can't be empty..!`;
//       } else {
//         newform.errors.FromAc = ``;
//       }
//       if (newform.values.ToAc === "") {
//         newform.errors.ToAc = `**ToAc can't be empty..!`;
//       } else {
//         newform.errors.ToAc = ``;
//       }
//     } else {
//       if (newform.values.FromAc === newform.values.ToAc) {
//         newform.errors.FromAc = `**FromAc and ToAc are same..!`;
//         newform.errors.ToAc = `**FromAc and ToAc are same..!`;
//       } else {
//         newform.errors.FromAc = ``;
//         newform.errors.ToAc = ``;
//       }
//     }

//     newform.submit = false;

//     setForm(newform);
//   }

//   function validatedate(name, value, errfield) {
//     let newform = { ...form };

//     let datevalue = new Date(value);
//     let today = new Date();

//     if (value === "") {
//       newform.errors[name] = `**${errfield} can't be empty..!`;
//     } else {
//       if (datevalue > today) {
//         newform.errors[name] = `**${errfield} is not valid..!`;
//       } else {
//         newform.errors[name] = "";
//       }
//     }

//     newform.values[name] = value;

//     newform.submit = false;

//     setForm(newform);
//   }

//   function validateimgfile(name, value, errfield, file) {
//     let newform = { ...form };

//     let filenamelist = value.split(".");

//     if (value === "") {
//       newform.errors[name] = `**${errfield} can't be empty..!`;
//     } else {
//       if (supportedImg.includes(filenamelist[filenamelist.length - 1])) {
//         if (file.files[0].size > mb1) {
//           newform.errors[name] = `**${errfield} size exceeds..!`;
//         } else {
//           newform.errors[name] = "";
//         }
//       } else {
//         newform.errors[name] = `**${errfield} format is not valid..!`;
//       }

//       fileReader.readAsDataURL(file.files[0]);

//       fileReader.addEventListener("load", function () {
//         if (newform.errors[name] === "") {
//           newform.values[name] = this.result;
//         }
//         newform.submit = false;
//         setForm(newform);
//       });
//     }
//   }

//   function removeFile() {
//     let newform = { ...form };

//     newform.values.receipt = "";
//     newform.errors.receipt = "";

//     setForm(newform);
//   }

//   return (
//     <div className="container">
//       <div className="formdiv">
//         <form className="form" onSubmit={(event) => allvalidate(event)}>
//           <div className="fieldsrow">
//             <div className="fields">
//               <label>Transaction date :-</label>
//               <input
//                 type="date"
//                 name="tdate"
//                 value={form.values.tdate}
//                 max={new Date().toISOString().split("T")[0]}
//                 className="allvalidate validate-type-date Transaction-date"
//                 onChange={(e) =>
//                   validatedate(
//                     e.target.name,
//                     e.target.value,
//                     "Transaction-date"
//                   )
//                 }
//               />
//             </div>
//             {form.errors.tdate !== "" && (
//               <div className="fields">
//                 <p style={{ color: form.errors.errcolor }}>
//                   {form.errors.tdate}
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="fieldsrow">
//             <div className="fields">
//               <label>Notes :-</label>
//               <textarea
//                 name="notes"
//                 value={form.values.notes}
//                 className="allvalidate validate-type-fixedlength Notes"
//                 onChange={(e) =>
//                   validatefixedlength(e.target.name, e.target.value, "Notes")
//                 }
//               />
//             </div>
//             {form.errors.notes !== "" && (
//               <div className="fields">
//                 <p style={{ color: form.errors.errcolor }}>
//                   {form.errors.notes}
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="fieldsrow">
//             <div className="fields">
//               <label>Amount :-</label>
//               <input
//                 type="text"
//                 name="amount"
//                 value={form.values.amount}
//                 className="allvalidate validate-type-num_gthan0 Amount"
//                 onChange={(e) =>
//                   validatenumgthan0(e.target.name, e.target.value, "Amount")
//                 }
//               />
//             </div>
//             {form.errors.amount !== "" && (
//               <div className="fields">
//                 <p style={{ color: form.errors.errcolor }}>
//                   {form.errors.amount}
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="fieldsrow">
//             <div className="fields">
//               <label>From A/c :-</label>
//               <select
//                 type="text"
//                 name="FromAc"
//                 value={form.values.FromAc}
//                 className="allvalidate validate-type-account FromAc"
//                 onChange={(e) =>
//                   validateaccount(e.target.name, e.target.value, "FromAc")
//                 }
//               >
//                 <option value={""}>Select A/c</option>
//                 <Account accountTypes={accountTypes} />
//               </select>
//             </div>
//             {form.errors.FromAc !== "" && (
//               <div className="fields">
//                 <p style={{ color: form.errors.errcolor }}>
//                   {form.errors.FromAc}
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="fieldsrow">
//             <div className="fields">
//               <label>To A/c :-</label>
//               <select
//                 type="text"
//                 name="ToAc"
//                 value={form.values.ToAc}
//                 className="allvalidate validate-type-account ToAc"
//                 onChange={(e) =>
//                   validateaccount(e.target.name, e.target.value, "ToAc")
//                 }
//               >
//                 <option value={""}>Select A/c</option>
//                 <Account accountTypes={accountTypes} />
//               </select>
//             </div>
//             {form.errors.ToAc !== "" && (
//               <div className="fields">
//                 <p style={{ color: form.errors.errcolor }}>
//                   {form.errors.ToAc}
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="fieldsrow">
//             <div className="fields">
//               <label>Transaction Type :-</label>
//               <select
//                 type="text"
//                 name="ttype"
//                 value={form.values.ttype}
//                 className="allvalidate validate-type-checkempty Transaction-type"
//                 onChange={(e) =>
//                   validateempty(
//                     e.target.name,
//                     e.target.value,
//                     "Transaction-type"
//                   )
//                 }
//               >
//                 <option value={""}>Select transaction type</option>
//                 {transactionTypes.map((item, i) => (
//                   <option key={i} value={item}>
//                     {item}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {form.errors.ttype !== "" && (
//               <div className="fields">
//                 <p style={{ color: form.errors.errcolor }}>
//                   {form.errors.ttype}
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="fieldsrow">
//             <div className="fields">
//               <label>Month-year :-</label>
//               <select
//                 type="text"
//                 name="monthyear"
//                 value={form.values.monthyear}
//                 className="allvalidate validate-type-checkempty Month-year"
//                 onChange={(e) =>
//                   validateempty(e.target.name, e.target.value, "Month-year")
//                 }
//               >
//                 <MonthYear monthYears={monthYears} />
//               </select>
//             </div>
//             {form.errors.monthyear !== "" && (
//               <div className="fields">
//                 <p style={{ color: form.errors.errcolor }}>
//                   {form.errors.monthyear}
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="fieldsrow">
//             <div className="fields">
//               <label>Receipt :-</label>
//               {form.values.receipt === "" ? (
//                 <input
//                   type="file"
//                   name="receipt"
//                   value={form.values.receipt}
//                   className="allvalidate validate-type-imgfile Receipt"
//                   onChange={(e) =>
//                     validateimgfile(
//                       e.target.name,
//                       e.target.value,
//                       "Receipt",
//                       e.target
//                     )
//                   }
//                 />
//               ) : (
//                 <div>
//                   <div className="cross" onClick={() => removeFile()}>
//                     X
//                   </div>
//                   <img
//                     width={80}
//                     height={60}
//                     src={`${form.values.receipt}`}
//                     alt="alt"
//                   />
//                 </div>
//               )}
//             </div>
//             {form.errors.receipt !== "" && (
//               <div className="fields">
//                 <p style={{ color: form.errors.errcolor }}>
//                   {form.errors.receipt}
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="fieldsrow">
//             <div className="actions">
//               <input type="submit" name="submit" value={"Submit"} />
//             </div>
//           </div>
//         </form>
//       </div>
//       <Link to={`/transactions`}>See Data..!</Link>
//     </div>
//   );
// };

import { useEffect, useState } from "react";

import "../../../assets/styles/form.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Account } from "./components/accountlist";
import { MonthYear } from "./components/monthyearlist";
import monthYears, {
  accountTypes,
  fileReader,
  fixedLengthValue,
  mb1,
  numRegex,
  supportedImg,
  transactionTypes,
} from "../../../utils/constants";
import {
  saveData,
  getAllTransactions,
  getSingleTransaction,
} from "../../../requests/requests";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const today = new Date();

function isValidFileType(fileName) {
  return fileName && supportedImg.includes(fileName.split(".").pop());
}

export const AddTransaction = () => {
  const validationSchema = yup.object().shape({
    notes: yup
      .string()
      .required(`**Notes can't be empty..!`)
      .max(fixedLengthValue),
    tdate: yup.date().required().typeError(`**Date is not valid..!`).max(today),
    receipt: yup
      .mixed()
      .required(`**Receipt is required..!`)
      .test({
        name: "receipt",
        skipAbsent: true,
        test(value, ctx) {
          if (value) {
            if (!isValidFileType(value[0] && value[0].name)) {
              return ctx.createError({
                message: "**Receipt format is not valid..!",
              });
            }
            if (!(value[0] && value[0].size <= mb1)) {
              return ctx.createError({ message: "**Receipt size exceeds..!" });
            }
          }
          return true;
        },
      }),
    amount: yup
      .number()
      .required()
      .typeError("**Amount is required..!")
      .min(1, "**Amount should be greater than 0"),
    fromac: yup.string().test({
      name: "fromac",
      skipAbsent: true,
      test(value, ctx) {
        if (value === "") {
          return ctx.createError({
            message: `**From A/c is required..!`,
          });
        }
        if (value === this.parent.toac) {
          return ctx.createError({
            message: `**From A/c and To A/c are same..!`,
          });
        }
        return true;
      },
    }),
    toac: yup.string().test({
      name: "toac",
      skipAbsent: true,
      test(value, ctx) {
        if (value === "") {
          return ctx.createError({
            message: `**To A/c is required..!`,
          });
        }
        if (value === this.parent.fromac) {
          return ctx.createError({
            message: `**To A/c and From A/c are same..!`,
          });
        }
        return true;
      },
    }),
    ttype: yup.string().required(`**Transaction type is required..!`),
    monthyear: yup.string().required(`**Month year is required..!`)
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="container">
      <div className="formdiv">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="fieldsrow">
            <label>Transaction date :-</label>
            <input
              type="date"
              max={today.toISOString().split("T")[0]}
              {...register("tdate")}
            />
            <p style={{ color: "red" }}>{errors.tdate?.message}</p>
          </div>

          <div className="fieldsrow">
            <label>Notes :-</label>
            <textarea {...register("notes")} />
            <p style={{ color: "red" }}>{errors.notes?.message}</p>
          </div>

          <div className="fieldsrow">
            <label>Amount :-</label>
            <input type="number" {...register("amount")} />
            <p style={{ color: "red" }}>{errors.amount?.message}</p>
          </div>

          <div className="fieldsrow">
            <label>From A/c :-</label>
            <select {...register("fromac")}>
              <option value={""}>Select FromAc</option>
              <Account accountTypes={accountTypes} />
            </select>
            <p style={{ color: "red" }}>{errors.fromac?.message}</p>
          </div>

          <div className="fieldsrow">
            <label>To A/c :-</label>
            <select {...register("toac")}>
              <option value={""}>Select ToAc</option>
              <Account accountTypes={accountTypes} />
            </select>
            <p style={{ color: "red" }}>{errors.toac?.message}</p>
          </div>

          <div className="fieldsrow">
            <label>Transaction type :-</label>
            <select {...register("ttype")}>
              <option value={""}>Select transaction type</option>
              {transactionTypes.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <p style={{ color: "red" }}>{errors.ttype?.message}</p>
          </div>

          <div className="fieldsrow">
            <label>Month Year :-</label>
            <select {...register("monthyear")}>
              <MonthYear monthYears={monthYears} />
            </select>
            <p style={{ color: "red" }}>{errors.monthyear?.message}</p>
          </div>

          <div className="fieldsrow">
            <label>Receipt :-</label>
            <input type="file" {...register("receipt")} />
            <p style={{ color: "red" }}>{errors.receipt?.message}</p>
          </div>

          <div className="fieldsrow">
            <div className="actions">
              <input type="submit" name="submit" value={"Submit"} />
            </div>
          </div>
        </form>
      </div>
      <Link to={`/transactions`}>See Data..!</Link>
    </div>
  );
};
