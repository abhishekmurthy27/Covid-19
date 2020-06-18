import axios from 'axios';

const url = "https://api.covid19india.org";

export const Api = {
    time_series: function(){
        return axios.get(`${url}/data.json`)
    },
    travel_history: function(){
        return axios.get(`${url}/travel_history.json`)
    }
}