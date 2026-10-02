"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const C = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tasksDone, setTasksDone] = useState(0);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([
    { type: "Task earnings", amount: 8.5, status: "Completed", date: "Today" },
    { type: "Task earnings", amount: 5, status: "Completed", date: "Yesterday" }
  ]);
  useEffect(() => { try { const s = localStorage.getItem("ss_user"); if (s) setUser(JSON.parse(s)); } catch {} }, []);
  const login = (email, password) => {
    if (!email || !password) return false;
    const u = { name: email.split("@")[0].replace(/[._-]/g, " "), email, role: email.toLowerCase().includes("admin") ? "admin" : "worker" };
    setUser(u); localStorage.setItem("ss_user", JSON.stringify(u)); return true;
  };
  const signup = (name, email, password) => {
    if (!name || !email || !password) return false;
    const u = { name, email, role: "worker" };
    setUser(u); localStorage.setItem("ss_user", JSON.stringify(u)); return true;
  };
  const logout = () => { setUser(null); localStorage.removeItem("ss_user"); };
  const addTransaction = (t) => setTransactions(x => [{ ...t, date: "Just now" }, ...x]);
  return <C.Provider value={{ user, login, signup, logout, tasksDone, setTasksDone, balance, setBalance, transactions, addTransaction }}>{children}</C.Provider>;
}
export function useApp() { const x = useContext(C); if (!x) throw new Error("useApp must be used inside AppProvider"); return x; }
