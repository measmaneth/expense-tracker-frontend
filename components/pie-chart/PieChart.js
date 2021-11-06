import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Platform, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { VictoryPie } from "victory-native";
import SAMPLE_DATA from "../../utils/constants/sampleData.js";
import COLOR from '../../utils/colors.js';
import { useSelector } from "react-redux";
import { ChartContainer, ListTouch, ListBoxView, ListCategoryView, ListCategoryText, ListCalView, Caltext} from "./PieChartStyles.js";

const chartColor = [
    "tomato",
    "orange",
    "gold",
    "#FFD8BE",
    "navy",
    "#E88EED",
    "#D6D9CE",
    "#F7E3AF",
    "#B0D0D3",
    "#C08497",
    "#AAA1C8",
    "#967AA1",
    "#192A51",
    "#0091AD",
    "#6EFAFB",
    "#FFF4E4",
    "#FF57BB",
    "#04E762",
    "#00A1E4",
    "#DC0073",
    "#89FC00",
    "#7C6A0A",
    "#ED1C24",
    "#235789",
    "#320A28",
    "#511730",
    "#8E443D",
    "#CB9173",
    "#E086D3",
    "#BAD1CD",
    "#462749",
    "#A22C29",
    "#BEEF9E",
    "#828C51",
    "#F4C3C2",
]

const random_hex_color_code = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
};

const RenderChart = () => {
    const TransactionData = useSelector((state) => state.transaction);

    function setSelectTransactionByName(name) {
        let transaction = TransactionData.filter((a) => a.name == name)
        setSelectedTransaction(transaction[0])
    }

    const processData = () => {

        let chartData = TransactionData.map((item, index) => {
            // let randomColor = Math.floor(Math.random() * 16777215).toString(16); 
            // let randomColor
            // if(item.color == undefined){
            //     randomColor = random_hex_color_code();
            //     console.log("asdsadsadsa",item.color);
            // }
            let total = Number(item.amount);
            return {
                name: item.name,
                y: total,
                color: chartColor[index],
                id: item.id
            }
        })
        // filter out categories with no data/expenses
        let filterChartData = chartData.filter(item => item.y > 0)

        // Calculate the total expenses
        let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0)

        // Calculate percentage and repopulate chart data
        let finalChartData = filterChartData.map((item) => {
            let percentage = (item.y / totalExpense * 100).toFixed(0)
            return {
                label: `${percentage}%`,
                y: item.y,
                color: item.color,
                name: item.name,
                id: item.id
            }
        })
        return finalChartData;
    }

    const RenderExpenseSummary = () => {
        let data = processData();
        // useEffect(() => {
        //     console.log(data);
        // }, [])
        const renderItem = ({ item }) => {
            return (
                <ListTouch style={{backgroundColor: (SelectedTransaction && SelectedTransaction.name == item.name) ? item.color : COLOR.primary}} onPress={
                    ()=> {
                        let transactionName = item.name
                        setSelectTransactionByName(transactionName)
                    }
                }>
                        <ListCategoryView>
                            <ListBoxView style={{backgroundColor: (SelectedTransaction && SelectedTransaction.name == item.name) ? COLOR.primary : item.color}}></ListBoxView>
                            <ListCategoryText style={{color: (SelectedTransaction && SelectedTransaction.name == item.name) ? COLOR.primary : item.color}}>{item.name}</ListCategoryText>
                        </ListCategoryView>
                        <ListCalView>
                            <Caltext style={{color: (SelectedTransaction && SelectedTransaction.name == item.name) ? COLOR.primary : item.color}}>{item.y} USD - {item.label}</Caltext>
                        </ListCalView>
                </ListTouch>
            )
        }

        return (
            <SafeAreaView>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        )
    }

    const [SelectedTransaction, setSelectedTransaction] = React.useState(null)
    let chartData = processData();
    let colorScales = chartData.map((item) => item.color)
    // let colorScales = chartColor
    return (
        <>
            <ChartContainer>
                <VictoryPie
                    data={chartData}
                    label={(item) => `${item.y}`}
                    colorScale={colorScales}
                    radius={({ datum }) => (SelectedTransaction && SelectedTransaction.name == datum.name) ? 450 * 0.4 : 450 * 0.4 - 10}
                    innerRadius={80}
                    labelRadius={({ innerRadius }) => (450 * 0.4 + innerRadius) / 2.5}
                    style={{
                        labels: { fill: "black" , fontSize: 14, fontWeight: "bold"}
                    }}
                    events={[{
                        target: "data",
                        eventHandlers: {
                            onPress: () => {
                                return [{
                                    target: "labels",
                                    mutation: (props) => {
                                        let TransactionName = chartData[props.index].name
                                        setSelectTransactionByName(TransactionName)
                                    }
                                }]
                            }
                        }
                    }]}
                />
            </ChartContainer>
            <RenderExpenseSummary />
        </>
    )
}


export default RenderChart;