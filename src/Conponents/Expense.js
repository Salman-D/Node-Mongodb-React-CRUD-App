import axios from 'axios'
import {useEffect,useState} from 'react'
import "../App.css"
import {useNavigate , Outlet} from 'react-router-dom';


function Expense(){

  const [amount, setamount] = useState('')
  const [newamount, setnewamount] = useState('')
  const [description, setdescription] = useState('')
  const [newDes, setnewDes] = useState('')
  let [getdata ,setdata] = useState([ ])
  
  const navigate = useNavigate()
  
  useEffect(()=>{
    ShowAmount()
  },[])

  // const auth = localStorage.getItem('user')
  // return auth?<Outlet/>:navigate('/')

 
  function ShowAmount (){
    axios.post("http://localhost:4000/ExpenseTracker/ShowAllTransaction")
    .then((snap)=>{
      console.log(snap.data.data)

     var getdata =[]
     snap.data.data.map((v,i)=>{
      var obj = {
            amount : v.amount,
            description: v.description,
            id:v._id
          }  
          // console.log(obj) 
          getdata.push(obj) 
        
        })
        setdata(getdata)
    })
  }


  function Update(id){
    console.log(id)
    axios.put("http://localhost:4000/Update",{
        id: id,
        newamount:newamount,
        newDes : newDes
    }) 
    setnewDes('')
    setnewamount('')
  }

  function Delete(id){
    console.log(id)
    axios.delete(`http://localhost:4000/delete/${id}`) 
  }


  function AddAmount(){
    if ( amount == "" || description == ""){
      alert("Please Enter Amount And Description")
    }else{
  
    console.log(amount,description)
    axios.post("http://localhost:4000/ExpenseTracker", {
        amount: amount, 
        description: description
      })
      setamount('')
      setdescription('')
      .then((res) => console.log(res))
      .catch((res) => console.log("error"));
  }
}
  return(
    <div className='App'>

      <div>
        <b>Amount : </b><input type="number"  value={amount} onChange={(e)=>{setamount(e.target.value)}} /> <br /><br />
        <b>Description : </b><input type="text"  value={description} onChange={(e)=>{setdescription(e.target.value)}} /> <br /><br />
        <button className='btn btn-primary mx-20' onClick={()=>AddAmount()} >Add User</button>  
        <button className='btn btn-secondary' onClick={()=>ShowAmount()} >Show User</button>  
      </div>

    <div className="row my-17">
            {getdata.map((v,i)=>{
        return (
        <div  key={i} className="col-sm-6 col-md-4  ">
    
            <div className="card mb-3 mt-4" style={{width: '400px'}}>
                    <div className="card-body">
                        <p className="card-text"><b>Amount : </b>{v.amount}</p>
                        <p className="card-text"><b>Description : </b>{v.description}</p>
                        <p className="card-text"><b><label>Amount Updated</label> </b></p>

                        <i>Amount</i><br/>
                        <input type='text' placeholder='Updated your amount' onChange={(e)=>{setnewamount(e.target.value)}}/><br/>
                        <i>Description</i><br/>
                        <input type='text' placeholder='Updated your Description' onChange={(e)=>{setnewDes(e.target.value)}}/><br/>
                        <button className='btn btn-success ml-10' onClick={()=>Update(v.id)}>Updated Amount</button>
                        <button className='btn btn-danger' onClick={()=>Delete(v.id)}>Delete Amount</button>
                    </div>
            </div>
            </div>
        )
        })}
    </div>
</div>
  )
}

export default Expense;
