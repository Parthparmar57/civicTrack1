const TaskCard = ({ title, description, status, onEdit, onDelete }) => {
    return (
        <div style={styles.card}>
            <div style={styles.cardHeader}>
                <h3 style={styles.taskTitle}>{title}</h3>
                <span style={{
                    ...styles.status,
                    backgroundColor: getStatusColor(status)
                }}>
                    {status}
                </span>
            </div>
            <p style={styles.description}>{description}</p>

            <div style={styles.actions}>
                <button onClick={onEdit} style={styles.editBtn}>Edit</button>
                <button onClick={onDelete} style={styles.deleteBtn}>Delete</button>
            </div>
        </div>
    );
};

const getStatusColor = (status) => {
    switch (status) {
        case "COMPLETED": return "#10b981"; // Green
        case "IN_PROGRESS": return "#3b82f6"; // Blue
        default: return "#f59e0b"; // Orange (Pending)
    }
};

const styles = {
    card: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "10px",
    },
    taskTitle: {
        fontSize: "1.25rem",
        margin: "0",
        color: "#111827",
    },
    status: {
        fontSize: "0.75rem",
        padding: "4px 8px",
        borderRadius: "12px",
        color: "#fff",
        fontWeight: "bold",
    },
    description: {
        color: "#4b5563",
        fontSize: "0.95rem",
        marginBottom: "20px",
        flexGrow: 1,
    },
    actions: {
        display: "flex",
        gap: "10px",
        borderTop: "1px solid #f3f4f6",
        paddingTop: "15px",
    },
    editBtn: {
        padding: "6px 12px",
        backgroundColor: "#f3f4f6",
        color: "#374151",
        borderRadius: "4px",
        border: "1px solid #e5e7eb",
        fontSize: "0.9rem",
        fontWeight: "500",
        cursor: "pointer",
    },
    deleteBtn: {
        padding: "6px 12px",
        backgroundColor: "transparent",
        color: "#ef4444",
        borderRadius: "4px",
        border: "1px solid #ef4444",
        cursor: "pointer",
        fontSize: "0.9rem",
        fontWeight: "500",
    },
};

export default TaskCard;
