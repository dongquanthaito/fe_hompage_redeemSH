import Swal from 'sweetalert2'

export const getMemberBO = (playerID) => {
    let myHeaders = new Headers();
    myHeaders.append("content-type", " application/json;charset=utf-8");
    myHeaders.append("origin", " http://gnl.jdtmb.com");
    myHeaders.append("referer", " http://gnl.jdtmb.com/");
    myHeaders.append("x-requested-with", " XMLHttpRequest");
    myHeaders.append("ngrok-skip-browser-warning", "69420");
    
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    return fetch("https://d96a-183-80-80-120.ap.ngrok.io/getMemberBO?player_id=" + playerID, requestOptions)
      .then(response => response.json())
      .then(result => {
        return result
    })
      .catch(error => {
        console.log('error', error)
        Swal.fire({
          icon: 'warning',
          title: 'Lỗi!',
          text: 'Mất kết nối đến máy chủ, xin vui lòng thử lại',
          footer: '<a href="https://live.shbet.win/" target="_blank">Chăm sóc khách hàng 24/7</a>'
        })
      });
}

export const findCode = (value) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("ngrok-skip-browser-warning", "69420");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
      
    return fetch("https://d96a-183-80-80-120.ap.ngrok.io/code"+value, requestOptions)
    .then(response => response.json())
    .then(result => {return result})
    .catch(error => {
      console.log('error', error)
      Swal.fire({
        icon: 'warning',
        title: 'Lỗi!',
        text: 'Mất kết nối đến máy chủ, xin vui lòng thử lại',
        footer: '<a href="https://live.shbet.win/" target="_blank">Chăm sóc khách hàng 24/7</a>'
      })
    }); 
}

export const updateCode = (promo_code, user_used, ip, fp) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("ngrok-skip-browser-warning", "69420");
    
    let raw = JSON.stringify({
      "promo_code": promo_code,
      "user_used": user_used,
      "ip": ip,
      "fp": fp
    });
    
    let requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    return fetch("https://d96a-183-80-80-120.ap.ngrok.io/code", requestOptions)
      .then(response => response.json())
      .then(result => {return result})
      .catch(error => {
        console.log('error', error)
        Swal.fire({
          icon: 'warning',
          title: 'Lỗi!',
          text: 'Mất kết nối đến máy chủ, xin vui lòng thử lại',
          footer: '<a href="https://live.shbet.win/" target="_blank">Chăm sóc khách hàng 24/7</a>'
        })
      });
}

export const findMemo = (account, timeBegin, memo) => {

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("ngrok-skip-browser-warning", "69420");
  
  console.log(timeBegin + " 00:00:00")
  let raw = JSON.stringify({
    "Account": account,
    "TimeBegin": timeBegin + " 00:00:00",
    "Memo": memo
  });
  
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  return fetch("https://d96a-183-80-80-120.ap.ngrok.io/find-memo", requestOptions)
    .then(response => response.json())
    .then(result => {return result})
    .catch(error => {
      console.log('error', error)
      Swal.fire({
        icon: 'warning',
        title: 'Lỗi!',
        text: 'Mất kết nối đến máy chủ, xin vui lòng thử lại',
        footer: '<a href="https://live.shbet.win/" target="_blank">Chăm sóc khách hàng 24/7</a>'
      })
    });
}

export const getTimeGlobal = () => {
  let myHeaders = new Headers();
  myHeaders.append("ngrok-skip-browser-warning", "69420");

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  return fetch("https://d96a-183-80-80-120.ap.ngrok.io/get-time-zone", requestOptions)
    .then(response => response.json())
    .then(result => {return result})
    .catch(error => {
      console.log('error', error)
      Swal.fire({
        icon: 'warning',
        title: 'Lỗi!',
        text: 'Mất kết nối đến máy chủ, xin vui lòng thử lại',
        footer: '<a href="https://live.shbet.win/" target="_blank">Chăm sóc khách hàng 24/7</a>'
      })
    });
}

export const deposit = () => {
  let myHeaders = new Headers();
  myHeaders.append("ngrok-skip-browser-warning", "69420");
  myHeaders.append("Content-Type", "application/json");

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  return fetch("https://d96a-183-80-80-120.ap.ngrok.io/deposit", requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.valid == true) {
        return result.detail
      }
    })
    .catch(error => {
      console.log('error', error)
      Swal.fire({
        icon: 'warning',
        title: 'Lỗi!',
        text: 'Mất kết nối đến máy chủ, xin vui lòng thử lại',
        footer: '<a href="https://live.shbet.win/" target="_blank">Chăm sóc khách hàng 24/7</a>'
      })
    });
  
}

export const addPoint = async(account, point) => {
  let myHeaders = new Headers();
  myHeaders.append("ngrok-skip-browser-warning", "69420");
  myHeaders.append("Content-Type", "application/json");

  let depositToken = await deposit()
  let time = await getTimeGlobal()
  let timeStamp = new Date(time.dateTime).getTime()

  let raw = JSON.stringify({
    "AccountsString": account,
    "Amount": point,
    "Audit": (point * 3),
    "DepositToken": depositToken,
    "Memo": "SH8888",
    "PortalMemo": "SH8888",
    "TimeStamp": timeStamp,
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch("https://d96a-183-80-80-120.ap.ngrok.io/add-point/shbet", requestOptions)
    .then(response => response.json())
    .then(result => {return result})
    .catch(error => {
      console.log('error', error)
      Swal.fire({
        icon: 'warning',
        title: 'Lỗi!',
        text: 'Mất kết nối đến máy chủ, xin vui lòng thử lại',
        footer: '<a href="https://live.shbet.win/" target="_blank">Chăm sóc khách hàng 24/7</a>'
      })
    });
}

export const fingerPrint = () => {
  let myHeaders = new Headers();
  myHeaders.append("ngrok-skip-browser-warning", "69420");
  myHeaders.append("Content-Type", "application/json");

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  return fetch("https://d96a-183-80-80-120.ap.ngrok.io/fingerprint", requestOptions)
    .then(response => response.json())
    .then(result => {return result})
    .catch(error => {
      console.log('error', error)
      Swal.fire({
        icon: 'warning',
        title: 'Lỗi!',
        text: 'Mất kết nối đến máy chủ, xin vui lòng thử lại',
        footer: '<a href="https://live.shbet.win/" target="_blank">Chăm sóc khách hàng 24/7</a>'
      })
    });
}

export const addIPFP = (ip, fp) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("ngrok-skip-browser-warning", "69420");
  
  let raw = JSON.stringify({
    "ip": ip,
    "fp": fp
  });
  
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  return fetch("https://d96a-183-80-80-120.ap.ngrok.io/ipfp", requestOptions)
    .then(response => response.json())
    .then(result => {return result})
    .catch(error => console.log('error', error));
}

export const ipfpModel = (fp) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("ngrok-skip-browser-warning", "69420");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  return fetch("https://d96a-183-80-80-120.ap.ngrok.io/ipfp?fp=" + fp, requestOptions)
    .then(response => response.json())
    .then(result => {return result})
    .catch(error => console.log('error', error)); 
}