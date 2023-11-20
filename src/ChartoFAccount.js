import axios from "axios";
import { useEffect, useState } from "react";

function ChartoFAccount() {
  const [id, setId] = useState("");
  const [Mid, setMid] = useState(0);
  const [AccountName, setAccountName] = useState("");
  const [TurnOverAc, setTurnOverAc] = useState("");
  const [RefNo, setRefNo] = useState("");
  const [Date, setDate] = useState("");
  const [Debit, setDebit] = useState("");
  const [Credit, setCredit] = useState("");
  const [ChartFAccount, setChartFAccount] = useState([]);
  const [MasterAccount, setMasterAccount] = useState([]);

  useEffect(() => {
    loadChartFAccount();
  }, []);

  useEffect(() => {
    loadMasterAccount();
  }, []);

  async function loadChartFAccount() {
    const res = await axios.get("https://localhost:44381/ChartOfAC/GetAllChartFACC");
    setChartFAccount(res.data);
  }

  async function loadMasterAccount() {
    const res = await axios.get("https://localhost:44381/MasterAC/GetAllMasterAC");
    setMasterAccount(res.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:44381/ChartOfAC/SaveChartFAc", {
        AccountName: AccountName,
        TurnOverAc: TurnOverAc,
        Date: Date,
        Debit: Debit,
        Credit: Credit,
        Mid: Mid,
      });
      alert("Registration Successful");
      clearForm();
      loadChartFAccount();
    } catch (err) {
      alert(err);
    }
  }

  async function edit(data) {
    setAccountName(data.AccountName);
    setMid(data.Mid);
    setRefNo(data.RefNo);
    setId(data.id);
    setDate(data.Date);
    setDebit(data.Debit);
    setCredit(data.Credit);
  }

  async function deleteRecord(id) {
    await axios.delete("https://localhost:44381/ChartOfAC/DeleteChartAc/" + id);
    alert("Record deleted successfully");
    clearForm();
    loadChartFAccount();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(
        "https://localhost:44381/ChartOfAC/ChartACUpdate/" +
          (ChartFAccount.find((u) => u.id === id) || {}).id,
        {
          id: id,
          AccountName: AccountName,
          TurnOverAc: TurnOverAc,
          RefNo: RefNo,
          Date: Date,
          Debit: Debit,
          Credit: Credit,
          Mid: Mid,
        }
      );
      alert("Account Detail Updated");
      clearForm();
      loadChartFAccount();
    } catch (err) {
      alert(err);
    }
  }

  const clearForm = () => {
    setId("");
    setMid("");
    setAccountName("");
    setTurnOverAc("");
    setRefNo("");
    setDate("");
    setDebit("");
    setCredit("");
  };

  return (
    <div className="container mt-4">
      <form>
        <div className="mb-3">
          <label htmlFor="AccountName" className="form-label">
            Account Name
          </label>
          <input
            type="text"
            className="form-control"
            id="AccountName"
            value={AccountName}
            onChange={(event) => setAccountName(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Mid" className="form-label">
            TurnOver Account
          </label>
          <select
            className="form-select"
            value={Mid}
            onChange={(event) => setMid(event.target.value)}
          >
            <option value={0}>--Select Account Type</option>
            {MasterAccount.map((data) => (
              <option key={data.id} value={data.id}>
                {data.MastrAccount}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="Date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="Date"
            value={Date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Debit" className="form-label">
            Debit
          </label>
          <input
            type="number"
            className="form-control"
            id="Debit"
            value={Debit}
            onChange={(event) => setDebit(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Credit" className="form-label">
            Credit
          </label>
          <input
            type="number"
            className="form-control"
            id="Credit"
            value={Credit}
            onChange={(event) => setCredit(event.target.value)}
          />
        </div>

        <div>
          <button className="btn btn-primary" onClick={save}>
            Register
          </button>
          <button className="btn btn-warning ms-2" onClick={update}>
            Update
          </button>
        </div>
      </form>

      <table className="table table-bordered table-hover table-striped mt-4">
        <thead className="">
          <tr>
            <th scope="col">AC Code</th>
            <th scope="col">Date</th>
            <th scope="col">TurnOver A/C</th>
            <th scope="col">AccountName</th>
            <th scope="col">Debit</th>
            <th scope="col">Credit</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody>
          {ChartFAccount.map((data) => (
            <tr key={data.id}>
              <th scope="row">{data.RefNo}</th>
              <td>{data.Date}</td>
              <td>{data.TurnOverAc}</td>
              <td>{data.AccountName}</td>
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
  );
}

export default ChartoFAccount;
