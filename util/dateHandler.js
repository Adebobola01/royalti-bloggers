exports.dateHandler = (date)=>{
    const now = Date.now();
    const val =  Math.floor((now - date)/1000);
    const day = date.getDate();
    let month;
    const year = date.getFullYear();
    let newDate;

    switch (date.getMonth()) {
        case 0:
            month = "January";
            break;
        case 1:
            month = "February";
            break;
        case 2:
            month = "March";
            break;
        case 3:
            month = "April";
            break;
        case 4:
            month = "May";
            break;
        case 5:
            month = "June";
            break;
        case 6:
            month = "July";
            break;
        case 7:
            month = "August";
            break;
        case 8:
            month = "September";
            break;
        case 9:
            month = "October";
            break;
        case 10:
            month = "November";
            break;
        case 11:
            month = "December";
            break;
    }

    if (val < 60){
        newDate = `${val} secs ago`;
    }
    else if(val < 3600){
        newDate = `${ Math.floor(val / 60)} minutes ago`;
    }else if(val < 86400){
        newDate = `${ Math.floor(val / 3600 )} hours ago`;
    }else{
        newDate = `${day} ${month}, ${year}`
    }

    return newDate;
}