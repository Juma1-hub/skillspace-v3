"use client";
export default function Error({ reset }) { return <main className="loginWrap"><div className="auth"><span className="brand">Skill<span>Space</span></span><h1>Something went wrong</h1><p>Please try again. Your account and data have not been changed by this error.</p><button className="primary" onClick={() => reset()}>Try again</button></div></main>; }
