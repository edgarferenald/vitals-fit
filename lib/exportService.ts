import { supabase } from "./supabase";
import { FoodEntry } from "./foodService";

// Export food history as CSV string and trigger download
export async function exportToCSV(userId: string): Promise<void> {
    const { data, error } = await supabase
        .from("food_entries")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
        console.error("No data to export");
        return;
    }

    const entries = data as FoodEntry[];
    const headers = ["Date", "Food", "Calories", "Protein (g)", "Fat (g)", "Carbs (g)"];
    const rows = entries.map(e => [
        e.date,
        `"${e.food_name.replace(/"/g, '""')}"`,
        e.calories,
        e.protein,
        e.fat,
        e.carbs,
    ].join(","));

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    downloadBlob(blob, `vitals-food-history-${new Date().toISOString().split("T")[0]}.csv`);
}

// Export food history as PDF
export async function exportToPDF(userId: string): Promise<void> {
    const { data, error } = await supabase
        .from("food_entries")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
        console.error("No data to export");
        return;
    }

    const entries = data as FoodEntry[];

    // Dynamic import to avoid SSR issues
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("VitalsFit — Food History", 14, 20);
    doc.setFontSize(10);
    doc.text(`Exported: ${new Date().toLocaleDateString()}`, 14, 28);

    // Table header
    let y = 38;
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Date", 14, y);
    doc.text("Food", 40, y);
    doc.text("Cal", 120, y);
    doc.text("P (g)", 140, y);
    doc.text("F (g)", 158, y);
    doc.text("C (g)", 176, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    for (const entry of entries) {
        if (y > 280) {
            doc.addPage();
            y = 20;
        }
        doc.text(entry.date, 14, y);
        doc.text(entry.food_name.substring(0, 40), 40, y);
        doc.text(String(entry.calories), 120, y);
        doc.text(String(entry.protein), 140, y);
        doc.text(String(entry.fat), 158, y);
        doc.text(String(entry.carbs), 176, y);
        y += 5;
    }

    doc.save(`vitals-food-history-${new Date().toISOString().split("T")[0]}.pdf`);
}

function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
