import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useContext, useState } from 'react';
import { AccessTokenContext } from '../IsLoggedInContext';

async function login(body) {
    return fetch("/api/login", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify(body)
    }).then(res => res.json());
}

export function LoginForm() {
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });

    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState(null);
    const [, setToken] = useContext(AccessTokenContext);

    const submit = async (values) => {
        setFormError(null);
        setSubmitting(true);

        try {
            const result = await login(values);
            if (result.message) throw new Error(result.message);

            setToken(result.access_token);
        } catch (e) {
            console.error(e);
            setFormError(e);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Formik
            validationSchema={schema}
            onSubmit={submit}
            initialValues={{
                email: "",
                password: "",
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <h1>Login</h1>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email} />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password} />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="errors">
                        <span className='is-invalid' />
                        <Form.Control.Feedback type="invalid">
                            {formError?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={submitting}>
                        Login
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
