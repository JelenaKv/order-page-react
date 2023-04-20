import { useRef, useState } from "react";
import "./App.css"
import Input from "./components/Input";
import Dropdown from "./components/Dropdown";

function App() {

  const [values, postaviValues] = useState({
    kontakt: "",
    ime: "",
    prezime: "",
    drzava: "",
    adresa: "",
    errorMessage: ""
  });

  const inputs = [
    {
      id: 1,
      name: "kontakt",
      type: "email",
      placeholder: "Email adresa...",
      label: "Email",
      errorMessage: "E-mail adresa nije ispravna",
      required: true
    },
    {
      id: 2,
      name: "ime",
      type: "text",
      placeholder: "Ime",
      label: "Ime",
      errorMessage: "Ime treba sadržavati 3 do 16 slova",
      pattern: "^[A-Za-z]{3,16}$",
      required: true
    },
    {
      id: 3,
      name: "prezime",
      type: "text",
      placeholder: "Prezime",
      label: "Prezime",
      errorMessage: "Ime treba sadržavati 3 do 16 slova",
      pattern: "^[A-Za-z]{3,16}$",
      required: true
    },

    {
      id: 4,
      name: "adresa",
      type: "text",
      placeholder: "Adresa",
      label: "Adresa",
      errorMessage: "Adresa treba sadržavati dvije riječi i broj",
      pattern: "^[a-zA-Z]+\\s[a-zA-Z]+\\s\\d+$",
      required: true
    }
  ]

  const [naruceno, setNaruceno] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNaruceno(true);
  };

  const onChange = (e) => {
    let errorMessage = "";
    if (e.target.validity.valid) {
      postaviValues({ ...values, [e.target.name]: e.target.value, errorMessage: errorMessage });
    } else {
      errorMessage = e.target.validationMessage;
      postaviValues({ ...values, [e.target.name]: e.target.value, errorMessage: errorMessage });
    }
  };


  const [selected, setSelected] = useState("Odaberite državu");
  const [placanje, setPlacanje] = useState("Pouzeće");
  const [uvjeti, setPrihvacamUvjete] = useState();

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>

        <h3>Račun--&gt;Plaćanje</h3>
        <fieldset>
          <legend>Kontakt</legend>
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <label>Država</label>
          <Dropdown selected={selected} setSelected={setSelected} />
        </fieldset>

        <fieldset>
          <legend>Način plaćanja</legend>
          <input type="radio" name="placanje" value="Pouzeće" onChange={e => setPlacanje(e.target.value)} />Pouzeće<br></br>
          <input type="radio" name="placanje" value="Kartica" onChange={e => setPlacanje(e.target.value)} />Kartica
        </fieldset>

        <input type="checkbox" name="uvjeti" value="Prihvaćam uvjete plaćanja" onChange={e => setPrihvacamUvjete(e.target.value)} />Prihvaćam uvjete plaćanja<br></br>

        <button type="submit" >Naruči</button>

        {uvjeti && naruceno && (
          <div className="narudzba">
            <h4>Podaci za narudžbu:</h4>
            <p>Ime: {values.ime}</p>
            <p>Prezime: {values.prezime}</p>
            <p>Email: {values.kontakt}</p>
            <p>Država: {selected}</p>
            <p>Način plaćanja: {placanje}</p>
          </div>
        )}

      </form>
    </div>

  )

};

export default App



