import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useDepartamentos } from '../context/DepartamentoContext';
import { useMotivosSalida } from '../context/MotivosSalidaContext';
import { useTiposSalida } from '../context/TiposSalidaContext';
import ClienteAxios from '../config/axios'; // Asegúrate de que este es tu cliente Axios

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

        // Verifica los datos del FormData
        console.log("Datos del FormData:");
        formData.forEach((value, key) => {
            console.log(key, value);
        });

        try {
            const response = await ClienteAxios.post("/productos", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Producto enviado:", response.data);
            // Mostrar el modal u otra notificación aquí si es necesario
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

            <Container className="mt-3 px-4 my-5">
                {/* Formulario de registro */}
                <Form onSubmit={handleSubmit}>
                    {/* Campos de formulario */}
                    <Form.Group controlId="formResponsable" className="mb-4">
                        <Form.Label>Responsable</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el responsable"
                            value={responsable}
                            onChange={(e) => setResponsable(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formDepartamento" className="mb-4">
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

                    <Form.Group controlId="formCantidad" className="mb-4">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingrese la cantidad"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formColor" className="mb-4">
                        <Form.Label>Color</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formModelo" className="mb-4">
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el modelo"
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formMarca" className="mb-4">
                        <Form.Label>Marca</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese la marca"
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formSerie" className="mb-4">
                        <Form.Label>Serie</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese la serie"
                            value={serie}
                            onChange={(e) => setSerie(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formObservaciones" className="mb-4">
                        <Form.Label>Observaciones</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Ingrese observaciones"
                            value={observaciones}
                            onChange={(e) => setObservaciones(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formMotivoSalida" className="mb-4">
                        <Form.Label>Motivo de Salida</Form.Label>
                        <Form.Select
                            value={idMotivoSalida}
                            onChange={(e) => setIdMotivoSalida(e.target.value)}
                            required
                        >
                            <option value="">Selecciona una opción</option>
                            {motivosSalida.map(motivo => (
                                <option key={motivo.id_motivo_salida} value={motivo.id_motivo_salida}>
                                    {motivo.motivo_salida}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formTipoSalida" className="mb-4">
                        <Form.Label>Tipo de Salida</Form.Label>
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

                    <Form.Group controlId="formFechaEstimadaReparacion" className="mb-4">
                        <Form.Label>Fecha Estimada de Reparación</Form.Label>
                        <Form.Control
                            type="date"
                            value={fechaEstimadaReparacion}
                            onChange={(e) => setFechaEstimadaReparacion(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formObservacionesSalida" className="mb-4">
                        <Form.Label>Observaciones de Salida</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Ingrese observaciones de salida"
                            value={observacionesSalida}
                            onChange={(e) => setObservacionesSalida(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Enviar
                    </Button>
                </Form>
            </Container>
        </>
    );
}

export default Home;
