export interface Expense {
    name: string, // "netflix"
    amount: number, // 9.99
    info: {
        type: string, // 'month'  (repeat type: [year, month, week, day])
        repeat: number, // 1 (repeat every 'n' type )
        lux: boolean // luxury ? true: false
    }
} 