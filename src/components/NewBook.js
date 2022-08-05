import { useState } from "react";
import { useMutation, useSubscription } from "@apollo/client";

import QUERIES from "../util/gql";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  useSubscription(QUERIES.BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      props.setError(`${addedBook.title} added`);
      props.client.cache.updateQuery(
        { query: QUERIES.ALL_BOOKS },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(addedBook),
          };
        }
      );
    },
  });

  const [addBook] = useMutation(QUERIES.ADD_BOOK, {
    refetchQueries: (result) => [
      { query: QUERIES.ALL_BOOKS },
      { query: QUERIES.ALL_AUTHORS },
      {
        query: QUERIES.ALL_BOOKS_BY_GENRES,
        variables: { genres: result.genres[0] }, //cannot make queries with variables to work
      },
    ],
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message);
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    await addBook({ variables: { title, author, published, genres } });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
