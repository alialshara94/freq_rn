import { useEffect, useState } from "react"
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View, VirtualizedList } from "react-native"
import { appColors } from "../appColors"
import { Container } from "../components/container"
import { fetchBandById } from "../database/controller"
import { responsiveFontSize } from "react-native-responsive-dimensions";

export const Details = (props) => {
    let bandId = props.route.params.id
    const [dataSource, setDataSource] = useState([])

    const DataItem = ({ item }) => {
        return (
            <View key={item.key} style={style.itemContainer} >
                <View>
                    <Text style={style.cardTitle} >
                        {item.data.key}
                    </Text>
                </View>
                <View style={style.cardContent}>
                    <Text style={style.cardContentText}>
                        {item.data.value}
                    </Text>
                </View>
            </View>
        )
    }
    const getListItem = (data, index) => {
        return ({
            key: index,
            data: data[index]
        })
    }
    const getNumberOfItems = (data) => {
        return data.length
    }
    const Empty = () => {
        return (
            <View style={style.noDataContainer}  >
                <ActivityIndicator size="large" color="#FFD460" />
            </View>
        )
    }

    useEffect(() => {
        let start = true
        if (start) {
            const loadingData = async () => {
                try {
                    const data = await fetchBandById({ bandId: bandId })
                    setDataSource(data.data)
                } catch (error) { }
            }
            loadingData()
        }
        return () => start = false
    }, [bandId])

    return (
        <Container>
            <View style={style.screenContainer}>
                <View style={style.titleContainer} >
                    <View style={style.icon} >
                        <TouchableOpacity onPress={() => {
                            setDataSource([])
                            props.navigation.navigate('Table')
                        }} >
                            <Image
                                source={require("../assets/back.png")}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: appColors.btnPrimary,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={style.title} >
                            {props.route.params.freq}
                        </Text>
                        <View style={style.category} >
                            <Image
                                source={require("../assets/dot.png")}
                                resizeMode="contain"
                                style={{
                                    width: 15,
                                    height: 15,
                                    tintColor:
                                        props.route.params.category ?
                                            (props.route.params.category.includes("Civil") &&
                                                props.route.params.category.includes("Military") ?
                                                "gray" :
                                                props.route.params.category.includes("Civil") &&
                                                    props.route.params.category.includes("Shared") ?
                                                    "gray" :
                                                    props.route.params.category.includes("Military") &&
                                                        props.route.params.category.includes("Shared") ?
                                                        "gray" :
                                                        props.route.params.category.includes("Military") ?
                                                            "red" :
                                                            props.route.params.category.includes("Civil") ?
                                                                "green" :
                                                                props.route.params.category.includes("Shared") ?
                                                                    "orange" : "gray") : "gray"
                                }}
                            />
                            <Text style={style.categoryText} >
                                {
                                    props.route.params.category ?
                                        (props.route.params.category.includes("Civil") &&
                                            props.route.params.category.includes("Military") ?
                                            "Civil/Military" :
                                            props.route.params.category.includes("Civil") &&
                                                props.route.params.category.includes("Shared") ?
                                                "Civil/Shared" :
                                                props.route.params.category.includes("Military") &&
                                                    props.route.params.category.includes("Shared") ?
                                                    "Military/Shared" :
                                                    props.route.params.category.includes("Military") ?
                                                        "Military" :
                                                        props.route.params.category.includes("Civil") ?
                                                            "Civil" :
                                                            props.route.params.category.includes("Shared") ?
                                                                "Shared" : "unspecified") : "unspecified"
                                }
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={style.dataContainer} >
                    <VirtualizedList
                        style={style.list}
                        data={dataSource}
                        getItem={getListItem}
                        getItemCount={getNumberOfItems}
                        renderItem={DataItem}
                        ListFooterComponent={() => <View style={{ height: 130 }} ></View>}
                        initialNumToRender={dataSource.length}
                        maxToRenderPerBatch={dataSource.length}
                        ListEmptyComponent={Empty}
                    />
                </View>
            </View>
        </Container>
    )
}

const style = StyleSheet.create({
    screenContainer: {
        height: '100%',
        backgroundColor: appColors.main
    },
    titleContainer: {
        flexDirection: 'row',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dataContainer: {
        height: '90%',
        backgroundColor: appColors.container,
        paddingTop: 10,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50
    },
    list: {
        maxHeight: '100%',
        backgroundColor: appColors.container,
        padding: 30,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50
    },
    title: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        color: appColors.text
    },
    icon: {
        position: 'absolute',
        left: 10
    },
    categoryText: {
        fontSize: responsiveFontSize(2),
        color: appColors.text
    },
    category: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    itemContainer: {
        width: '100%',
        backgroundColor: appColors.card,
        padding: 10,
        marginBottom: 1,
        shadowColor: appColors.btnSecondary,
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    cardTitle: {
        color: appColors.text,
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
    },
    cardContent: {
        padding: 10
    },
    cardContentText: {
        color: appColors.textSecondary,
        fontWeight: '400',
    },
    noDataContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100%'
    },
})