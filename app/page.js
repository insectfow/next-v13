"use client";

import { dbService } from "../lib/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import ChatBot from "../components/chatAi";

export default function home() {
  // const data = await getData();
  const [peeds, setPeeds] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const peedQuery = query(
      collection(dbService, "peed"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(peedQuery, (snapShot) => {
      const dweetArr = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPeeds(dweetArr);
    });
  }, []);

  return (
    <div className="container">
      {/* <ul>
        {peeds.map(({ text, createdAt, id }) => {
          return (
            <li key={id}>
              <span>{text}</span>
            </li>
          );
        })}
      </ul> */}
      <ChatBot />
    </div>
  );
}
