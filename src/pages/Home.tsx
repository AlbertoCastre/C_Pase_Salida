import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useDepartamentos } from '../context/DepartamentoContext';
import { useMotivosSalida } from '../context/MotivosSalidaContext';
import { useTiposSalida } from '../context/TiposSalidaContext';
import ClienteAxios from '../config/axios'; // Asegúrate de que este es tu cliente Axios
import InputGroup from 'react-bootstrap/InputGroup';

function Home() {
    const { departamentos } = useDepartamentos();
    const { motivosSalida } = useMotivosSalida();
    const { tiposSalida } = useTiposSalida();

    // Estado para los valores del formulario
    const [responsable, setResponsable] = useState("");
    const [idDepartamento, setIdDepartamento] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [color, setColor] = useState("");
    const [modelo, setModelo] = useState("");
    const [marca, setMarca] = useState("");
    const [serie, setSerie] = useState("");
    const [observaciones, setObservaciones] = useState("");
    const [idMotivoSalida, setIdMotivoSalida] = useState("");
    const [idTipoSalida, setIdTipoSalida] = useState("");
    const [fechaEstimadaReparacion, setFechaEstimadaReparacion] = useState("");
    const [observacionesSalida, setObservacionesSalida] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Oculta el botón de enviar
        const submitButton = document.getElementById('submit-button');
        if (submitButton) {
            submitButton.style.display = 'none';
        }

        // Crea un nuevo documento PDF
        const doc = new jsPDF();
        
        // Usa html2canvas para convertir el formulario a una imagen
        const formElement = document.getElementById('form-content');
        if (formElement) {
            const canvas = await html2canvas(formElement);
            const imgData = canvas.toDataURL('image/png');
            
            // Añade la imagen al PDF
            doc.addImage(imgData, 'PNG', 10, 10, 190, 0 );
            
            // Guarda el PDF
            doc.save('formulario.pdf');
        }

        // Muestra el botón de enviar nuevamente
        if (submitButton) {
            submitButton.style.display = 'block';
        }

        const formData = new FormData();
        formData.append("action", "insert");     
        formData.append("responsable_producto", responsable);
        formData.append("id_departamento", idDepartamento);
        formData.append("cantidad_producto", cantidad);
        formData.append("color_producto", color);
        formData.append("modelo_producto", modelo);
        formData.append("marca_producto", marca);
        formData.append("serie_producto", serie);
        formData.append("observaciones_producto", observaciones);
        formData.append("id_motivo_salida", idMotivoSalida);
        formData.append("id_tipo_salida", idTipoSalida);
        formData.append("fecha_estimada_reparacion_producto", fechaEstimadaReparacion);
        formData.append("observaciones_salida_producto", observacionesSalida);

        try {
            const response = await ClienteAxios.post("/productos", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Producto enviado:", response.data);
        } catch (error) {
            console.error("Error al enviar el producto:", error);
        }
    };

    return (
        <>
            <Navbar bg="light" expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Pase de Salida</Navbar.Brand>
                </Container>
            </Navbar>

            <div style={{ padding: '0px 230px 230px' }}>
                <Container className="mt-3 px-4 my-5">
                    <Form onSubmit={handleSubmit} id="form-content">
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
                                        <InputGroup.Text>Verificación de Garita de Salida</InputGroup.Text>
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
                                        <InputGroup.Text>Verificación de entrada de Garita</InputGroup.Text>
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

                        <Row>
                            <Col sm={6}>
                                <Form.Group controlId="formResponsable" className="px-4 my-4">
                                    <Form.Label>Responsable</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el responsable"
                                        value={responsable}
                                        onChange={(e) => setResponsable(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formDepartamento" className="px-4 my-4">
                                    <Form.Label>Departamento</Form.Label>
                                    <Form.Select
                                        value={idDepartamento}
                                        onChange={(e) => setIdDepartamento(e.target.value)}
                                        required
                                    >
                                        <option value="">Elija una opción</option>
                                        {departamentos.map(departamento => (
                                            <option key={departamento.id_departamento} value={departamento.id_departamento}>
                                                {departamento.nombre_departamento}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group controlId="formCantidad" className="px-4 my-4">
                                    <Form.Label>Cantidad</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Ingrese la cantidad"
                                        value={cantidad}
                                        onChange={(e) => setCantidad(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formColor" className="px-4 my-4">
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formModelo" className="px-4 my-4">
                                    <Form.Label>Modelo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el modelo"
                                        value={modelo}
                                        onChange={(e) => setModelo(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formMarca" className="px-4 my-4">
                                    <Form.Label>Marca</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese la marca"
                                        value={marca}
                                        onChange={(e) => setMarca(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col sm={6}>
                                <Form.Group controlId="formSerie" className="px-4 my-4">
                                    <Form.Label>Serie</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese la serie"
                                        value={serie}
                                        onChange={(e) => setSerie(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formObservaciones" className="px-4 my-4">
                                    <Form.Label>Observaciones</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Ingrese observaciones"
                                        value={observaciones}
                                        onChange={(e) => setObservaciones(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formMotivoSalida" className="px-4 my-4">
                                    <Form.Label>Motivo de salida</Form.Label>
                                    <Form.Select
                                        value={idMotivoSalida}
                                        onChange={(e) => setIdMotivoSalida(e.target.value)}
                                        required
                                    >
                                        <option value="">Elija una opción</option>
                                        {motivosSalida.map(motivo => (
                                            <option key={motivo.id_motivo_salida} value={motivo.id_motivo_salida}>
                                                {motivo.motivo_salida}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group controlId="formTipoSalida" className="px-4 my-4">
                                    <Form.Label>Tipo de salida</Form.Label>
                                    <Form.Select
                                        value={idTipoSalida}
                                        onChange={(e) => setIdTipoSalida(e.target.value)}
                                        required
                                    >
                                        <option value="">Elija una opción</option>
                                        {tiposSalida.map(tipo => (
                                            <option key={tipo.id_tipo_salida} value={tipo.id_tipo_salida}>
                                                {tipo.tipo_salida}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group controlId="formFechaEstimadaReparacion" className="px-4 my-4">
                                    <Form.Label>Fecha estimada de reparación</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={fechaEstimadaReparacion}
                                        onChange={(e) => setFechaEstimadaReparacion(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="formObservacionesSalida" className="px-4 my-4">
                                    <Form.Label>Observaciones de salida</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Ingrese observaciones de salida"
                                        value={observacionesSalida}
                                        onChange={(e) => setObservacionesSalida(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

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

                        <Button variant="primary" type="submit" id="submit-button">
                            Enviar
                        </Button>
                    </Form>
                </Container>
            </div>
        </>
    );
}

export default Home;
