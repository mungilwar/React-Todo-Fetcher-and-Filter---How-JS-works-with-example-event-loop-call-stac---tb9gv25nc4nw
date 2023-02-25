import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import { Loader } from './Loader';
import { Todo } from './Todo';
import axios from 'axios';

const apiLink = 'https://jsonplaceholder.typicode.com/todos';

const App = () => {
  const [complete, setComplete] = useState(true);
  const [ischecked, setIschecked] = useState(true);
  const [incomplete, setIncomplete] = useState(false);
  const [loading, setloading] = useState(true);
  const [post, setPost] = useState([]);
  const [get, setGet] = useState([]);

  useEffect(() => {
    async function getStoredData() {
      const response = await axios.get(apiLink);
      console.log(response);
      console.log(response.data);

      setPost(response.data.slice(0, 20));
      console.log(...post);
      setloading(false);
    }
    getStoredData();
  }, []);

  function handleChange(e) {
    const value = e.target.value;
    const checked = e.target.checked;

    if (value === 'completed') {
      setIschecked(checked);
      if (checked) {
        const filtered = post.filter((item) => item.completed);
        setGet(filtered);
      } else {
        setGet([]);
      }
    } else if (value === 'incomplete') {
      setIncomplete(checked);
      if (checked) {
        const filtered = post.filter((item) => !item.completed);
        setGet(filtered);
      } else {
        setGet([]);
      }
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
