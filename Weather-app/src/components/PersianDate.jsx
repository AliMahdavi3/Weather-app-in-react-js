import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment-jalaali"

const weekDays = [
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهار شنبه",
  "پنج شنبه",
  "جمعه",
  "شنبه",
];

const yearMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "ابان",
  "اذر",
  "دی",
  "بهمن",
  "اسفند",
];

function PersianDate() {


    const [date , setDate] = useState('')
    const [time , setTime] = useState('')


    useEffect(() =>{
        let m = moment()
        let finalDate = `${weekDays[m.day()]} ${m.jDate()} ${yearMonths[m.jMonth()]} ${m.jYear()}`
        setDate(finalDate)
        setTime(m.format("HH:mm"))
    },[])


  return (
    <>
      <span className="date">{date}</span>
      <span className="clock">{time}  ساعت  </span>
    </>
  );
}

export default PersianDate;
