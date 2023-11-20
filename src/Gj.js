import axios from "axios";
import { useEffect, useState } from "react";
function Gj() {
const [id, setId] = useState("");
const [RefNo, setRefNo] = useState("");
const [Accountid, setAccountid] = useState("");
const [AccountName , setAccountName ] = useState("");
const [Amount, setAmount] = useState("");
const [InvoiceNo, setInvoiceNo] = useState("");
const [Date, setDate] = useState("");
const [ Debit, setDebit] = useState("");
const [ Credit, setCredit] = useState("");
const [Journal, setJournal]= useState([]);

useEffect(() => {
    (async () => await Load())();
  }, []);


  async function Load() {
    
    const res = await axios.get("https://localhost:44381/Journal/GetAllJournl");
    setJournal(res.data);
      
    
  }
  async function save(event) {
   
    event.preventDefault();
    try {
      await axios.post("https://localhost:44381/Journal/SaveJournal", {
      
      AccountName: AccountName,
      Amount: Amount,
      InvoiceNo: InvoiceNo,
      Date: Date,
      Debit : Debit,
       Credit: Credit,
       Accountid : Accountid
      });
      alert(" Registation Successfully");
          setId("");
          setRefNo("");
          setAccountid("");
          setAccountName("");
          setInvoiceNo("");
          setDate("");
          setDebit("");
          setCredit("");
        
       
     
      Load();
    } catch (err) {
      alert(err);
    }
  }
  async function edit(data) {
    setInvoiceNo(data.InvoiceNo);
    setAccountName(data.Accountid);
     setRefNo(data.RefNo);
    setId(data.id);
    setDate(data.Date);
    setDebit(data.Debit);
    setCredit(data.Credit);
    setAmount(data.Amount);
    // setFixedAccount(data.FixedAccount);
  }
  return (
    <div>
      <h1 className="d-flex justify-content-center m-3">General Journal</h1>
    <div class="container mt-4">
      <form>
        <div class="form-group">
         
          <input
            type="text"
            class="form-control"
            id="id"
            hidden
            value={id}
            onChange={(event) => {
              setId(event.target.value);
            }}
          />
         
        </div>
                                    
       <div className="form-group mb-3">
                      <label htmlFor="title">AccountName</label>
                      <select className="form-control" value= {AccountName}  onChange={(event) => { setAccountName(event.target.value); }}>
                          { <option value={0}>--Select Account Type</option> }
                          {
                              Journal.map(data => {
                                  return (
                                      <option value={data.Accountid} key={data.Accountid}>{data.AccountName}</option>
                                  )
                              })
                          }
                      </select>
                  </div>    

        <div class="form-group">
          <label>Amount</label>
          <input
            type="number"
            class="form-control"
            id="Amount"
            value={Amount}
            onChange={(event) => {
              setAmount(event.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label>InvoiceNo</label>
          <input
            type="text"
            class="form-control"
            id="InvoiceNo"
            value={InvoiceNo}
            onChange={(event) => {
              setInvoiceNo(event.target.value);
            }}
          />
        </div>

        <div class="form-group">
          <label>Debit</label>
          <input
            type="number"
            class="form-control"
            id="Debit"
            value={Debit}
            onChange={(event) => {
              setDebit(event.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label>Credit</label>
          <input
            type="number"
            class="form-control"
            id="Credit"
            value={Credit}
            onChange={(event) => {
              setCredit(event.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label>Date</label>
          <input
            type="date"
            class="form-control"
            id="Date"
            value={Date}
            onChange={(event) => {
              setDate(event.target.value);
            }}
          />
        </div>
        <div>
          <button class="btn btn-primary mt-4" onClick={save}>
            Register
          </button>
          {/* <button class="btn btn-warning mt-4" onClick={update}>
            Update
          </button> */}
        </div>
      </form>
    </div>
    <br></br>
    <table class="table table-dark" align="center">
      <thead>
        <tr>
          {/* <th scope="col">Id</th> */}
          <th scope="col">AC Code</th>
          <th scope="col">Account Name</th>
          <th scope="col">Amount</th>
          <th scope="col">Debit</th>
          <th scope="col">Credit</th>
          <th scope="col">Date</th>
          <th scope="col">InvoiceNo</th>
          

          <th scope="col">Option</th>
        </tr>
      </thead>
      
         
      {Journal.map((data)=> {
        return (
          <tbody>
            <tr>
              <th scope="row"> {data.RefNo}</th>
              {/* <td>{data.MastrAccount}</td> */}
              <td>{data.AccountName}</td>
              <td>{data.Amount}</td>
              <td>{data.Debit}</td>
              <td>{data.Credit}</td>
              <td>{data.Date}</td>
              <td>{data.InvoiceNo}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-warning"
                  onClick={() => edit(data)}
                >
                  Edit
                </button>
                {/* <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => Delete(data.id)}
                >
                  Delete
                </button> */}
              </td>
            </tr>
          </tbody>
    );
  })}
</table>
  
</div>
);
}
export default Gj;