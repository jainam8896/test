import "../../../model/user.js";

import path from "path";
import fs from "fs";
import { baseUrl } from "../config/constant.config.js";
import { ROLE } from "../constant/constant.js";
import User from "../../../model/user.js";

const filePath = path.join(process.cwd(), "/src/chat/store/data.json");

/**
 * random string generator
 * @param {*} givenLength
 * @returns
 */
export const randomStringGenerator = (givenLength = 70) => {
  const characters =
    givenLength > 10
      ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      : "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  const length = givenLength;
  let randomStr = "";

  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * characters.length);
    randomStr += characters[randomNum];
  }
  return randomStr;
};

/**
 * randomString : generate random string for given length
 * @param {number} length : length of random string to be generated (default 75)
 * @return {number} : generated random string
 */
export const randomNumberGenerator = (givenLength = 4) => {
  const characters = "123456789";
  const length = givenLength;
  let randomStr = "";

  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * characters.length);
    randomStr += characters[randomNum];
  }
  return randomStr;
};

export const  generateUniqueReferralCode = async (length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  let referralCode;
  let isUnique = false;

  while (!isUnique) {
    referralCode = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      referralCode += characters[randomIndex];
    }

    // Check if this code exists in DB
    const existingUser = await User.findOne({where:{ role: 1,referralCode:referralCode }});
    if (!existingUser) {
      isUnique = true;
    }
  }

  return referralCode;
}

export const  generateUniqueReservationCode = async (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  let reservationCode = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      reservationCode += characters[randomIndex];
    }
  return reservationCode;
}


export const unlinkFile = (filename) => {
  const deletFilePath = path.join(
    `${__dirname}../../../../public/img/${filename}`
  );
  if (fs.existsSync(deletFilePath)) {
    fs.unlinkSync(deletFilePath);
  }
  return;
};

export const SuccessResponceHandle = (statusCode, message, data, meta) => {
  return {
    status: statusCode,
    success: true,
    message: message,
    data: data,
    meta: meta,
  };
};

export const logo = () => {
  return baseUrl("/logo/app-logo.png");
};

export const readStore = () => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(
        filePath,
        JSON.stringify({ customerSupportRooms: [] }, null, 2)
      );
    }
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading store:", error);
    return { customerSupportRooms: [] };
  }
};

export const writeStore = (data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing store:", error);
  }
};
