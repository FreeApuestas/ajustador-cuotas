import logo from './logo.png';
import './App.css';
import { InputGroup, Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function App() {

  const [nCuotas, setNCuotas] = useState(0);
  const [ini, setIni] = useState(0);
  const [cuotas, setCuotas] = useState([]);

  const abc= ["A","B","C","D","E","F"]

  useEffect(() => {
    const initialInputs = Array.from({ length: nCuotas }, () => ({ value: 0, result: 0 }));
    setCuotas(initialInputs);
  }, [nCuotas]);

  const handleSubInputChange = (index, e) => {
    const newInputs = [...cuotas];
    console.log(e);
    newInputs[index].value = e;
    setCuotas(newInputs);
    console.log(cuotas)
  };

  const handleResChange = (index, e) => {
    const newInputs = [...cuotas];
    newInputs[index].result = e;
    setCuotas(newInputs);
  };

  function updateCuotas(number){
    let value = parseInt(number);
    if (isNaN(value) || value < 0) {
      value = 0;
    }else if (value>6){
      value=6;
    }
    setNCuotas(value);
  }

  function calcular(){
    const nerdamer = require("nerdamer/all.min")
    console.log(cuotas);
    let arr=cuotas.map((item,index)=>{
      let rest = [];
      for (let j = 0; j <= cuotas.length-1; j++) {
          if (j !== index) {
              rest.push(j);
          }
      }
      return (1-item.value)+abc[index]+rest.map((it)=>"+"+abc[it]).join("")+"=-"+ini
    });
    var sol = nerdamer.solveEquations(arr);
    for (let j = 0; j <= cuotas.length-1; j++){
      handleResChange(abc.indexOf(sol[j][0]),sol[j][1]);
    }
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
          <Form.Control aria-label="cuota" type="number" min="0" max="6" onChange={(e)=>updateCuotas(e.target.value)}/>
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Cantidad inicial</InputGroup.Text>
          <Form.Control aria-label="cuota" type="number" min="0" onChange={(e)=>setIni(e.target.value)}/>
        </InputGroup>
      </Row>
      <Row className='pad'>
        <Col>
        {cuotas.map((input,index) => (
          <InputGroup>
            <Form.Control aria-label="catidad" readOnly  placeholder='Cantidad' default={input.result} value={input.result}/>
            <InputGroup.Text>*</InputGroup.Text>
            <Form.Control aria-label="cuota" type="number" placeholder='Rellename' onChange={(e) => handleSubInputChange(index, e.target.value)}/>
          </InputGroup>
        ))}
        </Col>
      </Row>
      <Row className="pad">
        <Button onClick={()=>calcular()}>Calcular</Button>
      </Row>
    </Container>
  );
}

export default App;
