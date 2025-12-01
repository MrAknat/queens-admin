import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import moment from "moment";
import type { Appraisal } from "@/hooks/useAppraisals";
import {
  formatCurrency,
  formatDate,
  formatKms,
  mapListingSource,
} from "@/lib/utils";

interface PDFLead {
  id: string;
  number: number;
  driveAwayPrice: number;
  kms: number;
  color: string;
  age: number;
  sellerType: string;
  state: string;
  listingSources: string[];
  listedAt: string;
  removedAt: string;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 7,
    transform: "rotate(-180deg)",
  },
  coverPage: {
    fontFamily: "Helvetica",
    padding: 7,
  },
  headerBanner: {
    display: "flex",
    flexDirection: "row",
  },
  headerBannerLightColor: {
    backgroundColor: "#fed075",
    flexBasis: "10%",
  },
  headerBannerLightestColor: {
    backgroundColor: "#feefd1",
    flexBasis: "15%",
  },
  headerText: {
    backgroundColor: "#F5A623",
    flexBasis: "75%",
    padding: 10,
    zIndex: 3,
    width: "70%",
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
    position: "relative",
    height: "30%",
    backgroundColor: "#F5E6D3",
    display: "flex",
    flexDirection: "row",
  },
  sectionContent: {
    paddingHorizontal: 25,
    paddingTop: 15,
    width: "75%",
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
    position: "absolute",
    right: 25,
    top: 25,
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
    marginBottom: 10,
  },
  singleColumnTableContainer: {
    marginTop: 5,
    marginHorizontal: 5,
  },
  multiColumnTableContainer: {
    flexDirection: "row",
    gap: 4,
    marginTop: 5,
    marginHorizontal: 5,
  },
  table: {
    width: "100%",
  },
  tableTitleHeader: {
    flexDirection: "row",
  },
  tableTitleHeaderContent: {
    backgroundColor: "#F5E6D3",
    width: "75%",
  },
  tableHeader: {
    flexDirection: "row",
    padding: 2,
    marginBottom: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: "#D4C4B0",
  },
  tableHeaderText: {
    fontSize: 6,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    padding: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: "#D4C4B0",
    height: 12,
  },
  tableCell: {
    fontSize: 5,
    textAlign: "center",
    lineHeight: 1.2,
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
    display: "flex",
    flexDirection: "row",
  },
  summaryHeaderContentContainer: {
    backgroundColor: "#2B5A8E",
    width: "75%",
    padding: 15,
  },
  summaryHeaderTitle: {
    marginBottom: 5,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    zIndex: 3,
  },
  summaryHeaderLightColor: {
    backgroundColor: "#6887ad",
    width: "10%",
  },
  summaryHeaderLightestColor: {
    backgroundColor: "#b9c8d9",
    width: "15%",
  },
  summaryHeaderText: {
    color: "#FFFFFF",
    fontSize: 9,
  },
  odometerSection: {
    display: "flex",
    flexDirection: "row",
  },
  odometerText: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "#F5E6D3",
    padding: 12,
    width: "75%",
  },
  beigeSectionLightColor: {
    backgroundColor: "#fdf7ec",
    width: "10%",
  },
  beigeSectionLightestColor: {
    backgroundColor: "#fefbf6",
    width: "15%",
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
    display: "flex",
    flexDirection: "row",
  },
  priceSectionContent: {
    backgroundColor: "#F5A623",
    padding: 15,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "75%",
  },
  priceSectionLightColor: {
    backgroundColor: "#fed075",
    width: "10%",
  },
  priceSectionLightestColor: {
    backgroundColor: "#feefd1",
    width: "15%",
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
    marginTop: 20,
    marginBottom: 10,
  },
  vehicleInfo: {
    flexDirection: "row",
    backgroundColor: "#2B5A8E",
  },
  vehicleInfoContent: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: "75%",
  },
  vehicleInfoLightColor: {
    backgroundColor: "#6887ad",
    width: "10%",
  },
  vehicleInfoLightestColor: {
    backgroundColor: "#b9c8d9",
    width: "15%",
  },
  vehicleRego: {
    flexDirection: "row",
  },
  vehicleRegoContent: {
    backgroundColor: "#000",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  vehicleRegoLightColor: {
    backgroundColor: "#595959",
    width: "10%",
  },
  vehicleRegoLightestColor: {
    backgroundColor: "#b3b3b3",
    width: "10%",
  },
  vehicleInfoText: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "bold",
  },
  dateInfo: {
    alignSelf: "flex-start",
    padding: 4,
  },
  dateInfoText: {
    fontSize: 8,
    fontWeight: "bold",
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
  const { activeLeads, delistedLeads } = appraisal.leads.reduce<{
    activeLeads: PDFLead[];
    delistedLeads: PDFLead[];
  }>(
    (acc, lead, index) => {
      const leadData = {
        id: lead._id,
        number: index + 1,
        driveAwayPrice: lead.driveAwayPrice,
        kms: lead.kms,
        color: lead.color,
        sellerType: lead.sellerType,
        state: lead.state,
        listedAt: lead.listedAt,
        removedAt: lead.removedAt,
        listingSources: lead.listingSources.map(mapListingSource),
      };

      if (lead.removedAt) {
        acc.delistedLeads.push({
          ...leadData,
          age: moment(lead.removedAt).diff(lead.listedAt, "days"),
        });
      } else {
        acc.activeLeads.push({
          ...leadData,
          age: moment().diff(lead.listedAt, "days"),
        });
      }

      return acc;
    },
    { activeLeads: [], delistedLeads: [] },
  );

  const sortLeads = (a: PDFLead, b: PDFLead) => {
    return b.age - a.age;
  };

  const filteredAndSortedDelistedLeads = delistedLeads
    .filter((lead) => {
      return moment().diff(lead.removedAt, "days") <= 60;
    })
    .sort(sortLeads);

  const sortedActiveLeads = activeLeads.sort(sortLeads);

  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="portrait">
        {/* Header Banner */}
        <View style={styles.headerBanner}>
          <Text style={styles.headerText}>HOW TO READ THIS SNAPSHOT</Text>
          <View style={styles.headerBannerLightColor} />
          <View style={styles.headerBannerLightestColor} />
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
              </View>
            </View>
            <View style={styles.beigeSectionLightColor} />
            <View style={styles.beigeSectionLightestColor} />

            {/* QR Code Section */}
            <View style={styles.qrSection}>
              <View style={styles.qrPlaceholder}>
                <Text style={styles.qrText}>QR CODE</Text>
              </View>
            </View>
          </View>

          {/* Second Section: What's Been Selling */}
          <View style={styles.section}>
            <View style={styles.tableContainer}>
              <View style={styles.tableTitleHeader}>
                <View style={styles.tableTitleHeaderContent}>
                  <View style={styles.sectionContent}>
                    <Text style={styles.sectionTitle}>WHAT'S BEEN SELLING</Text>
                    <Text style={styles.sectionSubtitle}>
                      {filteredAndSortedDelistedLeads.length} cars like yours
                      sold in the last 60 days
                    </Text>
                  </View>
                </View>
                <View style={styles.beigeSectionLightColor} />
                <View style={styles.beigeSectionLightestColor} />
              </View>

              {!filteredAndSortedDelistedLeads.length ? (
                <View style={styles.sectionContent}>
                  <Text style={styles.noData}>
                    No recent sales data available
                  </Text>
                </View>
              ) : filteredAndSortedDelistedLeads.length > 16 ? (
                <View style={styles.multiColumnTableContainer}>
                  <AppraisalPdfLeadsTable
                    leads={filteredAndSortedDelistedLeads.slice(0, 16)}
                    numberFrom={1}
                  />
                  <AppraisalPdfLeadsTable
                    leads={filteredAndSortedDelistedLeads.slice(16, 32)}
                    numberFrom={17}
                  />
                </View>
              ) : (
                <View style={styles.singleColumnTableContainer}>
                  <AppraisalPdfLeadsTable
                    leads={filteredAndSortedDelistedLeads.slice(0, 16)}
                    numberFrom={1}
                  />
                </View>
              )}
            </View>
          </View>

          {/* Third Section: What's on the Market */}
          <View style={styles.section}>
            <View style={styles.tableContainer}>
              <View style={styles.tableTitleHeader}>
                <View style={styles.tableTitleHeaderContent}>
                  <View style={styles.sectionContent}>
                    <Text style={styles.sectionTitle}>
                      WHAT'S ON THE MARKET
                    </Text>
                    <Text style={styles.sectionSubtitle}>
                      {activeLeads.length} cars currently live across Carsales,
                      Gumtree, Autotrader, etc.
                    </Text>
                  </View>
                </View>
                <View style={styles.beigeSectionLightColor} />
                <View style={styles.beigeSectionLightestColor} />
              </View>

              {!activeLeads.length ? (
                <View style={styles.sectionContent}>
                  <Text style={styles.noData}>
                    No active listings available
                  </Text>
                </View>
              ) : activeLeads.length > 16 ? (
                <View style={styles.multiColumnTableContainer}>
                  <AppraisalPdfLeadsTable
                    leads={activeLeads.slice(0, 16)}
                    numberFrom={1}
                  />
                  <AppraisalPdfLeadsTable
                    leads={activeLeads.slice(16, 32)}
                    numberFrom={17}
                  />
                </View>
              ) : (
                <View style={styles.singleColumnTableContainer}>
                  <AppraisalPdfLeadsTable
                    leads={activeLeads.slice(0, 16)}
                    numberFrom={1}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </Page>

      {/* Second Page: Summary */}
      <Page size="A4" style={styles.coverPage} orientation="portrait">
        {/* First Third: Summary Information */}
        <View style={styles.secondPageSection}>
          {/* Summary Header */}
          <View style={styles.summaryHeader}>
            <View style={styles.summaryHeaderContentContainer}>
              <Text style={styles.summaryHeaderTitle}>SUMMARY</Text>
              <Text style={styles.summaryHeaderText}>
                {appraisal.vehicle.description}
              </Text>
            </View>
            <View style={styles.summaryHeaderLightColor} />
            <View style={styles.summaryHeaderLightestColor} />
          </View>

          {/* Odometer Section */}
          <View style={styles.odometerSection}>
            <Text style={styles.odometerText}>
              ODOMETER: {formatKms(appraisal.lastOdometer)}
            </Text>
            <View style={styles.beigeSectionLightColor} />
            <View style={styles.beigeSectionLightestColor} />
          </View>

          {/* Warranty Section */}
          {/* <View style={styles.warrantySection}>
            <Text style={styles.warrantyText}>WARRANTY LEFT: 5Y 8M</Text>
          </View> */}

          {/* Price Section */}
          <View style={styles.priceSection}>
            <View style={styles.priceSectionContent}>
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
            <View style={styles.priceSectionLightColor} />
            <View style={styles.priceSectionLightestColor} />
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
            <View
              style={{ flexDirection: "column", marginBottom: 3, width: "50%" }}
            >
              <View style={styles.vehicleInfo}>
                <View style={styles.vehicleInfoContent}>
                  <Text style={styles.vehicleInfoText}>
                    {`${appraisal.vehicle.colour} ${appraisal.vehicle.make} ${appraisal.vehicle.model}`}
                  </Text>
                </View>
                <View style={styles.vehicleInfoLightColor} />
                <View style={styles.vehicleInfoLightestColor} />
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.vehicleRego}>
                  <View style={styles.vehicleRegoContent}>
                    <Text style={styles.vehicleInfoText}>
                      {appraisal.vehicle.rego.toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.vehicleRegoLightColor} />
                  <View style={styles.vehicleRegoLightestColor} />
                </View>
                <View style={styles.dateInfo}>
                  <Text style={styles.dateInfoText}>
                    {formatDate(appraisal.createdAt)}
                  </Text>
                </View>
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

interface AppraisalPdfLeadsTableProps {
  leads: PDFLead[];
  numberFrom: number;
}

const AppraisalPdfLeadsTable = ({
  leads,
  numberFrom,
}: AppraisalPdfLeadsTableProps) => {
  return (
    <View style={styles.table}>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { width: "6%" }]}>ID</Text>
        <Text style={[styles.tableHeaderText, { width: "14%" }]}>
          Drive Away
        </Text>
        <Text style={[styles.tableHeaderText, { width: "12%" }]}>Kms</Text>
        <Text style={[styles.tableHeaderText, { width: "12%" }]}>Color</Text>
        <Text style={[styles.tableHeaderText, { width: "8%" }]}>Age</Text>
        <Text style={[styles.tableHeaderText, { width: "12%" }]}>Seller</Text>
        <Text style={[styles.tableHeaderText, { width: "10%" }]}>State</Text>
        <Text style={[styles.tableHeaderText, { width: "26%" }]}>Sources</Text>
      </View>

      {/* Table Rows */}
      {leads.map((lead, index) => {
        return (
          <View key={lead.number} style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: "6%" }]}>
              {numberFrom + index}
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
            <Text style={[styles.tableCell, { width: "8%" }]}>{lead.age}d</Text>
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
  );
};
