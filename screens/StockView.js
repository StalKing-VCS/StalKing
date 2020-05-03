import React from 'react';
import {View, StyleSheet, Dimensions, Button, Alert} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import Text from "react-native-paper/src/components/Typography/Text";
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';


export default class StockView extends React.Component {

    //TODO add support for Weekly, Monthly as well
    constructor(props) {
        super(props);
        this.state = {
            stockInfo: props.navigation.state.params.ListViewClickItemHolder,
            data: {},
            durationType: "TIME_SERIES_DAILY",
            symbol: props.navigation.state.params.ListViewClickItemHolder["1. symbol"],
            loading: false,
            error: null,
            unfilteredChartData: undefined,
            chartData: undefined
        };
    }

    getClosingValueOfDays(data) {
        let dataValues = [];
        for (const x of Object.keys(data)) {
            dataValues.push(data[x]["4. close"]);
        }
        return dataValues
    }

    jsonCopy(src) {
        return JSON.parse(JSON.stringify(src));
    }

    filterDataForRange(number) {
        const unfilteredChartData = this.jsonCopy(this.state.unfilteredChartData);
        let filteredData = unfilteredChartData;
        if(number === 7){
            filteredData["labels"] = unfilteredChartData.labels.slice(0,7);
            filteredData["datasets"][0]["data"] = unfilteredChartData.datasets[0].data.slice(0,7)
        } else if(number === 28){
            filteredData["labels"] = unfilteredChartData.labels.slice(0,28);
            filteredData["datasets"][0]["data"] = unfilteredChartData.datasets[0].data.slice(0,28)
        }else{
            filteredData = unfilteredChartData;
        }
        filteredData.labels = filteredData.labels.reverse();
        filteredData.datasets[0].data = filteredData.datasets[0].data.reverse();

        this.setState({
            chartData : filteredData
        })
    }

    getStockdata() {
        const {durationType, symbol} = this.state;

        const url = `https://www.alphavantage.co/query?function=${durationType}&symbol=${symbol}&outputsize=compact&apikey=8AS83CM87U7D12QM`;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                const dailyData = res["Time Series (Daily)"];
                const chartData = {
                    labels: Object.keys(dailyData),
                    datasets: [
                        {
                            data: this.getClosingValueOfDays(dailyData),
                            strokeWidth: 2, // optional
                        },
                    ],
                };
                this.setState({
                    data: dailyData,
                    error: res.error || null,
                    loading: false,
                    unfilteredChartData: chartData,
                    chartData: chartData
                });
            })
            .catch(error => {
                this.setState({error, loading: false});
            });
    }

    componentDidMount() {
        this.setState({loading: true});
        this.getStockdata();
    }

    formatDateTime(dt) {
        return dt.substring(8, 10)
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.chartData &&
                <View style={styles.filterContainer}>
                    <Button color={'#000'} title="1W" onPress={() => this.filterDataForRange(7)}/>
                    <Button color={'#000'} title="4W" onPress={() => this.filterDataForRange(28)}/>
                    <Button color={'#000'} title="All" onPress={() => this.filterDataForRange(0)}/>
                </View>
                }
                {this.state.chartData ? <LineChart
                    data={this.state.chartData}
                    width={Dimensions.get('window').width - 10}
                    height={Dimensions.get('window').height / 2}
                    verticalLabelRotation={45}
                    formatXLabel={this.formatDateTime}
                    withInnerLines={false}
                    chartConfig={{
                        backgroundColor: "#FAFAFA",
                        backgroundGradientFrom: "#F5F5F5",
                        backgroundGradientTo: "#E0E0E0",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 1
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 5
                    }}
                /> : <Bars size={20} color="#FDAAFF"/>}
                <Text
                    style={styles.textHeaderStyle}> {this.props.navigation.state.params.ListViewClickItemHolder["1. symbol"]} </Text>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <Button color={'#2ecc71'} title="BUY" onPress={() => Alert.alert('Buy button pressed')}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button color={'#e74c3c'} title="SELL" onPress={() => Alert.alert('Sell button pressed')}/>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textHeaderStyle: {
        color: '#E64A19',
        fontSize: 20,
        textTransform: 'uppercase'
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0
    },
    buttonContainer: {
        flex: 1,
    },
    filterContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        position: 'absolute',
        top: 0,
        backgroundColor:'#000',
        width:'100%'
    }
});