import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import { Loader } from './Loader';
import { Todo } from './Todo';
import axios from 'axios';

const apiLink = 'https://jsonplaceholder.typicode.com/todos';

const App = () => {
  const [complete, setComplete] = useState(true);
  const [ischecked, setischecked] = useState(true);
  const [incomplete, setIncomplete] = useState(false);
  const [loading, setloading] = useState(true);
  const [post, setpost] = useState([]);
  const [get, setGet] = useState([]);

  useEffect(() => {
    async function getStoredData() {
      const response = await axios.get(apiLink);
      console.log(response);
      console.log(response.data);

      setpost(response.data.slice(0, 20));
      console.log(...post);
      setloading(false);
    }
    getStoredData();
  }, []);

  function handleChange(e) {
    setComplete(!complete);
    let word = e.target.value;
    console.log(word);
    setIncomplete(!incomplete);
    setischecked(!ischecked);

    if (word === 'completed') {
      const filtered = post.filter((item) => item.completed === false);
      setpost(filtered);
    } else if (word === 'incompleted') {
      const filtered = post.filter((item) => item.completed === true);
      setpost(filtered);
    }
  }

  function filterItem(filterType) {
    if (filterType === 'Completed') {
      const filtered = post.filter((item) => item.completed === true);
      setGet(filtered);
    } else if (filterType === 'Incomplete') {
      const filtered = post.filter((item) => item.completed === false);
      setGet(filtered);
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
          {post.map((e) => (
            <Todo
              key={e.id}
              id={`todo-${e.id}`}
              title={e.title}
              completed={e.completed ? 'completed' : 'incomplete'}
            />
          ))}
          <br />
          <br />
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
