import { Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { passwordInput } from "@raunaka_/input-validation-for-course-app";

// const inputProps = z.object({
//     username: z.string().min(1).max(21).refine((value) => !value.includes(" "), {
//         message: 'Username cannot be empty or contain only spaces',
//     })
// });


function InputRed() {
    const [input, setInput] = useState("");

    const parsedInput = passwordInput.safeParse(input);

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
                }}
                error={!parsedInput.success}>
            </TextField>
        </Card>
    </div>
}
export default InputRed;