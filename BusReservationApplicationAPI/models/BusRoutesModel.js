import mongoose from "mongoose";

const busRouteSchema = new mongoose.Schema(
    {
        routeId: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
        route: { type: String, required: true },
        AvailableBusses: {
            busNo:  {type: String, required: true }
        }
    }
)

const BusRoute = mongoose.model('BusRoute', busRouteSchema);

export default BusRoute;