export interface Task {
    id?: number,
    project_id: number,
    title: string,
    description?: string,
    status?: string,
    priority?: string,
    assignee_id?: number,
    due_date?: Date,
    order_index?: number,
    created_at?: Date,
    updated_at?: Date
}