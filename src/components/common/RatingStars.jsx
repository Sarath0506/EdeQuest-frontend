import React, { useEffect, useState } from "react";
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from "react-icons/ti";

function RatingStars({ Review_Count, Star_Size }) {
  const [starCount, setStarCount] = useState({
    full: 0,
    half: 0,
    empty: 0,
  });

  useEffect(() => {
    // Calculate full, half, and empty stars
    const wholeStars = Math.floor(Review_Count) || 0;
    const halfStar = !Number.isInteger(Review_Count) ? 1 : 0;
    const emptyStars = Number.isInteger(Review_Count) ? 5 - wholeStars : 4 - wholeStars ;

    setStarCount({
      full: wholeStars,
      half: halfStar,
      empty: emptyStars,
    });
  }, [Review_Count]);

  return (
    <div className="flex gap-1 text-yellow-100">
      {/* Full stars */}
      {[...new Array(starCount.full)].map((_, index) => (
        <TiStarFullOutline key={index} size={Star_Size || 20} />
      ))}

      {/* Half star */}
      {[...new Array(starCount.half)].map((_, index) => (
        <TiStarHalfOutline key={index} size={Star_Size || 20} />
      ))}

      {/* Empty stars */}
      {[...new Array(starCount.empty)].map((_, index) => (
        <TiStarOutline key={index} size={Star_Size || 20} />
      ))}
    </div>
  );
}

export default RatingStars;
