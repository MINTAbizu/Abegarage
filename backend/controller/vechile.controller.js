const vehicleService = require('../services/vechile.services');
// const customerservices=require('../services/customer.services')

async function addVehicle(req, res) {
    try {
        const vehicleData = req.body;
        const createdVehicle = await vehicleService.createVehicle(vehicleData);

        return res.status(201).json({
            message: "Vehicle registered successfully.",
            vehicle: createdVehicle
        });

    } catch (error) {
        console.error("Error creating vehicle:", error);
        return res.status(500).json({
            error: 'Failed to register vehicle: ' + error.message
        });
    }
}

async function getVehicles(req, res) {
    try {
        const vehicles = await vehicleService.getVehicles();

        if (!vehicles || vehicles.length === 0) {
            return res.status(404).json({
                message: 'No vehicles found'
            });
        }

        res.status(200).json({
            data: vehicles
        });

    } catch (error) {
        console.error("getVehicles error:", error);
        res.status(500).json({ 
            error: "Internal server error: " + error.message 
        });
    }
}

async function getVehicleById(req, res) {
    try {
        const vehicleId = req.params.id;
        const vehicle = await vehicleService.getVehicleById(vehicleId);

        if (!vehicle) {
            return res.status(404).json({
                message: 'Vehicle not found'
            });
        }

        res.status(200).json({
            data: vehicle
        });

    } catch (error) {
        console.error("getVehicleById error:", error);
        res.status(500).json({ 
            error: "Internal server error: " + error.message 
        });
    }
}

async function deleteVehicle(req, res) {
    try {
        const vehicleId = req.params.id;
        const exists = await vehicleService.checkVehicleExists(vehicleId);

        if (!exists) {
            return res.status(404).json({
                message: 'Vehicle not found'
            });
        }

        await vehicleService.deleteVehicle(vehicleId);
        res.status(200).json({
            message: 'Vehicle deleted successfully'
        });

    } catch (error) {
        console.error("deleteVehicle error:", error);
        res.status(500).json({ 
            error: "Internal server error: " + error.message 
        });
    }
}

module.exports = {
    addVehicle,
    getVehicles,
    getVehicleById,
    deleteVehicle
};