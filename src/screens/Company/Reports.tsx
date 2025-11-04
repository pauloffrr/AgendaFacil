import React from "react";
import { View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Logo } from "@/src/components/display/Logo";
import { UserIcon } from "@/src/components/buttons/UserIcon";
import { MonthYearInput } from "@/src/components/inputs/MonthYearInput";
import { ServiceReports } from "@/src/components/display/ServiceReports";
import { EarningsServiceReports } from "@/src/components/display/EarningsServiceReport";
import { CustomerReviews } from "@/src/components/display/CustomerReviews";
import { AverageRating } from "@/src/components/display/AverageRating";
import { ReviewsCustomerMock } from "@/src/data/ReviewsCustomerMock";
import { CompanyNavigationBar } from "@/src/components/display/CompanyNavigationBar";
import { colors } from "@/src/styles/theme";

export const Reports: React.FC = () => {
    return (
        <View style={styles.screen}>
            <KeyboardAwareScrollView
                style={styles.container}
                enableOnAndroid
            >
                <View style={styles.header}>
                    <Logo />
                    <UserIcon />
                </View>

                <MonthYearInput />

                <ServiceReports
                    number={56}
                    month="agosto"
                    year={2025}
                    status="CONFIRMED"
                />

                <EarningsServiceReports
                    number={3600}
                    month="agosto"
                    year={2025}
                />

                <ServiceReports
                    number={23}
                    month="agosto"
                    year={2025}
                    status="CANCELED"
                />

                <CustomerReviews />
                <AverageRating reviews={ReviewsCustomerMock} style={styles.averageRating}/>

            </KeyboardAwareScrollView>

            <CompanyNavigationBar />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    container: {
        flex: 1,
        padding: "5%",
        backgroundColor: colors.white
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "20%"
    },
    averageRating: {
        marginBottom: "10%"
    }
})