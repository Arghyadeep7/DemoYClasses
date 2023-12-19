<h2>Registration Form - Documentation</h2>
<u>Devloped using:</u>
<br />
<b>
    MongoDB (M) | Express.js (E) | React.js (R) | Node.js (N) | Bootstrap
</b>
<br /><br />

<b>
    MongoDB Schema: <br/>
    {   <br/>
        fname: {
            type: String,
            required: true,
        },
        <br />
        lname: {
            type: String,
            required: true,
        },
        <br />
        email: {
            type: String,
            required: true,
            unique: true,
        },
        <br />
        gender: {
            type: String,
            required: true,
        },
        <br />
        batch: {
            type: String,
            required: true,
        }
        <br />
    }
</b>
<br /><br />
The above schema is how the users registration