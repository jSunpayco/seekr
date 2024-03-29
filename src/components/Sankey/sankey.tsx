import * as d3Sankey from 'd3-sankey';
import * as d3 from 'd3'
import styles from './sankey.module.scss';
import { useEffect } from 'react';
import sankeyJson from '../../sample.json'

interface Props {
    isOpen: boolean;
    closeFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SNodeExtra {
    nodeId: number;
    name: string;
}

interface SLinkExtra {
    source: number;
    target: number;
    value: number;
}
type SNode = d3Sankey.SankeyNode<SNodeExtra, SLinkExtra>;
type SLink = d3Sankey.SankeyLink<SNodeExtra, SLinkExtra>;

interface SankeyDataType {
    nodes: SNode[];
    links: SLink[];
}

const ModalSankey = (props:Props) => {

    const sankeyData: SankeyDataType = sankeyJson;

    useEffect(() => {
        DrawChart();
          
        const handleKeyDown = (event:KeyboardEvent) => {
          if (event.key === 'Escape') {
            props.closeFunction(false)
          }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    function DrawChart() {

        const svg = d3.select("#sankey")
        const width = 750;
        const height = 480;

        const color = d3.scaleOrdinal(d3.schemeTableau10);

        const sankey = d3Sankey.sankey()
            .nodeWidth(15)
            .nodePadding(20)
            .extent([[1, 1], [width - 1, height - 6]]);

        const link = svg.append("g")
            .attr("class", "links")
            .attr("fill", "none")
            .attr("stroke", "#000")
            .attr("stroke-opacity", 0.2)
            .selectAll("path");

        var node = svg.append("g")
            .attr("class", "nodes")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .selectAll("g")
            .data(sankeyData.nodes)
            .enter().append("g");

        sankey(sankeyData);

        link
            .data(sankeyData.links)
            .enter().append("path")
            .attr("d", d3Sankey.sankeyLinkHorizontal())
            .attr("stroke-width", function (d: any) { return Math.max(1, d.width); })
            .attr("stroke", d => d3.schemeTableau10[d.index || 0 % 10]);

        node.append("rect")
            .attr("x", function (d: any) { return d.x0; })
            .attr("y", function (d: any) { return d.y0; })
            .attr("height", function (d: any) { return d.y1 - d.y0; })
            .attr("width", function (d: any) { return d.x1 - d.x0; })
            .attr("fill", function (d: any) { return color(d3.schemeTableau10[d.index || 0 % 10]); })
            .attr("stroke", "#000");

        node.append("text")
            .attr("x", function (d: any) { return d.x0 - 6; })
            .attr("y", function (d: any) { return (d.y1 + d.y0) / 2; })
            .attr("dy", "0.35em")
            .attr("text-anchor", "end")
            .text(function (d: any) { return d.name; })
            .filter(function (d: any) { return d.x0 < width / 2; })
            .attr("x", function (d: any) { return d.x1 + 6; })
            .attr("text-anchor", "start");
    }

    const greyAreaClickFunction = (event:React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget)
            props.closeFunction(false)
    }

    return (
        <div className={styles.modalGreyScreen} onClick={(e)=>greyAreaClickFunction(e)}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>Sankey Diagram</h1>
                    <button className={styles.modalClose} onClick={()=>props.closeFunction(false)}>X</button>
                </div>
                <div id="sankeyContainer" className={styles.sankeyContainer}><svg id="sankey" className={styles.sankeySVG}></svg></div>
            </div>
        </div>
    )
}

export default ModalSankey;