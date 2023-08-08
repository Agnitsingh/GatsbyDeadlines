import React, { useState, useRef } from 'react';
import { graphql } from 'gatsby';
import { format } from 'date-fns';
import { Link } from 'gatsby';
import './index.css';
import { StaticImage } from 'gatsby-plugin-image';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

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
        <span class="link"><Link to="/fall">Fall Deadlines</Link></span>
        <span class="link"><Link to="/spring">Spring Deadlines</Link></span>
      </div>

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
