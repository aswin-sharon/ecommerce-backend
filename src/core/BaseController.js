class BaseController {
    success(res, data, status = 200) {
        return res.status(status).json({
            success: true,
            data,
        });
    }

    error(res, err, status = 400) {
        return res.status(status).json({
            success: false,
            message: err.message,
        });
    }
}

export default BaseController;