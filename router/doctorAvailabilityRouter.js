var express = require('express');
var router = express.Router();
// var moment = require('moment');
var DoctorAvailability = require("../models/doctorAvailability.js")
var DoctorAppointment = require("../models/doctorAppointment.js")
var moment = require('moment-timezone');

router.post("/:duration", (req, res) => {
    const { user_id, start_time, end_time } = req.body;
    let duration = req.params['duration']
    var tduration = Number(duration)
    console.log("duration", typeof (tduration))
    // var ndate = new Date(date);
    // var tdate = ndate.toISOString().substring(0, 10)
    var smtime = moment(start_time); //todays date
    var emtime = moment(end_time);
    var tmtime = moment(start_time);
    var tempend = start_time
    duration = moment.duration(emtime.diff(smtime));
    let minutes = duration.asMinutes();
    minutes = Math.ceil(minutes)
    console.log("minutes", typeof (minutes))
    var rem = minutes % tduration
    console.log(rem)
    if ((rem != 0)) {
        res.send({ "message": "slot cannot be divided for gven time frame" })
    } else {
        var stime = start_time
        console.log(stime)
        console.log(tempend)
        console.log(end_time)
        while (emtime.diff(smtime) > 0) {

            smtime = tmtime.add(1, "minutes");

            var a = moment.tz(smtime,"Asia/calcutta").format()
            // console.log("a",a)

            // let starttimetemp = smtime.toISOString()

            tmtime = smtime.add((tduration - 1), "minutes")

            // let endtimetemp = tmtime.toISOString();
            var b = moment.tz(tmtime,"Asia/calcutta").format()

            // stime = +tempend + 1;
            // tempend = +stime + +duration - 1
            // console.log("start time", starttimetime)
            // console.log("end time", endtimetemp)

            // DoctorAvailability.findOne({ user_id }, (err, doctorAvailability) => {
            //     if (doctorAvailability) {
            //         res.send({ message: "Already registered" })
            //     }
            //     else {
                     
            //         })
            //     }
            // })
            console.log("stime",a)
            console.log("etime",b)
            let doctorAvailability = new DoctorAvailability({
                user_id,
                start_time : a,
                end_time : b
            })
            doctorAvailability.save()
        }
        res.send({ "message": "done" })
    }
})

router.post('/', async function (req, res) {
    const date = req.body.date;
    const darr = date.split("-")
    console.log(darr[2])
    console.log(darr[1])
    console.log(darr[0])
    var ndate = new Date(Date.UTC(darr[2],darr[1],darr[0],0,0,0));
    console.log(ndate)
    var ndatepo = new Date(Date.UTC(darr[2],darr[1],Number(1+Number(darr[0])),0,0,0));
    console.log(ndatepo)
    const data = await DoctorAvailability.find({ email : req.body.email , 
        start_time:{
            $gte: ndate,
            $lt: ndatepo
        }
    });
    res.send({
        "availability": data
    })
});

module.exports = router