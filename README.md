# Registration Form - Documentation
Working URL -> [Click Here](https://demo-y-classes.vercel.app)
<br /><br />
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
        },
        <br />
        month : {
            type : String,
            required: true,
        },
        <br />
        year : {
            type : Number,
            required: true,
        },
        <br />
    }
</b>
<br /><br />
The above schema is how the user data is saved in the YogaDB database.
<br />
<br />
<h2>Working procedure</h2>
<ul>
    <li>
        Initially, the user is required to register himself/herself on the platform and select the batch for that particular month he wants to join in.
    <li>
        Once the user registers with a given email address, that email address is bound as the unique identifier of that person's account.
    <li>
        The batch cannot be changed for the given month once he has confirmed and has paid the said amount for the given month.
    <li>
        If he wishes to change his batch, he can do so in any of the upcoming month wherein he just needs to log into his account by just specifying the email address with which he initially registered on the platform.
    <li>
        Once logged into an existing email account, he is shown his last transaction month when he paid the monthly fee.
    <li>
        He is given the option to pay the monthly fee for that given month and renew his membership.
    <li>
        Once he pays again, his membership is renewed and is valid till the last day of the month post which it expires and is needed to be renewwd again via payment of the monthly fee for that particular month.
</ul>
<hr />
