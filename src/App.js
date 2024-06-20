import logo from './logo.png';
import './App.css';
import { InputGroup, Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function App() {

  const [nCuotas, setNCuotas] = useState(0);
  const [ini, setIni] = useState({ cantidad: 0, cuota: 0 });
  const [cuotas, setCuotas] = useState([]);
  const [res, setRes] = useState({ apostado: 0, ganado: 0 })

  const abc = ["A", "B", "C", "D", "E", "F"]

  useEffect(() => {
    const initialInputs = Array.from({ length: nCuotas }, () => ({ value: 0, result: 0 }));
    setCuotas(initialInputs);
  }, [nCuotas]);

  useEffect(() => {
    console.log(cuotas);
    let apostado = cuotas.map((c) => c.result).reduce((partialSum, a) => partialSum + a, 0);
    setRes({
      apostado: apostado,
      ganado: ini.cantidad * ini.cuota - apostado
    })
  }, [cuotas,ini])


  const handleChangeCuotaValue = (index, e) => {
    let newInputs = cuotas.map((input, idx) =>
      idx === index ? { ...input, value: e } : input
    );
    setCuotas(newInputs);
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
    let arr = cuotas.map((item, index) => {
      let rest = [];
      for (let j = 0; j <= cuotas.length - 1; j++) {
        if (j !== index) {
          rest.push(j);
        }
      }
      return (1 - item.value) + abc[index] + rest.map((it) => "+" + abc[it]).join("") + "=-" + ini.cantidad
    });
    console.log(arr);
    var sol = nerdamer.solveEquations(arr);
    let temp=[];
    for (let j = 0; j <= cuotas.length - 1; j++) {
      temp.push({value:cuotas[j].value,result:sol[j][1]})
      // handleChangeCuotaResult(abc.indexOf(sol[j][0]), sol[j][1]);
    }
    setCuotas(temp);
    // let apostado = cuotas.map((c) => c.result).reduce((partialSum, a) => partialSum + a, 0);
    // setRes({
    //   apostado: apostado,
    //   ganado: ini.cantidad * ini.cuota - apostado
    // })
  }

  return (
    <Container fluid className="App-header">
      <Row className='pad'>
        <Col>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            Calculadora de cuotas
          </h1>
        </Col>
      </Row>
      <Row className='pad'>
        <InputGroup>
          <InputGroup.Text>Nº Cuotas que cubren</InputGroup.Text>
          <Form.Control aria-label="cuota" type="number" min="0" max="6" onChange={(e) => updateNCuotas(e.target.value)} />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Cuota ganadora</InputGroup.Text>
          <Form.Control aria-label="catidad" type="number" placeholder='Cantidad' min="0" onChange={(e) => setIni({ ...ini, cantidad: e.target.value })} />
          <InputGroup.Text>x</InputGroup.Text>
          <Form.Control aria-label="cuota" type="number" placeholder='Cuota' min="1" onChange={(e) => setIni({ ...ini, cuota: e.target.value })} />
          <InputGroup.Text>=</InputGroup.Text>
          <Form.Control type="number" disabled value={ini.cuota * ini.cantidad} />
        </InputGroup>
      </Row>
      <Row className='pad'>
        <Col>
          {cuotas.map((input, index) => (
            <InputGroup>
              <Form.Control aria-label="catidad" disabled readOnly placeholder='Cantidad' default={input.result} value={input.result} />
              <InputGroup.Text>x</InputGroup.Text>
              <Form.Control aria-label="cuota" type="number" placeholder='Rellename' onChange={(e) => handleChangeCuotaValue(index, e.target.value)} />
            </InputGroup>
          ))}
        </Col>
      </Row>
      {res.apostado !== 0 ?
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
      <Row className="pad">
          <Button onClick={() => calcular()}>Calcular</Button>
        </Row>
    </Container>
  );
}

export default App;
