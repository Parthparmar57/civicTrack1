import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../services/taskService";

const CreateTask = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = await createTask(form);
            if (data.success) {
                navigate("/dashboard");
            } else {
                setError(data.message || "Failed to create task");
            }
        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.card}>
                <h2 style={styles.title}>Create New Task</h2>

                {error && <div style={styles.error}>{error}</div>}

                <div style={styles.group}>
                    <label style={styles.label}>Title</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        style={styles.input}
                        placeholder="e.g. Fix Login Bug"
                    />
                </div>

                <div style={styles.group}>
                    <label style={styles.label}>Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows="4"
                        style={styles.textarea}
                        placeholder="Describe the task details..."
                    />
                </div>



                <div style={styles.actions}>
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        style={styles.cancelBtn}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        style={styles.submitBtn}
                    >
                        {loading ? "Creating..." : "Create Task"}
                    </button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
        padding: "20px",
    },
    card: {
        backgroundColor: "#fff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "500px",
    },
    title: {
        marginBottom: "24px",
        color: "#1f2937",
        textAlign: "center",
    },
    error: {
        backgroundColor: "#fee2e2",
        color: "#b91c1c",
        padding: "10px",
        borderRadius: "6px",
        marginBottom: "20px",
        fontSize: "0.9rem",
    },
    group: {
        marginBottom: "20px",
    },
    label: {
        display: "block",
        marginBottom: "8px",
        color: "#374151",
        fontWeight: "500",
        fontSize: "0.95rem",
    },
    input: {
        width: "100%",
        padding: "12px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        fontSize: "1rem",
        outline: "none",
    },
    textarea: {
        width: "100%",
        padding: "12px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        fontSize: "1rem",
        outline: "none",
        resize: "vertical",
        fontFamily: "inherit",
    },
    select: {
        width: "100%",
        padding: "12px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        fontSize: "1rem",
        outline: "none",
        backgroundColor: "#fff",
    },
    actions: {
        display: "flex",
        gap: "12px",
        marginTop: "30px",
    },
    submitBtn: {
        flex: 1,
        padding: "12px",
        backgroundColor: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        fontWeight: "600",
        cursor: "pointer",
    },
    cancelBtn: {
        flex: 1,
        padding: "12px",
        backgroundColor: "#f3f4f6",
        color: "#374151",
        border: "1px solid #e5e7eb",
        borderRadius: "6px",
        fontWeight: "600",
        cursor: "pointer",
    },
};

export default CreateTask;
