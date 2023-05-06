import { Link } from "react-router-dom";
import { Pagination } from "./pagination";
import { useEffect, useState } from "react";
import {
  fixedimit,
  month,
  paginno,
  amountFormatter,
} from "../../../../utils/constants";
import { useMemo } from "react";

export const TransactionData = (props) => {
  //Getting Data From Main component and doing sorting and pagination here..!

  const [newData, setNewData] = useState(props.transactions);

  const [sorting, setSorting] = useState({
    sortingColumnName: "",
    sortingOrder: "",
    columnValueType: "",
  });

  const [pagination, setPagination] = useState({
    showPage: 2,
    totalpage: 0,
    limit: fixedimit,
    pageno: 1,
    pages: [],
  });

  useMemo(() => {
    setNewData(props.transactions);
  }, [props.transactions]);

  useMemo(() => {
    let totpage = Math.ceil(newData.length / pagination.limit);

    let pagelist = [];

    for (let i = 1; i <= totpage; i++) {
      pagelist.push(i);
    }

    setPagination({
      ...pagination,
      pageno: 1,
      totalpage: totpage,
      pages: pagelist,
    });
    // eslint-disable-next-line
  }, [newData, pagination.limit]);

  useEffect(() => {
    let getAllTransactions = [...newData];

    if (sorting.sortingOrder === "asc") {
      getAllTransactions.sort((a, b) => {
        if (sorting.columnValueType === "number") {
          if (
            parseInt(a[sorting.sortingColumnName]) >
            parseInt(b[sorting.sortingColumnName])
          ) {
            return 1;
          } else {
            return -1;
          }
        } else if (sorting.columnValueType === "monthyear") {
          let fmonth = a[sorting.sortingColumnName].split(" ")[0];
          let smonth = b[sorting.sortingColumnName].split(" ")[0];

          let fyear = parseInt(a[sorting.sortingColumnName].split(" ")[1]);
          let syear = parseInt(b[sorting.sortingColumnName].split(" ")[1]);

          if (month.indexOf(fmonth) > month.indexOf(smonth) && fyear >= syear) {
            return 1;
          } else {
            return -1;
          }
        } else if (sorting.columnValueType === "date") {
          let fdate = new Date(a[sorting.sortingColumnName]);
          let sdate = new Date(b[sorting.sortingColumnName]);

          if (fdate > sdate) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a[sorting.sortingColumnName] > b[sorting.sortingColumnName]) {
            return 1;
          } else {
            return -1;
          }
        }
      });
    }
    if (sorting.sortingOrder === "desc") {
      getAllTransactions.sort((a, b) => {
        if (sorting.columnValueType === "number") {
          if (
            parseInt(a[sorting.sortingColumnName]) <
            parseInt(b[sorting.sortingColumnName])
          ) {
            return 1;
          } else {
            return -1;
          }
        } else if (sorting.columnValueType === "monthyear") {
          let fmonth = a[sorting.sortingColumnName].split(" ")[0];
          let smonth = b[sorting.sortingColumnName].split(" ")[0];

          let fyear = parseInt(a[sorting.sortingColumnName].split(" ")[1]);
          let syear = parseInt(b[sorting.sortingColumnName].split(" ")[1]);

          if (month.indexOf(fmonth) < month.indexOf(smonth) && fyear <= syear) {
            return 1;
          } else {
            return -1;
          }
        } else if (sorting.columnValueType === "date") {
          let fdate = new Date(a[sorting.sortingColumnName]);
          let sdate = new Date(b[sorting.sortingColumnName]);

          if (fdate < sdate) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a[sorting.sortingColumnName] < b[sorting.sortingColumnName]) {
            return 1;
          } else {
            return -1;
          }
        }
      });
    }
    if (sorting.sortingOrder === "") {
      getAllTransactions = props.transactions;
    }

    setNewData(getAllTransactions);

    // eslint-disable-next-line
  }, [sorting]);

  function setSortingColumn(column, type) {
    let a = "";
    if (sorting.sortingColumnName === column) {
      switch (sorting.sortingOrder) {
        case "":
          a = "asc";
          break;
        case "asc":
          a = "desc";
          break;
        default:
          a = "";
          break;
      }
    } else {
      a = "asc";
    }

    setSorting({
      ...sorting,
      sortingOrder: a,
      sortingColumnName: column,
      columnValueType: type,
    });

    setPagination({
      ...pagination,
      pageno: 1,
    });
  }

  function changepageno(pageno) {
    setPagination({
      ...pagination,
      pageno: pageno,
    });
  }

  function changePageRecCounts(counts) {
    let rec = parseInt(counts);

    if (rec >= 1) {
      setPagination({
        ...pagination,
        pageno: 1,
        limit: rec,
      });
    } else {
      setPagination({
        ...pagination,
        pageno: 1,
        limit: 2,
      });
    }
  }

  return (
    <>
      {newData.length !== 0 && (
        <>
          <br></br>
          <br></br>
          <table className="table">
            <thead className="header">
              <tr className="headerrow">
                <th
                  className="th"
                  onClick={() =>
                    newData.length <= 1
                      ? null
                      : setSortingColumn("tdate", "date")
                  }
                >
                  <div className="sortHeader">
                    Transaction-Date
                    <img src="sort_icon.png" width={20} height={20} alt="alt" />
                  </div>
                </th>
                <th
                  className="th"
                  onClick={() =>
                    newData.length <= 1
                      ? null
                      : setSortingColumn("monthyear", "monthyear")
                  }
                >
                  <div className="sortHeader">
                    Month-Year
                    <img src="sort_icon.png" width={20} height={20} alt="alt" />
                  </div>
                </th>
                <th
                  className="th"
                  onClick={() =>
                    newData.length <= 1 ? null : setSortingColumn("ttype")
                  }
                >
                  <div className="sortHeader">
                    Transaction-Type
                    <img src="sort_icon.png" width={20} height={20} alt="alt" />
                  </div>
                </th>
                <th
                  className="th"
                  onClick={() =>
                    newData.length <= 1 ? null : setSortingColumn("FromAc")
                  }
                >
                  <div className="sortHeader">
                    From-A/c
                    <img src="sort_icon.png" width={20} height={20} alt="alt" />
                  </div>
                </th>
                <th
                  className="th"
                  onClick={() =>
                    newData.length <= 1 ? null : setSortingColumn("ToAc")
                  }
                >
                  <div className="sortHeader">
                    To-A/c
                    <img src="sort_icon.png" width={20} height={20} alt="alt" />
                  </div>
                </th>
                <th
                  className="th"
                  onClick={() =>
                    newData.length <= 1
                      ? null
                      : setSortingColumn("amount", "number")
                  }
                >
                  <div className="sortHeader">
                    Amount
                    <img src="sort_icon.png" width={20} height={20} alt="alt" />
                  </div>
                </th>
                <th className="th">Receipt</th>
                <th
                  className="th"
                  onClick={() =>
                    newData.length <= 1 ? null : setSortingColumn("notes")
                  }
                >
                  <div className="sortHeader">
                    Notes
                    <img src="sort_icon.png" width={20} height={20} alt="alt" />
                  </div>
                </th>
                <th className="th" colSpan={2}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="tabcontent">
              {newData
                .slice(
                  (pagination.pageno - 1) * pagination.limit,
                  pagination.pageno * pagination.limit
                )
                .map((tdata) => (
                  <tr className="contentrow" key={tdata.id}>
                    <td className="td">{tdata.tdate}</td>
                    <td className="td">{tdata.monthyear}</td>
                    <td className="td">{tdata.ttype}</td>
                    <td className="td">{tdata.FromAc}</td>
                    <td className="td">{tdata.ToAc}</td>
                    <td className="td">{amountFormatter(tdata.amount)}</td>

                    <td className="td">
                      {
                        <img
                          src={tdata.receipt}
                          className="receipt"
                          alt="alt"
                        />
                      }
                    </td>

                    <td className="td">{tdata.notes}</td>
                    <td className="td">
                      <Link to={`${tdata.id}`}>View</Link>
                    </td>
                    <td className="td">
                      <Link to={`edit/${tdata.id}`}>Edit</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <br></br>
          <Pagination pagination={pagination} changepageno={changepageno} />
          <br></br>
          <br></br>
          <div className="pagindiv">
            <label>
              Per page records :-
              <select
                type="text"
                name="group"
                onChange={(e) => changePageRecCounts(e.target.value)}
              >
                <option value={""}>Select limit..!</option>
                {paginno.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <br></br>
          <br></br>
        </>
      )}
    </>
  );
};
