export const convertCurrency = async (amount, from, to) => {
  try {
    const res = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${from}`
    );
    const data = await res.json();
    const rate = data.rates[to] || 1;
    return amount * rate;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return amount; // Fallback to the original amount if conversion fails
  }
};

// export const getClientLocation = async (ipinfoToken) => {
//   try {
//     const res = await fetch(`https://ipinfo.io?token=${ipinfoToken}`);
//     const locationData = await res.json();
//     return locationData.country;
//   } catch (error) {
//     console.error("Error fetching location data:", error);
//     return null;
//   }
// };
