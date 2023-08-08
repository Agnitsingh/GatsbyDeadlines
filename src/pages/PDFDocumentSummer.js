// PDFDocument.js

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 65,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  table: {
    display: 'table',
    width: 'auto',
    marginVertical: 10,
    borderWidth: 1, // Add black border to the table
    borderColor: '#000', // Black color for the border
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    height: 50, // Increase the row height to 50 (you can adjust this value as needed)
  },
  tableHeader: {
    fontWeight: 'bold', // Make the text in the header row bold
  },
  tableCell: {
    width: '50%', // Adjust the width to fit the content better
    paddingHorizontal: 8, // Add padding to create space between the text and the border
  },
  cellContent: {
    flexDirection: 'row', // Force text to stay in one line
    overflow: 'hidden', // Hide overflowing content
  },
  cellText: {
    whiteSpace: 'nowrap', // Prevent text from wrapping
    textOverflow: 'ellipsis', // Show ellipsis for overflow
    minWidth: 0, // Allow content to shrink if necessary
  },
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}-${month}-${year}`;
};

const PDFDocumentSummer = ({ deadlines }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}><span>Grad</span><span>Right</span></Text>
      <View style={styles.table}>
        <View style={{ ...styles.tableRow, ...styles.tableHeader }}> {/* Apply header style */}
          <View style={styles.tableCell}>
            <Text>University Name</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>Degree Name</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>Program Name</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>Summer Deadline</Text>
          </View>
          <View style={styles.tableCell}>
            <Text>University Link</Text>
          </View>
        </View>
        {deadlines.map((deadline, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCell}>
              <View style={styles.cellContent}>
                <Text style={styles.cellText}>{deadline.University_Name}</Text>
              </View>
            </View>
            <View style={styles.tableCell}>
              <Text>{deadline.Degree_Name}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{deadline.Program_Name}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{formatDate(deadline.Summer_Deadline)}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{deadline.University_Link}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFDocumentSummer;
