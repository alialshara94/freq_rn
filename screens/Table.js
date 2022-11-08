import { appColors } from '../appColors';
import { useEffect, useState } from "react";
import { fetchBands } from "../database/controller";
import {
  ActivityIndicator, FlatList,
  Image, StyleSheet,
  Text, TouchableOpacity,
  View
} from "react-native";
import { Store } from './zustand';
import { Container } from '../components/container';
import { responsiveFontSize } from "react-native-responsive-dimensions";

export const Table = (props) => {

  const [dataSource, setDataSource] = useState([])
  const [numOfPages, setNumOfPages] = useState(0)
  const { page, search, setPage } = Store()

  const getNextPage = () => {
    if (numOfPages > 0 && page < numOfPages) {
      setPage(page + 1)
    }
  }
  const ListItem = ({ item }) => {
    return (
      <View key={item.id} style={style.itemContainer} >
        <View style={{
          ...style.IDXContainer,
          borderColor:
            item.manager ?
              (item.manager.includes("Civil") &&
                item.manager.includes("Military") ?
                "gray" :
                item.manager.includes("Civil") &&
                  item.manager.includes("Shared") ?
                  "gray" :
                  item.manager.includes("Military") &&
                    item.manager.includes("Shared") ?
                    "gray" :
                    item.manager.includes("Military") ?
                      "red" :
                      item.manager.includes("Civil") ?
                        "green" :
                        item.manager.includes("Shared") ?
                          "orange" : "gray") : "gray"
        }} >
          <Image
            source={require("../assets/freq.png")}
            resizeMode="contain"
            style={{
              ...style.Icon,
              tintColor:
                item.manager ?
                  (item.manager.includes("Civil") &&
                    item.manager.includes("Military") ?
                    "gray" :
                    item.manager.includes("Civil") &&
                      item.manager.includes("Shared") ?
                      "gray" :
                      item.manager.includes("Military") &&
                        item.manager.includes("Shared") ?
                        "gray" :
                        item.manager.includes("Military") ?
                          "red" :
                          item.manager.includes("Civil") ?
                            "green" :
                            item.manager.includes("Shared") ?
                              "orange" : "gray") : "gray"
            }}
          />
        </View>
        <View style={style.dataContainer} >
          <View>
            <Text style={style.dataMainContent} >{item.band}</Text>
            <View style={style.category} >
              <Image
                source={require("../assets/dot.png")}
                resizeMode="contain"
                style={{
                  width: 15,
                  height: 15,
                  tintColor:
                    item.manager ?
                      (item.manager.includes("Civil") &&
                        item.manager.includes("Military") ?
                        "gray" :
                        item.manager.includes("Civil") &&
                          item.manager.includes("Shared") ?
                          "gray" :
                          item.manager.includes("Military") &&
                            item.manager.includes("Shared") ?
                            "gray" :
                            item.manager.includes("Military") ?
                              "red" :
                              item.manager.includes("Civil") ?
                                "green" :
                                item.manager.includes("Shared") ?
                                  "orange" : "gray") : "gray"
                }}
              />
              <Text style={style.dataSubContent} >
                {
                  item.manager ?
                    (item.manager.includes("Civil") &&
                      item.manager.includes("Military") ?
                      "Civil/Military" :
                      item.manager.includes("Civil") &&
                        item.manager.includes("Shared") ?
                        "Civil/Shared" :
                        item.manager.includes("Military") &&
                          item.manager.includes("Shared") ?
                          "Military/Shared" :
                          item.manager.includes("Military") ?
                            "Military" :
                            item.manager.includes("Civil") ?
                              "Civil" :
                              item.manager.includes("Shared") ?
                                "Shared" : "unspecified") : "unspecified"
                }
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => {
              props.navigation.navigate('Details', { freq: item.band, category: item.manager, id: item.id })
            }} >
              <Image
                source={require("../assets/next.png")}
                resizeMode="contain"
                style={{ ...style.Icon, tintColor: appColors.btnPrimary }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  const Empty = () => {
    return (
      <View style={style.noDataContainer}  >
        <ActivityIndicator size="large" color="#FFD460" />
      </View>
    )
  }
  const Footer = () => {
    return (
      <View style={{ height: 130 }} ></View>
    )
  }

  useEffect(() => {
    let start = true
    if (start) {
      if (page == 1) {
        setDataSource([])
      }
      const loadingData = async () => {
        try {
          const data = await fetchBands({
            search: search,
            page: page,
            pagination: 15
          })
          setNumOfPages(data.pages)
          if (page == 1) {
            setDataSource(data.data)
          } else {
            setDataSource((prev) => [...prev, ...data.data])
          }
        } catch (error) { }
      }
      loadingData()
    }
    return () => start = false
  }, [page, search])

  return (
    <Container>
      <View style={style.screenContainer} >
        <FlatList
          data={dataSource}
          style={style.list}
          renderItem={ListItem}
          ListEmptyComponent={Empty}
          ListFooterComponent={Footer}
          removeClippedSubviews={true}
          onEndReached={getNextPage}
          onEndReachedThreshold={0.5}
        />
      </View>
    </Container>
  );
};

const style = StyleSheet.create({
  screenContainer: {
    height: '100%',
    backgroundColor: appColors.container,
    paddingTop: 10,
    marginTop: 30,
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
  noDataContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%'
  },
  itemContainer: {
    width: '100%',
    backgroundColor: appColors.card,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    shadowColor: appColors.btnSecondary,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 2,
  },
  IDXContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    padding: 10,
    borderWidth: 0.3
  },
  dataContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dataMainContent: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: appColors.text
  },
  dataSubContent: {
    fontSize: responsiveFontSize(2),
    color: appColors.text
  },
  category: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  Icon: {
    width: 25,
    height: 25,
  }
});