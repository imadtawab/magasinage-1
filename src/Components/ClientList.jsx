import React, { useEffect, useState } from 'react'
import Fuse from 'fuse.js'

export default function ClientList({clientSelected, setClientSelected, clientList, search, setSearch,setFranknessNotExpired ,setCalculateResult}) {
  const [clientListArray, setClientListArray] = useState(clientList)
  const searchHandler = (e) => {
    // setClientSelected(null)

    setSearch(e.target.value)
    // Fonction pour filtrer les noms
// function filterClients(inputValue) {
//   if(inputValue === "") return clientListArray;
//   const letters = inputValue.toLowerCase().split(""); // Divise en lettres individuelles
//   return clientList.filter(client => {
//     const name = client.name.toLowerCase();
//     return letters.every(letter => name.includes(letter)); // Vérifie que chaque lettre est présente
//   });
// }

// const results = filterClients(e.target.value);
// setClientListArray(results)
// console.log(results.map(client => client.name));

// function searchByName(name) {
//   return clientList.some(user => user.name.toLowerCase() === name.toLowerCase());
// }

// const result = searchByName(e.target.value);
// const searchByName = (name) => {
//   return clientList.filter(item =>
//     item.name.toLowerCase().includes(name.toLowerCase())
//   );
// };
// setClientListArray(searchByName(e.target.value))
// console.log(e.target.value + " === " , searchByName(e.target.value).map(client => client.name))



const options = {
  keys: ["name"],       // Fields to search
  threshold: 0.4,       // Match threshold (lower is stricter)
};

const fuse = new Fuse(clientList, options);

const searchByName = (query) => {
  if(query === "") return clientList;
  const results = fuse.search(query);
  return results.map(result => result.item); // Extract matched items
};

// Usage:
setClientListArray(searchByName(e.target.value)); // Matches Samsung Galaxy

}
    useEffect(() => {
      if(search === "") return setClientListArray(clientList)
    }, [search])
  
  return (
    <div className='ClientList'>
                <h2>La liste des clients</h2>
                <input value={search} onChange={searchHandler} type="search" name="" id="" placeholder="Search ..."/>
                <div className="clients-list">
                    {clientListArray.map((client,i) => (
                        <div key={i} className={"box" + (clientSelected?.name === client.name ? " active" : "")} onClick={() =>{ 
                          setClientSelected(client)
                          setFranknessNotExpired(null)
                          setCalculateResult(null)
                          }}>
                            <span className="name">{client.name}</span>
                            <span className="day">{client.franchise} jrs</span>
                        </div>
                    ))} 
                </div>
    </div>
  )
}
