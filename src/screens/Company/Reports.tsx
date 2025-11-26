import React, { useEffect, useState } from "react";
import { UserIcon } from "@/src/components/buttons/UserIcon";
import { AverageRating } from "@/src/components/display/AverageRating";
import { CompanyNavigationBar } from "@/src/components/display/CompanyNavigationBar";
import { EarningsServiceReports } from "@/src/components/display/EarningsServiceReport";
import { Logo } from "@/src/components/display/Logo";
import { CompanyReviews } from "@/src/components/display/Reviews";
import { ServiceReports } from "@/src/components/display/ServiceReports";
import { MonthYearInput } from "@/src/components/inputs/MonthYearInput";
import { useUser } from "@/src/context/UserContext";
import { Reviews } from "@/src/types/ReviewsType";
import { colors } from "@/src/styles/theme";
import { StyleSheet, View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { apiScheduling, apiUsers } from "@/src/services/Api";
import { API_URL_SCHEDULING, API_URL_USERS } from "@env";
import { getErrorMessage } from "@/src/utils/errorHandler";
import { ApiError } from "@/src/types/ApiErrorType";
import { ServiceCompleted } from "@/src/types/Reports";

export const Reports: React.FC = () => {
    const { user } = useUser();
    const [reviews, setReviews] = useState<Reviews[]>([]);
    const [serviceCompleted, setServiceCompleted] = useState<ServiceCompleted | null>(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [errorMessage, setErrorMessage] = useState("");

    const getServiceCompleted = async () => {
        try {
            const response = await apiScheduling.get(
                `${API_URL_SCHEDULING}/scheduling-company/reports/completed/${user?.idUser}/${selectedMonth}/${selectedYear}`
            )

            setServiceCompleted(response.data);
            setErrorMessage("");

        } catch (error) {
            let errorMsg = "Erro ao buscar serviços realizados. Tente novamente!";
            
            if (typeof error === 'object' && error !== null) {
                errorMsg = getErrorMessage(error as ApiError);
            } else if (typeof error === 'string') {
                errorMsg = error;
            }

            setErrorMessage(errorMsg);
        }
    }

    const getReviews = async () => {
        try {
            const response = await apiUsers.get(`${API_URL_USERS}/reviews/company/${user?.idUser}`);

            setReviews(response.data);
            setErrorMessage("");

        } catch (error) {
            let errorMsg = "Erro ao exibir avaliações. Tente novamente!";
            
            if (typeof error === 'object' && error !== null) {
                errorMsg = getErrorMessage(error as ApiError);
            } else if (typeof error === 'string') {
                errorMsg = error;
            }

            setErrorMessage(errorMsg);
        }
    }

    useEffect(() => {
        getReviews();
        getServiceCompleted();
    }, []);

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

                <MonthYearInput 
                    onChangeMonth={(m) => setSelectedMonth(m)}
                    onChangeYear={(y) => setSelectedYear(y)}
                />

                <ServiceReports
                    number={serviceCompleted?.total}
                    month={selectedMonth}
                    year={2025}
                    status="CONFIRMED"
                />

                <EarningsServiceReports
                    number={3600}
                    month={selectedMonth}
                    year={2025}
                />

                <ServiceReports
                    number={23}
                    month={selectedMonth}
                    year={2025}
                    status="CANCELED"
                />

                <CompanyReviews companyId={Number(user?.idUser)}/>
                <AverageRating reviews={reviews} style={styles.averageRating}/>

            </KeyboardAwareScrollView>

            { errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null }

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
    },
    errorMessage: {
        fontSize: 18,
        marginTop: "3%",
        color: colors.red,
        fontWeight: "bold"
    }
})