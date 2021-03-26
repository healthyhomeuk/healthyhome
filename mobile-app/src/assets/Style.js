import { StyleSheet } from "react-native";

/**
 * Creates a StyleSheet style reference from the given object.
 */
export default StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: "#f2ffea",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2ffea",
    },
    text: {
        color: "#101010",
        fontSize: 24,
        fontWeight: "bold",
    },
    title: {
        flex: 1,
        color: "#101010",
        fontSize: 24,
        fontWeight: "bold",
        marginHorizontal: 24,
        marginVertical: 12,
    },
    headerTitle: {
        fontFamily: "Futura",
        fontSize: 20,
        color: "black",
        letterSpacing: 0.5,
    },
    headerContainer: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f2ffea",
    },
    headerStyle: {
        backgroundColor: "#f2ffea",
        height: 100,
    },
});
