import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Variables } from '../Components/Variables';
import { Picker } from "@react-native-picker/picker";
function MasterAC() {
  const [id, setId] = useState('');
  const [MastrAccount, setMastrAccount] = useState('');
  const [Fid, setFid] = useState(0);
  const [Status, setStatus] = useState(0);
  const [FixedAccount, setFixedAccount] = useState('');
  const [MasterAccount, setMasterAccount] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    try {
      // In React Native, you may use Fetch or Axios for making HTTP requests.
      const response = await fetch(`${Variables.API_URL}/MasterAC/GetAllMasterAC`);
      const data = await response.json();
      setMasterAccount(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function save() {
    try {
      // Make sure to handle API requests differently in React Native.
      // You can use Fetch or a library like Axios.
      const response = await fetch(`${Variables.API_URL}/MasterAC/SaveMasterAc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          MastrAccount: MastrAccount,
          Status: Status,
          Fid: Fid,
          FixedAccount: FixedAccount,
        }),
      });
      // Check the response status and show an alert accordingly.
      if (response.status === 200) {
        Alert.alert('Registration Successful');
        setId('');
        setMastrAccount('');
        setFid(0);
        setStatus('');
        setFixedAccount('');
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
    setMastrAccount(data.MastrAccount);
    setFid(data.Fid);
    setStatus(data.Status);
    setId(data.id);
    setEditMode(true);
  }

  async function update() {
    try {
      // Make sure to handle API requests differently in React Native.
      // You can use Fetch or a library like Axios.
      const targetId = MasterAccount.find((u) => u.id === id)?.id || id;
      const response = await fetch(`${Variables.API_URL}/MasterAC/MasterACUpdate/${targetId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          MastrAccount: MastrAccount,
          Status: Status,
          Fid: Fid,
          FixedAccount: FixedAccount,
        }),
      });
      // Check the response status and show an alert accordingly.
      if (response.status === 200) {
        Alert.alert('Account Detail Updated');
        setId('');
        setMastrAccount('');
        setFixedAccount('');
        setStatus('');
        setFid(0);
        setEditMode(false);
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
      // Make sure to handle API requests differently in React Native.
      // You can use Fetch or a library like Axios.
      const response = await fetch(`${Variables.API_URL}/MasterAC/DeleteMasterAc/${id}`, {
        method: 'DELETE',
      });
      // Check the response status and show an alert accordingly.
      if (response.status === 200) {
        Alert.alert('Deleted Successfully');
        setId('');
        setMastrAccount('');
        setFid(0);
        setStatus('');
        setFixedAccount('');
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
          {/* <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            value={id}
            placeholder="ID"
            
            onChangeText={(text) => setId(text)}
          /> */}
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            value={MastrAccount}
            placeholder="TurnOver Account"
            onChangeText={(text) => setMastrAccount(text)}
          />
          <Text>Category Account:</Text>
          <Picker
            selectedValue={Fid}
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue, itemIndex) => setFid(itemValue)}
          >
            <Picker.Item label="--Select Account Type" value={0} />
            {MasterAccount.map((data) => (
              <Picker.Item label={data.FixedAccount} value={data.Fid} key={data.Fid} />
            ))}
          </Picker>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            value={Status.toString()}
            placeholder="Status"
            onChangeText={(text) => setStatus(parseFloat(text))}
            keyboardType="number-pad"
          />
          <Button
            title={editMode ? 'Update' : 'Register'}
            onPress={editMode ? update : save}
          />
        </View>
        <View>
          <Text style={{ alignSelf: 'center', margin: 20, fontSize: 20 }}>Account List</Text>
          <ScrollView>
            <View>
            <Text style={{ flex: 2 , fontWeight : 'bold' }}>TURNOVER A/C   CATEGORY     STATUS                  OPTION  </Text>
              {MasterAccount.map((data) => (
                <View key={data.id} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                  <Text style={{ flex: 2 }}>{data.MastrAccount}</Text>
                  <Text style={{ flex: 2 }}>{data.FixedAccount}</Text>
                  <Text style={{ flex: 2 }}>{data.Status}</Text>
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

export default MasterAC;
