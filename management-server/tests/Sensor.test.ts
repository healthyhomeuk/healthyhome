import { Quality, QualityTable } from "../src/sensors/types";
import Sensor from "../src/sensors/Sensor";

const table: QualityTable = [
    [Quality.EXCELLENT, 0, 50],
    [Quality.GOOD, 50, 100],
    [Quality.BAD, 100, 200],
];

test("Quality level is correctly matched", () => {
    expect(Sensor.matchQuality(table, -1)).toBe(Quality.UNKNOWN);
    expect(Sensor.matchQuality(table, 0)).toBe(Quality.EXCELLENT);
    expect(Sensor.matchQuality(table, 34)).toBe(Quality.EXCELLENT);
    expect(Sensor.matchQuality(table, 50)).toBe(Quality.GOOD);
    expect(Sensor.matchQuality(table, 78)).toBe(Quality.GOOD);
    expect(Sensor.matchQuality(table, 100)).toBe(Quality.BAD);
    expect(Sensor.matchQuality(table, 150)).toBe(Quality.BAD);
    expect(Sensor.matchQuality(table, 200)).toBe(Quality.UNKNOWN);
});
