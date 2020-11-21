export interface Income {
    name: string,
    amount: number,
    info: {
        type: string, // all 
        repeat: number // every 'n' weeks 
    }
}