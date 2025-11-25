import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import moment from "moment";
import type { Appraisal } from "@/hooks/useAppraisals";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 7,
  },
  headerBanner: {
    backgroundColor: "#F5A623",
    padding: 10,
  },
  headerText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
  },
  section: {
    height: "33.33%",
    marginTop: 5,
  },
  topSection: {
    height: "30%",
    backgroundColor: "#F5E6D3",
  },
  sectionContent: {
    paddingHorizontal: 25,
    paddingTop: 15,
  },
  topSectionContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  infoSection: {
    flexDirection: "column",
    flex: 1,
  },
  qrSection: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  qrPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  qrText: {
    fontSize: 8,
    textAlign: "center",
  },
  introText: {
    fontSize: 9,
    marginBottom: 10,
    lineHeight: 1.4,
  },
  numberedItem: {
    fontSize: 9,
    marginBottom: 8,
    lineHeight: 1.4,
  },
  numberedItemTitle: {
    fontWeight: "bold",
  },
  numberedItemContent: {
    marginLeft: 12,
    marginTop: 3,
  },
  noteText: {
    fontSize: 9,
    marginTop: 10,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    backgroundColor: "#F5E6D3",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 8,
    fontStyle: "italic",
    marginBottom: 10,
  },
  tableContainer: {
    marginBottom: 15,
  },
  table: {
    width: "100%",
  },
  tableTitleHeader: {
    backgroundColor: "#F5E6D3",
  },
  tableHeader: {
    flexDirection: "row",
    padding: 5,
    marginBottom: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: "#D4C4B0",
  },
  tableHeaderText: {
    fontSize: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    padding: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: "#D4C4B0",
    minHeight: 16,
  },
  tableCell: {
    fontSize: 7,
    textAlign: "center",
    lineHeight: 1.3,
  },
  vehicleBar: {
    backgroundColor: "#000000",
    color: "#FFFFFF",
    fontSize: 7,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
    transform: "rotate(-90deg)",
    transformOrigin: "center",
    position: "absolute",
    left: -40,
    width: 150,
  },
  noData: {
    fontSize: 9,
    fontStyle: "italic",
    color: "#666666",
    textAlign: "center",
    marginTop: 10,
  },
  // Second Page Styles
  secondPageSection: {
    height: "33.33%",
  },
  summaryHeader: {
    backgroundColor: "#2B5A8E",
    padding: 15,
  },
  summaryHeaderTitle: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 5,
  },
  summaryHeaderText: {
    color: "#FFFFFF",
    fontSize: 9,
  },
  odometerSection: {
    backgroundColor: "#F5E6D3",
    padding: 12,
  },
  odometerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  warrantySection: {
    backgroundColor: "#E74C3C",
    padding: 12,
  },
  warrantyText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  priceSection: {
    backgroundColor: "#F5A623",
    padding: 15,
    flexDirection: "column",
    gap: 10,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceLabelContainer: {
    flexDirection: "row",
    gap: 5,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  priceSubLabel: {
    fontSize: 9,
    marginTop: 2,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
  },
  centerSection: {
    marginTop: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  marketSnapshotText: {
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 1.3,
  },
  footerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    marginTop: 20,
  },
  vehicleInfo: {
    backgroundColor: "#2B5A8E",
    padding: 4,
  },
  vehicleInfoText: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "bold",
  },
  dateInfo: {
    backgroundColor: "#A0A0A0",
    padding: 4,
  },
  dateInfoText: {
    fontSize: 8,
  },
  logoSection: {
    alignItems: "flex-end",
  },
  logoText: {
    fontSize: 10,
    fontWeight: "bold",
  },
});

interface AppraisalPdfProps {
  appraisal: Appraisal;
}

