import { useEffect, useState } from "react";
import { AccessTokenContext } from "./IsLoggedInContext";
import { LoggedIn } from "./LoggedIn";
import { LoggedOut } from "./LoggedOut";
import { Container, Col } from "react-bootstrap";

export function App() {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("token"));
    useEffect(() => {
        if (accessToken != null) {
            localStorage.setItem("token", accessToken);
        } else {
            localStorage.removeItem("token");
        }
    }, [accessToken]);

    return (
        <AccessTokenContext.Provider value={[accessToken, setAccessToken]}>
            <Container className="vertical-center">
                <Col md={{ span: 6, offset: 3 }}>
                    {accessToken
                        ? <LoggedIn />
                        : <LoggedOut />}
                </Col>
            </Container>
        </AccessTokenContext.Provider>
    );
}
