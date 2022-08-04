import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import QUERIES from "../util/gql";

const EditAuthor = ({ authors }) => {
  const [born, setBorn] = useState(parseInt(authors[0].born));
  const [name, setName] = useState(authors[0].name);

  const [editAuthor] = useMutation(QUERIES.SET_AUTHOR_BIRTH_YEAR, {
    refetchQueries: [{ query: QUERIES.ALL_AUTHORS }],
  });

  const handleAuthorUpdate = async () => {
    console.log(name, born);
    await editAuthor({ variables: { name: name, setBornTo: born } });

    setName(authors[0].name);
  };

  const handleBornChange = (e) => {
    setBorn(parseInt(e.target.value));
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    const selectedAuthor = authors.find((author) => author.name === name);
    if (!selectedAuthor || !selectedAuthor.born) {
      setBorn("");
      return;
    }
    setBorn(parseInt(selectedAuthor.born));
  }, [name, authors]);

  return (
    <div>
      <h3>Set birthyear</h3>
      <label hmtlfor="name">Name</label>
      <select id="name" value={name} onChange={handleNameChange}>
        {authors.map((author) => (
          <option value={author.name} key={author.name}>
            {author.name}
          </option>
        ))}
      </select>
      <br />
      <label hmtlfor="born">Born</label>
      <input type="number" id="born" value={born} onChange={handleBornChange} />
      <br />
      <button onClick={handleAuthorUpdate} type="button">
        Update
      </button>
    </div>
  );
};

export default EditAuthor;
