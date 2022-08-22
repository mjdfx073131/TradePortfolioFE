import React, { FunctionComponent, useEffect, useState } from "react";
import OrderService from "../services/OrderService";
import {Order} from "../types/types";

export interface ProjectListProps {

}

const ProjectList: FunctionComponent<ProjectListProps> = () => {

    const emptyProjectsList: Order[] = [];
    const [allProjects, setAllProjects] = useState(emptyProjectsList);

    function getAllProjects(): void {
        OrderService.getAllOrder().then((response: any) => {
            setAllProjects(response.data);
        });
    }

    useEffect(() => {
        getAllProjects();
    }, [allProjects]);

    return <div className="container" style={{marginLeft: "40px", marginRight: "40px",  borderRadius: "5px"}} >
        <h1 className="text-center" style={{color: '#000'}}>History of Orders</h1>
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
                                <td>{oneProject.status_code}</td>
                            </tr>
                    )
                }
            </tbody>
        </table>
    </div>;
};

export default ProjectList;
