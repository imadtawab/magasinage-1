import { useState } from "react";
import ClientList from "./Components/ClientList";
import Form from "./Components/Form";
import clientList from "../src/data/clientList.json"

function App() {
    const [clientSelected, setClientSelected] = useState(null);
    const [search, setSearch] = useState("");
    const [franknessNotExpired, setFranknessNotExpired] = useState(null);
    const [calculateResult, setCalculateResult] = useState(null);
  return (
    <main>
      <ClientList setFranknessNotExpired={setFranknessNotExpired}
setCalculateResult={setCalculateResult} search={search} setSearch={setSearch} clientList={clientList} clientSelected={clientSelected} setClientSelected={setClientSelected}/>
      <Form franknessNotExpired={franknessNotExpired}
setFranknessNotExpired={setFranknessNotExpired} calculateResult={calculateResult}
setCalculateResult={setCalculateResult} setSearch={setSearch} clientSelected={clientSelected} setClientSelected={setClientSelected}/>
    </main>
  );
}

export default App;
