import { useEffect, useState } from "react"
import axiosDefault from "../api/axiosDefault"
import "../App.css"
import Criterion from "./Criterion"

export default function Sections({projectId, sectionId, category}) {

    const [error, setError] = useState(null);
    const [criteria, setCriteria] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosDefault.get(`/sections/${sectionId}/categories/${category.id}/criteria/`);
                const pureCriteria = response.data;
                setCriteria(pureCriteria);
            } catch (error) {
                setError(error);
            }
        }
        fetchData();

    }
    , [ projectId, sectionId, category.id ]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <div style={{height: 40}}>
                <h3 className="custom-h3">{category.name}</h3>
            </div>
            {
                criteria.map((criterion) => (
                    <div key={criterion.id}>
                        <Criterion projectId={projectId} sectionId={sectionId} categoryId={category.id} criterionId={criterion.id} />
                    </div>
                ))
            }
        </>
    )
}