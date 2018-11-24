 const fetch = require('node-fetch');
 

 let message=[];
       message.push({
           to: "ExponentPushToken[BYh79LF4M-w7UrLLi31BRO]",
           sound: "default",
           title: "Daily Quest has been clear!!",
           body: "Visit our app for next challage",
           data: {
               status: "ok"
           }
       });
fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
  });