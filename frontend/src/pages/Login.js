import './Login.css';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const routeChange = () =>{ 
        let path = '/'; 
        navigate(path);
    }
    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            <form className="login-form">
                <label className="login-label">
                    Username:
                    <input type="text" name="username" className="login-input" required />
                </label>
                <label className="login-label">
                    Email:
                    <input type="email" name="email" className="login-input" required />
                </label>
                <label className="login-label">
                    Password:
                    <input type="password" name="password" className="login-input" required />
                </label>
                <button type="submit" className="login-button" onClick={routeChange}>Login</button>
            </form>
            <div className="login-footer">
            <p className="login-footer-text">Don't have an account? <a href="/Register" className="login-footer-link">Register</a></p>
            </div>
        </div>
    );
}
