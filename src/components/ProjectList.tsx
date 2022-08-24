import React, { FunctionComponent } from "react";
import { Order } from "../types/types";
import { STATUS_CODE } from "../types/types";
export interface ProjectListProps {
    allProjects: Order[],
}

const ProjectList: FunctionComponent<ProjectListProps> = (props) => {

    return (
        <div className="container" style={{ marginLeft: "40px", marginRight: "40px", borderRadius: "5px", top: "0px" }} >
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
                        props.allProjects.map(
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
        </div>);
};

export default ProjectList;
