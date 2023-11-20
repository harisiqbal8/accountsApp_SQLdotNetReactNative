import axios from "axios";
import { useEffect, useState } from "react";

function MasterAC() {
  const [id, setId] = useState("");
  const [MastrAccount, setMastrAccount] = useState("");
  const [Fid, setFid] = useState("");
  const [Status, setStatus] = useState("");
  const [FixedAccount, setFixedAccount] = useState("");
  const [MasterAccount, setMasterAccount] = useState([]);

  useEffect(() => {
    (async () => await loadMasterAccounts())();
  }, []);

  async function loadMasterAccounts() {
    const res = await axios.get("https://localhost:44381/MasterAC/GetAllMasterAC");
    setMasterAccount(res.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:44381/MasterAC/SaveMasterAc", {
        MastrAccount: MastrAccount,
        Status: Status,
        Fid: Fid,
        FixedAccount: FixedAccount,
      });
      alert("Registration Successfully");
      clearForm();
      loadMasterAccounts();
    } catch (err) {
      alert(err);
    }
  }

  async function edit(data) {
    setMastrAccount(data.MastrAccount);
    setFid(data.Fid);
    setStatus(data.Status);
    setId(data.id);
  }

  async function deleteRecord(id) {
    await axios.delete("https://localhost:44381/MasterAC/DeleteMasterAc/" + id);
    alert("Deleted Successfully");
    clearForm();
    loadMasterAccounts();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(
        "https://localhost:44381/MasterAC/MasterACUpdate/" +
          (MasterAccount.find((u) => u.id === id) || {}).id,
        {
          id: id,
          MastrAccount: MastrAccount,
          Status: Status,
          Fid: Fid,
          FixedAccount: FixedAccount,
        }
      );
      alert("Account Detail Updated");
      clearForm();
      loadMasterAccounts();
    } catch (err) {
      alert(err);
    }
  }

  const clearForm = () => {
    setId("");
    setMastrAccount("");
    setFid("");
    setStatus("");
    setFixedAccount("");
  };

  return (
    <div className="container mt-4">
      <form>
        <div className="mb-3">
          <label htmlFor="MastrAccount" className="form-label">
            TurnOver Account
          </label>
          <input
            type="text"
            className="form-control"
            id="MastrAccount"
            value={MastrAccount}
            onChange={(event) => setMastrAccount(event.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Fid" className="form-label">
            Category Account
          </label>
          <select
            className="form-select"
            value={Fid}
            onChange={(event) => setFid(event.target.value)}
          >
            <option value={0}>--Select Account Type</option>
            {MasterAccount.map((data) => (
              <option key={data.Fid} value={data.Fid}>
                {data.FixedAccount}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="Status" className="form-label">
            Status
          </label>
          <input
            type="text"
            className="form-control"
            id="Status"
            value={Status}
            onChange={(event) => setStatus(event.target.value)}
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
            <th scope="col">TurnOver Account</th>
            <th scope="col">Category Account</th>
            <th scope="col">Status</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody>
          {MasterAccount.map((data) => (
            <tr key={data.id}>
              <td>{data.MastrAccount}</td>
              <td>{data.FixedAccount}</td>
              <td>{data.Status}</td>
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

export default MasterAC;
