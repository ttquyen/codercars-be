const mongoose = require("mongoose");
const Car = require("../models/Car");
const { AppError } = require("../helpers/utils");
const carController = {};

carController.createCar = async (req, res, next) => {
    try {
        // YOUR CODE HERE
        const carInfo = req.body;
        if (!carInfo) {
            throw new AppError(401, "Bad Request", "Create Car Error");
        }
        const newCar = await Car.create(carInfo);
        res.status(200).send({
            car: newCar,
            message: "Create Car Successfully!",
        });
    } catch (err) {
        // YOUR CODE HERE
        next(err);
    }
};

carController.getCars = async (req, res, next) => {
    try {
        // YOUR CODE HERE

        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        //Number of items skip for selection
        let offset = limit * (page - 1);

        const filter = {};
        //mongoose query
        const listOfFound = await Car.find(filter).skip(offset).limit(limit);
        // console.log(listOfFound);
        const count = await Car.countDocuments({});
        const totalPage = Math.ceil(count / limit);

        res.status(200).send({
            cars: listOfFound,
            total: totalPage,
            page: page,
            message: "Get Car List Successfully!",
        });
    } catch (err) {
        next(err);
        // YOUR CODE HERE
    }
};

carController.editCar = async (req, res, next) => {
    try {
        // YOUR CODE HERE
        const targetId = req.params.id;
        const updateInfo = req.body;
        const options = { new: true };

        const updated = await Car.findByIdAndUpdate(
            targetId,
            updateInfo,
            options
        );
        res.status(200).send({
            car: updated,
            message: "Update Car Successfully!",
        });
    } catch (err) {
        // YOUR CODE HERE
        next(err);
    }
};

carController.deleteCar = async (req, res, next) => {
    try {
        // YOUR CODE HERE
        const targetId = req.params.id;
        // const options = { new: true };

        // const updated = await Car.findByIdAndDelete(targetId, options);
        const updated = await Car.findByIdAndUpdate(targetId, {
            isDeleted: true,
        });
        res.status(200).send({
            car: updated,
            message: "Delete Car Successfully!",
        });
    } catch (err) {
        // YOUR CODE HERE
    }
};

module.exports = carController;
