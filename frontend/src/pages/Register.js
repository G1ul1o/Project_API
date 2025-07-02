import './Register.css';

export default function Register() {
  return (
    <div className="register-container">
        <h1 className="register-title">Register</h1>
        <form className="register-form">
            <p className='register-text'>A new user, amazing ! <br/>Welcome, we hope your email is not already taken :)</p>
            
            <button type="button" className="register-google-button">Register with Google</button>
            <p className="register-or-text">OR</p>
            
            <label className="register-label">
                Username:
                <input type="text" name="username" className="register-input" required/>
            </label>
            <label className="register-label">
                Email:
                <input type="email" name="email" className="register-input" required/>
            </label>
            <label className="register-label">
                Password:
                <input type="password" name="password" className="register-input" required/>
            </label>
            <label className="register-label">
                Role:
                <select name="role" className="register-role-select">
                    <option value="Member">Member</option>
                    <option value="Only Reader">Only Reader</option>
                </select>
            </label>
            <button type="submit" className="register-button">Register</button>
        </form>
        <div className="register-footer">
            <p className="register-footer-text">Already have an account? <a href="/Login" className="register-footer-link">Login</a></p>
        </div>
    </div>
  );
}
