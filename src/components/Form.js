import React, {useEffect} from "react";
import {Form, Field, withFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";

const RegisterForm = ({ values, errors, touched, setUsers, users, status }) => {
    useEffect(() => {
        if (status) {
            setUsers([...users, status])
        }
    }, [status]);

    return (
        <div className="container">
            <h2>Register Today!</h2>
            <Form>
                <div className="field">
                    {touched.username && errors.username && (<p className="error">{errors.username}</p>)}
                    <Field className="form-input" type="text" name="username" placeholder ="Username"/>
                </div>
                <div className="field">
                    {touched.email && errors.email && <p className="error">{errors.email}</p>}
                    <Field className="form-input" type="text" name="email" placeholder="Email"/>
                </div>
                <div className="field">
                    {touched.password && errors.password && <p className="error">{errors.password}</p>}
                    <Field className="form-input" type="password" name="password" placeholder="Password"/>
                </div>
                <div className="field">
                    {touched.tos && errors.tos && <p className="error">{errors.tos}</p>}
                    <label className="checkbox-container">
                        Do you accept our Terms of Service?
                        <Field type="checkbox" name="tos" checked={values.tos}/>
                        <span className="checkmark"></span>
                    </label>
                </div>
                <button type="submit">Submit</button>
            </Form>
        </div>
    )
}

const FormikRegisterForm = withFormik({
    mapPropsToValues({username, email, password, tos}) {
        return {
            username: username || "",
            email: email || "",
            password: password || "",
            tos: tos || false,
        };
    },
    validateOnChange:false,
    validateOnBlur:false,
    validationSchema: Yup.object().shape({
        username: Yup.string()
        .min(5, "Username must be 5 characters or longer")
        .required("Username is required."),
        email: Yup.string()
        .email("Email not valid")
        .required("Email is required."),
        password: Yup.string()
        .min(8, "Password must be 8 characters or longer")
        .matches(/[0-9]/, "Password must contain a number")
        .required("Password is required."),
        tos: Yup.bool()
        .test(
            'tos',
            'You must agree to our Terms of Service',
            value => value === true
          )
    }),

    handleSubmit(values, {setStatus, resetForm}) {
        axios.post("https://reqres.in/api/users", values)
            .then((res) => {
                setStatus(res.data);
                resetForm();
            })
            .catch(err => console.log(err.response));
        
    }
})(RegisterForm)

export default FormikRegisterForm;
