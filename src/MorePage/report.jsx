import React from 'react'

export default function Report(props) {
    const popDown = () => {
        props.setReportToggle(!props.reportToggle)
    }

    return (
        <>
            <div id='createBackContainer' onClick={popDown} style={{ display: props.show }}>
            </div>

            <div id="createTopContainer" style={{ display: props.show }} >
                <p>Report Problem</p>
                <div className="horizontalline"></div>
            </div>

        </>
    )
}
