import { useEffect, useState } from "react";
import ClientList from "./Components/ClientList";
import Form from "./Components/Form";
import clientList from "../src/data/clientList.json"
import History from "./Components/History";
import { FaHistory } from "react-icons/fa";

function App() {
    const [clientSelected, setClientSelected] = useState(null);
    const [search, setSearch] = useState("");
    const [franknessNotExpired, setFranknessNotExpired] = useState(null);
    const [calculateResult, setCalculateResult] = useState(null);
    const [openHistory, setOpenHistory] = useState(false);
    const [dataHistory, setDataHistory] = useState([])
      useEffect(() => {
        localStorage.getItem("DB") && setDataHistory(JSON.parse(localStorage.getItem("DB")))
      }, [])
  return (
    <main>
      <ClientList setFranknessNotExpired={setFranknessNotExpired} setCalculateResult={setCalculateResult} search={search} setSearch={setSearch} clientList={clientList} clientSelected={clientSelected} setClientSelected={setClientSelected}/>
      <Form dataHistory={dataHistory} setDataHistory={setDataHistory} franknessNotExpired={franknessNotExpired}
setFranknessNotExpired={setFranknessNotExpired} calculateResult={calculateResult}
setCalculateResult={setCalculateResult} setSearch={setSearch} clientSelected={clientSelected} setClientSelected={setClientSelected}/>
    <History dataHistory={dataHistory} setDataHistory={setDataHistory} active={openHistory} setOpenHistory={setOpenHistory}/>
    <span className="history-icon"><FaHistory onClick={() => setOpenHistory(true)}/></span>
    </main>
  );
}

export default App;
