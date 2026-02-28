import axios from "axios";

const apiEndpoint = "http://localhost:9090"; //process.env.FINN_API; 

const WatchListAPI = {    
    async createWatchlist(name) {
        const watchlistName = {
            watchlistName: 'BR'
        };

        try {
            const response = await axios.post(`${apiEndpoint}/api/watchlist`, watchlistName);            
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

export default WatchListAPI;
