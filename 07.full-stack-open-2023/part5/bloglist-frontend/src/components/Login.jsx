const Login = ({ username, password, handleUsername, handlePassword, login }) => {
  return (
  <>
      <h1>log in to application</h1>
      <form onSubmit={login}>
        <div>
          username:
          <input type="text" value={username} onChange={handleUsername} />
        </div>
        <div>
          password:
          <input type="password" value={password} onChange={handlePassword} />
        </div>
        <input type="submit" value="log in" />
      </form>
  </>
  )
}

export default Login
