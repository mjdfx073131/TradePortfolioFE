import React from "react";

const Advice = () => {
    return (
        <div>
            <div id="search_bar">
                <label htmlFor="search"></label>
                <input id="search" type="text" name="searchActor" placeholder="Search Stocks"></input>
                <input id="submit" type="submit" />
            </div>
            <div>
                <div id="first_set">
                    <div id="left">
                        <svg id="treeMap"></svg>
                    </div>
                    <div id="right">
                        <svg id="lineChart"></svg>
                        <div id="lineChart_tooltip"></div>

                    </div>
                </div>
                <div id="bottom_set">
                    <svg id="bubbleChart"></svg>
                    <div id="bubbleChart-button_div"></div>
                </div>
            </div>

            <div id="tooltip"></div>
        </div>
    )
}

export default Advice;