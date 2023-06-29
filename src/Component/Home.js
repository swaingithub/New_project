import React, { useState, useEffect } from "react";
import axios from "axios";
import './home.css'

const Home = () => {
  const [content, setContent] = useState("");
  const [people, setPeople] = useState([]);

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users?page=2")
      .then((resp) => {
        console.log("Successfully got the data", resp);
        setPeople(resp.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const filteredPeople = people.filter((people) =>
    people.first_name.toLowerCase().includes(content.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        value={content}
        onChange={handleChange}
        placeholder="Search by first_name"
        className="inputBox"
      />

      <ul className="boxArea">
        {filteredPeople.map((people) => (
          <li key={people.id} className="box">
            <div className="id">{people.id}</div>
            <div className="img">
              <img src={people.avatar} alt={people.first_name} />
            </div>
            <div>First Name: {people.first_name}</div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
