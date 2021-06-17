import React from 'react'
import { SvgContainer } from './components'

const SVGContainer = ({ ownership_lines, ownership_texts }) => {
    return (

        <SvgContainer>

            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">

                {ownership_lines.map((ownership_line, index) =>

                    <line
                        key={index}
                        strokeDasharray={ownership_line[4] === "consolidated-line" ? "0" : "4"}
                        className={ownership_line[4]}
                        x1={ownership_line[0]}
                        y1={ownership_line[1]}
                        x2={ownership_line[2]}
                        y2={ownership_line[3]}
                        stroke="var(--waibe-blue-primary)" />

                )}

                {ownership_texts.map((ownership_text, index) =>

                    <text
                        key={index}
                        x={ownership_text[0]}
                        y={ownership_text[1]}
                        stroke="white"
                        className="ownership-text">
                        {ownership_text[2]}
                    </text>

                )}

            </svg>

        </SvgContainer>
    )
}

export default SVGContainer
