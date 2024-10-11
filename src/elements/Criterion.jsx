import { useEffect, useState } from "react";
import StatusBar from "./components/StatusBar";
import axiosDefault from "../api/axiosDefault";
import { Button, Modal } from "react-bootstrap";
import StatusSelector from "./components/StatusSelector";

export default function Criterion({ projectId, sectionId, categoryId, criterionId }) {
    const [criterion, setCriterion] = useState({});
    const [status, setStatus] = useState('');
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const criterionResponse = await axiosDefault.get(
                    `/sections/${sectionId}/categories/${categoryId}/criteria/${criterionId}/`
                );
                setCriterion(criterionResponse.data);

                const statusResponse = await axiosDefault.get(
                    `/projects/${projectId}/criteria/${criterionId}/result/`
                );
                setStatus(statusResponse.data.status);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [projectId, sectionId, categoryId, criterionId]);


    const updateStatus = (newStatus) => {
        setStatus(newStatus);
    }

    if (error) {
        return <></>;
    }

    return (
        <>
        
            <div
                className="border rounded mt-2 p-2 criterion"
                onClick={handleShow} 
                style={{ cursor: "pointer" }}
            >
                <div className="row g-1 align-items-center" style={{height: 50}}>
                    <div className="col-auto">
                        <h4 className="custom-h4">{criterion.prefix}</h4>
                    </div>

                    <div className="col">
                        <h4 className="custom-h4">{criterion.name}</h4>
                    </div>
                </div>
                <div>
                    <StatusBar status={status} />
                </div>
            </div>

            {/* Modal mit Kriteriums-Details */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="criterion-title">
                <Modal.Title >{criterion.prefix} - {criterion.name}</Modal.Title>

                </Modal.Header>
                <Modal.Body>

                    <div className="criterion-category">
                        <span className="custom-h4">{criterion.category_name}</span>
                    </div>


                    <div className="row g-0">
                        <div className="col-6">
                            <div className="criterion-about">
                                <h5>Beschreibung des Kriteriums</h5>
                                <p>{criterion.about}</p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="criterion-status">
                                <h5>Status</h5>
                                <StatusBar status={status} />

                                <StatusSelector 
                                    projectId={projectId} 
                                    sectionId={sectionId} 
                                    categoryId={categoryId} 
                                    criterionId={criterionId}
                                    onStatusChange={updateStatus}
                                />                        
                            </div>
                        </div>
                    </div>


                    <div className="row g-0">
                        <div className="col-6">
                            {criterion.user_story ?
                                <div className="criterion-misc">
                                    <h5>User Story</h5>
                                    <p>{criterion.user_story}</p>
                                </div>
                            : null}
                            {criterion.purpose ?
                                <div className="criterion-misc">
                                    <h5>Zweck</h5>
                                    <p>{criterion.purpose}</p>
                                </div>
                            : null}
                            {criterion.problem_statement ?
                                <div className="criterion-misc">
                                    <h5>Problem</h5>
                                    <p>{criterion.problem_statement}</p>
                                </div>
                            : null}
                            {criterion.benefit ?
                            <div className="criterion-misc">
                                <h5>Nutzen</h5>
                                <p>{criterion.benefit}</p>
                            </div>
                            : null}
                        </div>
                        <div className="col-6">
                            {criterion.technical_requirements_tier_1 ?
                            <div className="criterion-misc">
                                <h5 className="px-1">Funktionalität</h5>
                                <div className="row g-0">
                                    {criterion.technical_requirements_tier_1 ?
                                        <div className="col">
                                            <div className="criterion-functionality-title mb-3">Gut</div>
                                            <div className="px-2 mb-3">{criterion.functional_requirements_tier_1}</div>
                                        </div>
                                    : null}
                                    {criterion.functional_requirements_tier_2 ?
                                        <div className="col">
                                            <div className="criterion-functionality-title mb-3">Sehr Gut</div>
                                            <div className="px-2 mb-3">{criterion.functional_requirements_tier_2}</div>
                                        </div>
                                    : null}
                                    {criterion.technical_requirements_tier_3 ?
                                        <div className="col">
                                            <div className="criterion-functionality-title mb-3">Sehr Gut</div>
                                            <div className="px-2 mb-3">{criterion.functional_requirements_tier_3}</div>
                                        </div>
                                    : null}
                                </div>
                            </div>
                            : null}
                            
                            {criterion.tenant_enablement_requirements_tier_1 ?
                            <div className="criterion-misc">
                                <h5 className="px-1">Anforderungen für das &quot;Tenant Enablement&quot;</h5>
                                <div className="row g-0">
                                    {criterion.tenant_enablement_requirements_tier_1 ?
                                        <div className="col">
                                            <div className="criterion-functionality-title mb-3">Gut</div>
                                            <div className="px-2 mb-3">{criterion.tenant_enablement_requirements_tier_1}</div>
                                        </div>
                                    : null}
                                    {criterion.tenant_enablement_requirements_tier_2 ?
                                        <div className="col">
                                            <div className="criterion-functionality-title mb-3">Sehr Gut</div>
                                            <div className="px-2 mb-3">{criterion.tenant_enablement_requirements_tier_2}</div>
                                        </div>
                                    : null}
                                    {criterion.tenant_enablement_requirements_tier_3 ?
                                        <div className="col">
                                            <div className="criterion-functionality-title mb-3">Sehr Gut</div>
                                            <div className="px-2 mb-3">{criterion.tenant_enablement_requirements_tier_3}</div>
                                        </div>
                                    : null}
                                </div>
                            </div>
                            : null}

                            {criterion.credit_allocation?
                                <div className="criterion-misc">
                                    <h5 className="px-1">Credit Allocation</h5>
                                    <div className="row g-0">
                                        {criterion.credit_allocation ?
                                            <div className="col">
                                                <div className="px-2 mb-3">{criterion.credit_allocation}</div>
                                            </div>
                                        : null}
                                    </div>
                                </div>
                            : null}

                            {criterion.required_proof ?
                                <div>
                                    <h5 className="criterion-requirements-title">Erforderliche Nachweise</h5>
                                    <div className="criterion-requirements-proof  mb-5">
                                        <div>
                                            <div className="px-2">{criterion.required_proof}</div>
                                        </div>
                                    
                                    </div>
                                </div>
                            : null}
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Schließen
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}