import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import DatePicker from "react-native-date-picker";
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { Variables } from '../Components/Variables';
function GeneralJournal() {
  const [id, setId] = useState('');
  const [RefNo, setRefNo] = useState('');
  const [Accountid, setAccountid] = useState(0);
  const [AccountName, setAccountName] = useState('');
  const [Amount, setAmount] = useState(0.0);
  const [InvoiceNo, setInvoiceNo] = useState('');
  const [Date, setDate] = useState('');
  const [Debit, setDebit] = useState(0.0);
  const [Credit, setCredit] = useState(0.0);

  const [Journal, setJournal] = useState([]);
  const [ChartFAccount, setChartFAccount] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  useEffect(() => {
    (async () => await Loading())();
  }, []);

  async function Load() {
    const res = await axios.get(`${Variables.API_URL}/Journal/GetAllJournl`);
    setJournal(res.data);
    console.log(res.data);
  }

  async function Loading() {
    const res = await axios.get(`${Variables.API_URL}/ChartOfAC/GetAllChartFACC`);
    setChartFAccount(res.data);
  }

  async function save() {
    try {
      await axios.post(`${Variables.API_URL}/Journal/SaveJournal`, {
        AccountName: AccountName,
        Date: Date,
        Debit: Debit,
        Credit: Credit,
        Amount: Amount,
        InvoiceNo: InvoiceNo,
        Accountid: Accountid,
      });
      Alert.alert('Registration Successfully');
      clearInputs();
      Load();
    } catch (err) {
      Alert.alert(err);
    }
  }

  async function edit(data) {
    setInvoiceNo(data.InvoiceNo);
    setAccountid(data.Accountid);
    setRefNo(data.RefNo);
    setId(data.id);
    setDate(data.Date);
    setDebit(data.Debit);
    setCredit(data.Credit);
    setAmount(data.Amount);
  }

  async function Delete(id) {
    await axios.delete(`${Variables.API_URL}/Journal/DeleteJournalAC/${id}`);
    Alert.alert('Deleted Successfully');
    clearInputs();
    Load();
  }

  async function update() {
    try {
      await axios.patch(
        `${Variables.API_URL}/Journal/JournalUpdate/ Journal.find((u) => u.id === id).id || Accountid`,
        {
          id: id,
          AccountName: AccountName,
          Amount: Amount,
          InvoiceNo: InvoiceNo,
          Date: Date,
          Debit: Debit,
          RefNo: RefNo,
          Credit: Credit,
          Accountid: Accountid,
        }
      );
      Alert.alert('Journal Detail Update');
      clearInputs();
      Load();
    } catch (err) {
      Alert.alert(err);
    }
  }

  const clearInputs = () => {
    setId('');
    setAccountid(0);
    setAccountName('');
    setRefNo('');
    setDate('');
    setDebit(0.0);
    setCredit(0.0);
    setInvoiceNo('');
    setAmount(0.0);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text>Account Name</Text>
            <Picker
              selectedValue={Accountid}
              onValueChange={(itemValue) => setAccountid(itemValue)}>
              <Picker.Item label="--Select Account Type" value={0} />
              {ChartFAccount.map((data) => (
                <Picker.Item label={data.AccountName} value={data.id} key={data.id} />
              ))}
            </Picker>
          </View>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            value={Date}
            placeholder="Date"
            onChangeText={(text) => setDate(text)}
          />
          {/* <View style={styles.formGroup}>
            <Text>Date</Text>
            <DatePicker
              style={styles.datePicker}
              date={Date}
              mode="date"
              placeholder="Select date"
              format="YYYY-MM-DD"
              minDate="2000-01-01"
              maxDate="2100-12-31"
              onDateChange={(date) => setDate(date)}
            />
          </View> */}

          <View style={styles.formGroup}>
            <Text>Debit</Text>
            <TextInput
              style={styles.input}
              value={Debit.toString()}
              onChangeText={(text) => setDebit(parseFloat(text))}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formGroup}>
            <Text>Credit</Text>
            <TextInput
              style={styles.input}
              value={Credit.toString()}
              onChangeText={(text) => setCredit(parseFloat(text))}
              keyboardType="numeric"
            />
          </View>

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
            <Button title="Register" onPress={save} />
            <View style={{marginVertical:5}} ></View>
            <Button title="Update" onPress={update} />
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View>
        <Text style={{ flex: 1, fontWeight: 'bold' }}>INV   NAME    AMOUNT     DEBIT  CREDIT DATE OPTION</Text>
          <ScrollView>
            
            {Journal.map((data) => (
              <View style={styles.listItem} key={data.id}>
                <Text style={{ flex: 2 }}> {data.InvoiceNo}</Text>
                
                {/* <Text>RefNo: {data.RefNo}</Text> */}
                <Text style={{ flex: 3 }}> {data.AccountName}</Text>
                <Text style={{ flex: 2 }}> {data.Amount}</Text>
                <Text style={{ flex: 2 }}> {data.Debit}</Text>
                <Text style={{ flex: 2 }}>{data.Credit}</Text>
                <Text style={{ flex: 2 }}>{data.Date}</Text>
                <TouchableOpacity style={styles.listButton} onPress={() => edit(data)}>
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listButton} onPress={() => Delete(data.id)}>
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

export default GeneralJournal;
