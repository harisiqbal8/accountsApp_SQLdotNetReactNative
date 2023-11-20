import axios from 'axios'
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import IconComponent from 'react-native-vector-icons/Feather'
import { Variables } from '../Components/Variables'
import { useEffect, useState } from 'react'

// const images = [
//     "https://source.unsplash.com/1024x768/?nature",
//     "https://source.unsplash.com/1024x768/?water",
//     "https://source.unsplash.com/1024x768/?girl",
//     "https://source.unsplash.com/1024x768/?tree",
// ]
export interface MasterAcDetails {
    id : number,
    Fid : number,
    MastrAccount : String,
    Status : string,
    FixedAccount : String
}


export default function MasterACPage({ navigation, route }: any) {
    let [pagestate, setpagestate] = useState({
        AccountData: [] as MasterAcDetails[],
        Loader: true
    })
    function GetAllMasterAC() {
        axios.get(`${Variables.API_URL}/MasterAC/GetAllMasterAC`)
            .then((result) => {
                let response: MasterAcDetails[] = result.data;
                setpagestate({ AccountData: response, Loader: false })
            })
            .catch((error) => {
                console.log(error)
                setpagestate({ ...pagestate, Loader: false })
            })
    }
    function DeleteMaster(id: number) {
        axios.delete(`${Variables.API_URL}/MasterAC/DeleteMasterAc/${id}`)
            .then((result) => {
                if (result.data == "OK") {
                    GetAllMasterAC()
                } else {
                    Alert.alert(result.data)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        GetAllMasterAC()
    }, [])

    return (
        <View style={styles.Container}>
            <View style={styles.ButtonContainer}>
                <TouchableOpacity onPress={() => navigation.push("MasterAcForm")} style={styles.ButtonComponent}>
                    <View style={styles.ButtonIcon}>
                        <IconComponent name="user-plus" color="white" size={30} />
                    </View>
                    <View style={styles.ButtonTextContainer}>
                        <Text style={styles.ButtonText}>
                            ADD MASTER ACCOUNT
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.Content}>
                {
                    pagestate.Loader ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator color="red" size={50} />
                        </View> :
                        <>
                            <View style={{ flex: 1 }}>
                                <Text style={{ paddingHorizontal: 15, marginTop: 20 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Total MASTE ACCOUNT : {pagestate.AccountData.length}</Text>
                                </Text>
                                <FlatList
                                    contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 20 }}
                                    data={pagestate.AccountData}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <>
                                                <View key={index} style={styles.AccountCard}>
                                                    <View style={styles.AccountContent}>
                                                        {/* <View style={styles.StudentImage}>
                                                            <Image
                                                                source={{ uri: images[0] }}
                                                                style={{ width: "100%", height: "100%", borderRadius: 20 }}
                                                                resizeMode='contain'
                                                            />
                                                        </View> */}
                                                        <View style={styles.MasterAcDetails}>
                                                                            <Text style={styles.Label}>TurnOver Account:</Text>
                                                             <Text style={{ fontSize: 20, color: "blue", fontWeight: "bold" }}>{item.MastrAccount}</Text> 

                                                                            <Text style={styles.Label}>Category Account:</Text>
                                                            <Text style={{ fontSize: 23, color: "blue", fontWeight: "bold" }}>{item.FixedAccount}</Text>
                                                                            <Text style={styles.Label}>Status:</Text>
                                                            <Text style={{ fontSize: 23, color: "blue", fontWeight: "bold" }}>{item.Status}</Text> 
                                                            {/* <Text style={{ fontSize: 23, color: "black", fontWeight: "bold" }}>Fid: {item.Fid}</Text> */}
                                                            {/* <Number >{item.Status}</Number>
                                                            <Number>{item.Fid}</Number> */}

                                                        </View>
                                                        <View style={styles.ActionsIcon}>
                                                            <TouchableOpacity onPress={() => navigation.push("MasterAcForm", { Id: item.id })}>
                                                                <IconComponent name="edit" color="blue" size={30} />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => DeleteMaster(item.id)}>
                                                                <IconComponent name="trash" color="red" size={30} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>
                                            </>
                                        )
                                    }}
                                />
                            </View>
                        </>
                }

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "Blue"
    },
    ButtonContainer: {
        width: "90%",
        height: 80,
        alignSelf: 'center'
    },
    Label: {
        textShadowColor : "red",
        fontSize: 24,
        marginBottom: 10,
        color: "black",
        fontWeight : "bold"
    },
    ButtonComponent: {
        width: "100%",
        height: 70,
        flexDirection: 'row',
        backgroundColor: "red",
        borderRadius: 20,
        marginBottom: 20,
    },
    ButtonIcon: {
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ButtonTextContainer: {
        flex: 1,
        justifyContent: 'center',

    },
    ButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 25
    },
    Content: {
        flex: 1
    },
    AccountCard: {
        height: 200,
        backgroundColor: "Blue",
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "grey",
        marginBottom: 30,
        elevation: 5,
        padding: 5
    },
    AccountContent: {
        flexDirection: 'row'
    },
    StudentImage: {
        width: "30%",
        marginRight: 10
    },
    MasterAcDetails: {
        flex: 1,
        justifyContent: 'space-around'
    },
    ActionsIcon: {
        width: 60,
        justifyContent: 'space-around',
        alignItems: 'center'
    },

})