import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import QUERIES from "../util/gql";

const LoginForm = ({ setToken, setError, show, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(QUERIES.LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("graphql-auth-token", token);
      setPage("authors");
    }
  }, [result.data]);

  if (!show) {
    return null;
  }

  return (
    <form onSubmit={submitHandler}>
      <h2>Login</h2>
      <label htmlFor="username">username:</label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      <label htmlFor="password">password:</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
