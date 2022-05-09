import React, { Component } from 'react';
import './App.css';
import { useState } from 'react';


class App extends Component {
	state = {
    isLoading: true,
    creditCard: [],
	cardHolderName: '',
	cardNumber: '',
	limit: ''
	
  };
  
 
  async componentDidMount() {
    const response = await fetch('/creditCard');
    const body = await response.json();
    this.setState({ creditCard: body, isLoading: false });
  }
  
 
	render() {
		
	
    const {creditCard, isLoading, cardHolderName,cardNumber,limit} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
	
	const handleChangeName=(e)=> {
			this.setState({cardHolderName: e.target.value});
	}
	
	const handleChangeNumber=(e) =>{
		this.setState({cardNumber: e.target.value});
	}
	
	const handleChangeLimit = (e) =>{
		this.setState({limit: e.target.value});
	}
	
	const handleSubmit = (e)=>{
		
		const creditCardDto={cardHolderName,cardNumber,limit};
		fetch('/creditCard', { 
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(creditCardDto)
		}).then(()=>{
			console.log("Credit card created");
		});
	}
	  return (
		<div style={{margin:'15px'}} >
				<header>
					<h2>Credit Card System</h2>
				</header>
				<br /> <br /> 
				<h5>Add</h5>
				<form onSubmit={handleSubmit}>	
					<label>Name</label><br />
					<input type="text" required value={cardHolderName}
					onChange={handleChangeName}/><br />
					
					<label>Card number</label>	<br />			
					<input type="text"	required value={cardNumber} 
							onChange={handleChangeNumber}/><br />
					
					<label>Limit</label><br />				
					<input  type="text" required value={limit}
						 onChange={handleChangeLimit}/>
					<br /><br />
					 <button type="submit">Submit</button>
					
				</form>
				
				<br /><br />
			
				<h5>Existing Cards</h5>
				 <br />
				<table >
				<thead>
				<tr>
					<th style={{border: '1px solid black', width:'20%', textAlign: 'center'}}>Name</th>
					<th style={{border: '1px solid black', width:'20%', textAlign: 'center'}}>Card Number</th>
					<th style={{border: '1px solid black', width:'20%', textAlign: 'center'}}>Balance</th>
					<th style={{border: '1px solid black', width:'20%', textAlign: 'center'}}>Limit</th>
				</tr>
				</thead>
				<tbody>
				{creditCard.map(card =>
				  <tr  style={{border: '1px solid black', textAlign: 'center'}} key={card.id}>
					<td style={{border: '1px solid black', textAlign: 'center'}} >{card.cardHolderName}</td>
					<td style={{border: '1px solid black', textAlign: 'center'}} >{card.cardNumber}</td>
					<td style={{border: '1px solid black', textAlign: 'center'}} >&euro;{card.balance}</td>
					<td style={{border: '1px solid black', textAlign: 'center'}} >&euro;{card.limit}</td>
				  </tr>
				)}
				</tbody>
				</table>
			
		</div>
		
	  );
	}
}

export default App;
