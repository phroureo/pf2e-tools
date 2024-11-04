import React, { useState } from 'react';
import { ManifestItem } from '../../types/ManifestItem';

interface ItemHighlighterProps {
    selectedItems: ManifestItem[];
}

const ItemHighlighter: React.FC<ItemHighlighterProps> = ({ selectedItems }) => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const getHighlightColor = (id: string): string => {
        const matchedItems = selectedItems.filter(item => item.worn?.toLowerCase() === id);

        if (matchedItems.length > 1) {
            return 'red';
        } else if (matchedItems.length === 1) {
            return 'green';
        } else {
            return 'black';
        }
    };

    const toProperCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const countInvestedItems = (): number => {
        return selectedItems.filter(item => item.traits?.includes("invested")).length;
    };


    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 195,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                {/* Fixed text box with consistent height to avoid jumping */}
                <div style={{ minHeight: '5em', marginBottom: '-25px', fontSize: '1em', textAlign: 'center' }}>

                    <p>Invested Item Count: {countInvestedItems()}</p>
                    <div style={{ minHeight: '2em' }}>
                        {hoveredId ? toProperCase(hoveredId) : null}
                    </div>
                </div>
                <svg
                    id="eA4XTI1ERcC1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="100 100 100 200"
                    preserveAspectRatio="xMidYMid meet"
                    width="100%"
                    height="100%"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                >
                    <g>
                        <path
                            id="shoes-left"
                            d="M145.739972,248.924576h-9.984169c-5.039872,4.802196,4.54884,4.911692-23.746134,16.190545-.648423,2.450578.711699,5.138092,2.158738,5.936534l31.30172-.539686.269845-21.587393Z"
                            transform="matrix(-.649423 0 0 0.589884 250.894924 102.368128)"
                            fill="#23243a"
                            stroke={getHighlightColor("shoes")}
                            strokeWidth="1"
                            onMouseEnter={() => setHoveredId("shoes")}
                            onMouseLeave={() => setHoveredId(null)}
                        />
                        <path
                            id="shoes-right"
                            d="M145.739972,248.924576h-9.984169c-5.039872,4.802196,4.54884,4.911692-23.746134,16.190545-.648423,2.450578.711699,5.138092,2.158738,5.936534l31.30172-.539686.269845-21.587393Z"
                            transform="matrix(.649423 0 0 0.589884 48.760789 102.368128)"
                            fill="#23243a"
                            stroke={getHighlightColor("shoes")}
                            strokeWidth="1"
                            onMouseEnter={() => setHoveredId("shoes")}
                            onMouseLeave={() => setHoveredId(null)}
                        />
                    </g>
                    <g transform="translate(0 0.000001)">
                        <ellipse
                            id="anklet-left"
                            rx="10.603683"
                            ry="3.103188"
                            transform="matrix(-.59825 0 0 1 140.656347 244.607107)"
                            fill="transparent"
                            stroke={getHighlightColor("anklets")}
                            onMouseEnter={() => setHoveredId("anklets")}
                            onMouseLeave={() => setHoveredId(null)}
                        />
                        <ellipse
                            id="anklet-right"
                            rx="10.603683"
                            ry="3.103188"
                            transform="matrix(.59825 0 0 1 159.343653 244.607107)"
                            fill="transparent"
                            stroke={getHighlightColor("anklets")}
                            onMouseEnter={() => setHoveredId("anklets")}
                            onMouseLeave={() => setHoveredId(null)}
                        />
                    </g>
                    <path
                        id="clothing"
                        d="M135.299402,237.447345h9.984169L150,212.538815l4.484092,24.752852h9.714324l-4.854763-30.824306h-18.687306l-5.356945,30.979984Z"
                        transform="translate(.251091 3.056574)"
                        fill="#23243a"
                        stroke={getHighlightColor("clothing")}
                        strokeWidth="0.6"
                        onMouseEnter={() => setHoveredId("clothing")}
                        onMouseLeave={() => setHoveredId(null)}
                    />
                    <rect
                        id="belt"
                        width="19.264884"
                        height="2.624441"
                        rx="0"
                        ry="0"
                        transform="translate(140.656348 205.585652)"
                        fill="#23243a"
                        stroke={getHighlightColor("belt")}
                        onMouseEnter={() => setHoveredId("belt")}
                        onMouseLeave={() => setHoveredId(null)}
                    />
                    <rect
                        id="garment"
                        width="19.264884"
                        height="15.679279"
                        rx="0"
                        ry="0"
                        transform="translate(140.656347 188.226373)"
                        fill="#23243a"
                        stroke={getHighlightColor("garment")}
                        onMouseEnter={() => setHoveredId("garment")}
                        onMouseLeave={() => setHoveredId(null)}
                    />
                    <rect
                        id="cloak"
                        width="19.264884"
                        height="9.077308"
                        rx="0"
                        ry="0"
                        transform="translate(140.656347 177.149065)"
                        fill="#23243a"
                        stroke={getHighlightColor("cloak")}
                        onMouseEnter={() => setHoveredId("cloak")}
                        onMouseLeave={() => setHoveredId(null)}
                    />
                    <g transform="translate(0 0.000001)">
                        <path
                            id="necklace-left"
                            d="M150.288789,168.857915l7.448134,1.311829L150,175.960375"
                            transform="matrix(-1 0 0 0.732952 299.736923 47.041518)"
                            fill="transparent"
                            stroke={getHighlightColor("necklace")}
                            strokeWidth="0.6"
                            onMouseEnter={() => setHoveredId("necklace")}
                            onMouseLeave={() => setHoveredId(null)}
                        />
                        <path
                            id="necklace-right"
                            d="M149.736923,175.960376h.263078l7.736923-5.790631-7.448134-1.311829"
                            transform="matrix(1 0 0 0.732952 0.000001 47.041518)"
                            fill="transparent"
                            stroke={getHighlightColor("necklace")}
                            strokeWidth="0.6"
                            onMouseEnter={() => setHoveredId("necklace")}
                            onMouseLeave={() => setHoveredId(null)}
                        />
                        <path
                            id="necklace-connector"
                            d="M149.448134,175.960376h.802957"
                            transform="matrix(1 0 0 0.732952 0.000001 47.041517)"
                            fill="transparent"
                            stroke={getHighlightColor("necklace")}
                            strokeWidth="0.6"
                            onMouseEnter={() => setHoveredId("necklace")}
                            onMouseLeave={() => setHoveredId(null)}
                        />
                        <path
                            id="necklace-join"
                            d="M149.448135,168.857916h1.32311-1.775377"
                            transform="matrix(1 0 0 0.732952-.033943 47.041518)"
                            fill="transparent"
                            stroke={getHighlightColor("necklace")}
                            strokeWidth="0.6"
                            onMouseEnter={() => setHoveredId("necklace")}
                            onMouseLeave={() => setHoveredId(null)}
                        />
                    </g>
                    <path
                        id="cape"
                        d="M164.198416,177.149065v38.446324l11.984057,9.418538-11.984057-47.864862Z"
                        transform="translate(-1.859014 0)"
                        fill="#23243a"
                        stroke={getHighlightColor("cape")}
                        strokeWidth="0.6"
                        onMouseEnter={() => setHoveredId("cape")}
                        onMouseLeave={() => setHoveredId(null)}
                    />
                    <path
                        id="armbands"
                        d="M135.550493,177.149065l-11.21693,9.077308l4.002668,2l7.214262-6.017856v-5.059452Z"
                        transform="translate(3 0)"
                        fill="#23243a"
                        stroke={getHighlightColor("armbands")}
                        strokeWidth="0.6"
                        onMouseEnter={() => setHoveredId("armbands")}
                        onMouseLeave={() => setHoveredId(null)}
                    />
                    <path
                        id="bracers"
                        d="M123.264135,187.581211l3.760886,2.01476l3.391513,6.470042h-4.801845l-2.350554-8.484802Z"
                        transform="translate(3 0)"
                        fill="#23243a"
                        stroke={getHighlightColor("bracers")}
                        strokeWidth="0.6"
                        onMouseEnter={() => setHoveredId("bracers")}
                        onMouseLeave={() => setHoveredId(null)}
                    />
                    <path
                        id="gloves"
                        d="M125.614689,197.757338l7.573993-.103483-3.246654,6.251796-4.327339-6.148313Z"
                        transform="translate(3 0.000001)"
                        fill="#23243a"
                        stroke={getHighlightColor("gloves")}
                        strokeWidth="0.6"
                        onMouseEnter={() => setHoveredId("gloves")}
                        onMouseLeave={() => setHoveredId(null)}
                    />
                    <rect
                        id="backpack"
                        width="9.924547"
                        height="15.489992"
                        rx="0"
                        ry="0"
                        transform="translate(126.264134 209.523935)"
                        fill="#23243a"
                        stroke={getHighlightColor("backpack")}
                        onMouseEnter={() => setHoveredId("backpack")}
                        onMouseLeave={() => setHoveredId(null)}
                    />
                    <ellipse
                        id="collar"
                        rx="6.731258"
                        ry="2.076257"
                        transform="translate(150.138937 166.947737)"
                        fill="transparent"
                        stroke={getHighlightColor("collar")}
                        onMouseEnter={() => setHoveredId("collar")}
                        onMouseLeave={() => setHoveredId(null)}
                    />
                    <path
                        id="mask"
                        d="M143.40768,156.389513h13.462516L150,162.141788l-6.59232-5.752275Z"
                        transform="translate(-.000001 2.127057)"
                        fill="#23243a"
                        stroke={getHighlightColor("mask")}
                        strokeWidth="0.6"
                        onMouseEnter={() => setHoveredId("mask")}
                        onMouseLeave={() => setHoveredId(null)}
                    />
                    <g>
                        <ellipse
                            id="eyepiece-left"
                            rx="1.368462"
                            ry="1.316322"
                            transform="translate(148.368462 156.268284)"
                            fill="transparent"
                            stroke={getHighlightColor("eyepiece")}
                            onMouseEnter={() => setHoveredId("eyepiece")}
                            onMouseLeave={() => setHoveredId(null)}
                        />
                        <ellipse
                            id="eyepiece-right"
                            rx="1.355605"
                            ry="1.316322"
                            transform="translate(151.644395 156.268284)"
                            fill="transparent"
                            stroke={getHighlightColor("eyepiece")}
                            onMouseEnter={() => setHoveredId("eyepiece")}
                            onMouseLeave={() => setHoveredId(null)}
                        />
                    </g>
                    <path
                        id="headwear"
                        d="M143.40768,156.389513h13.462516c-.572812,3.105146-3.994582,6.000492-6.870196,5.752275-3.151527.063018-5.95831-3.188687-6.59232-5.752275Z"
                        transform="matrix(1 0 0-1-.000001 309.658357)"
                        fill="#23243a"
                        stroke={getHighlightColor("headwear")}
                        strokeWidth="0.6"
                        onMouseEnter={() => setHoveredId("headwear")}
                        onMouseLeave={() => setHoveredId(null)}
                    />
                    <ellipse
                        id="circlet"
                        rx="6.731258"
                        ry="2.076257"
                        transform="translate(150.138937 143.947737)"
                        fill="transparent"
                        stroke={getHighlightColor("circlet")}
                        onMouseEnter={() => setHoveredId("circlet")}
                        onMouseLeave={() => setHoveredId(null)}
                    />
                </svg>
            </div>
            <div
                style={{
                    height: '2em', // Set height for consistent space
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '1em',
                }}
            >
            </div>
        </div>
    );
};

export default ItemHighlighter;
