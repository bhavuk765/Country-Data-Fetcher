import React from "react"
import { wait } from "@testing-library/react"

class SearchForm extends React.Component{
    constructor(){
        super()
        this.state = {
            loading:false,
            region:"",
            status:"",
            countryList:null,
            countryNameInput:"",
            countryDetails:{iso:"", timezone:"",currency:""},
            displayDetails:false,
        }
    }
    handleRegionChange = (event) => {
        this.setState({ 
            region: event.target.value,
            countryNameInput:"",
            countryDetails:{ iso:"", timezone:"",currency:""}, 
            status:"" , 
            displayDetails:false})
        if(event.target.value!==""){
            this.fetchCountries(event.target.value)
        }
    }
    handleCountryChange = (event) => {
        const x = event.target.value;
        const {countryList} = this.state
        const cN=countryList.map(i=>i.name)
        const y = cN.indexOf(x)
        if(y!==-1){
            this.setState({countryDetails:{
                iso:[countryList[y].alpha2Code,countryList[y].alpha3Code],
                currency:countryList[y].currencies,
                timezones:countryList[y].timezones
            },displayDetails:true})
        }
        this.setState({countryNameInput:x})
    }
    fetchCountries = (region) => {
        this.setState({loading:true,status:"loading country data..."})
        wait(1000);
        fetch("https://restcountries.eu/rest/v2/region/"+region)
        .then(response => response.json())
        .then(data => {
            this.setState({
                loading:false,
                countryList:data,
                status:"found "+data.length+" countries! "
            })
        })
        .catch(e=>{
            console.log(e)
        })
        
    }
    getCountries = () =>{
        if(this.state.region){
            if(!this.state.loading){
                const countryOptions = this.state.countryList.map(item =>(
                    <option 
                    key={item.numericCode} 
                    value={item.name}>
                        {item.name}
                    </option>
                    ))
                return countryOptions
            }
        }
        
        return (<option>--Select region first--</option>)
    }
    submitToConsole=e=>console.log(e.target.value)
    render(){        
        return (
        <form>
            <label>Region: </label>
            <select 
                    value={this.state.region}
                    onChange={this.handleRegionChange}
                    name="region"
                    onBlur={this.submitToConsole}
                >
                    <option value = "">--Select a region--</option>
                    <option value="africa">Africa</option>
                    <option value="americas">Americas</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
            </select> <br/><br/>
            <h2> Selected region: {this.state.region} </h2>
            <label>Country:  {this.state.status}
            <input 
                list="countries" 
                value={this.state.countryNameInput} 
                onChange={this.handleCountryChange}  
                onBlur={this.submitToConsole}
                name="country" />  
            </label>
            <datalist 
                id="countries"
                name="country"
            >
                
                {this.getCountries()}   
            </datalist> <br/>
            <h2> Selected country: {this.state.countryNameInput} </h2>
        <div style={{display:this.state.displayDetails?"block":"none"}}>
        {this.state.displayDetails?(<>
             <h3>Currency:<br/> {this.state.countryDetails.currency.map(x=><>{x.name}<br/></>)}</h3>
             <h3>ISO:<br/> "{this.state.countryDetails.iso[0]}", "{this.state.countryDetails.iso[1]}"</h3>
             <h3>Timezones:<br/> {this.state.countryDetails.timezones.map(x=><>{x}<br/></>)}</h3></>
        ):(<>Select a country</>)}
       
        </div>
        </form>)   
    }
    
}
export default SearchForm