import { useMemo, useState } from "react";

import { TransactionData } from "./components/transaction_data";

import "../../../assets/styles/transaction.css";
import { Link, useNavigate } from "react-router-dom";
import { groupby } from "../../../utils/constants";
import { getAllTransactions } from "../../../requests/requests";
import { ErrorPage } from "../../../components/errorpage";

export const AllData = () => {
  const [initTransactions, setInitTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [initgroupedData, setInitGroupedData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);

  const [userData, setUserData] = useState({});

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useMemo(() => {
    let auth_data = JSON.parse(localStorage.getItem("auth_token"));

    setUserData(auth_data);
  }, []);

  useMemo(() => {
    if (userData !== undefined && userData !== null) {
      if (
        localStorage.getItem(userData.email) !== null &&
        localStorage.getItem(userData.email) !== undefined
      ) {
        let existingData = getAllTransactions(userData.email);

        setTransactions(existingData);
        setInitTransactions(existingData);
      }
    }
  }, [userData]);

  const logout = () => {
    let logoutstatus = window.confirm("Are you sure you want to logout..!");
    if (logoutstatus) {
      localStorage.removeItem("auth_token");
      navigate("/login");
    }
  };

  function groupdata(event) {
    let temp = [...initTransactions];

    let result = {};

    if (event.target.value) {
      temp.forEach((item) => {
        const value = item[event.target.value];

        result[value] = result[value] ?? [];
        result[value].push(item);
      });

      setGroupedData([result]);
      setInitGroupedData([result]);
      setTransactions([]);
    } else {
      setGroupedData([]);
      setInitGroupedData([]);
      setTransactions(initTransactions);
    }
  }

  function searchData(event) {
    let temp = [];
    let groupORnormal = "";
    if (Object.keys(initgroupedData).length !== 0) {
      temp = [...initgroupedData];
      groupORnormal = "group";
    } else {
      temp = [...initTransactions];
      groupORnormal = "normal";
    }

    let searchvalue = event.target.value;
    setSearch(searchvalue);

    if (
      searchvalue !== null &&
      searchvalue !== undefined &&
      searchvalue !== ""
    ) {
      let abc = [];
      if (groupORnormal === "normal") {
        abc = temp.filter((mainitem) =>
          Object.keys(mainitem).some((column) => {
            if (
              column !== "receipt" &&
              column !== "id" &&
              mainitem[column]
                .toString()
                .toLowerCase()
                .includes(searchvalue.trim().toLowerCase())
            ) {
              return mainitem;
            }
          })
        );
      } else {
        let a = {};
        let b = [];
        for (let i in temp[0]) {
          b = [];
          Object.values(temp[0][i]).map((item) => {
            for (let j in item) {
              if (
                j !== "receipt" &&
                j !== "id" &&
                item[j]
                  .toString()
                  .toLowerCase()
                  .includes(searchvalue.trim().toLowerCase())
              ) {
                b.push(item);
                a[i] = b;
                break;
              }
            }
          });
        }
        if (Object.keys(a).length >= 1) {
          abc.push(a);
        }
      }

      if (groupORnormal === "normal") {
        setTransactions(abc);
      } else {
        setGroupedData(abc);
      }
    } else {
      if (groupORnormal === "normal") {
        setTransactions(initTransactions);
      } else {
        setGroupedData(initgroupedData);
      }
    }
  }

  if (initTransactions.length === 0) {
    return (
      <ErrorPage
        errorTitle={"Oops Data Not Found..!"}
        errorSubTitle={"Go Add Some Data..!"}
        redirect={"create"}
      />
    );
  }

  return (
    <>
      <div className="container">
        <br></br>
        <br></br>
        <div className="headerdiv">
          <div className="groupdiv">
            <label>
              Group by :-
              <select type="text" name="group" onChange={(e) => groupdata(e)}>
                <option value={""}>Select any column</option>
                {groupby.map((item, index) => (
                  <option key={index} value={Object.keys(item)}>
                    {Object.values(item)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="logoutdiv">
            <button type="button" className="logout" onClick={() => logout()}>
              Logout
            </button>
          </div>
        </div>

        <br></br>
        <br></br>

        <div className="searchdiv">
          <label>
            Search :-
            <input type="text" name="search" onChange={(e) => searchData(e)} />
          </label>
        </div>
        <br></br>
        <br></br>

        {search.length !== 0 &&
        transactions.length === 0 &&
        groupedData.length === 0 ? (
          <h1>Oops..! No search results found..!</h1>
        ) : groupedData.length !== 0 ? (
          Object.keys(groupedData[0]).map(
            (value) =>
              value !== "undefined" && (
                <div key={value}>
                  <br></br>
                  <br></br>
                  <h1>{value}</h1>
                  <TransactionData transactions={groupedData[0][value]} />
                  <br></br>
                  <br></br>
                </div>
              )
          )
        ) : (
          transactions.length !== 0 && (
            <>
              <TransactionData transactions={transactions} />
              <br></br>
              <br></br>
            </>
          )
        )}
        <br />
        <Link to={`create`}>Add Transactions</Link>
      </div>
    </>
  );
};
