// Purane 25 items ki photos code ke andar hain (src/assets). Naye items ki photo DB me link (URL) hoti hai.
import img1 from "./assets/image1.avif";
import img2 from "./assets/image2.avif";
import img3 from "./assets/image3.avif";
import img4 from "./assets/image4.avif";
import img5 from "./assets/image5.avif";
import img6 from "./assets/image6.avif";
import img7 from "./assets/image7.avif";
import img8 from "./assets/image8.avif";
import img9 from "./assets/image9.avif";
import img10 from "./assets/image10.avif";
import img11 from "./assets/image11.avif";
import img12 from "./assets/image12.avif";
import img13 from "./assets/image13.avif";
import img14 from "./assets/image14.webp";
import img15 from "./assets/image15.avif";
import img16 from "./assets/image16.avif";
import img17 from "./assets/image17.avif";
import img18 from "./assets/image18.avif";
import img19 from "./assets/image19.avif";
import img20 from "./assets/image20.avif";
import img21 from "./assets/image21.avif";
import img22 from "./assets/image22.avif";
import img23 from "./assets/image23.avif";
import img24 from "./assets/image24.avif";
import img25 from "./assets/image25.avif";

const legacyImages = {
  1: img1,
  2: img2,
  3: img3,
  4: img4,
  5: img5,
  6: img6,
  7: img7,
  8: img8,
  9: img9,
  10: img10,
  11: img11,
  12: img12,
  13: img13,
  14: img14,
  15: img15,
  16: img16,
  17: img17,
  18: img18,
  19: img19,
  20: img20,
  21: img21,
  22: img22,
  23: img23,
  24: img24,
  25: img25,
};

// Item ki photo: pehle DB wala link, nahi to purani local photo, nahi to null
export const getItemImage = (item) => item?.image || legacyImages[item?.legacyId] || null;