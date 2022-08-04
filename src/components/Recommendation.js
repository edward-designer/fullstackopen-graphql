import React from "react";

import { useQuery } from "@apollo/client";

import QUERIES from "../util/gql";

const Recommendation = ({ show, books }) => {
  const ME = useQuery(QUERIES.GET_ME);
  console.log(books.data.allBooks);
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
          {books.data.allBooks
            .filter((book) => book.genres.includes(ME.data.me.favoriteGenre))
            .map((a) => (
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
