export interface Project {
    id?: number,
    team_id: number,
    name: string,
    description?: string,
    status?: string,//"active" | "completed" | "on-hold", //???
    created_at?: Date /////////////////?
}