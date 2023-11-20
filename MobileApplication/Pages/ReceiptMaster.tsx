import React, { useEffect, useState } from 'react';
import {View, Text, TextInput, Button, ScrollView, TouchableOpacity,  Alert,  StyleSheet,} from 'react-native';
import DatePicker from "react-native-date-picker";
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { Variables } from '../Components/Variables';
function ReceiptMaster() {
  const [RId, setRId] = useState('');
  const [InvoiceNo, setInvoiceNo] = useState('');
  const [Date, setDate] = useState('');
  const [Amount, setAmount] = useState(0.0);
  const [Description, setDescription] = useState('');
  const [ReceiptMaster, setReceipt] = useState([]);
  const [ChartFAccount, setChartFAccount] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

   async function Load() {
    const res = await axios.get(`${Variables.API_URL}/ReceiptMaster/Get`);
    setReceipt(res.data);
    console.log(res.data);
  }
  
  async function save() {
    try {
      await axios.post(`${Variables.API_URL}/ReceiptMaster/Post`, {
        InvoiceNo : InvoiceNo,
       Date: Date,      
       Amount : Amount,
       Description : Description
      });
      Alert.alert('Registration Successfully');
      clearInputs();
      Load();
    } catch (error) {
      Alert.alert(error);
    }
  }

  async function edit(data) {
    setInvoiceNo(data.InvoiceNo);
    setDescription(data.Description);
    setRId(data.RId);
    setDate(data.Date);
    setAmount(data.Amount);
  }

  async function Delete(RId) {
    await axios.delete(`${Variables.API_URL}/ReceiptMaster/ReceiptMasterDelte/${RId}`);
    Alert.alert('Deleted Successfully');
    clearInputs();
    Load();
  }

  async function update() {
    try {
      await axios.patch(
        `${Variables.API_URL}/ReceiptMaster/Put/ ${RId}`,
        {
            RId:RId,
            InvoiceNo : InvoiceNo,
            Date: Date,
            Amount : Amount,
            Description : Description,
        }
      );
      Alert.alert('ReceiptMaster Update');
      clearInputs();
      Load();
    } catch (err) {
      Alert.alert(err);
    }
  }

  const clearInputs = () => {
    setRId("");
      setInvoiceNo("");
      setDate("");     
      setAmount(0.0);
      setDescription("");
  };

  return (
    <ScrollView>
         <View style={styles.container}>
        <View style={styles.form}>
       
            
     
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            value={Date}
            placeholder="Date"
            onChangeText={(text) => setDate(text)}
          />
        
         
          <View style={styles.formGroup}>
            <Text>Amount</Text>
            <TextInput
              style={styles.input}
              value={Amount.toString()}
              onChangeText={(text) => setAmount(parseFloat(text))}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formGroup}>
            <Text>InvoiceNo</Text>
            <TextInput
              style={styles.input}
              value={InvoiceNo}
              onChangeText={(text) => setInvoiceNo(text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text>Description</Text>
            <TextInput
              style={styles.input}
              value={Description}
              onChangeText={(text) => setDescription(text)}
            />
          </View>

          <View style={styles.formGroup}>
            <Button title="Register" onPress={save} />
            <Button title="Update" onPress={update} />
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View>
        <Text style={{ flex: 1, fontWeight: 'bold' }}>INV   NAME    AMOUNT     DEBIT  CREDIT DATE OPTION</Text>
          <ScrollView>
            
            {ReceiptMaster.map((data) => (
              <View style={styles.listItem} key={data.RId}>
                <Text style={{ flex: 2 }}> {data.InvoiceNo}</Text>                                            
                <Text style={{ flex: 2 }}> {data.Amount}</Text>
                <Text style={{ flex: 2 }}> {data.Description}</Text>
                <Text style={{ flex: 2 }}>{data.Date}</Text>
                <TouchableOpacity style={styles.listButton} onPress={() => edit(data)}>
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listButton} onPress={() => Delete(data.RId)}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  datePicker: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  listButton: {
    backgroundColor: 'lightgray',
    padding: 5,
    borderRadius: 5,
  },
});

export default ReceiptMaster;
