export interface Task {
    id?: number,
    project_id:number,
    title: string,
    description?: string,
    status?: string,//"todo" | "in-progress" | "done",
    priority?: string,//"low" | "medium" | "high",
    assignee_id?: number,
    due_date?: Date,
    order_index?: number,
    created_at?: Date,
    updated_at?: Date
}