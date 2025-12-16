const foodPartnerModel = require('../models/foodPartner.model');
const foodModel = require('../models/foodItem.model');


async function getFoodPartnerById(req, res) {
    const foodPartnerId = req.params.id || req.params._id  

    // Agar ID valid nahi hai toh early return
    if (!foodPartnerId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid food partner ID" });
    }

    try {
        const foodPartner = await foodPartnerModel.findById(foodPartnerId);
        const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId });

        if (!foodPartner) {
            return res.status(404).json({ message: "Food partner not found" });
        }

        res.status(200).json({
            message: "Food partner retrieved successfully",
            foodPartner: {
                ...foodPartner.toObject(),
                foodItems: foodItemsByFoodPartner
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    getFoodPartnerById
};
