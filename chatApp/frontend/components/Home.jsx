import React from 'react'
import { motion } from "framer-motion";
import Chat from './Chat';
function Home() {
    const text = "Welcome To Chat App".split(" ");
  return (
    <div className="App" style={{textAlign:"center" , fontSize:"2rem" , marginTop:"5%" , color:"Blue"
    }}>
      {text.map((el, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: i /2
          }}
          key={i}
        >
          {el}{" "}
        </motion.span>
      ))}
     
    </div>
  )
}

export default Home