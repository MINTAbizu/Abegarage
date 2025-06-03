const installservices = require('../services/install.services');

async function install(req, res, next) {
    try {
        const installmessage = await installservices.install();
        if (installmessage.status === 200) {
            return res.status(200).json({
                message: "installation successful",
                result: installmessage.message
            });
        } else {
            return res.status(400).json({
                message: "installation failed",
                error: installmessage.error
            });
        }
    } catch (error) {
        console.error('Error during installation:', error);
        return res.status(500).json({ message: 'Installation failed', error: error.message });
    }
}

module.exports = { install };