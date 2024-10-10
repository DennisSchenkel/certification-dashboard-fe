import { useEffect, useState } from "react"
import axiosDefault from "../api/axiosDefault"
import Categories from "./Categories"

export default function Sections({projectId, section}) {

    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosDefault.get(`/sections/${section.id}/categories/`);
                const categories = response.data;
                setCategories(categories);
            } catch (error) {
                setError(error);
            }
        }
        fetchData();

    }
    , [ projectId, section.id ]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <div>
                <h2 className="custom-h2">{section.name}</h2>
                <div className="row">
                    {
                        categories.map((category) => (                        
                            <div key={category.id} className="col-2 mt-1">
                                <Categories projectId={projectId} sectionId={section.id} category={category} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}