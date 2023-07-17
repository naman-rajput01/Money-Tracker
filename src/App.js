import './App.css';
import {useEffect, useState} from "react";

function App() {
  
  const[name,setName]=useState('');
  const[datetime,setDatetime]=useState('');
  const[description,setDescription]=useState('');
  const[transactions,setTransactions]=useState([])

  useEffect(()=>{
    getTransactions().then(transactions=>{
      // console.log(transactions)
      setTransactions(transactions)
    })
  },[])

  async function getTransactions(){
    const url=process.env.REACT_APP_API_URL+'/transactions'
    const response=await fetch(url)
    // console.log(transactions)
    return await response.json()
  }
  
  function addNewTransaction(ev){
    ev.preventDefault();
    setName('')
    setDatetime('')
    setDescription('')
    const url=process.env.REACT_APP_API_URL+'/transaction'
    const price=name.split(' ')[0];
    fetch(url , {
        method:"POST",
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({
          price,
          name:name.substring(price.length+1),
          description,
          datetime
        })
    }).then(response=>{

      response.json().then((json)=>{
        
        console.log('result ',json)
      })
    })

    
  }
  let balance=0;
  for(const transaction of transactions){
    balance=balance+transaction.price
  }
  let total=50000
  total=total-balance;



  return (
   <main>
    <h1>Rs.{total}</h1>
    <form onSubmit={addNewTransaction}>
      <div className="basic">
      <input type="text" 
             value={name}
             onChange={ev=> setName(ev.target.value)}
             placeholder={'+5000 new samsung tv'}
      />
      <input type="datetime-local" value={datetime}
             onChange={ev=> setDatetime(ev.target.value)}
      />
      </div>
      <div className="description"
           
           
      >
        <input type="text" value={description}
           onChange={ev=> setDescription(ev.target.value)} placeholder={'Description...'} />
      </div>
      <button type="submit" >Add New Transaction</button>
    </form>
    <div className="transactions">
     {transactions.length>0 && transactions.map(transaction=>(
        <div className="transaction">
        <div className="left">
        <div className="name">{transaction.name}</div>
        <div className="description">{transaction.description}</div>
        </div>
        <div className="right">
          <div className={"price " +( transaction.price<0?'red':'green')}>{transaction.price}</div>
          <div className="datetime">{transaction.datetime}</div>
        </div>
      </div>
     ))}
      
    </div>
   </main>
  );
}

export default App;
