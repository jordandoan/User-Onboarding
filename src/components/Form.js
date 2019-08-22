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
        <div>
            <h2>Register Today!</h2>
            <Form>
                <div>
                    {touched.username && errors.username && (<p>{errors.username}</p>)}
                    <Field type="text" name="username" placeholder ="Username"/>
                </div>
                <div>
                    {touched.email && errors.email && <p>{errors.email}</p>}
                    <Field type="text" name="email" placeholder="Email"/>
                </div>
                <div>
                    {touched.password && errors.password && <p>{errors.password}</p>}
                    <Field type="password" name="password" placeholder="Password"/>
                </div>
                <div>
                    {touched.tos && errors.tos && <p>{errors.tos}</p>}
                    <label><Field type="checkbox" name="tos" checked={values.tos}/>Do you accept our Terms of Service?</label>
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
