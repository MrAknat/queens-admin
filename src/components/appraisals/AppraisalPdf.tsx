import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { Appraisal } from "@/hooks/useAppraisals";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#666666",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    backgroundColor: "#F0F0F0",
    padding: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    width: 150,
    fontWeight: "bold",
    fontSize: 12,
  },
  value: {
    flex: 1,
    fontSize: 12,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#999999",
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
    paddingTop: 10,
  },
});

interface AppraisalPdfProps {
  appraisal: Appraisal;
}

export const AppraisalPdf = ({ appraisal }: AppraisalPdfProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return "N/A";
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
    }).format(amount);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Vehicle Appraisal Report</Text>
          <Text style={styles.subtitle}>
            Generated on {new Date().toLocaleDateString("en-AU")}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{appraisal.vehicle.description}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Registration:</Text>
            <Text style={styles.value}>{appraisal.vehicle.rego}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>VIN:</Text>
            <Text style={styles.value}>{appraisal.vehicle.vin}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Odometer:</Text>
            <Text style={styles.value}>
              {appraisal.lastOdometer
                ? `${appraisal.lastOdometer.toLocaleString()} km`
                : "N/A"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Appraisal Date:</Text>
            <Text style={styles.value}>{formatDate(appraisal.createdAt)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Valuation Summary</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Estimated Retail:</Text>
            <Text style={[styles.value, styles.price]}>
              {formatCurrency(appraisal.estimatedRetail)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Trade-In Estimate:</Text>
            <Text style={[styles.value, styles.price]}>
              {formatCurrency(appraisal.tradeInEstimate)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Manager Max Offer:</Text>
            <Text style={[styles.value, styles.price]}>
              {formatCurrency(appraisal.managerMaxOffer)}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>
            Queens • 123 Car Street, Auto City • (02) 1234 5678 •
            www.queens.com.au
          </Text>
        </View>
      </Page>
    </Document>
  );
};
