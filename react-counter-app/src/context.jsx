import { Button, Card, Typography } from "@mui/material";
import { createContext, useContext, useState } from "react";

const CountContext = createContext();

function Counter() {
   const [count, setCount] = useState(0);
   return (
      <CountContext.Provider value={{
         count: count,
         setCount: setCount
      }}>
         <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
               <Typography variant="h2">Welcome!</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
               <Card style={{ height: 200, width: 400, padding: 25, marginTop: 70 }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                     <Typography variant="h4">
                        Counter Game
                     </Typography>
                  </div>
                  <Buttons ></Buttons>
                  <CountComponent></CountComponent>
               </Card>
            </div>
         </div>
      </CountContext.Provider>
   )
}

function Buttons() {
   return <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
      <Decrease ></Decrease>
      <Increase ></Increase>
   </div>
}

function Increase() {
   const { count, setCount } = useContext(CountContext);

   return <div>
      <Button variant="contained" onClick={() => {
         setCount(count + 1)
      }}>
         Increase
      </Button>
   </div>
}

function Decrease() {
   const { count, setCount } = useContext(CountContext);


   return <div>
      <Button variant="contained" onClick={() => {
         setCount(count - 1)
      }}>
         Decrease
      </Button>
   </div>
}

function CountComponent() {
   const { count } = useContext(CountContext);

   return <div style={{ display: "flex", justifyContent: "center" }}>
      <Typography variant="h4" >
         {count}
      </Typography>
   </div>
}

export default Counter;