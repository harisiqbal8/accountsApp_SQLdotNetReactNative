import axios from "axios";
import { useEffect, useState } from "react";

function GeneralJournal() {
  const [id, setId] = useState("");
  const [RefNo, setRefNo] = useState("");
  const [Accountid, setAccountid] = useState(0);
  const [AccountName, setAccountName] = useState("");
  const [Amount, setAmount] = useState("");
  const [InvoiceNo, setInvoiceNo] = useState("");
  const [Date, setDate] = useState("");
  const [Debit, setDebit] = useState("");
  const [Credit, setCredit] = useState("");

  const [Journal, setJournal] = useState([]);
  const [ChartFAccount, setChartFAccount] = useState([]);

  useEffect(() => {
    (async () => await loadJournal())();
  }, []);

  useEffect(() => {
    (async () => await loadChartFAccount())();
  }, []);

  async function loadJournal() {
    const res = await axios.get("https://localhost:44381/Journal/GetAllJournl");
    setJournal(res.data);
  }

  async function loadChartFAccount() {
    const res = await axios.get("https://localhost:44381/ChartOfAC/GetAllChartFACC");
    setChartFAccount(res.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:44381/Journal/SaveJournal", {
        AccountName: AccountName,
        Date: Date,
        Debit: Debit,
        Credit: Credit,
        Amount: Amount,
        InvoiceNo: InvoiceNo,
        Accountid: Accountid,
      });

      alert("Registration Successfully");
      clearForm();
      loadJournal();
    } catch (err) {
      alert(err);
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

  async function deleteRecord(id) {
    await axios.delete("https://localhost:44381/Journal/DeleteJournalAC/" + id);
    alert("Deleted Successfully");
    clearForm();
    loadJournal();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(
        "https://localhost:44381/Journal/JournalUpdate/" +
          (Journal.find((u) => u.id === id) || {}).id,
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

      alert("Journal Detail Updated");
      clearForm();
      loadJournal();
    } catch (err) {
      alert(err);
    }
  }

  const clearForm = () => {
    setId("");
    setRefNo("");
    setAccountName("");
    setDate("");
    setDebit("");
    setCredit("");
    setAmount("");
    setInvoiceNo("");
    setAccountid("");
  };

  return (
    <div>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="accountName">Account Name</label>
            <select
              className="form-control"
              value={Accountid}
              onChange={(event) => {
                setAccountid(event.target.value);
              }}
            >
              <option value={0}>--Select Account Type</option>
              {ChartFAccount.map((data) => (
                <option value={data.id} key={data.id}>
                  {data.AccountName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              className="form-control"
              id="Date"
              value={Date}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Debit</label>
            <input
              type="number"
              className="form-control"
              id="Debit"
              value={Debit}
              onChange={(event) => {
                setDebit(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Credit</label>
            <input
              type="number"
              className="form-control"
              id="Credit"
              value={Credit}
              onChange={(event) => {
                setCredit(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              className="form-control"
              id="Amount"
              value={Amount}
              onChange={(event) => {
                setAmount(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>InvoiceNo</label>
            <input
              type="text"
              className="form-control"
              id="InvoiceNo"
              value={InvoiceNo}
              onChange={(event) => {
                setInvoiceNo(event.target.value);
              }}
            />
          </div>

          <div>
            <button className="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button className="btn btn-warning mt-4 ms-2" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br />
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped" align="center">
          <thead className="">
            <tr>
              <th scope="col">InvoiceNo</th>
              <th scope="col">Date</th>
              <th scope="col">AC Code</th>
              <th scope="col">AccountName</th>
              <th scope="col">Amount</th>
              <th scope="col">Debit</th>
              <th scope="col">Credit</th>
              <th scope="col">Option</th>
            </tr>
          </thead>
          <tbody>
            {Journal.map((data) => (
              <tr key={data.id}>
                <th scope="row">{data.InvoiceNo}</th>
                <td>{data.Date}</td>
                <td>{data.RefNo}</td>
                <td>{data.AccountName}</td>
                <td>{data.Amount}</td>
                <td>{data.Debit}</td>
                <td>{data.Credit}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    onClick={() => edit(data)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => deleteRecord(data.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GeneralJournal;
