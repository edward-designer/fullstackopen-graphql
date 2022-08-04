import { useState } from "react";

import { useApolloClient, useQuery } from "@apollo/client";

import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommendation from "./components/Recommendation";

import QUERIES from "./util/gql";

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [favGenre, setFavGenre] = useState(null);

  const authors = useQuery(QUERIES.ALL_AUTHORS);
  const books = useQuery(QUERIES.ALL_BOOKS);

  const client = useApolloClient();

  const logout = () => {
    console.log(token);
    setToken(null);
    setFavGenre(null);
    localStorage.clear();
    client.resetStore();
  };

  const notify = (error) => {
    setErrorMessage(error);
    setTimeout(() => setErrorMessage(null), 10000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommended")}>recommended</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>
      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />

      <Authors show={page === "authors"} authors={authors} />

      <Books show={page === "books"} books={books} />

      <NewBook show={page === "add"} />

      <Recommendation
        show={page === "recommended"}
        books={books}
        favGenre={favGenre}
      />
    </div>
  );
};

export default App;
