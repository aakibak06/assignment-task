import { StyleSheet, Text, View, StatusBar, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import FoodCategory from '../Component/FoodItems';

const refrigerator = require('../../assets/image/refrigerator.png')

const DemoScreen = () => {
    const [foodData, setFoodData] = useState([])



    useEffect(() => {
        getFoodData()
    }, [])

    const getFoodData = async () => {
        try {
            const apiUrl = 'https://8b648f3c-b624-4ceb-9e7b-8028b7df0ad0.mock.pstmn.io/dishes/v1/';
            const response = await fetch(apiUrl)
            const data = await response.json();
            if (data) {
                setFoodData(data)
            }

        } catch (error) {
            console.log(error.message)
        }

    }
    // console.log(foodData)

    // date
    const currentDate = new Date();
    const formattedDate =
        currentDate.getDate() + ' ' +
        currentDate.toLocaleString('default', { month: 'short' }) + ' ' +
        currentDate.getFullYear();

    //
    const [selectedItems, setSelectedItems] = useState([]);
    useEffect(() => {
        // set as the default selected item when the component loads
        const defaultSelectedItem = FoodCategory.find((item) => item.id == '1');
        setSelectedItems(defaultSelectedItem);
    }, []);


    const handleItemPress = (item) => {
        setSelectedItems(item);
    };




    return (
        <View style={styles.mainCon}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
            <View style={styles.secondCon}>
                <View style={styles.thirdCon}>
                    <AntDesign name={'left'} color={'black'} size={responsiveFontSize(3)} />
                    <Text style={styles.fisrtText}>Select Dishes</Text>
                </View>

                <View style={styles.forthCon}>

                </View>
                <View style={styles.fifthCon}>
                    <View style={styles.fifthCon1}>
                        <EvilIcons name={'calendar'} color={'black'} size={responsiveFontSize(4)} />
                        <Text style={styles.secondText}>{formattedDate}</Text>
                    </View>
                    <View style={styles.lineCon}>
                        <View style={styles.line}>

                        </View>
                    </View>
                    <View style={styles.fifthCon2}>
                        <Ionicons name={'alarm'} color={'black'} size={responsiveFontSize(3)} />
                        <Text style={styles.thirdText}>10:10Pm-12:30Pm</Text>
                    </View>

                </View>

                <View style={{ height: responsiveHeight(9) }} />
                <View style={{ height: responsiveHeight(5) }}>
                    <FlatList data={FoodCategory}
                        horizontal

                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={[styles.flatStyle, {
                                    backgroundColor: selectedItems?.id === item.id ? 'rgba(255, 190, 118,0.4)' : 'white',
                                    borderColor: selectedItems?.id === item.id ? 'orange' : 'black',
                                }]} onPress={() => handleItemPress(item)}>
                                    <Text style={[styles.fouthText, { color: selectedItems?.id === item.id ? 'orange' : 'black', }]}>{item.name}</Text>
                                </TouchableOpacity>
                            )

                        }}
                    />
                </View>

                {selectedItems?.id == '1' ?
                    (
                        <View>

                            <View style={styles.sixthCon}>
                                <Text style={styles.popular}>Popular Dishes</Text>
                                <FlatList data={foodData.popularDishes}
                                    horizontal
                                    renderItem={({ item }) => {

                                        return (
                                            <View style={styles.flatStyle2}>
                                                <Image source={{ uri: item.image }} resizeMode='contain' style={styles.imageStyle} />
                                                <Text style={styles.dishesName}>Biryani</Text>
                                            </View>
                                        )
                                    }}

                                />

                            </View>
                            <View style={styles.line2} />

                            <View style={styles.seventhCon}>
                                <View style={styles.reconCon}>
                                    <Text style={styles.recommended}>Recommended</Text>
                                    <AntDesign name={'caretdown'} color={'black'} size={responsiveFontSize(2)} />
                                </View>
                                <View style={styles.menuCon}>
                                    <Text style={styles.menu}>Menu</Text>
                                </View>
                            </View>

                            <View style={styles.recommendedItems}>
                                <FlatList data={foodData.popularDishes}
                                    scrollEnabled={true}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => {


                                        return (

                                            <View style={styles.flatStyle3}>
                                                <View style={{ width: responsiveWidth(45), }}>
                                                    <View style={styles.headerStyle}>
                                                        <Text numberOfLines={1} style={styles.title}>{item.name}</Text>
                                                        <View style={styles.typeCon}><Entypo name={'dot-single'} size={responsiveFontSize(1.2)} color={'green'} /></View>
                                                        <View style={styles.ratting}>
                                                            <Text style={styles.rattingtext}>4.2</Text>
                                                            <AntDesign name={'star'} color={'white'} size={responsiveFontSize(1.5)} />
                                                        </View>
                                                    </View>
                                                    <View style={styles.ingredient}>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            width: responsiveWidth(20),
                                                            justifyContent: 'space-between'
                                                        }}>
                                                            <View style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center'
                                                            }}>
                                                                <Image source={refrigerator} style={styles.refrigeratorStyle} />
                                                                <Text style={styles.freezText}>Refrigerator</Text>
                                                            </View>
                                                            <View style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center'
                                                            }}>
                                                                <Image source={refrigerator} style={styles.refrigeratorStyle} />
                                                                <Text style={styles.freezText}>Refrigerator</Text>
                                                            </View>

                                                        </View>
                                                        <View>
                                                            <Text style={{ color: 'black' }}>Ingredients</Text>
                                                            <TouchableOpacity>
                                                                <Text style={styles.viewlist}>View list   <AntDesign name={'right'} color={'orange'} size={responsiveFontSize(1.4)} /> </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    <Text style={styles.description}>Chicken fried in deep tomato sauce with delicious spices</Text>

                                                </View>
                                                <View style={styles.imageCon}>
                                                    <Image source={{ uri: item.image }} style={styles.recommendedImage} />
                                                    <TouchableOpacity style={styles.addCon}>
                                                        <Text style={styles.addStyle}>Add</Text>
                                                        <AntDesign name={'plus'} color={'orange'} size={responsiveFontSize(1.5)} style={styles.plusicon} />
                                                    </TouchableOpacity>
                                                </View>


                                            </View>
                                        )
                                    }}

                                />
                            </View>
                            <View style={styles.seletedItems}>
                                <MaterialCommunityIcons name={'food'} color={'white'} size={responsiveFontSize(3)} />
                                <Text style={styles.fooditemsText}>3 food items selected</Text>
                                <AntDesign name={'arrowright'} color={'white'} size={responsiveFontSize(3)} />
                            </View>
                        </View>

                    ) : (
                        <View style={styles.nullData}>
                            <Text style={styles.nullText}>Not Available this Category</Text>
                        </View>
                    )
                }

            </View>
        </View>
    )
}

