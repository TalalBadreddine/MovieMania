import React, { useEffect, useState } from "react";
import InputGroup from "../../../Components/AdminInput/InputGroup";
import RowDetails from "../../../Components/AdminRowDetails/RowDetails";
import axios from "axios";
import Alert from "../../../Components/AdminAlert/Alert";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /*    Submit info for database   */
  /*    create new users  */

    useEffect(() => { 
      
    })
  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/admin/manageUsers/add", form)
      .then((res) => {
        setMessage(res.data.message);
        /* hide form after save */
        setForm({});
        /* hide errors after save */
        setErrors({});
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);
      })
      .catch((err) => setErrors(err.response.data));
  };

  /*    FIND ALL USERS    */
  useEffect(() => {
    async function FetchData() {
      await axios.get("/admin/manageUsers/").then((res) => {
        console.log(res);
        setUsers(res.data);
      });
    }
    FetchData();
  }, []);

  /* DELETE USER */
  const OnDelete = (id__) => {
    if (window.confirm("Are you sure to delete this user?")) {
      axios.delete(`/admin/manageUsers/${id__}/delete`).then((res) => {
        setMessage(res.data.message);
        setShow(true);
        setTimeout(() => {
          setShow(false);
        }, 4000);
      });
    }
  };

  return (
    <div className="row bg-dark text-white h-screen p-4 ">
      <Alert message={message} show={show} />
      <div className="">
      </div>
      <div className="col-12 col-lg-4">
        <form onSubmit={onSubmitHandler}>
          <InputGroup
            label="email"
            type="text"
            name="email"
            onChangeHandler={onChangeHandler}
            errors={errors.email}
          />
          <InputGroup
            label="lastName"
            type="text"
            name="lastName"
            onChangeHandler={onChangeHandler}
            errors={errors.lastName}
          />
          <InputGroup
            label="firstName"
            type="text"
            name="firstName"
            onChangeHandler={onChangeHandler}
            errors={errors.firstName}
          />
          <InputGroup
            label="age"
            type="text"
            name="age"
            onChangeHandler={onChangeHandler}
            errors={errors.age}
          />
          <button className="btn btn-primary" type="submit">
            Add user
          </button>
        </form>
      </div>
      <div className="col-12 col-lg-7">
        <table className="table text-white">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Lastname</th>
              <th scope="col">Firstname</th>
              <th scope="col">Age</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <RowDetails
                  Email={user.email}
                  Lastname={user.lastName}
                  Firstname={user.firstName}
                  Age={user.age}
                  Id={user._id}
                  OnDelete={OnDelete}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <br /><br /><br /><br />
    </div>
  );
};

export default AdminUsers;
