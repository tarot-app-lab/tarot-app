import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.deck} accessibilityLabel="Tarot card deck preview">
        <View style={[styles.card, styles.cardBack, styles.cardLeft]}>
          <Text style={styles.cardMark}>I</Text>
          <View style={styles.cardLine} />
          <Text style={styles.cardTitle}>THE MAGICIAN</Text>
        </View>
        <View style={[styles.card, styles.cardBack, styles.cardRight]}>
          <Text style={styles.cardMark}>XVIII</Text>
          <View style={styles.moon} />
          <Text style={styles.cardTitle}>THE MOON</Text>
        </View>
        <View style={[styles.card, styles.cardFront]}>
          <Text style={styles.cardMark}>XIX</Text>
          <View style={styles.sun}>
            <View style={styles.sunCore} />
          </View>
          <Text style={styles.cardTitle}>THE SUN</Text>
        </View>
      </View>

      <Text style={styles.title}>Tarot App</Text>
      <Text style={styles.subtitle}>
        Offline-first tarot readings for iOS and Android.
      </Text>
      <Text style={styles.caption}>Cards, spreads, and reading history.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    backgroundColor: "#0a0f1e",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  deck: {
    height: 210,
    marginBottom: 28,
    position: "relative",
    width: 250,
  },
  card: {
    alignItems: "center",
    borderColor: "#f6d98b",
    borderRadius: 8,
    borderWidth: 2,
    height: 190,
    justifyContent: "space-between",
    left: 67,
    paddingVertical: 16,
    position: "absolute",
    top: 10,
    width: 116,
  },
  cardBack: {
    backgroundColor: "#161f35",
  },
  cardFront: {
    backgroundColor: "#fff7dc",
    shadowColor: "#000",
    shadowOffset: { height: 12, width: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
  },
  cardLeft: {
    transform: [{ rotate: "-13deg" }, { translateX: -48 }],
  },
  cardRight: {
    transform: [{ rotate: "13deg" }, { translateX: 48 }],
  },
  cardMark: {
    color: "#f6d98b",
    fontSize: 14,
    fontWeight: "700",
  },
  cardLine: {
    borderColor: "#f6d98b",
    borderRadius: 999,
    borderWidth: 1,
    height: 64,
    width: 46,
  },
  cardTitle: {
    color: "#f6d98b",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0,
  },
  moon: {
    borderColor: "#f6d98b",
    borderRadius: 999,
    borderRightWidth: 12,
    height: 62,
    width: 62,
  },
  sun: {
    alignItems: "center",
    backgroundColor: "#f0b429",
    borderColor: "#8a4f08",
    borderRadius: 999,
    borderWidth: 3,
    height: 68,
    justifyContent: "center",
    width: 68,
  },
  sunCore: {
    backgroundColor: "#fff7dc",
    borderRadius: 999,
    height: 28,
    width: 28,
  },
  title: {
    color: "#ffffff",
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: 0,
    textAlign: "center",
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 17,
    lineHeight: 24,
    marginTop: 12,
    maxWidth: 360,
    textAlign: "center",
  },
  caption: {
    color: "#f6d98b",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 20,
    textAlign: "center",
  },
});
