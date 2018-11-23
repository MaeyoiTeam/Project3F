 const fetch = require('node-fetch');
 

 let message=[];
       message.push({
           to: "ExponentPushToken[eWVyK6PAswTC8MV1gk4WOR]",
           sound: "default",
           title: "หี",
           body: "Visit our app for next challage",
           data: {
               status: "ok",
               priority:"high"
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