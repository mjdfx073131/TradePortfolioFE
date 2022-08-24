import React, { FunctionComponent, useState } from "react";
import ProjectService from "../services/OrderService";
import {Order} from "../types/types";
import ProjectList from "./ProjectList";
export interface ProjectGetItem {

}

const ProjectGetEntry: FunctionComponent<ProjectGetItem> = () => {

    let project_got = {} as Order;
    const [oneProject, setOneProject] = useState(project_got);
    const [order_id, setOrderId] = useState(0);

    function getOneProject(): void {
        ProjectService.getOneOrder(order_id).then((response: any) => {
            setOneProject(response.data);
            console.log(response.data)
        });
    }


    return <div>
      <h1 className="text-center" style={{color: "#ffffff", marginBottom: "20px"}}>Find Order by ID</h1>
      <div>
          <input type="text"
                placeholder="Enter an order Id"
                onChange={e => setOrderId(+e.target.value)}
              style={{marginRight: "20px",  borderRadius: "5px"}}
          />
          <button className="btn btn-primary" onClick={getOneProject} style={{backgroundColor: "#5e35b1"}}>
              Get Order
          </button>
      </div>
      <br></br>
        <ProjectList allProjects={[oneProject]}></ProjectList>
  </div>
};

export default ProjectGetEntry;