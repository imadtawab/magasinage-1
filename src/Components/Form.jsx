import React, { useEffect, useState } from "react";

export default function Form({clientSelected, setClientSelected, setSearch,franknessNotExpired ,setFranknessNotExpired,calculateResult ,setCalculateResult}) {
    const [weight, setWeight] = useState("");
    const [VTD, setVTD] = useState("");
    const [depotDate, setDepotDate] = useState("");
    const [exitDate, setExitDate] = useState(formatDate(new Date(), true));
    const [frankness, setFrankness] = useState(7);
  

    const submitHandler = (e) => {
        e.preventDefault();
        setFranknessNotExpired(null)
        setCalculateResult(null)
        // Handle Nbr of ton
        let nbrOfTon = Math.ceil(weight / 1000)
        
        // Handle Nbr of days
        let today = new Date(new Date().setHours(0,0,0,0))
        let depotDateValue = new Date(new Date(depotDate).setHours(0,0,0,0))
        let exitDateValue = new Date(new Date(exitDate).setHours(0,0,0,0))

        const diffInMilliseconds = exitDateValue - depotDateValue;
        if(diffInMilliseconds < 0) return alert("⚠Warning: La date de dépotage doit être inférieure à la date de sortie.")
    
        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)) + 1
        
        const nbrOfDays = diffInDays - +frankness
    
        const lwstr =  50 * nbrOfTon * nbrOfDays
    
        if(lwstr <= 0) {
            let franknessDate = new Date(exitDateValue).setDate(exitDateValue.getDate() + -nbrOfDays);
    
            // Format as dd/mm/yyyy
            const exitDateFrankness = formatDate(new Date(franknessDate));

            let nbrOfDaysFrankness = -nbrOfDays + 1

            return setFranknessNotExpired({exitDateValue, today, nbrOfDaysFrankness, exitDateFrankness})
        } else {
            let ddstor = +VTD * 0.002 * Math.ceil(nbrOfDays/10)
            let ttc = (lwstr + ddstor) * 1.2
            return setCalculateResult({lwstr, ddstor, ttc, nbrOfDays})
        }
    }
    const resetHandler = (e) => {
        setWeight("");
        setVTD("");
        setDepotDate("");
        setExitDate(formatDate(new Date(), true));
        setFrankness(7);
        setFranknessNotExpired(null)
        setCalculateResult(null)
        setClientSelected(null)
        setSearch("")
    }
    function formatDate(date, forChangeValue = false) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are 0-indexed
        const year = date.getFullYear();
        
        return forChangeValue ? `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}` : `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    }
    useEffect(() => {
        setFrankness(clientSelected?.franchise || 7)
    }, [clientSelected])
    
  return (
    <div className="Form">
      <h2>Magasinage</h2>
      <form onSubmit={submitHandler}>
        <section>
          <div className="box">
            <label htmlFor="weight">Poids:</label>
            <input value={weight} onChange={e => setWeight(e.target.value === "" ? "" : +e.target.value)}
              step="0.001"
              min="0"
              required
              type="number"
              id="weight"
              placeholder="Weight"
            />
          </div>
          <div className="box">
            <label htmlFor="vtd">Valeur total déclaré:</label>
            <input value={VTD} onChange={e => setVTD(e.target.value === "" ? "" : +e.target.value)}
              step="0.001"
              min="0"
              required
              type="number"
              id="vtd"
              placeholder="VTD"
            />
          </div>
        </section>
        <section>
          <div className="box">
            <label htmlFor="depotDate">Date de dépotage:</label>
            <input value={depotDate} onChange={e => setDepotDate(e.target.value)}
              placeholder="Select ..."
              required
              type="date"
              id="depotDate"
            />
          </div>
          <div className="box">
            <label htmlFor="exitDate">Date de sortie:</label>
            <input value={exitDate} onChange={e => setExitDate(e.target.value)}
              placeholder="Select ..."
              required
              type="date"
              id="exitDate"
            />
          </div>
        </section>
        <section>
          <div className="box">
            <label htmlFor="frankness">Franchise: {clientSelected ? <span>({clientSelected?.name})</span> : ""}</label>
            <input disabled={clientSelected} value={frankness} onChange={e => setFrankness(e.target.value === "" ? "" : +e.target.value)} min="7" required type="number" id="frankness"/>
          </div>
          <div className="box"></div>
        </section>
        <div className="footer">
          <button type="reset" id="reset" onClick={resetHandler}>
            Reset
          </button>
          <button type="submit" id="calculate">
            Calculate
          </button>
        </div>
        {franknessNotExpired && (
            <div id="output" className="output">
                {franknessNotExpired.exitDateValue - franknessNotExpired.today === 0 ? (
                    franknessNotExpired.nbrOfDaysFrankness === 1 ? (
                        <h2 style={{color: "#df2626"}}>C'est le dernier jour de la franchise 😬.</h2>
                    ) : (
                        <h2>Tu as déjà une franchise de <span>{franknessNotExpired.nbrOfDaysFrankness} jrs</span> jusqu'au <span>{franknessNotExpired.exitDateFrankness}</span>.</h2>
                    )
                ) : (franknessNotExpired.nbrOfDaysFrankness - 1 === 0 ? (
                    <h2>Le <span className="exit-date">{formatDate(new Date(franknessNotExpired.exitDateValue))}</span>, C'est le dernier jour de la franchise.</h2>
                ) : (
                    <h2>Le <span className="exit-date">{formatDate(new Date(franknessNotExpired.exitDateValue))}</span>, il te restera encore une franchise de <span>{franknessNotExpired.nbrOfDaysFrankness} jrs</span> jusqu'au <span>{franknessNotExpired.exitDateFrankness}</span>.</h2>
                ))}
            </div>
        )}
        {calculateResult && (
            <div id="output" className="output">
                <div className="box">
                    <h3>LWSTR</h3>
                    <div className="value">{calculateResult.lwstr.toFixed(2)} Dhs<span>{calculateResult.nbrOfDays} jour{calculateResult.nbrOfDays === 1 ? "" : "s"} de magasinage</span></div>
                </div>
            <div className="box">
                <h3>DDSTOR</h3>
                <div className="value">{calculateResult.ddstor.toFixed(2)} Dhs</div>
            </div>
            <div className="box">
                <h3>Total TTC</h3>
                <div className="value">{calculateResult.ttc.toFixed(2)} Dhs</div>
            </div>
            </div>
        )}
      </form>
    </div>
  );
}
