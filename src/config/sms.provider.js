import msg91 from "msg91";
require('dotenv').config()

msg91.initialize({authKey: process.env.smsProviderKey});