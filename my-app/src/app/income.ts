export interface Income {
    name: string, // 'work'
    amount: number, // 500
    info: {
        type: string, // 'week'  i.e.: repeat type (year, month, week, day)
        repeat: number // 2 i.e.: repeat every 'n' type 
    }
}