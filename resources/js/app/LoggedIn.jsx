import { Button } from "react-bootstrap"
import { useContext } from 'react';
import { AccessTokenContext } from './IsLoggedInContext';

export function LoggedIn() {
    const [, setToken] = useContext(AccessTokenContext);

    return <>
        <h1>Logged in!</h1>
        <Button variant="danger" onClick={() => {
            setToken(null);
        }}>Logout</Button>
    </>
}
