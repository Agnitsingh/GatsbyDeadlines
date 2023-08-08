import React, { useState, useRef } from 'react';
import { graphql } from 'gatsby';
import { format } from 'date-fns';
import { Link } from 'gatsby';
import './index.css';
import { StaticImage } from 'gatsby-plugin-image';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocumentFall from './PDFDocumentFall';

const GradRight = ({ data }) => {
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
    (deadline) => deadline.Fall_Deadline <= inputDate
  );
  filteredDeadlines.sort((a, b) => new Date(a.Fall_Deadline) - new Date(b.Fall_Deadline)); // Sort deadlines in ascending order

 

  return (
    <div className="page">
      <div className="head">
        <img
          src="https://www.gradright.com/wp-content/themes/gradright/img/logo.svg"
          alt="GradRight Logo"
          className="logo"
        />
      </div>
      
      <div className="colored">
        <div className="main">

          <div className="text">
            Right Selection <br/> Bright Career
          </div>

          <div className="myImg">
            <StaticImage src="../images/project.png" alt="Project Image" className="dimg" />
          </div>
        </div>

        <div className="textSmall">
          A smarter way to find the right university at right time
        </div>

        <div className="button">
          <a href="https://www.gradright.com/"><button className='btn'>Explore More</button></a>
        </div>

      </div>

      <div className="fall">
        Select intake to check the deadlines
      </div>

      <div class="links">
        <span class="link"><Link to="/summer">Summer Deadlines</Link></span>
        <span class="linkFall"><Link to="/fall">Fall Deadlines</Link></span>
        <span class="link"><Link to="/spring">Spring Deadlines</Link></span>
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
        <div>
        <div className="deadlines">
          <table className="deadline-table">
            <thead>
              <tr>
                <th>University Name</th>
                <th>Degree Name</th>
                <th>Program Name</th>
                <th>Deadline</th>
                <th>University Link</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeadlines.map((deadline, index) => (
                <tr key={index}>
                  <td>{deadline.University_Name}</td>
                  <td>{deadline.Degree_Name}</td>
                  <td>{deadline.Program_Name}</td>
                  <td>{format(new Date(deadline.Fall_Deadline), 'dd-MM-yyyy')}</td>
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

        <div className="print-pdf">
      <PDFDownloadLink
        document={<PDFDocumentFall deadlines={filteredDeadlines} />}
        fileName="university_deadlines.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Print as PDF'
        }
      </PDFDownloadLink>
    </div>
    </div>
      )}
    </div>
  );
};

export const pageQuery = graphql`
  query {
    allMongodbDeadlinesDemoDd {
      nodes {
        Fall_Deadline
        University_Name
        Degree_Name
        Program_Name
        University_Link
      }
    }
  }
`;

export default GradRight;
