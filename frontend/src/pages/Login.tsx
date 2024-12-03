import { Link } from "react-router-dom"
function Login() {
  return (
    <div>
      <input type="text" placeholder="email" />
      <input type="password" placeholder="password" />
      <button>Login</button>
      <div>
        Not a user <Link to="/singup">Sing up</Link>
      </div>
    </div>
  )
}

export default Login
