import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import type { ExtendedSalaryData, PdfData } from '../../types/salary';
import { formattedPrice } from '../../utils/ctc.util';

export const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#fafafa',
    lineHeight: 1.4,
  },

  // Header section
  header: {
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#e2e8f0',
  },

  companyLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
    marginVertical: 4,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },

  subtitle: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: 'normal',
  },

  // CTC Display
  ctcContainer: {
    backgroundColor: '#f8fafc',
    padding: 20,
    marginBottom: 28,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderRightColor: '#3b82f6',
    borderLeftColor: '#3b82f6',
  },

  ctcLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  ctcAmountLine: {
    flexDirection: 'row',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },

  ctcAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    letterSpacing: -0.5,
  },

  ctcPeriod: {
    fontSize: 12,
    color: '#64748b',
  },

  // Table styles
  table: {
    marginBottom: 20,
  },

  mt: {
    marginTop: 60,
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#5F6368',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },

  tableHeaderText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  sectionHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
  },

  sectionHeaderText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#1e293b',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },

  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },

  evenRow: {
    backgroundColor: '#f8fafc',
  },

  summaryRowHighlight: {
    backgroundColor: '#f0f9ff',
    borderWidth: 1,
    borderColor: '#bae6fd',
    fontWeight: 'bold',
  },

  cellLeft: {
    flex: 2,
    fontSize: 11,
    // color: '#374151',
    paddingRight: 16,
  },

  cellRight: {
    flex: 1,
    fontSize: 11,
    // color: '#1f2937',
    textAlign: 'right',
    fontWeight: '500',
  },

  cellRightBold: {
    fontWeight: 'bold',
    color: '#1e293b',
  },

  // Summary section
  summaryContainer: {
    marginTop: 38,
    padding: 20,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },

  summaryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e0f2fe',
  },

  summaryLastRow: {
    borderBottomWidth: 0,
    paddingTop: 12,
    marginTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#0ea5e9',
  },

  summaryLabel: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },

  summaryValue: {
    fontSize: 12,
    color: '#1f2937',
    fontWeight: 'bold',
  },

  summaryNetValue: {
    fontSize: 16,
    color: '#0c4a6e',
    fontWeight: 'bold',
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 48,
    right: 48,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },

  footerText: {
    fontSize: 9,
    color: '#64748b',
    textAlign: 'center',
  },
});


const SalaryPDFDocument = ({ salaryData }: { salaryData: ExtendedSalaryData }) => {
  const pdfSalaryData: PdfData = {
    earnings: [
      { label: 'Basic Salary', value: salaryData.basicSalary },
      { label: 'House Rent Allowance (HRA)', value: salaryData.hra },
      { label: 'Dearness Allowance (DA)', value: salaryData.da },
      { label: 'Leave Travel Allowance (LTA)', value: salaryData.lta },
      { label: 'Special Allowance', value: salaryData.specialAllowance },
      { label: 'Performance Bonus', value: salaryData.performanceBonus },
    ],
    deductions: [
      { label: 'Employee Provident Fund (EPF)', value: salaryData.epf },
      { label: 'Professional Tax', value: salaryData.professionalT },
      { label: 'Employee State Insurance (ESI)', value: salaryData.Esi },
      { label: 'Income Tax (TDS)', value: salaryData.tds },
    ]
  };


  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.companyLogo}>ACME Corporation</Text>
          <Text style={styles.title}>Salary Breakdown Report</Text>
          <Text style={styles.subtitle}>Cost to Company (CTC) Analysis • Generated on {new Intl.DateTimeFormat('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          }).format(new Date())}</Text>
        </View>

        <View style={styles.ctcContainer}>
          <Text style={styles.ctcLabel}>Total Cost to Company</Text>
          <Text style={styles.ctcAmountLine}>
            <Text style={styles.ctcAmount}>Rs.{formattedPrice(salaryData.ctc)} </Text>
            <Text style={styles.ctcPeriod}>{salaryData.ctcPeriod}</Text>
          </Text>
        </View>

        {/* Earnings Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.cellLeft]}>Component</Text>
            <Text style={[styles.tableHeaderText, styles.cellRight]}>Amount</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Earnings</Text>
          </View>

          {pdfSalaryData.earnings.map((item, index) => {
            const rowStyle = index % 2 === 0
              ? [styles.row, styles.evenRow]
              : [styles.row];
            return < View key={item.label} style={rowStyle}>
              <Text style={styles.cellLeft}>{item.label}</Text>
              <Text style={styles.cellRight}>Rs.{formattedPrice(item.value)}</Text>
            </View>
          })}

          <View style={[styles.row, styles.summaryRow]}>
            <Text style={[styles.cellLeft, styles.cellRightBold]}>Gross Salary</Text>
            <Text style={[styles.cellRight, styles.cellRightBold]}>Rs.{formattedPrice(salaryData.grossSalary)}</Text>
          </View>
        </View>

        {/* Deductions Table */}
        <View style={styles.table}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Deductions</Text>
          </View>

          {pdfSalaryData.deductions.map((item, index) => {
            const rowStyle = index % 2 === 0
              ? [styles.row, styles.evenRow]
              : [styles.row];
            return <View key={item.label} style={rowStyle}>
              <Text style={styles.cellLeft}>{item.label}</Text>
              <Text style={styles.cellRight}>Rs.{formattedPrice(item.value)}</Text>
            </View>
          })}
        </View>
        {/* Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Deduction</Text>
            <Text style={styles.summaryValue}>Rs.{formattedPrice(salaryData.totalDeductions)}</Text>
          </View>

          <View style={[styles.summaryRow, styles.summaryLastRow]}>
            <Text style={[styles.summaryLabel, { fontWeight: 'bold' }]}>{salaryData.netSalaryLabel}</Text>
            <Text style={styles.summaryNetValue}>Rs.{formattedPrice(salaryData.netSalary)}</Text>
          </View>
        </View>


        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This document is auto-generated and contains confidential salary information.
            Please handle with appropriate care and security measures.
          </Text>
        </View>
      </Page>
    </Document>
  );
};


export default SalaryPDFDocument;