import { LoginForm } from "./forms/LoginForm";
import { RegistrationForm } from "./forms/RegistrationForm";
import { Tabs, Tab } from "react-bootstrap";

export function LoggedOut() {
    return (
        <Tabs
            defaultActiveKey="login"
            className="mb-3"
        >
            <Tab eventKey="login" title="Login">
                <LoginForm />
            </Tab>
            <Tab eventKey="register" title="Register">
                <RegistrationForm />
            </Tab>
        </Tabs>
    )
}
