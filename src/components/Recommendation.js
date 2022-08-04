import React from "react";

import { useQuery } from "@apollo/client";

import QUERIES from "../util/gql";

const Recommendation = ({ show }) => {
  const ME = useQuery(QUERIES.GET_ME);
  const favGenre = ME.data?.me.favoriteGenre;

  const books = useQuery(QUERIES.ALL_BOOKS_BY_GENRES, {
    variables: { genres: favGenre },
    skip: !favGenre,
  });

  if (!show) return null;
  return (
    <div>
      <h2>Recommendation</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendation;
