import { renderToBuffer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({ page: { padding: 40 }, h1: { fontSize: 24, marginBottom: 10 }, text: { fontSize: 12, marginBottom: 4 } });

export async function buildGiftCertificatePdf(input: { code: string; amount: number; recipient: string; purchaser: string; message?: string }) {
  const doc = (
    <Document>
      <Page style={styles.page}>
        <View>
          <Text style={styles.h1}>Prestine Pros Cleaning Gift Certificate</Text>
          <Text style={styles.text}>Certificate Code: {input.code}</Text>
          <Text style={styles.text}>Amount: ${input.amount}</Text>
          <Text style={styles.text}>Recipient: {input.recipient}</Text>
          <Text style={styles.text}>From: {input.purchaser}</Text>
          {input.message ? <Text style={styles.text}>Message: {input.message}</Text> : null}
        </View>
      </Page>
    </Document>
  );

  return renderToBuffer(doc);
}
