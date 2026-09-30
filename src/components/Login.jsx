import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const getPasswordStrength = () => {
    if (password.length === 0) return "";

    if (password.length < 6) return "Weak";

    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    ) {
      return "Strong";
    }

    return "Medium";
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    const token = "JWT_SIMULATED_" + Date.now();

    localStorage.setItem("authToken", token);
    localStorage.setItem("username", username);

    if (remember) {
      localStorage.setItem("rememberUser", "true");
    } else {
      localStorage.removeItem("rememberUser");
    }

    setError("");
    navigate("/");
  };

  const strength = getPasswordStrength();

  return (
    <div className="login-page">

      <div className="login-decoration decoration-one"></div>
      <div className="login-decoration decoration-two"></div>
      <div className="login-decoration decoration-three"></div>

      <div className="login-wrapper">

        <div className="login-brand-section">
          <div className="big-brand-icon">✓</div>

          <h1>TaskFlow</h1>

          <p>
            Organize your tasks.<br />
            Focus on what matters.
          </p>

          <div className="login-feature">
            <span>✓</span>
            <div>
              <strong>Stay Organized</strong>
              <small>Manage all your tasks in one place</small>
            </div>
          </div>

          <div className="login-feature">
            <span>✓</span>
            <div>
              <strong>Track Progress</strong>
              <small>Keep an eye on your daily productivity</small>
            </div>
          </div>

          <div className="login-feature">
            <span>✓</span>
            <div>
              <strong>Get Things Done</strong>
              <small>Turn your plans into completed tasks</small>
            </div>
          </div>
        </div>

        <div className="login-card">

          <div className="login-card-top">
            <div className="login-small-icon">✓</div>

            <div>
              <p className="login-welcome">WELCOME BACK</p>
              <h2>Sign in to TaskFlow</h2>
              <p className="login-subtitle">
                Enter your details to continue
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin}>

            <div className="login-input-group">
              <label>Username</label>

              <div className="input-wrapper">
                <span>👤</span>

                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                />
              </div>
            </div>

            <div className="login-input-group">
              <label>Password</label>

              <div className="input-wrapper">
                <span>🔒</span>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
              </div>
            </div>

            {password && (
              <div
                className={`password-strength ${strength.toLowerCase()}`}
              >
                <span>
                  Password Strength
                </span>

                <strong>
                  {strength}
                </strong>
              </div>
            )}

            <div className="remember-row">
              <label>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) =>
                    setRemember(e.target.checked)
                  }
                />

                <span>Remember Me</span>
              </label>

              <span className="secure-text">
                🔐 Secure Login
              </span>
            </div>

            {error && (
              <div className="login-error">
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              className="login-btn"
            >
              <span>Login to TaskFlow</span>
              <span className="login-arrow">→</span>
            </button>

          </form>

          <div className="login-footer">
            <span>TaskFlow</span>
            <span>•</span>
            <span>Smart Task Management</span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;