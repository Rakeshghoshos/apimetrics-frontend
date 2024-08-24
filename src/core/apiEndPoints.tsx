import enviroment from "../env.d";

const apiEndPoints = {
    login: `${enviroment.base_url}/login`,
    signUp: `${enviroment.base_url}/register`,
    apiMetrics : `${enviroment.base_url}/getmetrics`
}

export default apiEndPoints;