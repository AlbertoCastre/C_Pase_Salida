import React from "react";
import html2pdf from "html2pdf.js";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function Home() {
    const exportToPDF = () => {
        const element = document.getElementById("pdf-content");
        if (element) { // Verifica que el elemento no sea null
          const opt = {
            margin: 0.5,
            filename: 'pase_de_salida.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
          };
          html2pdf().from(element).set(opt).save();
        } else {
          console.error("No se encontró el elemento con ID 'pdf-content'");
        }
      };

  return (
    <>
      <Navbar bg="light" expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Pase de Salida</Navbar.Brand>          
        </Container>
      </Navbar>

      <Container id="pdf-content" className="mt-3 px-4 my-5">
        <Row>
          <Col sm={6}>
            <h2>REGISTRO DE SALIDA</h2>
            <Container className="px-4 my-4">
              <InputGroup>
                <InputGroup.Text>No.Folio Bitácora de control</InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" />
              </InputGroup>
            </Container>
            <Container className="px-4 my-4">
              <InputGroup>
                <InputGroup.Text>
                  Verificación de Garita de Salida
                </InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" />
              </InputGroup>
            </Container>
            <Container className="px-4 my-4">
              <InputGroup>
                <InputGroup.Text>Fecha de salida por Garita </InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" />
              </InputGroup>
            </Container>
          </Col>
          <Col sm={6}>
            <h2>REGISTRO DE ENTRADA</h2>

            <Container className="px-4 my-4">
              <InputGroup>
                <InputGroup.Text>
                  Verificación de entrada de Garita
                </InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" />
              </InputGroup>
            </Container>
            <Container className="px-4 my-4">
              <InputGroup>
                <InputGroup.Text>Baja en Bitácora de Control</InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" />
              </InputGroup>
            </Container>
            <Container className="px-4 my-4">
              <InputGroup>
                <InputGroup.Text>Fecha de entrada por Garita </InputGroup.Text>
                <Form.Control as="textarea" aria-label="With textarea" />
              </InputGroup>
            </Container>
          </Col>
        </Row>
      </Container>

      <Container className="px-4 my-5">
        <InputGroup className="mb-4">
          <InputGroup.Text id="basic-addon3">
            Responsable que envía por parte del hotel
          </InputGroup.Text>
          <Form.Control id="basic-url" aria-describedby="basic-addon3" />
        </InputGroup>

        <InputGroup className="mb-4">
          <InputGroup.Text id="basic-addon3">
            Nombre o Razón Social
          </InputGroup.Text>
          <Form.Control id="basic-url" aria-describedby="basic-addon3" />
        </InputGroup>

        <InputGroup className="mb-4">
          <InputGroup.Text id="basic-addon3">
            Dirección
          </InputGroup.Text>
          <Form.Control id="basic-url" aria-describedby="basic-addon3" />
        </InputGroup>
        
        <Form.Label htmlFor="inputPassword5">Departamento</Form.Label>
        <Form.Select>
          <option>Elija una opción</option>
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </Container>

      {/* Formulario en dos columnas */}
      <Container className="px-4 my-5">
        <Row>
          <Col sm={6} className="mb-4">
            <Form.Group controlId="formCantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control type="number" placeholder="Ingrese la cantidad" />
            </Form.Group>
          </Col>
          <Col sm={6} className="mb-4">
            <Form.Group controlId="formMarca">
              <Form.Label>Marca</Form.Label>
              <Form.Control type="text" placeholder="Ingrese la marca" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6} className="mb-4">
            <Form.Group controlId="formColor">
              <Form.Label>Color</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el color" />
            </Form.Group>
          </Col>
          <Col sm={6} className="mb-4">
            <Form.Group controlId="formModelo">
              <Form.Label>Modelo</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el modelo" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6} className="mb-4">
            <Form.Group controlId="formSerie">
              <Form.Label>Serie</Form.Label>
              <Form.Control type="text" placeholder="Ingrese la serie" />
            </Form.Group>
          </Col>
          <Col sm={6} className="mb-4">
            <Form.Group controlId="formObservaciones">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Ingrese observaciones" />
            </Form.Group>
          </Col>
        </Row>
      </Container>

      {/* Nuevos campos */}
      <Container className="px-4 my-5">
        <Form.Group controlId="formMotivoSalida" className="mb-4">
          <Form.Label>MOTIVO DE SALIDA</Form.Label>
          <Form.Select>
            <option>Selecciona una opción</option>
            <option>Opción 1</option>
            <option>Opción 2</option>
            <option>Opción 3</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formFechaDevolucion" className="mb-4">
          <Form.Label>
            SI ES TEMPORAL INDIQUE LA FECHA PROBABLE DE DEVOLUCIÓN
          </Form.Label>
          <Form.Control type="date" />
        </Form.Group>
      </Container>

      {/* Espacio para firmas */}
      <Container className="px-4 my-5">
        <Row>
          <Col sm={6} className="mb-4 my-5">
            <Form.Group controlId="formVoBoLiderDepartamento">
              <div style={{ borderBottom: '1px solid black', marginBottom: '10px' }}></div>
              <Form.Label>Vo.Bo Líder del Departamento</Form.Label>
            </Form.Group>
          </Col>
          <Col sm={6} className="mb-4 my-5">
            <Form.Group controlId="formAutorizaLiderDivisional">
              <div style={{ borderBottom: '1px solid black', marginBottom: '10px' }}></div>
              <Form.Label>Autoriza Líder Divisional</Form.Label>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6} className="mb-4 my-5">
            <Form.Group controlId="formAutorizoGerencia">
              <div style={{ borderBottom: '1px solid black', marginBottom: '10px' }}></div>
              <Form.Label>Autorizó Gerencia o Contraloría</Form.Label>
            </Form.Group>
          </Col>
          <Col sm={6} className="mb-4 my-5">
            <Form.Group controlId="formNombreFirmaRecibe">
              <div style={{ borderBottom: '1px solid black', marginBottom: '10px' }}></div>
              <Form.Label>Nombre y firma de quien recibe</Form.Label>
            </Form.Group>
          </Col>
        </Row>
      </Container>

      {/* Mensaje importante y botón */}
      <Container className="px-4 my-5">
        <div className="alert alert-info" role="alert">
          IMPORTANTE: La persona o contratista que sale con artículos deberá de conservar la copia y mostrarla al regresar los artículos, para que sean dados de baja completamente.
        </div>
        <Button variant="primary" className="my-3" onClick={exportToPDF}>
          Exportar a PDF
        </Button>
      </Container>
    </>
  );
}

export default Home;
