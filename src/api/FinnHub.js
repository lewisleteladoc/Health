import AXIOS_FINNHUB from "../AXIOS/AXIOS_FINNHUB";

const apiEndpoint = process.env.FINN_API; 

const FinnHub = {    
    async getStockPrice(symbol) {
        try {
            const response = await AXIOS_FINNHUB.get(`/api/stocklookUp/price?symbol=${symbol}`);            
            return response;
        } catch (error) {
            console.error(error);
        }
    },
    async getStockLookUp(symbol) {
        try {
            const response = await AXIOS_FINNHUB.get(`/api/stocklookup?symbol=${symbol}`);            
            return response;
        } catch (error) {
            console.error(error);
        }
    },

};

export default FinnHub;
