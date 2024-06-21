import './App.css';
import { InputGroup, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function App() {

  const [nCuotas, setNCuotas] = useState(1);
  const [ini, setIni] = useState({ cantidad: 0, cuota: 0 });
  const [cuotas, setCuotas] = useState([{ value: 0, result: 0 }]);
  const [res, setRes] = useState({ apostado: 0, ganado: 0 });
  const [refresh, setRefresh] = useState(true);

  const abc = ["A", "B", "C", "D", "E", "F"]

  useEffect(() => {
    const initialInputs = Array.from({ length: nCuotas }, () => ({ value: 0, result: 0 }));
    setCuotas(initialInputs);
    setRes({ apostado: 0, ganado: 0 });
  }, [nCuotas]);

  useEffect(() => {
    let apostado = parseFloat(cuotas.map((c) => c.result).reduce((partialSum, a) => parseFloat(partialSum) + parseFloat(a), 0)) + parseFloat(ini.cantidad);
    setRes({
      apostado: parseFloat(apostado).toFixed(2),
      ganado: parseFloat(ini.cantidad * ini.cuota - apostado).toFixed(2)
    })
  }, [cuotas, ini])

  useEffect(() => {
    try {
      calcular()
    } catch (error) {

    }
  }, [refresh])


  const handleChangeCuotaValue = (index, e) => {
    let newInputs = cuotas.map((input, idx) =>
      idx === index ? { ...input, value: e } : input
    );
    setCuotas(newInputs);
    setRefresh(!refresh);
  };

  function updateNCuotas(number) {
    let value = parseInt(number);
    if (isNaN(value) || value < 0) {
      value = 0;
    } else if (value > 6) {
      value = 6;
    }
    setNCuotas(value);
  }

  function calcular() {
    const nerdamer = require("nerdamer/all.min")
    let temp = [];
    if (cuotas.length === 1) {
      let one = (ini.cantidad / (cuotas[0].value - 1)).toFixed(2);
      temp.push({ value: cuotas[0].value, result: one });
    } else if (cuotas.length > 0) {
      let arr = cuotas.map((item, index) => {
        let rest = [];
        for (let j = 0; j <= cuotas.length - 1; j++) {
          if (j !== index) {
            rest.push(j);
          }
        }
        return (1 - item.value) + abc[index] + rest.map((it) => "+" + abc[it]).join("") + "+" + ini.cantidad + "=0"
      });
      console.log(arr);
      var sol = nerdamer.solveEquations(arr);
      console.log(sol);
      for (let j = 0; j <= cuotas.length - 1; j++) {
        temp.push({ value: cuotas[j].value, result: parseFloat(sol[j][1]).toFixed(2) })
      }
    }
    setCuotas(temp);
  }

  return (
    <Container fluid className="App-header">
      <Row className='pad'>
        <Col>
          <img src={"/logo" + (Math.round(Math.random() * 3) + 1) + ".png"} className="App-logo" alt="logo" />
        </Col>
      </Row>
      <Row className='pad'>
        <Col>
        <Alert key={"info"} variant={"info"}>
          Calculadora de cuotas
        </Alert>
        </Col>
      </Row>
      <Row className='pad'>
        <InputGroup>
          <InputGroup.Text>Nº Cuotas que cubren</InputGroup.Text>
          <Form.Control aria-label="cuota" type="number" defaultValue={nCuotas} min="0" max="6" onChange={(e) => updateNCuotas(e.target.value)} />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Cuota ganadora</InputGroup.Text>
          <Form.Control aria-label="catidad" type="number" placeholder='Cantidad' min="0" onChange={(e) => setIni({ ...ini, cantidad: e.target.value })} />
          <InputGroup.Text>x</InputGroup.Text>
          <Form.Control aria-label="cuota" type="number" placeholder='Cuota' min="1" onChange={(e) => setIni({ ...ini, cuota: e.target.value })} />
          <InputGroup.Text>=</InputGroup.Text>
          <Form.Control type="number" disabled value={(ini.cuota * ini.cantidad).toFixed()} />
        </InputGroup>
      </Row>
      <Row className='pad'>
        <Col>
          {cuotas.map((input, index) => (
            <InputGroup key={index}>
              <Form.Control aria-label="catidad" disabled readOnly placeholder='Cantidad' default={input.result} value={input.result} />
              <InputGroup.Text>x</InputGroup.Text>
              <Form.Control aria-label="cuota" type="number" value={input.value} placeholder='Rellename' onChange={(e) => handleChangeCuotaValue(index, e.target.value)} />
            </InputGroup>
          ))}
        </Col>
      </Row>
      {parseFloat(res.apostado) !== 0 ?
        <Row className="pad">
          <InputGroup>
            <InputGroup.Text>Apostado:</InputGroup.Text>
            <InputGroup.Text>{res.apostado}</InputGroup.Text>
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>Ganado:</InputGroup.Text>
            <InputGroup.Text>{res.ganado}</InputGroup.Text>
          </InputGroup>
        </Row>
        : <></>}
      {/* <Row className="pad">
          <Button onClick={() => calcular()}>Calcular</Button>
        </Row> */}
    </Container>
  );
}

export default App;
