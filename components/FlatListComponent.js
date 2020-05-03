import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { ListItem, SearchBar } from "react-native-elements";

class FlatListComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            search: ''
        };
    }

    componentDidMount() {
       //DO something on mount
    }

    updateSearch = search => {
        this.setState({ search });
        this.makeSearchRequest(search);
    };

    makeSearchRequest = (search) => {
        const { page, seed } = this.state;

        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${search}&apikey=8AS83CM87U7D12QM`;
        this.setState({ loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res.bestMatches : [...this.state.data, ...res.bestMatches],
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "96%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "2%",
                    marginRight: "2%"
                }}
            />
        );
    };

    renderHeader = () => {
        const { search } = this.state;

        return <SearchBar
            placeholder="Search stock..."
            onChangeText={this.updateSearch}
            value={search}
            cancelIcon
            lightTheme/>;
    };

    render() {
        return (
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            key={item["1. symbol"]}
                            title={item["1. symbol"]}
                            subtitle={item["4. region"]}
                            rightSubtitle={item["8. currency"]}
                            rightTitle={item["3. type"]}
                            containerStyle={{ borderBottomWidth: 0 }}
                            chevron
                            titleStyle={{ color: '#01579B', fontWeight: 'bold' }}
                            subtitleStyle={{ color: '#424242' }}
                        />
                    )}
                    keyExtractor={item => item.email}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
        );
    }
}

export default FlatListComponent;