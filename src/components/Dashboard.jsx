import { useEffect } from "react"
import axiosDefault from "../api/axiosDefault"
import { Button } from 'antd';

export default function Dashboard() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosDefault.get("/criteria/");
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }
    , []);

    return (
        <div>
           <p>This is the first initial setup.</p>
           <Button type="primary">Button</Button>
        </div>
    )
}