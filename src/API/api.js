import axios from "axios";

export async function fetchMatches() {  // Named export
  try {
    const options = {
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/matches/v1/recent`,
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
      },
    };

    let response = await axios.request(options);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function fetchStats(format,type=batsmen) {  // Named export
  try {
    const options = {
      method: "GET",
      url: `${import.meta.env.VITE_API_URL}/stats/v1/rankings/${type}?formatType=${format}`,
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
      },
    };

    let response = await axios.request(options);
    console.log(`API Response for ${format} - ${type}:`, response.data);
    return response.data || {};
  } catch (error) {
    console.error(`Error fetching ${format} ${type} stats:`, error);
    return {};
  }
}
