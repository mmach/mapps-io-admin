export const  GraphConfig = {
    NodeTypes: {
        empty: {
            // required to show empty nodes
            typeText: "Process Element",
            shapeId: "#empty", // relates to the type property of a node
            shape: (
                <symbol viewBox="0 0 100 100" id="empty" key="0">
                    <circle cx="50" cy="50" r="45"></circle>
                </symbol>
            )
        },
        start: {
            // required to show empty nodes
            typeText: "START",
            shapeId: "#start", // relates to the type property of a node
            shape: (
                <symbol viewBox="0 0 100 100" id="start" key="0">
                    <circle strokeWidth="3px" stroke="blue" cx="50" cy="50" r="45"></circle>
                </symbol>
            )
        },
        end: {
            // required to show empty nodes
            typeText: "END",
            shapeId: "#end", // relates to the type property of a node
            shape: (
                <symbol viewBox="0 0 100 100" id="end" key="0">
                    <circle strokeWidth="3px" stroke="green" cx="50" cy="50" r="45"></circle>
                </symbol>
            )
        },
        is_reminder: {
            // required to show empty nodes
            typeText: "CRON",
            shapeId: "#is_reminder", // relates to the type property of a node
            shape: (
                <symbol viewBox="0 0 100 100" id="is_reminder" key="0">
                    <circle strokeWidth="3px" stroke="purple" cx="50" cy="50" r="30"></circle>
                </symbol>
            )
        },
        custom: {
            // required to show empty nodes
            typeText: "Custom",
            shapeId: "#custom", // relates to the type property of a node
            shape: (
                <symbol viewBox="0 0 50 25" id="custom" key="0">
                    <ellipse cx="50" cy="25" rx="50" ry="25"></ellipse>
                </symbol>
            )
        },
        func: {
            // required to show empty nodes
            typeText: "Function",
            shapeId: "#func", // relates to the type property of a node
            shape: (
                <symbol viewBox="0 0 100 100" id="func" key="0">
                    <circle
                        strokeWidth="3px"
                        fill="yellow"
                        stroke="yellow"
                        cx="50"
                        cy="50"
                        r="30"
                    ></circle>
                </symbol>
            )
        }
    },
    NodeSubtypes: {},
    EdgeTypes: {
        rejectEdge: {
            // required to show empty edges
            shapeId: "#rejectEdge",
            shape: (
                <symbol viewBox="0 0 50 50" id="rejectEdge" key="0">
                    <circle cx="25" cy="25" r="8" fill="red">
                        {" "}
                    </circle>
                </symbol>
            )
        },
        acceptEdge: {
            // required to show empty edges
            shapeId: "#acceptEdge",
            shape: (
                <symbol viewBox="0 0 50 50" id="acceptEdge" key="0">
                    <circle cx="25" cy="25" r="8" fill="green">
                        {" "}
                    </circle>
                </symbol>
            )
        },
        autoRunEdge: {
            // required to show empty edges
            shapeId: "#autoRunEdge",
            shape: (
                <symbol viewBox="0 0 50 50" id="autoRunEdge" key="0">
                    <circle cx="25" cy="25" r="8" fill="blue">
                        {" "}
                    </circle>
                </symbol>
            )
        },
        reminderEdgeAccept: {
            // required to show empty edges
            shapeId: "#reminderEdgeAccept",
            shape: (
                <symbol viewBox="0 0 50 50" id="reminderEdgeAccept" key="0">
                    <circle cx="25" cy="25" r="8" fill="#0f0">
                        {" "}
                    </circle>
                </symbol>
            )
        },
        reminderEdgeEmpty: {
            // required to show empty edges
            shapeId: "#reminderEdgeEmpty",
            shape: (
                <symbol viewBox="0 0 50 50" id="reminderEdgeEmpty" key="0">
                    <circle cx="25" cy="25" r="8" fill="#fff">
                        {" "}
                    </circle>
                </symbol>
            )
        },
        reminderEdgeReject: {
            // required to show empty edges
            shapeId: "#reminderEdgeReject",
            shape: (
                <symbol viewBox="0 0 50 50" id="reminderEdgeReject" key="0">
                    <circle cx="25" cy="25" r="8" fill="#f00">
                        {" "}
                    </circle>
                </symbol>
            )
        },
        emptyEdge: {
            // required to show empty edges
            shapeId: "#emptyEdge",
            shape: (
                <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
                    <circle cx="25" cy="25" r="8" fill="white">
                        DUPAAA
                    </circle>
                </symbol>
            )
        },
        hasReminderEdge: {
            // required to show empty edges
            shapeId: "#hasReminderEdge",
            shape: (
                <symbol viewBox="0 0 50 50" id="hasReminderEdge" key="0">
                    <circle cx="25" cy="25" r="8" fill="purple">
                        {" "}
                    </circle>
                </symbol>
            )
        }
    }
};