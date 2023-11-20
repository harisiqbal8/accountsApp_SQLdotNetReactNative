import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button,  Alert, ScrollView, TouchableOpacity,  } from 'react-native';
import axios from 'axios';
import { Variables } from '../Components/Variables';
import { Picker } from "@react-native-picker/picker";

function ChartoFAccount() {
  const [id, setId] = useState('');
  const [Mid, setMid] = useState(0);
  const [AccountName, setAccountName] = useState('');
  const [TurnOverAc, setTurnOverAc] = useState('');
  const [RefNo, setRefNo] = useState('');
  const [Date, setDate] = useState('');
  const [Debit, setDebit] = useState(0);
  const [Credit, setCredit] = useState(0);
  const [ChartFAccount, setChartFAccount] = useState([]);
  const [MasterAccount, setMasterAccount] = useState([]);

  useEffect(() => {
    Load();
    Loading();
  }, []);

  async function Load() {
    try {
      const response = await axios.get(`${Variables.API_URL}/ChartOfAC/GetAllChartFACC`);
      setChartFAccount(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function Loading() {
    try {
      const response = await axios.get(`${Variables.API_URL}/MasterAC/GetAllMasterAC`);
      setMasterAccount(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function save() {
    try {
      const response = await axios.post(`${Variables.API_URL}/ChartOfAC/SaveChartFAc`, {
        AccountName: AccountName,
        TurnOverAc: TurnOverAc,
        Date: Date,
        Debit: Debit,
        Credit: Credit,
        Mid: Mid,
      });
      if (response.status === 200) {
        Alert.alert('Registration Successful');
        setId('');
        setMid(0);
        setAccountName('');
        setTurnOverAc('');
        setRefNo('');
        setDate('');
        setDebit(0);
        setCredit(0);
        Load();
      } else {
        Alert.alert('Registration Failed');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Registration Failed');
    }
  }

  function edit(data) {
    setAccountName(data.AccountName);
    setMid(data.Mid);
    setRefNo(data.RefNo);
    setId(data.id);
    setDate(data.Date);
    setDebit(parseFloat(data.Debit));
    setCredit(parseFloat(data.Credit));
  }

  async function update() {
    try {
      const targetId = ChartFAccount.find((u) => u.id === id)?.id || id;
      const response = await axios.patch(`${Variables.API_URL}/ChartOfAC/ChartACUpdate/${targetId}`, {
        id: id,
        AccountName: AccountName,
        TurnOverAc: TurnOverAc,
        RefNo: RefNo,
        Date: Date,
        Debit: Debit,
        Credit: Credit,
        Mid: Mid,
      });
      if (response.status === 200) {
        Alert.alert('Account Detail Updated');
        setId('');
        setMid(0);
        setAccountName('');
        setTurnOverAc('');
        setRefNo('');
        setDate('');
        setDebit(0);
        setCredit(0);
        Load();
      } else {
        Alert.alert('Update Failed');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Update Failed');
    }
  }

  async function Delete(id) {
    try {
      const response = await axios.delete(`${Variables.API_URL}/ChartOfAC/DeleteChartAc/${id}`);
      if (response.status === 200) {
        Alert.alert('Deleted Successfully');
        setId('');
        setMid(0);
        setAccountName('');
        setTurnOverAc('');
        setRefNo('');
        setDate('');
        setDebit(0);
        setCredit(0);
        Load();
      } else {
        Alert.alert('Deletion Failed');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Deletion Failed');
    }
  }

  return (
    <ScrollView>
      <View>
        <View style={{ margin: 20 }}>
          
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            value={AccountName}
            placeholder="Account Name"
            onChangeText={(text) => setAccountName(text)}
          />
          <Text>TurnOver Account:</Text>
          <Picker
            selectedValue={Mid}
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue) => setMid(itemValue)}
          >
            <Picker.Item label="--Select Account Type" value={0} />
            {MasterAccount.map((data) => (
              <Picker.Item label={data.MastrAccount} value={data.id} key={data.id} />
            ))}
          </Picker>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            value={Date}
            placeholder="Date"
            onChangeText={(text) => setDate(text)}
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            value={Debit.toString()}
            placeholder="Debit"
            onChangeText={(text) => setDebit(parseFloat(text))}
            keyboardType="numeric"
          />
         
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            value={Credit.toString()}
            placeholder="Credit"
            onChangeText={(text) => setCredit(parseFloat(text))}
            keyboardType="numeric"
          />
          <Button
            title={id ? 'Update' : 'Register'}
            onPress={id ? update : save}
          />
        </View>
        <View>
          <Text style={{ alignSelf: 'center', margin: 20, fontSize: 20 }}>Account List</Text>
           {/* <Text>REFNO</Text>  <Text>Date</Text> */}
           
          <ScrollView>
            
            <View>
                <Text style={{ flex: 1, fontWeight: 'bold' }}>A/C    DATE       TURNOVER    A/C NAME  DEBIT  CREDIT  OPTION</Text>                
              {ChartFAccount.map((data) => (
                <View key={data.id} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                 
                  <Text style={{ flex: 1 }}>{data.RefNo}</Text>
                  <Text style={{ flex: 3 }}>{data.Date}</Text>
                  <Text style={{ flex: 4 }}>{data.TurnOverAc}</Text>
                  <Text style={{ flex: 4 }}>{data.AccountName}</Text>
                  <Text style={{ flex: 2 }}>{data.Debit}</Text>
                  <Text style={{ flex: 2 }}>{data.Credit}</Text>
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => edit(data)}
                  >
                    <Text>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => Delete(data.id)}
                  >
                    <Text>Delete</Text>
                  </TouchableOpacity>
                 
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

export default ChartoFAccount;
