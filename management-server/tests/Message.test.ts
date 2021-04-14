import Message, { SensorEntity } from "../src/messages/Message";

test("Message from multipart", () => {
    const message = Message.fromMultipart(["SENSOR", "touchy", "touched"]);
    const desired = new Message(SensorEntity("touchy"), "touched");
    expect(message).toStrictEqual(desired);
});

test("Message to multipart", () => {
    const message = new Message(
        SensorEntity("touchy"),
        "touched"
    ).toMultipart();
    const desired = ["SENSOR", "touchy", "touched"];
    expect(message).toStrictEqual(desired);
});

test("Message with body", () => {
    const message = Message.fromMultipart(["SERVER", "test", "key", "value"]);
    expect(message.hasBody()).toBeTruthy();
    expect(message.body?.key).toBe("value");
});

test("Message without body", () => {
    const message = Message.fromMultipart(["SERVER", "test"]);
    expect(message.hasBody()).toBeFalsy();
    expect(message.body?.key).toBeUndefined();
});

test("Invalid multipart: bad entity", () => {
    const multipart = ["MAGICIAN", "trick"];
    expect(Message.fromMultipart.bind(multipart)).toThrowError();
});

test("Invalid multipart: malformed header", () => {
    const multipart = ["DEVICE", "trick"];
    expect(Message.fromMultipart.bind(multipart)).toThrowError();
});

test("Invalid multipart: malformed body", () => {
    const multipart = ["DEVICE", "trick", "subject", "body"];
    expect(Message.fromMultipart.bind(multipart)).toThrowError();
});
