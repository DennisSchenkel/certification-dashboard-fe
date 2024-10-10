import { Form } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axiosDefault from "../../api/axiosDefault";

export default function StatusSelector({ projectId, sectionId, categoryId, criterionId, onStatusChange }) { // onStatusChange als Prop

    const [statusSelector, setStatusSelector] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosDefault.get(`/projects/${projectId}/criteria/${criterionId}/result/`);
                const status = response.data.status;
                setStatusSelector(status);
            } catch (error) {
                setError(error);
            }
        }
        fetchData();
    }, [projectId, sectionId, categoryId, criterionId]);

    const handleStatusChange = async (event) => { // Async Funktion
        const newStatus = event.target.value;
        setStatusSelector(newStatus);
        console.log(newStatus);
        try {
            const token = localStorage.getItem('authToken'); // Token abrufen
            await axiosDefault.post(
                `/projects/${projectId}/criteria/${criterionId}/result/`,
                { status: newStatus },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Token hinzufügen
                    },
                }
            );
            onStatusChange(newStatus); // Elternkomponente informieren
        } catch (error) {
            setError('Berechtigung verweigert oder Fehler beim Aktualisieren.');
            console.error(error);
        }
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Form className="mt-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Select value={statusSelector} aria-label="Default select example" onChange={handleStatusChange} >
                    <option value="out_of_scope">Out of Scope</option>
                    <option value="in_scope">In Scope</option>
                    <option value="definition_defined">Ausprägung definiert</option>
                    <option value="planning_review">Review Fachplanung</option>
                    <option value="auditor_check">Prüfung durch Auditor</option>
                    <option value="approval">Approval</option>
                </Form.Select>
            </Form.Group>
        </Form>
    );
}
