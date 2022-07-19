import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import InputGroup from "../../../Components/AdminInput/InputGroup";

function Details() {
  const [form, setForm] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { state } = useLocation();

  console.log(state.userId);

  const onChangeHandler = (e) => {
    console.log(e.target);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /*    Submit info for database   */
  /*    UPDATE USER  */
  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`/admin/manageUsers/${id}/update`, form)
      .then((res) => {
        navigate("/admin/users");
      })
      .catch((err) => setErrors(err.response.data));
  };

  useEffect(() => {
    async function FetchInfo() {
      await axios.get(`/admin/manageUsers/${state.userId}`).then((res) => {
        setForm(res.data[0]);
        console.log(res.data);
      });
    }
    FetchInfo();
  }, []);

  return (
    <div className="w-screen bg-dark h-screen pt-12 text-white px-32 col-12 col-lg-4">
      <form onSubmit={onSubmitHandler}>
        <InputGroup
          label="email"
          type="text"
          name="email"
          onChangeHandler={onChangeHandler}
          errors={errors.email}
          value={form.email}
        />
        <InputGroup
          label="lastName"
          type="text"
          name="lastName"
          onChangeHandler={onChangeHandler}
          errors={errors.lastName}
          value={form.lastName}
        />
        <InputGroup
          label="firstName"
          type="text"
          name="firstName"
          onChangeHandler={onChangeHandler}
          errors={errors.firstName}
          value={form.firstName}
        />
        <InputGroup
          label="age"
          type="text"
          name="age"
          onChangeHandler={onChangeHandler}
          errors={errors.age}
          value={form.age}
        />
        <button className="btn bg-dark btn-primary" type="submit">
          Add user
        </button>
      </form>
    </div>
  );
}

export default Details;
