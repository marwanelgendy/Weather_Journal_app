/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let month = d.getMonth()+1;
let newDate = d.getDate()+'.'+month+'.'+ d.getFullYear();
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const APIkey = '&appid=f5aa083b4d9009b2725d0dce7ce28585&units=imperial';

document.getElementById('generate').addEventListener('click',performAction);

function performAction(e){
    const ZIPcode = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;

    getData(baseURL,ZIPcode,APIkey)
    .then(function(data){
        //console.log(data);
        postData('http://localhost:3000/addData',{date : newDate , temp : data.main.temp ,content : userResponse})
        .then(function(){
            UpdateUI();
        })
    }) 
}

async function getData(baseURL,ZIPcode,APIkey){
    console.log('in getData');
    const response = await fetch(baseURL+ZIPcode+',us'+APIkey);
    try{
        const newData = await response.json();
        //console.log(newData);
        return newData;
    }
    catch(error){
        console.log('error :' + error);
    }
}

async function postData( url = '', data = {}){
    //console.log('in postData');
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      //console.log(newData);
      return newData;
    }catch(error) {
      console.log("error", error);
    }
}

async function UpdateUI(){
    //console.log('in  UI');
    const response =await fetch('http://localhost:3000/route');
    try{
        const Data = await response.json();
        //console.log(Data);
        document.getElementById('date').innerHTML ='Date :  '+ Data.date;
        document.getElementById('temp').innerHTML ='Temperature in Fahrenheit:  '+ Data.temp;
        document.getElementById('content').innerHTML ='Your_Feeling :  '+ Data.content;
    }catch(error){
        console.log('error :' + error);
    }
}