export const AppraisalPdf = ({ appraisal }: AppraisalPdfProps) => {
  console.log(appraisal);

  const formatCurrency = (amount: number | null) => {
    if (amount === null || amount === undefined) return "N/A";
    return `$${amount.toLocaleString("en-AU")}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatKms = (kms: number | null) => {
    if (kms === null || kms === undefined) return "N/A";
    return `${kms.toLocaleString()} km`;
  };

  // Separate active and delisted leads
  const activeLeads = appraisal.leads.filter((lead) => !lead.removedAt);
  const delistedLeads = appraisal.leads.filter((lead) => lead.removedAt);

  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="portrait">
        {/* Header Banner */}
        <View style={styles.headerBanner}>
          <Text style={styles.headerText}>HOW TO READ THIS SNAPSHOT</Text>
        </View>

        {/* Main Content - 3 Equal Sections */}
        <View style={styles.content}>
          {/* First Section: Instructions and QR Code */}
          <View style={styles.topSection}>
            <View style={styles.sectionContent}>
              <View style={styles.topSectionContent}>
                <View style={styles.infoSection}>
                  <Text style={styles.introText}>
                    We've pulled live market data to give you a clear, unbiased
                    snapshot of your vehicle's current position:
                  </Text>

                  <View style={styles.numberedItem}>
                    <Text style={styles.numberedItemTitle}>1. Your Car</Text>
                    <Text style={styles.numberedItemContent}>
                      We matched your make, model, and kms to similar cars on
                      the market.
                    </Text>
                  </View>

                  <View style={styles.numberedItem}>
                    <Text style={styles.numberedItemTitle}>
                      2. Real Prices.
                    </Text>
                    <Text style={styles.numberedItemContent}>
                      We show what others sold for — not guesses.
                    </Text>
                  </View>

                  <View style={styles.numberedItem}>
                    <Text style={styles.numberedItemTitle}>
                      3. Today's Value.
                    </Text>
                    <Text style={styles.numberedItemContent}>
                      You'll see what yours could retail for — and what a dealer
                      might offer in trade.
                    </Text>
                  </View>

                  <Text style={styles.noteText}>
                    No obligations. No pressure. Just useful info.
                  </Text>

                  <Text style={[styles.noteText, styles.italic]}>
                    *Offers are valid for 30 days from the print date.
                  </Text>
                </View>

                {/* QR Code Section */}
                <View style={styles.qrSection}>
                  <View style={styles.qrPlaceholder}>
                    <Text style={styles.qrText}>QR CODE</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Second Section: What's Been Selling */}
          <View style={styles.section}>
            <View style={styles.tableContainer}>
              <View style={styles.tableTitleHeader}>
                <View style={styles.sectionContent}>
                  <Text style={styles.sectionTitle}>WHAT'S BEEN SELLING</Text>
                  <Text style={styles.sectionSubtitle}>
                    {delistedLeads.length} cars like yours sold in the last 60
                    days
                  </Text>
                </View>
              </View>

              {delistedLeads.length > 0 ? (
                <View style={styles.sectionContent}>
                  <View style={styles.table}>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                      <Text style={[styles.tableHeaderText, { width: "6%" }]}>
                        ID
                      </Text>
                      <Text style={[styles.tableHeaderText, { width: "14%" }]}>
                        Drive Away
                      </Text>
                      <Text style={[styles.tableHeaderText, { width: "12%" }]}>
                        Kms
                      </Text>
                      <Text style={[styles.tableHeaderText, { width: "12%" }]}>
                        Color
                      </Text>
                      <Text style={[styles.tableHeaderText, { width: "8%" }]}>
                        Age
                      </Text>
                      <Text style={[styles.tableHeaderText, { width: "12%" }]}>
                        Seller
                      </Text>
                      <Text style={[styles.tableHeaderText, { width: "10%" }]}>
                        State
                      </Text>
                      <Text style={[styles.tableHeaderText, { width: "26%" }]}>
                        Sources
                      </Text>
                    </View>

                    {/* Table Rows */}
                    {delistedLeads.slice(0, 8).map((lead, index) => {
                      const daysToSell = moment(lead.removedAt).diff(
                        lead.listedAt,
                        "days",
                      );

                      return (
                        <View key={lead._id || index} style={styles.tableRow}>
                          <Text style={[styles.tableCell, { width: "6%" }]}>
                            {index + 1}
                          </Text>
                          <Text style={[styles.tableCell, { width: "14%" }]}>
                            {formatCurrency(lead.driveAwayPrice)}
                          </Text>
                          <Text style={[styles.tableCell, { width: "12%" }]}>
                            {formatKms(lead.kms)}
                          </Text>
                          <Text style={[styles.tableCell, { width: "12%" }]}>
                            {lead.color || "N/A"}
                          </Text>
                          <Text style={[styles.tableCell, { width: "8%" }]}>
                            {daysToSell ? `${daysToSell}d` : "N/A"}
                          </Text>
                          <Text style={[styles.tableCell, { width: "12%" }]}>
                            {lead.sellerType || "N/A"}
                          </Text>
                          <Text style={[styles.tableCell, { width: "10%" }]}>
                            {lead.state || "N/A"}
                          </Text>
                          <Text style={[styles.tableCell, { width: "26%" }]}>
                            {lead.listingSources?.join(", ") || "N/A"}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ) : (
                <View style={styles.sectionContent}>
                  <Text style={styles.noData}>
                    No recent sales data available
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Third Section: What's on the Market */}
          <View style={styles.section}>
            <View style={styles.tableContainer}>
              <View style={styles.tableTitleHeader}>
                <View style={styles.sectionContent}>
                  <Text style={styles.sectionTitle}>WHAT'S ON THE MARKET</Text>
                  <Text style={styles.sectionSubtitle}>
                    {activeLeads.length} cars currently live across Carsales,
                    Gumtree, Autotrader, etc.
                  </Text>
                </View>
              </View>

              {activeLeads.length > 0 ? (
                <View style={styles.sectionContent}>
                  <View style={styles.table}>
                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                      <Text style={[styles.tableHeaderText, { width: "6%" }]}>
                        ID
                      </Text>
                      <Text style={[styles.tableHeaderText, { width: "14%" }]}>
                        Drive Away
                      </Text>
                      <Text style={[styles.tableHeaderText, { width: "12%" }]}>
                        Kms
                      </Text>
                      <Text style={[styles.tableHeaderText, { width: "12%" }]}>
                        Color
                      </Text>
                      <Text style={[styles.tableHeaderText, { width: "8%" }]}>
                        Age
                      </Text>
                      <Text style={[styles.tableHeaderText, { width: "12%" }]}>
                        Seller
                      </Text>
                      <Text style={[styles.tableHeaderText, { width: "10%" }]}>
                        State
                      </Text>
                      <Text style={[styles.tableHeaderText, { width: "26%" }]}>
                        Sources
                      </Text>
                    </View>

                    {/* Table Rows */}
                    {activeLeads.slice(0, 8).map((lead, index) => {
                      const daysListed = moment().diff(lead.listedAt, "days");

                      return (
                        <View key={lead._id || index} style={styles.tableRow}>
                          <Text style={[styles.tableCell, { width: "6%" }]}>
                            {index + 1}
                          </Text>
                          <Text style={[styles.tableCell, { width: "14%" }]}>
                            {formatCurrency(lead.driveAwayPrice)}
                          </Text>
                          <Text style={[styles.tableCell, { width: "12%" }]}>
                            {formatKms(lead.kms)}
                          </Text>
                          <Text style={[styles.tableCell, { width: "12%" }]}>
                            {lead.color || "N/A"}
                          </Text>
                          <Text style={[styles.tableCell, { width: "8%" }]}>
                            {daysListed}d
                          </Text>
                          <Text style={[styles.tableCell, { width: "12%" }]}>
                            {lead.sellerType || "N/A"}
                          </Text>
                          <Text style={[styles.tableCell, { width: "10%" }]}>
                            {lead.state || "N/A"}
                          </Text>
                          <Text style={[styles.tableCell, { width: "26%" }]}>
                            {lead.listingSources?.join(", ") || "N/A"}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              ) : (
                <View style={styles.sectionContent}>
                  <Text style={styles.noData}>
                    No active listings available
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Page>

      {/* Second Page: Summary */}
      <Page size="A4" style={styles.page} orientation="portrait">
        {/* First Third: Summary Information */}
        <View style={styles.secondPageSection}>
          {/* Summary Header */}
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryHeaderTitle}>SUMMARY</Text>
            <Text style={styles.summaryHeaderText}>
              {appraisal.vehicle.description}
            </Text>
          </View>

          {/* Odometer Section */}
          <View style={styles.odometerSection}>
            <Text style={styles.odometerText}>
              ODOMETER: {formatKms(appraisal.lastOdometer)}
            </Text>
          </View>

          {/* Warranty Section */}
          {/* <View style={styles.warrantySection}>
            <Text style={styles.warrantyText}>WARRANTY LEFT: 5Y 8M</Text>
          </View> */}

          {/* Price Section */}
          <View style={styles.priceSection}>
            <View style={styles.priceRow}>
              <View style={styles.priceLabelContainer}>
                <Text style={styles.priceLabel}>ESTIMATED RETAIL</Text>
                <Text style={styles.priceSubLabel}>
                  (based on what's been selling)
                </Text>
              </View>
              <Text style={styles.priceValue}>
                {formatCurrency(appraisal.estimatedRetail)}
              </Text>
            </View>
            <View style={styles.priceRow}>
              <View style={styles.priceLabelContainer}>
                <Text style={styles.priceLabel}>TRADE-IN ESTIMATE</Text>
                <Text style={styles.priceSubLabel}>(dealer offer)</Text>
              </View>
              <Text style={styles.priceValue}>
                {formatCurrency(appraisal.managerMaxOffer)}
              </Text>
            </View>
          </View>
        </View>

        {/* Second Third: Empty Space */}
        <View style={styles.secondPageSection} />

        {/* Third Section: Market Snapshot Title and Footer */}
        <View style={styles.secondPageSection}>
          {/* Center Section - Market Snapshot */}
          <View style={styles.centerSection}>
            <Text style={styles.marketSnapshotText}>Market Snapshot</Text>
            <Text style={styles.marketSnapshotText}>for Your Car</Text>
          </View>

          {/* Footer Section */}
          <View style={styles.footerSection}>
            <View style={{ flexDirection: "row", marginBottom: 3 }}>
              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleInfoText}>
                  {appraisal.vehicle.rego.toUpperCase()}
                </Text>
              </View>
              <View style={styles.dateInfo}>
                <Text style={styles.dateInfoText}>
                  {formatDate(appraisal.createdAt)}
                </Text>
              </View>
            </View>
            <View style={styles.logoSection}>
              <Text style={styles.logoText}>Queens</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
