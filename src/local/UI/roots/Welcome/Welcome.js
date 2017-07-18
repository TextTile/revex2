import React from "react";
import NYULogo from "./NYU.png";
import FordHam from "./fordham.png";
import Document from "./Document.png";
import RevexImage from "./Revex.png";
import Arrow from "./Arrow.png";
import style from "./Welcome.css";

const docWidth = 50;
const docs = [];
for (let i = 0; i < 20; i++) {
    docs.push(i);
}

const datasetInfo = {
    config: {
        host: "nyuvis-web.poly.edu",
        index: "united-nations-topics-2",
        info: "united-nations-topics/segments",
        name: "United Nations",
        path: "es",
        port: "80",
        type: "segment",
        useAdvanced: true
    },
    hide: true,
    id: "UN",
    type: "Elasticsearch",
    hiddenFacets: ["Name", "page", "subtopic", "total"]
};

function getPosition(idx) {
    let column = idx / 3;
    let row = idx % 3;
    let inverseX = column * docWidth;
    let Y = row * docWidth * 1.5 + Math.random() * docWidth;
    return { top: Y, left: 450 - inverseX };
}

const Welcome = props => {
    return (
        <div className={style.main}>
            <div className={style.header}>
                <div className={style.title}>Cybersecurity Strategies Explorer</div>
                <button className={style.getStarted1} onClick={() => props.history.push("/Home", datasetInfo)}>
                    Get Started
                </button>
            </div>
            <div className={style.body}>
                <div className={style.subtitle}>Machine-based Text Analysis of National Cybersecurity Strategies</div>
                <div className={style.documents}>
                    {docs.map(d =>
                        <img
                            key={d}
                            style={{ ...getPosition(d), animation: `documentAnimation ${d / docs.length * 2}s`, opacity: 1 - d / docs.length }}
                            className={`style.document${d}`}
                            role="presentation"
                            src={Document}
                        />
                    )}
                </div>
                <div className={style.arrowImage}>
                    <img src={Arrow} role="presentation" />
                </div>
                <div className={style.revexImage}>
                    <img src={RevexImage} role="presentation" />
                </div>
                <button className={style.getStarted2} onClick={() => props.history.push("/Home", datasetInfo)}>Get Started</button>
            </div>
            <div>
                <div className={style.footer}>
                    <img className={style.NYULogo} src={NYULogo} role="presentation" />
                    <img className={style.FordHam} src={FordHam} role="presentation" />
                </div>
            </div>
        </div>
    );
};

export default Welcome;
