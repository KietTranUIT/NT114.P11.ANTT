"use client";
import { useState, useEffect } from "react";
const CountDown = ({ endTime }) => {
  const [countDown, setCountDown] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();

      const distance = endTime - now;
      if (distance <= 0) {
        clearInterval(interval);
        setCountDown({
          day: 0,
          hour: 0,
          minute: 0,
          second: 0,
        });
      } else {
        setCountDown({
          day: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hour: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minute: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          second: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
      return () => clearInterval(interval);
    }, 1000);
  }, [endTime]);

  return (
    <>
      <div className="">
        <div className="bg-gray-300 py-3 ps-2">
          <span className="text-gray-800 font-semibold">
            Giá và khuyến mãi dự kiến áp dụng đến
          </span>{" "}
        </div>
        <p className="text-red-600 border py-3 ps-2 font-semibold mb-5 mb-lg-0 text-lg">
          {`${countDown.day.toString().padStart(2, "0")} ngày ${countDown.hour
            .toString()
            .padStart(2, "0")} giờ ${countDown.minute
            .toString()
            .padStart(2, "0")} phút ${countDown.second
            .toString()
            .padStart(2, "0")} giấy`}
        </p>
      </div>
    </>
  );
};

export default CountDown;
