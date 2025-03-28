//projeyi typescript kurdugum icin getAPI deki hazir yapiyi biraz degistirmek zorunda kaldim

const postAPI = async (
  URL: string,
  body: string,
  method = "POST",
  headers = { "Content-Type": "application/json" }
) => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL || !URL) {
      throw new Error("URL bulunamadı!");
    }
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
      cache: "no-store",
    })
      .then((res) => {
        if (res.url.includes("/notification") && res.redirected) {
          return (window.location.href = res.url);
        } else {
          return res.json();
        }
      })
      .catch((err) => console.log(err));

    return data;
  } catch (err) {
    throw new Error(`API request failed: ${err}`);
  }
};

const getAPI = async (
  URL: string,
  headers = { "Content-Type": "application/json" }
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL + URL}`, {
      method: "GET",
      headers: headers,
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } 
  catch (err) {
    throw new Error(`API request failed: ${err}`);
  }
}; 
  
export { postAPI, getAPI };