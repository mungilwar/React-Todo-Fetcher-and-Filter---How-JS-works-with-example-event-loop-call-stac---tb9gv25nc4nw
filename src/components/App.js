import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import { Loader } from './Loader';
import { Todo } from './Todo';
import axios from 'axios';

const apiLink = 'https://jsonplaceholder.typicode.com/todos';

const App = () => {
  const [complete, setcomplete] = useState(true);
  const [ischecked, setischecked] = useState(true);
  const [incomplete, setincomplete] = useState(false);
  const [loading, setloading] = useState(true); // set loading to true initially
  const [post, setpost] = useState([]);
  const [get, setGet] = useState([]);

  useEffect(() => {
    async function getStoredData() {
      const response = await axios.get(apiLink);
      console.log(response);
      console.log(response.data);

      setpost(response.data.slice(0, 20)); // use slice instead of splice to get the first 20 todos
      console.log(...post);
      setloading(false); // set loading to false after data is fetched
    }
    getStoredData();
  }, []);

  function handleChange(e) {
    let word = e.target.value;
    setcomplete(!complete);
    setincomplete(!incomplete);

    if (word === 'completed') {
      const filtered = post.filter((item) => item.completed === false); // fix filter function to filter out completed tasks
      setpost(filtered);
    } else if (word === 'incompleted') {
      const filtered = post.filter((item) => item.completed === true); // filter out incomplete tasks
      setpost(filtered);
    }
  }

  return (
    <>
      {loading && (
        <h1>
          <Loader />
        </h1>
      )}
      {!loading && (
        <>
          <ol>
            {post.map((e) => (
              <Todo
                key={e.id}
                id={`todo-${e.id}`}
                title={e.title}
                completed={e.completed}
              />
            ))}
          </ol>
          <div id="filter-holder">
            <span>Show completed</span>
            <input
              type="checkbox"
              id="completed-checkbox"
              checked={ischecked}
              value="completed"
              onChange={handleChange}
            />
            <br />
            <span>Show incompleted</span>
            <input
              type="checkbox"
              id="incompleted-checkbox"
              checked={incomplete}
              value="incompleted"
              onChange={handleChange}
            />
          </div>
        </>
      )}
    </>
  );
};

export default App;
