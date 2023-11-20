import axios from 'axios'
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import IconComponent from 'react-native-vector-icons/Feather'
import { Variables } from '../Components/Variables'
import { useEffect, useState } from 'react'

const images = [
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?girl",
    "https://source.unsplash.com/1024x768/?tree",
]
export interface FixedDetails {
    Id: number,
    FixedAccount: string
    
}


export default function StudentPage({ navigation, route }: any) {
    let [pagestate, setpagestate] = useState({
        StudentData: [] as FixedDetails[],
        Loader: true
    })
    function GetAllFixed() {
        axios.get(`${Variables.API_URL}/FixedAC/GetAllFixedAC`)
            .then((result) => {
                let response: FixedDetails[] = result.data;
                setpagestate({ StudentData: response, Loader: false })
            })
            .catch((error) => {
                console.log(error)
                setpagestate({ ...pagestate, Loader: false })
            })
    }
   
    useEffect(() => {
        GetAllFixed()
    }, [])

    // return (
    //     <View style={styles.Container}>
    //         <View style={styles.ButtonContainer}>
    //             <TouchableOpacity onPress={() => navigation.push("StudentForm")} style={styles.ButtonComponent}>
    //                 <View style={styles.ButtonIcon}>
    //                     <IconComponent name="user-plus" color="white" size={30} />
    //                 </View>
    //                 <View style={styles.ButtonTextContainer}>
    //                     <Text style={styles.ButtonText}>
    //                         NEW STUDENT
    //                     </Text>
    //                 </View>
    //             </TouchableOpacity>
    //         </View>
    //         <View style={styles.Content}>
    //             {
    //                 pagestate.Loader ?
    //                     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //                         <ActivityIndicator color="red" size={50} />
    //                     </View> :
    //                     <>
    //                         <View style={{ flex: 1 }}>
    //                             <Text style={{ paddingHorizontal: 15, marginTop: 20 }}>
    //                                 <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Total Students : {pagestate.StudentData.length}</Text>
    //                             </Text>
    //                             <FlatList
    //                                 contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 20 }}
    //                                 data={pagestate.StudentData}
    //                                 renderItem={({ item, index }) => {
    //                                     return (
    //                                         <>
    //                                             <View key={index} style={styles.StudentCard}>
    //                                                 <View style={styles.StudentContent}>
    //                                                     <View style={styles.StudentImage}>
    //                                                         <Image
    //                                                             source={{ uri: images[0] }}
    //                                                             style={{ width: "100%", height: "100%", borderRadius: 20 }}
    //                                                             resizeMode='contain'
    //                                                         />
    //                                                     </View>
    //                                                     <View style={styles.StudentDetails}>
    //                                                         <Text style={{ fontSize: 23, color: "black", fontWeight: "bold" }}>{item.StudentName}</Text>
    //                                                         <Text style={{ fontSize: 23, color: "black", fontWeight: "bold" }}>{item.Email}</Text>
    //                                                         <Text style={{ fontSize: 23, color: "black", fontWeight: "bold" }}>{item.MobileNo}</Text>
    //                                                     </View>
    //                                                     <View style={styles.ActionsIcon}>
    //                                                         <TouchableOpacity onPress={() => navigation.push("StudentForm", { Id: item.StudentId })}>
    //                                                             <IconComponent name="edit" color="blue" size={30} />
    //                                                         </TouchableOpacity>
    //                                                         <TouchableOpacity onPress={() => DeleteStudent(item.StudentId)}>
    //                                                             <IconComponent name="trash" color="red" size={30} />
    //                                                         </TouchableOpacity>
    //                                                     </View>
    //                                                 </View>
    //                                             </View>
    //                                         </>
    //                                     )
    //                                 }}
    //                             />
    //                         </View>
    //                     </>
    //             }

    //         </View>
    //     </View>
    // )
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "white"
    },
    ButtonContainer: {
        width: "90%",
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
        fontSize: 25
    },
    Content: {
        flex: 1
    },
    StudentCard: {
        height: 150,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "grey",
        marginBottom: 30,
        elevation: 5,
        padding: 10
    },
    StudentContent: {
        flexDirection: 'row'
    },
    StudentImage: {
        width: "30%",
        marginRight: 10
    },
    StudentDetails: {
        flex: 1,
        justifyContent: 'space-around'
    },
    ActionsIcon: {
        width: 60,
        justifyContent: 'space-around',
        alignItems: 'center'
    },

})