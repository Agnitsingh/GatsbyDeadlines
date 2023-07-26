import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { format } from 'date-fns';
import { Link } from 'gatsby';
import './index.css';

const SummerDeadline = ({ data }) => {
  const [inputDate, setInputDate] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (event) => {
    setInputDate(event.target.value);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const { allMongodbDeadlinesDemoDd } = data;
  let filteredDeadlines = allMongodbDeadlinesDemoDd.nodes.filter(
    (deadline) => deadline.Summer_Deadline <= inputDate
  );
  filteredDeadlines.sort((a, b) => new Date(a.Summer_Deadline) - new Date(b.Summer_Deadline)); // Sort deadlines in ascending order

  return (
    <div className="page">
      <div className="head">
        <img
          src="https://www.gradright.com/wp-content/themes/gradright/img/logo.svg"
          alt="GradRight Logo"
          className="logo"
        />
      </div>
      <div className="main">

        <div className="text">
          Right Selection Bright Carrier
        </div>

        <img
          src="https://cdn-icons-png.flaticon.com/512/2666/2666499.png"
          alt="Additional Image"
          className="dimg"
        />
      </div>

      <div className="textSmall">
        A smarter way to find the right university at right time
      </div>

      <div className="button">
        <a href="https://www.gradright.com/"><button className='btn'>Explore More</button></a>
      </div>

      <div class="links">
        <span class="link1"><Link to="/">Fall Deadlines</Link></span>
        <span class="link2"><Link to="/spring">Spring Deadlines</Link></span>

      </div>

      <div className="fall">
        Check for universities with summer deadlines
      </div>

      <div className="input-section">
        <label class="enterDate" htmlFor="date-input">Enter a date:</label>
        <input
          type="date"
          id="date-input"
          value={inputDate}
          onChange={handleInputChange}
        />
        <button class="sbtn" onClick={handleSubmit}>Submit</button>
      </div>

      {showResults && (
        <div className="deadlines">
          <table className="deadline-table">
            <thead>
              <tr>
                <th>University Name</th>
                <th>Degree Name</th>
                <th>Program Name</th>
                <th>Summer Deadline</th>
                <th>University Link</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeadlines.map((deadline, index) => (
                <tr key={index}>
                  <td>{deadline.University_Name}</td>
                  <td>{deadline.Degree_Name}</td>
                  <td>{deadline.Program_Name}</td>
                  <td>{format(new Date(deadline.Summer_Deadline), 'dd-MM-yyyy')}</td>
                  <td>
                    <a class="ulink" href={`https://${deadline.University_Link}`} target="_blank" rel="noopener noreferrer">
                      {deadline.University_Link}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export const pageQuery = graphql`
  query {
    allMongodbDeadlinesDemoDd {
      nodes {
        Summer_Deadline
        University_Name
        Degree_Name
        Program_Name
        University_Link
      }
    }
  }
`;

export default SummerDeadline;
