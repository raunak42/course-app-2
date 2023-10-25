import { Grid, Typography } from "@mui/material";
import UserLogin from "../functions/user/userLogin";

function Landing() {
    return <div style={{ marginTop: 20, minHeight: "100vh", backgroundColor: "" }}>
        <Grid container style={{ padding: 20 }} >
            <Grid item xs={12} md={12} lg={5} style={{ backgroundColor: '', textAlign: "center" }}>
                <div>
                    <Typography variant="h3">Welcome to Coursera knockoff!</Typography>
                    <UserLogin></UserLogin>
                </div>

            </Grid>
            <Grid item xs={0} md={0} lg={7} style={{ display: "flex", flexFlow: "column", justifyContent: "center", backgroundColor: "" }}>
                <img style={{ borderRadius: 25, maxHeight: "600px" }} src="https://insight.study.csu.edu.au/wp-content/uploads/2020/04/banner-deep-dive-online.jpg" />
            </Grid>
        </Grid>
        <div>
            <Typography variant="body2" style={{marginLeft:90}}>
                <a href="/admin/login" style={{ color: 'blue', textDecoration: 'underline' }}>
                    Login as Admin?
                </a>
            </Typography>
        </div>
    </div >

}
export default Landing;

