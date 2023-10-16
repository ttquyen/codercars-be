const fs = require("fs");
const csv = require("csvtojson");
const convertData = async () => {
    let newData = await csv().fromFile("data.csv"); //return array of JSON
    newData = new Set(newData.map((e) => e));
    newData = Array.from(newData);
    let data = JSON.parse(fs.readFileSync("db.json"));
    newData = newData.map((car) => ({
        make: car.Make,
        model: car.Model,
        transmission_type: car["Transmission Type"],
        size: car["Vehicle Size"],
        style: car["Vehicle Style"],
        price: parseInt(car.MSRP),
        release_date: car.Year,
        isDeleted: false,
    }));
    data = newData;
    fs.writeFileSync("db.json", JSON.stringify(data));
};
convertData();
