// PDFDocument.js

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold',
  },
  tableColHeader: {
    width: '25%',
    borderRightWidth: 1,
    borderColor: '#000',
  },
  tableCol: {
    width: '25%',
    borderRightWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
  },
  tableCell: {
    width: '25%',
    borderRightWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
  },
  tableCellLast: {
    width: '25%',
    textAlign: 'center',
  },
});


const PDFDocumentSpring = ({ deadlines }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>University Deadlines</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text>University Name</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Degree Name</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Program Name</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>Spring Deadline</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text>University Link</Text>
            </View>
          </View>
          {deadlines.map((deadline, index) => (
            <View style={styles.tableRow} key={index}>
              <View style={styles.tableCol}>
                <Text>{deadline.University_Name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{deadline.Degree_Name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{deadline.Program_Name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{deadline.Spring_Deadline}</Text>
              </View>
              <View style={styles.tableCellLast}>
                <Text>{deadline.University_Link}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
  
  export default PDFDocumentSpring;
  