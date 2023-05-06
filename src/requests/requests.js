export const getAllTransactions = (userkey) => {
  return JSON.parse(localStorage.getItem(userkey));
};

export const getSingleTransaction = (userkey, id) => {
  let alldata = getAllTransactions(userkey);

  return alldata.filter((item) => parseInt(item.id) === parseInt(id));
};

export const saveData = (userkey, formValues, type, existingData, id) => {
  if (type === "first") {
    let pushData = [formValues];
    pushData[0]["id"] = 1;

    localStorage.setItem(userkey, JSON.stringify(pushData));
  } else {
    if (id !== null && id !== undefined && id !== "") {
      const editid = parseInt(id);

      for (let i in existingData) {
        if (parseInt(existingData[i].id) === editid) {
          existingData[i] = formValues;
          break;
        }
      }
    } else {
      let previd = existingData.at(existingData.length - 1).id;

      let pushData = formValues;
      pushData["id"] = previd + 1;

      existingData.push(pushData);
    }

    localStorage.setItem(userkey, JSON.stringify(existingData));
  }
};
