export interface Expense {
    name: string,
    amount: number,
    info: {
        type: string, // 
        repeat: number // every 'n' weeks 
    }
}