import React, { FunctionComponent, useEffect, useState } from "react";
import OrderService from "../services/OrderService";
import {Order} from "../types/types";
import { STATUS_CODE } from "../types/types";
export interface ProjectListProps {

}

const ProjectList: FunctionComponent<ProjectListProps> = () => {

    const emptyProjectsList: Order[] = [];
    const [allProjects, setAllProjects] = useState(emptyProjectsList);

    function getAllProjects(): void {
        OrderService.getAllOrder().then((response: any) => {
            setAllProjects(response.data);
            console.log(response.data);
        });
    }
    

    useEffect(() => {
        getAllProjects();
    }, []);

    // setInterval(getAllProjects, 10000);

    return <div className="container" style={{marginLeft: "40px", marginRight: "40px",  borderRadius: "5px"}} >
        <h1 className="text-center" style={{color: '#ffffff'}}>History of Orders</h1>
        <table className="table table-striped table-light table-bordered table-hover">

            <thead>
                <tr>
                    <td>Order Id</td>
                    <td>SIN</td>
                    <td>Ticker</td>
                    <td>Shares</td>
                    <td>Unit Price</td>
                    <td>Status</td>
                </tr>
            </thead>
            <tbody>
                {
                    allProjects.map(
                        oneProject => 
                            <tr key={oneProject.orderId}>
                                <td>{oneProject.orderId}</td>
                                <td>{oneProject.sin}</td>
                                <td>{oneProject.ticker}</td>
                                <td>{oneProject.shares}</td>
                                <td>{oneProject.unitPrice}</td>
                                <td>{STATUS_CODE[oneProject.status_code]}</td>
                            </tr>
                    )
                }
            </tbody>
        </table>
    </div>;
};

export default ProjectList;
