import { NotificationOuterRange, Quality, QualityTable } from "../src/sensors/types";
import Sensor from "../src/sensors/Sensor";
import pm25 from "../src/sensors/sn-gcja5/pm25";
import temp from "../src/sensors/bme680/temperature";

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

test("Notifications are correctly generated", () => {
    expect(pm25.getDegradationNotifications().length).toBe(0);

    pm25.parseIncomingUpdate({
        density: 45.0,
        particleCount: 1,
    });
    expect(pm25.getDegradationNotifications().length).toBe(0);

    {
        pm25.parseIncomingUpdate({
            density: 55.0,
            particleCount: 1,
        });
        const notif = pm25.getDegradationNotifications();
        expect(notif.length).toBe(1);
        expect(notif[0]).toBe(pm25.parameters[1].notifications?.POOR);
    }

    {
        pm25.parseIncomingUpdate({
            density: 80.0,
            particleCount: 1,
        });
        const notif = pm25.getDegradationNotifications();
        expect(notif.length).toBe(1);
        expect(notif[0]).toBe(pm25.parameters[1].notifications?.BAD);
    }

    pm25.parseIncomingUpdate({
        density: 30.0,
        particleCount: 1,
    });
    expect(pm25.getDegradationNotifications().length).toBe(0);
});


test("Notifications with range are correctly generated", () => {
    expect(temp.getDegradationNotifications().length).toBe(0);

    temp.parseIncomingUpdate({
        value: 16.0
    });
    expect(temp.getDegradationNotifications().length).toBe(0);

    {
        temp.parseIncomingUpdate({
            value: 15.5
        });
        const notif = temp.getDegradationNotifications();
        expect(notif.length).toBe(1);
        expect(notif[0]).toBe((<NotificationOuterRange>temp.parameters[0].notifications?.POOR).LOWER);
    }

    {
        temp.parseIncomingUpdate({
            value: 24.5,
        });
        const notif = temp.getDegradationNotifications();
        expect(notif.length).toBe(1);
        expect(notif[0]).toBe((<NotificationOuterRange>temp.parameters[0].notifications?.BAD).UPPER);
    }

    temp.parseIncomingUpdate({
        value: 18.0,
    });
    expect(temp.getDegradationNotifications().length).toBe(0);
});
