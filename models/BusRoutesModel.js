import mongoose from "mongoose";

const busRouteSchema = new mongoose.Schema(
    {
        routeId: { type: Number, required: true, unique: true },
        routeStart: { type: String, required: true },
        routeEnd: { type: String, required: true },
        route: { type: String, required: true, unique: true },
        AvailableBusses: [{
            busNo:  {type: String, required: true },
            startAt: {type: Date, required: true},
            endAt: {type: Date, required: true}
        }]
    }
)

const BusRoute = mongoose.model('BusRoute', busRouteSchema);

export default BusRoute;