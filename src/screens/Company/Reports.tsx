import { UserIcon } from "@/src/components/buttons/UserIcon";
import { AverageRating } from "@/src/components/display/AverageRating";
import { CompanyNavigationBar } from "@/src/components/display/CompanyNavigationBar";
import { EarningsServiceReports } from "@/src/components/display/EarningsServiceReport";
import { Logo } from "@/src/components/display/Logo";
import { CustomerReviews } from "@/src/components/display/Reviews";
import { ServiceReports } from "@/src/components/display/ServiceReports";
import { MonthYearInput } from "@/src/components/inputs/MonthYearInput";
import { ReviewsCustomerMock } from "@/src/data/ReviewsCustomerMock";
import { colors } from "@/src/styles/theme";
import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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