export default DemoScreen

const styles = StyleSheet.create({
    mainCon: {
        flex: 1,
        // height: responsiveHeight(100),
        // width: responsiveWidth(100),
        backgroundColor: 'white',


    },
    secondCon: {
        flex: 1,

    },
    thirdCon: {
        marginTop: responsiveHeight(2),
        flexDirection: 'row',
        width: responsiveWidth(40),
        justifyContent: 'space-around'

    },
    fisrtText: {
        color: 'black',
        fontSize: responsiveFontSize(2),

    },
    forthCon: {
        height: responsiveHeight(5.5),
        width: responsiveWidth(90),
        backgroundColor: 'black',
        alignSelf: 'center',
        marginTop: responsiveHeight(2)
    },
    fifthCon: {
        // borderWidth: 1,
        height: responsiveHeight(8),
        width: responsiveWidth(80),
        alignSelf: 'center',
        position: 'absolute',
        top: 85,
        // zIndex: 20,
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        // borderWidth: 1

    },

    fifthCon1: {
        // borderRightWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    fifthCon2: {
        // borderRightWidth: 1
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: responsiveWidth(1.2)
    },
    secondText: {
        // marginLeft: responsiveWidth(1),
        color: 'black',
        fontSize: responsiveFontSize(1.5),
        letterSpacing: 1
    },
    thirdText: {
        marginLeft: responsiveWidth(1),
        color: 'black',
        fontSize: responsiveFontSize(1.5),
        letterSpacing: 1
    },
    lineCon: {
        justifyContent: 'center'
    },
    line: {
        width: responsiveWidth(0.2),
        height: responsiveHeight(3.5),
        backgroundColor: '#b2bec3'
    },
    flatStyle: {
        marginHorizontal: responsiveWidth(3),
        borderWidth: 0.7,
        width: responsiveWidth(20),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        // height: responsiveHeight(5)


    },
    fouthText: {
        color: 'black',
        fontSize: responsiveFontSize(1.5),

    },
    sixthCon: {
        marginTop: responsiveHeight(4),
        width: responsiveWidth(90),
        alignSelf: 'center'
    },
    popular: {
        color: 'black',
        fontSize: responsiveFontSize(2.4)
    },
    imageStyle: {
        width: responsiveWidth(15),
        height: responsiveWidth(15),
        borderWidth: 1,
        borderRadius: responsiveWidth(8),



    },
    dishesName: {
        color: 'white',
        position: 'absolute',
        alignSelf: 'center',
        top: responsiveHeight(2.4),
        fontSize: responsiveFontSize(1.5)
    },
    flatStyle2: {
        margin: 20
    },
    line2: {
        width: responsiveWidth(95),
        height: responsiveHeight(0.5),
        backgroundColor: '#dfe6e9',
        alignSelf: 'center'
    },

    seventhCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: responsiveWidth(85),
        alignSelf: 'center',
        marginTop: responsiveHeight(2)
    },

    reconCon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    recommended: {
        color: 'black',
        fontSize: responsiveFontSize(2),
        marginRight: responsiveWidth(3),
        // letterSpacing: 0.3
    },
    menuCon: {
        backgroundColor: 'black',
        height: responsiveHeight(3),
        width: responsiveWidth(14),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7
    },
    menu: {
        color: 'white',
        fontSize: responsiveFontSize(1.2)
    },
    recommendedItems: {
        marginTop: responsiveHeight(3),
        width: responsiveWidth(90),
        alignSelf: 'center',
        height: responsiveHeight(60),
        paddingBottom: responsiveHeight(15)




    },
    flatStyle3: {
        marginVertical: responsiveHeight(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        paddingBottom: responsiveHeight(4),
        borderColor: '#dfe6e9',
        // flex: 1
    },
    headerStyle: {

        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        color: 'black',
        fontSize: responsiveFontSize(2),
        width: responsiveWidth(20),

    },

    typeCon: {
        borderWidth: 2,
        height: 15,
        width: 15,
        borderColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    ratting: {
        color: 'white',
        backgroundColor: 'green',
        borderRadius: 6,
        padding: 2,
        height: 25,
        width: 50,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'

    },
    rattingtext: {
        color: 'white'
    },
    refrigeratorStyle: {
        height: 20,
        width: 20
    },
    ingredient: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: responsiveHeight(1)

    },
    viewlist: {
        color: 'orange',
        fontSize: responsiveFontSize(1.3)
    },
    description: {
        marginTop: responsiveHeight(1),
        color: 'black',
        fontSize: responsiveFontSize(1.5)
    },
    recommendedImage: {
        width: responsiveWidth(30),
        height: responsiveWidth(25),
        borderRadius: responsiveWidth(2)

    },
    addCon: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'orange',
        width: responsiveWidth(20),
        backgroundColor: 'white',
        position: 'absolute',
        bottom: -10,
        alignSelf: 'center',
        justifyContent: 'center',
        // alignItems: 'center'
        borderRadius: 10,
        height: responsiveHeight(4),


    },
    addStyle: {
        color: 'orange',
        fontSize: responsiveFontSize(2.5),
        // borderWidth: 1,
        width: responsiveWidth(14),
        textAlign: 'right'

    },
    plusicon: {
        marginLeft: 4
    },
    seletedItems: {
        position: 'absolute',
        flexDirection: 'row',
        width: responsiveWidth(70),
        backgroundColor: '#2f3640',
        padding: 10,
        height: responsiveHeight(7),
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        top: responsiveHeight(60),
        borderRadius: 20
    },
    fooditemsText: {
        color: 'white',
        fontSize: responsiveFontSize(2)
    },
    nullData: {
        width: responsiveWidth(80),
        alignSelf: 'center',
        height: responsiveHeight(40),
        elevation: 20,
        // borderWidth: 1,
        marginTop: responsiveHeight(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dcdde1',
        borderRadius: 30
    },
    nullText: {
        color: '#222f3e',
        fontSize: responsiveFontSize(2.3)
    },
    freezText: {
        fontSize: responsiveFontSize(0.7),
        color: '#2d3436'
    }


})