import { Button, Card, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { RecoilRoot, atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function CounterRecoil() {
    return (
        <RecoilRoot>
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
        </RecoilRoot>
    )
}

function Buttons() {
    return <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <Decrease ></Decrease>
        <Increase ></Increase>
    </div>
}

function Increase() {
    const setCount = useSetRecoilState(countState);
    return <div>
        <Button variant="contained" onClick={() => {
            setCount((c) => c + 1)
        }}>
            Increase
        </Button>
    </div>
}

function Decrease() {
    const [count, setCount] = useRecoilState(countState)
    return <div>
        <Button variant="contained" onClick={() => {
            setCount((c) => c - 1)
        }}>
            Decrease
        </Button>
        <Typography>
            {count}
        </Typography>
    </div>
} 

function CountComponent() {
    const count = useRecoilValue(countState);

    return <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h4" >
            {count}
        </Typography>
    </div>
}

export default CounterRecoil;

const countState = atom({
    key: 'countState',
    default: 0
});