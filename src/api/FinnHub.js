import axios from "axios";

const apiEndpoint = process.env.FINN_API; 

const FinnHub = {    
    async getStockPrice(symbol) {
        try {
            const response = await axios.get(`${apiEndpoint}/api/stocklookUp/price?symbol=${symbol}`);            
            return response;
        } catch (error) {
            console.error(error);
        }
    },
    async getStockLookUp(symbol) {
        try {
            const response = await axios.get(`${apiEndpoint}/api/stocklookup?symbol=${symbol}`);            
            return response;
        } catch (error) {
            console.error(error);
        }
    },

};

export default FinnHub;
