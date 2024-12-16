import useragent from "useragent";
import requestIp from "request-ip"
import geoip from "geoip-lite";

const loginDevice = async (req) => {
    const systemIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // Get system IP from request
    const agent = useragent.parse(req.headers['user-agent']); // Parse user-agent string
    const deviceInfo = `${agent.os} - ${agent.device}` || "Unknown device"; // Extract device info
    const ipLocation = geoip.lookup(systemIp); // You could use a service like ipstack or geoip for IP location

    return { systemIp, deviceInfo, ipLocation };
}

export default loginDevice;