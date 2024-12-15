import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useContext, useState } from 'react';
import { AccessTokenContext } from '../IsLoggedInContext';

async function register(body) {
    return fetch("/api/register", {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: "POST",
        body: JSON.stringify(body)
    }).then(res => res.json());
}

export function RegistrationForm() {
    const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(8).matches(/^(?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d).*$/u).required(),
    });

    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState(null);
    const [, setToken] = useContext(AccessTokenContext);

    const submit = async (values) => {
        setFormError(null);
        setSubmitting(true);

        try {
            const result = await register(values);
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
                name: "",
                email: "",
                password: "",
            }}
        >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <h1>Register</h1>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name"
                            value={values.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name} />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>

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
                        <Form.Text id="passwordHelpBlock" muted>
                            Your password must be at least 8 characters long,
                            contain, uppercase, lowercase letters and numbers.
                        </Form.Text>
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
                        Register
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
