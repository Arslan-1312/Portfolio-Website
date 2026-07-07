import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link, Font } from '@react-pdf/renderer';
import { personalInfo, education, experiences, projectsData, certificationsData } from '../data/portfolioData.js';

// Define fonts
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-800.ttf', fontWeight: 800 },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-italic.ttf', fontStyle: 'italic' },
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    fontFamily: 'Open Sans',
  },
  leftColumn: {
    width: '35%',
    backgroundColor: '#0f172a', // slate-900
    padding: 30,
    color: '#f8fafc', // slate-50
  },
  rightColumn: {
    width: '65%',
    padding: 30,
    paddingTop: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: 800,
    marginBottom: 5,
    color: '#38bdf8', // primary-cyan
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 30,
    color: '#94a3b8', // slate-400
  },
  sectionTitleLeft: {
    fontSize: 16,
    fontWeight: 800,
    marginBottom: 10,
    marginTop: 20,
    color: '#e2e8f0',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 5,
  },
  sectionTitleRight: {
    fontSize: 18,
    fontWeight: 800,
    marginBottom: 10,
    color: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
    paddingBottom: 5,
    marginTop: 15,
  },
  textLeft: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 5,
    color: '#cbd5e1',
  },
  linkLeft: {
    color: '#38bdf8',
    textDecoration: 'none',
  },
  textRight: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#334155',
  },
  contactItem: {
    marginBottom: 10,
  },
  contactLabel: {
    fontSize: 9,
    fontWeight: 600,
    color: '#94a3b8',
    marginBottom: 2,
  },
  itemContainer: {
    marginBottom: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 800,
    color: '#0f172a',
  },
  itemSubtitle: {
    fontSize: 10,
    fontWeight: 600,
    color: '#0284c7', // primary-blue
    fontStyle: 'italic',
  },
  itemDate: {
    fontSize: 9,
    color: '#64748b',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingRight: 10,
  },
  bulletDot: {
    width: 3,
    height: 3,
    backgroundColor: '#0ea5e9',
    borderRadius: 1.5,
    marginTop: 5,
    marginRight: 5,
  },
  bulletText: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#334155',
    flex: 1,
  },
  certItem: {
    marginBottom: 10,
  },
  certTitle: {
    fontSize: 10,
    fontWeight: 800,
    color: '#e2e8f0',
  },
  certIssuer: {
    fontSize: 9,
    color: '#94a3b8',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  tag: {
    fontSize: 8,
    backgroundColor: '#f1f5f9',
    color: '#475569',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
    marginRight: 4,
    marginBottom: 4,
  }
});

const CVDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Left Column */}
      <View style={styles.leftColumn}>
        <Text style={styles.name}>{personalInfo.name}</Text>
        <Text style={styles.title}>{personalInfo.title}</Text>
        
        <Text style={styles.sectionTitleLeft}>About Me</Text>
        <Text style={styles.textLeft}>{personalInfo.summary}</Text>

        <Text style={styles.sectionTitleLeft}>Contact</Text>
        
        {personalInfo.email && (
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Email</Text>
            <Link src={`mailto:${personalInfo.email}`} style={styles.linkLeft}>
              <Text style={styles.textLeft}>{personalInfo.email}</Text>
            </Link>
          </View>
        )}
        
        {personalInfo.phone && (
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Phone</Text>
            <Text style={styles.textLeft}>{personalInfo.phone}</Text>
          </View>
        )}

        {personalInfo.location && (
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>Location</Text>
            <Text style={styles.textLeft}>{personalInfo.location}</Text>
          </View>
        )}

        {personalInfo.linkedin && (
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>LinkedIn</Text>
            <Link src={personalInfo.linkedin} style={styles.linkLeft}>
              <Text style={styles.textLeft}>linkedin.com/in/arslan-iqbal</Text>
            </Link>
          </View>
        )}

        {personalInfo.github && (
          <View style={styles.contactItem}>
            <Text style={styles.contactLabel}>GitHub</Text>
            <Link src={personalInfo.github} style={styles.linkLeft}>
              <Text style={styles.textLeft}>github.com/arslaniqbal4666</Text>
            </Link>
          </View>
        )}

        <Text style={styles.sectionTitleLeft}>Certifications</Text>
        {certificationsData.slice(0, 5).map((cert, index) => (
          <View key={index} style={styles.certItem}>
            <Text style={styles.certTitle}>{cert.title}</Text>
            <Text style={styles.certIssuer}>{cert.issuer} • {cert.date}</Text>
          </View>
        ))}
      </View>

      {/* Right Column */}
      <View style={styles.rightColumn}>
        
        {/* Education */}
        <Text style={{...styles.sectionTitleRight, marginTop: 0}}>Education</Text>
        {education.map((edu, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{edu.degree}</Text>
              <Text style={styles.itemDate}>{edu.duration}</Text>
            </View>
            <Text style={styles.itemSubtitle}>{edu.institution}</Text>
            <Text style={styles.textRight}>{edu.description}</Text>
          </View>
        ))}

        {/* Experience */}
        <Text style={styles.sectionTitleRight}>Experience</Text>
        {experiences.map((exp, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{exp.role}</Text>
              <Text style={styles.itemDate}>{exp.duration}</Text>
            </View>
            <Text style={styles.itemSubtitle}>{exp.company}</Text>
            {exp.bullets && exp.bullets.map((bullet, bIndex) => (
              <View key={bIndex} style={styles.bulletPoint}>
                <View style={styles.bulletDot} />
                <Text style={styles.bulletText}>{bullet}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* Projects */}
        <Text style={styles.sectionTitleRight}>Projects</Text>
        {projectsData.slice(0, 4).map((proj, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{proj.title}</Text>
            </View>
            <Text style={{...styles.textRight, marginBottom: 4}}>{proj.description}</Text>
            <View style={styles.tagsContainer}>
              {proj.tags.slice(0, 4).map((tag, tIndex) => (
                <Text key={tIndex} style={styles.tag}>{tag}</Text>
              ))}
            </View>
          </View>
        ))}

      </View>
    </Page>
  </Document>
);

export default CVDocument;
