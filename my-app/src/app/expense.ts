export interface Expense {
    name: string,
    amount: number,
    info: [
        type: string, // all caps "NEED", OR "WANT"
        repeat: number // ever 'n' weeks 
    ]
}