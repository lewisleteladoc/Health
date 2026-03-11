import AUTHENTICATION from "../AXIOS/AUTHENTICATION";


const Authenticate = {    
    async authenticate(name, password) {
        try {
            const response = await AUTHENTICATION.post(`/Authenticate`, { name, password });
            return response;
        } catch (error) {
            console.error(error);
        }
    },    
};

export default Authenticate;
