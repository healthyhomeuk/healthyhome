import { SensorsList as SensorsListMessage } from "../src/messages/List";

test("List is empty", () => {
    const msg = SensorsListMessage.fromMultipart([
        "SERVER",
        "sensors",
        "list",
        "",
    ]);

    expect(msg.list.length).toBe(0);
});

test("List has elements", () => {
    const msg = SensorsListMessage.fromMultipart([
        "SERVER",
        "sensors",
        "list",
        "temperature\r\nhumidity",
    ]);

    expect(msg.list.length).toBe(2);
    expect(msg.list[0]).toBe("temperature");
    expect(msg.list[1]).toBe("humidity");
});
