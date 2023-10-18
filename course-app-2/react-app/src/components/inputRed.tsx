import { Card, TextField, Typography, setRef } from "@mui/material";
import { useState } from "react";
import {  z } from "zod";

const inputProps = z.object({
    input: z.string().min(3).max(10)
})


function InputRed() {

    const [isRed, setIsRed] = useState(false);
    const [input, setInput] = useState("");




    return <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{
            width: 450, height: 120, marginTop: 120,
            display: "flex", flexFlow: "column", justifyContent: "space-evenly",
            padding: 20,
            borderRadius: 20
        }}>
            <Typography variant="h4" textAlign={"center"}>Type here</Typography>
            <TextField
                label={"username"}
                onChange={(event) => {
                    setInput(event.target.value);
                    ; const parsedInput = inputProps.safeParse({ input: event.target.value });
                    {
                        if (parsedInput.success) {
                            setIsRed(false);
                        } else {
                            setIsRed(true)
                        }
                    }
                }}

                error={isRed}>
            </TextField>
        </Card>
    </div>
}
export default InputRed;