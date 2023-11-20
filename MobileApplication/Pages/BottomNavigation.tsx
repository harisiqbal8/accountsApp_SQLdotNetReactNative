import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StudentPage from './Student';
import BookPage from './Book';
import IconComponent from 'react-native-vector-icons/Feather'
import { Text } from 'react-native'
import AssignPage from './AssginBook';
import EmployeePage from './Employee';
import MasterACPage from './MasterAC';
import MasterACCount from './MasterACCount';
import ChartFAC from './ChartFAC';
import ReceiptMaster from './ReceiptMaster';
import GeneralJournal from './GeneralJournal';
const Tab = createBottomTabNavigator();

export default function BottomNavigation({route}:any) {
    return (
        <Tab.Navigator
            screenOptions={{ tabBarStyle: { backgroundColor: "white", height: 80 } }}
            initialRouteName={route.params ? route.params.Name : "MasterACCount"}
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <IconComponent size={30} color={focused ? "blue" : "grey"} name="user" />
                        )
                    },
                    tabBarLabel: ({ position, focused }) => {
                        return (
                            <Text style={{ fontSize: 20, color: focused ? "blue" : "grey", fontWeight: focused ? "bold" : "normal" }}>Master A/C</Text>
                        )
                    },
                    headerTitleAlign: 'center'
                }}

                name="TURN OVER ACCOUNT" component={MasterACCount} />
            {/* <Tab.Screen name="Book" component={BookPage}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <IconComponent size={30} color={focused ? "blue" : "grey"} name="book" />
                        )
                    },
                    tabBarLabel: ({ position, focused }) => {
                        return (
                            <Text style={{ fontSize: 20, color: focused ? "blue" : "grey", fontWeight: focused ? "bold" : "normal" }}>Books</Text>
                        )
                    },
                    headerTitleAlign: 'center'

                }}

            /> */}
            { <Tab.Screen name="ChartFAC" component={ChartFAC}
                options={{
                    title:"CHART OF ACCOUNT",
                    tabBarIcon: ({ focused }) => {
                        return (
                            <IconComponent size={30} color={focused ? "blue" : "grey"} name="user" />
                        )
                    },
                    tabBarLabel: ({ position, focused }) => {
                        return (
                            <Text style={{ fontSize: 20, color: focused ? "blue" : "grey", fontWeight: focused ? "bold" : "normal" }}>Chart of A/C</Text>
                        )
                    },
                    headerTitleAlign: 'center'
                }}

            /> }
            {/* { <Tab.Screen name="MasterACCount" component={MasterACCount}
                options={{
                    title:"TURN OVER ACCOUNT",
                    tabBarIcon: ({ focused }) => {
                        return (
                            <IconComponent size={30} color={focused ? "blue" : "grey"} name="user" />
                        )
                    },
                    tabBarLabel: ({ position, focused }) => {
                        return (
                            <Text style={{ fontSize: 20, color: focused ? "blue" : "grey", fontWeight: focused ? "bold" : "normal" }}>Master A/C</Text>
                        )
                    },
                    headerTitleAlign: 'center'
                }}

            /> } */}
            
            { <Tab.Screen name="GeneralJournal" component={GeneralJournal}
                options={{
                    title:"General Journal",
                    tabBarIcon: ({ focused }) => {
                        return (
                            <IconComponent size={30} color={focused ? "blue" : "grey"} name="user" />
                        )
                    },
                    tabBarLabel: ({ position, focused }) => {
                        return (
                            <Text style={{ fontSize: 20, color: focused ? "blue" : "grey", fontWeight: focused ? "bold" : "normal" }}>Gen Journal</Text>
                        )
                    },
                    headerTitleAlign: 'center'
                }}

            /> }


             {/* <Tab.Screen name="Employee" component={EmployeePage}
                options={{
                    title:"Employee",
                    tabBarIcon: ({ focused }) => {
                        return (
                            <IconComponent size={30} color={focused ? "blue" : "grey"} name="book-open" />
                        )
                    },
                    tabBarLabel: ({ position, focused }) => {
                        return (
                            <Text style={{ fontSize: 20, color: focused ? "blue" : "grey", fontWeight: focused ? "bold" : "normal" }}>Employee</Text>
                        )
                    },
                    headerTitleAlign: 'center'
                }}

            /> */}
        </Tab.Navigator>
    )
}