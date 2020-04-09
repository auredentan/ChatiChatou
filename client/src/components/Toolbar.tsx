import React from "react"

interface Props {
    before?: any,
    center?: any
    after?: any
}

const Toolbar: React.FC<Props> = ({ before, center, after }) => {

    return (
        <div style={{ display: "flex", alignItems: "center", padding: "0 8px" }}>
            <div style={{ flexShrink: 0 }}>
                {before}
            </div>
            <div style={{ flex: "1 1 auto" }}>{center}</div>
            <div style={{ flexShrink: 0 }}>
                {after}
            </div>
        </div>
    )
}

export default Toolbar;