export interface Income {
    name: string,
    amount: number,
    info: [
        type: string, // all caps "NEED", OR "WANT"
        repeat: number // every 'n' weeks 
    ]
}