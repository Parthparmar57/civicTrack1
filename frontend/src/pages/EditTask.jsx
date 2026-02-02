import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateTask, getAllTasks } from "../services/taskService";

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "PENDING"
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // In a real app we might have getTaskById, but here we can reuse getAllTasks 
        // or we should implement getTaskById in service. 
        // For now, let's fetch all and filter client side (simplest if no specific endpoint, 
        // but the routes file didn't explicitly show getById, only getAll. 
        // Wait, routes file DOES NOT show get by ID. It shows update by ID.
        // So I will fetch all and find the one. Or I need to add getTaskById to backend... 
        // But I can't touch backend. 
        // Actually, usually detail view is needed. 
        // Let's assume I have to find it from the list. OR if the backend supports it.
        // The backend routes file: router.get("/", ... getAllTasks);
        // It DOES NOT have router.get("/:id").
        // So I MUST fetch all and filter.

        const loadTask = async () => {
            try {
                const data = await getAllTasks();
                if (data.success) {
                    const tasks = data.data || [];
                    const task = tasks.find(t => t._id === id);
                    if (task) {
                        setForm({
                            title: task.title,
                            description: task.description,
                            status: task.status
                        });
                    } else {
                        setError("Task not found");
                    }
                }
            } catch (err) {
                setError("Failed to load task details");
            } finally {
                setLoading(false);
            }
        };

        loadTask();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const data = await updateTask(id, form);
            if (data.success) {
                navigate("/dashboard");
            } else {
                setError(data.message || "Failed to update task");
            }
        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div style={styles.center}>Loading...</div>;
    if (error && !form.title) return <div style={styles.center}>{error}</div>;

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.card}>
                <h2 style={styles.title}>Edit Task</h2>

                {error && <div style={styles.error}>{error}</div>}

                <div style={styles.group}>
                    <label style={styles.label}>Title</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        style={styles.input}
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
                    />
                </div>

                <div style={styles.group}>
                    <label style={styles.label}>Status</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        style={styles.select}
                    >
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
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
                        disabled={submitting}
                        style={styles.submitBtn}
                    >
                        {submitting ? "Saving..." : "Save Changes"}
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
    center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        color: "#6b7280",
    }
};

export default EditTask;
