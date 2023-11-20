import { Alert, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import IconComponent from 'react-native-vector-icons/Feather'
import { useEffect, useState } from "react";
import axios from "axios";
import { FixedDetails } from "./fixedAccount";
import { Variables } from "../Components/Variables";
import { Picker } from "@react-native-picker/picker";
import {MasterAcDetails} from "./MasterAC";
import MasterAC from "./MasterACCount";

const width = Dimensions.get('screen').width;



export default function MasterAcForm({ navigation, route }: any) {
    let [dataobj, setdataobj] = useState({
        fixedlist: [] as FixedDetails[]
    })
    let [obj, setobj] = useState<MasterAcDetails>({
        id: 0,
        Fid: 0,
        MastrAccount: '',
        Status: "",
        FixedAccount : "",
    })

    function GetFixedDetails() {
        axios.get(`${Variables.API_URL}/FixedAC/GetAllFixedAC`)
            .then((result) => {
                if (result.data) {
                    setdataobj({
                        fixedlist: result.data.id
                         
                    })
                } else {
                    Alert.alert("Data Not Found..")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function GetMasterData(id: number) {
        axios.get(`${Variables.API_URL}/MasterAC/MasterAccount_GetById?Id=${id}`)
            .then((result) => {
                if (result.data && result.data.status == 200)
                
                {
                    let AccountData : MasterAcDetails = result.data.MasterAccount;
                    setobj({
                        id: AccountData.id,
                        Fid: AccountData.Fid,
                        MastrAccount: AccountData.MastrAccount,
                        Status: AccountData.Status,
                        FixedAccount: AccountData.FixedAccount,
                    })
                }
                 else {
                    Alert.alert("Data Not Found..")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        if (route.params) {
            GetMasterData(route.params.id)
        }
    }, [])

    useEffect(() => {
        if (route.params) {
            GetFixedDetails()
        }
    }, [])
    function SubmitForm() {

        if (obj.id == 0) {
            axios.post(`${Variables.API_URL}/MasterAC/SaveMasterAc`, obj)
                .then((result) => {
                    if (result.data == "OK") {
                        navigation.push("BottomBar", { Name: "MasterAC" })
                    } else {
                        Alert.alert("Data Not Saved")
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            axios.patch(`${Variables.API_URL}/MasterAC/MasterACUpdate/${obj.id}`, obj)
                .then((result) => {
                    if (result.data == "OK") {
                        navigation.push("BottomBar")
                    } else {
                        Alert.alert("Data Not Updated")
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return (
        <ScrollView style={styles.Container} contentContainerStyle={{ paddingTop: 50 }}>
            <View style={styles.TextField}>
                <Text style={styles.Label}>TurnOver Account:</Text>
                <TextInput onChangeText={(text) => setobj({ ...obj, MastrAccount: text })} value={obj.MastrAccount} style={styles.TextInput} />
            </View>
            
            <View style={styles.TextField}>
                <Text style={styles.Label}>Status:</Text>
                <TextInput onChangeText={(text) => setobj({ ...obj, Status: text })} value={obj.Status} style={styles.TextInput} />
            </View>

            {/* <View style={styles.TextField}>
                <Text style={styles.Label}>FixedAccount:</Text>
                <TextInput onChangeText={(text) => setobj({ ...obj, FixedAccount: text })} value={obj.FixedAccount} style={styles.TextInput} />
            </View> */}

            <View style={styles.TextField}>
                <Text style={styles.Label}>Fixed Account:</Text>
                <View style={{ width: "100%", borderWidth: 1, borderColor: "black", borderRadius: 15 }}>
                    <Picker
                        selectedValue={obj.Fid}
                        onValueChange={(itemValue, itemIndex) =>
                            setobj({ ...obj, Fid: itemValue })
                        }>
                        {
                            dataobj.fixedlist.map((item, index) => {
                                return (
                                    <Picker.Item key={index} label={item.FixedAccount} value={item.Id} />
                                )
                            })
                        }
                    </Picker>
                </View>
            </View>
           
           
            <View style={styles.ButtonContainer}>
                <TouchableOpacity style={styles.ButtonComponent} onPress={SubmitForm}>
                    <View style={styles.ButtonIcon}>
                        <IconComponent name="save" color="white" size={30} />
                    </View>
                    <View style={styles.ButtonTextContainer}>
                        <Text style={styles.ButtonText}>
                            {obj.id == 0 ? "SAVE" : "EDIT"}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: "white"
    },
    TextField: {
        marginHorizontal: 15,
        marginBottom: 20
    },
    numberField : {
        marginHorizontal: 15,
        marginBottom: 20
    },
    Label: {
        fontSize: 20,
        marginBottom: 10,
        color: "black"
    },
    numberInput: {
        width: "100%",
        height: 60,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 15,
        paddingHorizontal: 15,
        fontSize: 25
    },
    TextInput: {
        width: "100%",
        height: 60,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 15,
        paddingHorizontal: 15,
        fontSize: 25
    },
    ButtonContainer: {
        marginHorizontal: 15,
        height: 80,
        alignSelf: 'center'
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
        fontSize: 25,
        marginLeft: 60
    },
})