import { useState } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState("all genres");

  if (!props.show) {
    return null;
  }

  if (props.books.loading) {
    return <div>loading...</div>;
  }

  const allGenresRaw = [];
  props.books.data.allBooks.map((book) => {
    allGenresRaw.push(...book.genres);
  });
  const allGenres = Array.from(new Set(allGenresRaw));

  const booksToShow =
    genre === "all genres"
      ? props.books.data.allBooks
      : props.books.data.allBooks.filter((book) => book.genres.includes(genre));

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
        <button type="button" key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      ))}
      <button type="button" key="all" onClick={() => setGenre("all genres")}>
        all genres
      </button>
    </div>
  );
};

export default Books;
