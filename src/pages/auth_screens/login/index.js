import { Link, useNavigate } from "react-router-dom";
import "../../../assets/styles/login.css";
import { useEffect, useState } from "react";
import { FormField } from "../../../components/FormFields/FormField";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = {
  email: {
    label: "Email",
    type: "email",
    rules: {
      required: true,
    },
  },
  password: {
    label: "Password",
    type: "password",
    rules: {
      required: true,
      // min: 8,
    },
  },
};

const FieldWrapper = ({ loginForm, setLoginForm, ...rest }) => (
  <FormField
    {...rest}
    {...loginForm}
    onChange={(value) => {
      let a = { ...loginForm.values };
      a[rest.name] = value;
      setLoginForm((old) => ({ ...old, values: a }));
    }}
  />
);

export const Login = () => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    values: initialValues,
    errors: [],
  });

  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (submit === true) {
      validateFormValues();
    }
  }, [loginForm.values]);

  const validateFormValues = () => {
    const tempErrors = { ...loginForm.errors };
    Object.keys(validationSchema).forEach((field) => {
      const errors = getFieldErrors(validationSchema[field], field);
      if (errors.length) {
        tempErrors[field] = errors;
      } else {
        // delete field errors if exists
        if (tempErrors[field]) {
          delete tempErrors[field];
        }
      }
    });
    setLoginForm({ ...loginForm, errors: tempErrors });
    return tempErrors;
  };

  const fieldPropsCommon = {
    loginForm,
    setLoginForm,
  };

  const getFieldErrors = (fieldInfo, fieldName) => {
    return (
      Object.keys(fieldInfo["rules"])
        .map((ruleType) => {
          switch (ruleType) {
            case "isExist":
              return validateExist(
                fieldInfo["rules"][ruleType],
                fieldName,
                loginForm.values[fieldName],
                fieldInfo["type"]
              );
            default:
              // required
              return (
                !loginForm.values[fieldName].trim() &&
                `${fieldInfo["label"]} is required`
              );
          }
        })
        // remove false items from the validation messages
        .filter((item) => item)
    );
  };

  const validateExist = (ruleValue, fieldName, fieldValue, fieldType) => {
    switch (fieldType) {
      case "file":
        return (
          fieldValue.size > ruleValue &&
          `${fieldName} size cannot exceed ${ruleValue} KB`
        );
      case "number":
        return (
          fieldValue > ruleValue &&
          `${fieldName} cannot exceed ${ruleValue} INR`
        );
      default:
        // for rest of the fields
        return (
          fieldValue.length > ruleValue &&
          `${fieldName} cannot exceed ${ruleValue} in length`
        );
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setSubmit(true);

    const newErrors = validateFormValues();
    if (Object.keys(newErrors).length === 0) {
      let existingData = JSON.parse(localStorage.getItem("all_users_data"));

      if (existingData) {
        let randomstr = "";
        randomstr +=
          loginForm.values.email +
          loginForm.values.email.split("").reverse().join("") +
          loginForm.values.password;

        let flag = 0;
        let auth_data = {};

        for (let i in existingData) {
          if (
            existingData[i].email === loginForm.values.email &&
            existingData[i].pass === loginForm.values.password
          ) {
            auth_data = existingData[i];
            flag = 1;
            break;
          }
        }

        if (flag === 1) {
          auth_data["token"] = randomstr;
          localStorage.setItem("auth_token", JSON.stringify(auth_data));
          navigate("/transactions");
        } else {
          alert("Email or Password is incorrect..!");
        }
      } else {
        navigate("/register");
      }
      // const valueToSave = { ...values };
      // delete valueToSave['receipt_obj']
      // save(valueToSave);
      // navigate("/transactions");
    }
  };

  return (
    <>
      <div className="container">
        <div className="loginform">
          <div className="logincontent">
            <h1>Login Page</h1>

            <br></br>
            <br></br>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="inputs">
                <FieldWrapper
                  type="text"
                  label="Email"
                  name="email"
                  {...fieldPropsCommon}
                />
                <FieldWrapper
                  type="text"
                  label="Password"
                  name="password"
                  {...fieldPropsCommon}
                />
              </div>
              <br></br>

              <input type="submit" name="submit" value={"Login"} />
              <br></br>
              <br></br>
              <h3>
                Don't have an account..! <Link to={"/register"}>Sign-up</Link>
              </h3>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
