import React from "react";

const Advice = () => {
    return (
        <div>
            <div id="first_set">
                <div id="left">
                    <div id="search_bar">
                        <label htmlFor="search"></label>
                        <input id="search" type="text" name="searchActor" placeholder="Search Stocks"></input>
                        <input id="submit" type="submit" />
                    </div>
                    <svg id="treeMap"></svg>
                </div>
                <div id="right">
                    <svg id="lineChart"></svg>
                </div>
            </div>
        </div>
    )
}

export default Advice;