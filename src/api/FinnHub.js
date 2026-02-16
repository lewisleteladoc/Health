const FinnHub = {    
    getRealTimeQuote(symbol) {
        return APIUtils.get(
            `${process.env.FINN_API}/quote/?symbol=${symbol}`,
            null,   
            {
                headers: {
                    Authorization: `Bearer ${process.env.API_KEY}`,
                },
            }
        ).then(({data}) => data);
    },    
};

export default FinnHub;
