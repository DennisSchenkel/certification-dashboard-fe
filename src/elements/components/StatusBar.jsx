const statusMapping = {
    out_of_scope: { className: "status-out-of-scope", width: "10%", label: "Out of Scope" },
    in_scope: { className: "status-in-scope", width: "20%", label: "In Scope" },
    definition_defined: { className: "status-definition-defined", width: "40%", label: "Ausprägung Definiert" },
    planning_review: { className: "status-planning-review", width: "60%", label: "Review Fachplanung" },
    auditor_check: { className: "status-auditor-check", width: "80%", label: "Prüfung durch Auditor" },
    approval: { className: "status-approval", width: "100%", label: "Approval" },
};

export default function StatusBar({ status }) {

    const progressInfo = statusMapping[status] || { className: "status-out-of-scope", width: "0%", label: "Unknown Status" };

    return (
        <div className="progress" role="progressbar" aria-label={`${progressInfo.label} progress`} aria-valuenow={parseInt(progressInfo.width)} aria-valuemin="0" aria-valuemax="100">
            <div 
                className={`progress-bar progress-bar-striped ${progressInfo.className}`} 
                style={{ width: progressInfo.width }}
            >
            </div>
            <div className="progress-label">
                {progressInfo.label}
            </div>
        </div>
    );
}
