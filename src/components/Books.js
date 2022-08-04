import { useState } from "react";
import { useQuery } from "@apollo/client";

import QUERIES from "../util/gql";

const Books = (props) => {
  const [genres, setGenres] = useState("all genres");
  const allBooks = useQuery(QUERIES.ALL_BOOKS);
  const books = useQuery(QUERIES.ALL_BOOKS_BY_GENRES, {
    variables: { genres },
    skip: !genres || genres === "all genres",
  });

  if (!props.show) {
    return null;
  }

  if (allBooks.loading || books.loading) {
    return <div>loading...</div>;
  }

  const allGenresRaw = [];
  allBooks.data.allBooks.map((book) => {
    allGenresRaw.push(...book.genres);
  });
  const allGenres = Array.from(new Set(allGenresRaw));

  const booksToShow =
    genres === "all genres" ? allBooks.data.allBooks : books.data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Filter by genre</h3>
      {allGenres.map((genre) => (
        <button type="button" key={genre} onClick={() => setGenres(genre)}>
          {genre}
        </button>
      ))}
      <button type="button" key="all" onClick={() => setGenres("all genres")}>
        all genres
      </button>
    </div>
  );
};

export default Books;
