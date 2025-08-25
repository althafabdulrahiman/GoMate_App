import { useState, useEffect } from "react";

const UseOrderHook = (token, orderId) => {
  const url = `http://localhost:3001/orders/get?id=${orderId}`;

  const [checkOrder, setCheckOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const { data } = await res.json();
        setCheckOrder(data);
      } catch (error) {
        console.log("error:", error.message);
      }
    };
    fetchData();
  }, []);

  return [checkOrder, setCheckOrder];
};
export default UseOrderHook;
