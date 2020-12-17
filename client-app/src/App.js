import React, { useState, useEffect, useCallback } from "react";
import api from "./api";
import ViewUser from "./ViewUser";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [isSaveLoader, setSaveLoader] = useState(false);
  const [isViewLoader, setViewLoader] = useState(false);

  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    _id: "",
  });
  const [selectUser, setSelectUser] = useState({});
  const getUsers = useCallback(async () => {
    setLoader(true);
    await api.getAllUsers().then((users) => {
      setUsers(users.data.data);
      setLoader(false);
    });
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const onChange = (event) => {
    setValue((user) => ({ ...user, [event.target.name]: event.target.value }));
  };

  const onSave = (e) => {
    e.preventDefault();
    if (phonenumber(value.phone)) {
      if (value._id) {
        api.editUserById(value._id, value).then((data) => {
          const targetIndex = users.findIndex((l) => l._id === data.data.id);
          users[targetIndex] = { ...data.data };
          setUsers((d) => [...d]);
          setValue({});
        });
      } else {
        setSaveLoader(true);
        delete value._id;
        api
          .createUser(value)
          .then((users) => {
            setSaveLoader(false);
            getUsers();
            setValue({});
          })
          .catch((err) => console.log("error", err));
      }
    } else {
    }
  };

  function phonenumber(inputtxt) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (inputtxt.toString().match(phoneno)) {
      return true;
    } else {
      alert("Not a valid Phone Number");
      return false;
    }
  }

  const onViewUser = (record) => {
    setViewLoader(true);
    api.getViewUserById(record._id).then((users) => {
      setSelectUser(users.data.data);
      setViewLoader(false);
    });
  };

  const onEdit = (user) => {
    setValue({ ...user });
  };

  const onDelete = (record) => {
    api.deleteUserById(record._id).then((users) => {
      getUsers();
    });
  };

  return (
    <div className="App">
      <input
        type="text"
        id="fname"
        name="firstName"
        placeholder="First Name"
        value={value.firstName}
        onChange={(e) => onChange(e)}
      />
      <br />
      <input
        id="lname"
        placeholder="Last Name"
        name="lastName"
        type="text"
        value={value.lastName}
        onChange={(e) => onChange(e)}
      />
      <br />
      <input
        placeholder="Email"
        name="email"
        type="email"
        value={value.email}
        onChange={(e) => onChange(e)}
      ></input>
      <br />
      <input
        placeholder="phone"
        name="phone"
        type="number"
        value={value.phone}
        onChange={(e) => onChange(e)}
      ></input>
      <br />
      <br />
      <button onClick={(e) => onSave(e)} disabled={isSaveLoader ? true : false}>
        Save
      </button>
      <br />
      <br />

      {isLoader ? (
        <div class="loader"></div>
      ) : (
        <table>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>phone</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
          {users &&
            users.length > 0 &&
            users.map((user, index) => (
              <tr key={index}>
                <td style={{ cursor: "pointer" }}>{user.firstName}</td>
                <td style={{ cursor: "pointer" }}>{user.lastName}</td>
                <td style={{ cursor: "pointer" }}>{user.email}</td>
                <td style={{ cursor: "pointer" }}>{user.phone}</td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => onDelete(user)}
                >
                  <i className="fa fa-trash"></i>
                </td>
                <td style={{ cursor: "pointer" }} onClick={() => onEdit(user)}>
                  <i className="fa fa-edit"></i>
                </td>
                <td style={{ cursor: "pointer" }} onClick={() => onEdit(user)}>
                  <button onClick={() => onViewUser(user)}>View</button>
                </td>
              </tr>
            ))}
        </table>
      )}

      {isViewLoader ? <div></div> : <ViewUser />}
    </div>
  );
}

export default App;
